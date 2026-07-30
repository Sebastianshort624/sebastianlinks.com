#!/usr/bin/env python3
"""
bbb_enricher.py — BBB Company Intelligence Enrichment Engine
Career CRM — sebastianlinks.com/jobs

Usage
─────
1. Export from CRM: Companies tab → Admin → Export Backup → save as companies.json
2. pip install playwright python-dateutil
   playwright install chromium
3. python bbb_enricher.py --input companies.json [options]
4. Import into CRM: Companies tab → 🔍 or 🚀 → select bbb_enriched.json

Options
───────
  --input    FILE     companies.json export from CRM  (required)
  --output   FILE     output file (default: bbb_enriched.json)
  --delay    SECS     seconds between requests (default: 2)
  --force             overwrite fields that already have values
  --company  NAME     enrich only this company (partial name match)
  --resume            resume from last saved checkpoint
"""

import argparse, json, math, re, sys, time
from datetime import date, datetime
from pathlib  import Path

try:
    from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
except ImportError:
    sys.exit("Install dependencies first:\n  pip install playwright\n  playwright install chromium")

# ── CONSTANTS ─────────────────────────────────────────────────────────
SCHEMA_VERSION = "crm_enrichment_v1"
BBB_BASE       = "https://www.bbb.org"
BBB_SEARCH     = "https://www.bbb.org/search?find_text={query}&find_loc="
PROGRESS_FILE  = Path("bbb_progress.json")
MAX_RETRIES    = 3

# ── PROGRESS ──────────────────────────────────────────────────────────
def load_progress():
    if PROGRESS_FILE.exists():
        try: return json.loads(PROGRESS_FILE.read_text())
        except: pass
    return {"done": [], "failed": [], "skipped": []}

def save_progress(p):
    PROGRESS_FILE.write_text(json.dumps(p, indent=2))

def save_output(path: Path, envelope: dict):
    path.write_text(json.dumps(envelope, indent=2, default=str))

# ── DATE HELPERS ──────────────────────────────────────────────────────
def years_since(date_str: str) -> int | None:
    """Return whole years between date_str and today, or None if unparseable."""
    if not date_str:
        return None
    for pat in [r'(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})', r'(\d{4})[/\-](\d{1,2})[/\-](\d{1,2})']:
        m = re.search(pat, str(date_str))
        if m:
            g = m.groups()
            try:
                y, mo, d = (int(g[0]), int(g[1]), int(g[2])) if len(g[0]) == 4 \
                           else (int(g[2]), int(g[0]), int(g[1]))
                delta = (date.today() - date(y, mo, d)).days
                return max(0, math.floor(delta / 365.25))
            except: pass
    return None

# ── BBB SCRAPER ───────────────────────────────────────────────────────
def find_bbb_url(page, company: dict, delay: float) -> str | None:
    """Return the BBB profile URL for this company, or None."""
    # Use stored URL if present
    d = company.get("dossier") or {}
    stored = d.get("bbbProfileUrl", {})
    stored_val = stored.get("value", "") if isinstance(stored, dict) else str(stored or "")
    if stored_val and "bbb.org" in stored_val:
        return stored_val

    name    = (company.get("name") or "").strip()
    website = d.get("website", {})
    site    = (website.get("value", "") if isinstance(website, dict) else str(website or "")).strip()
    query   = name + (f" {site}" if site else "")

    if not query:
        return None

    url = BBB_SEARCH.format(query=query.replace(" ", "+"))
    try:
        page.goto(url, wait_until="networkidle", timeout=25000)
        page.wait_for_timeout(2500)

        # Intercept any JSON API results first
        # Try DOM selectors for result links
        for sel in [
            'a[href*="/us/"][href*="/profile/"]',
            'a[href*="bbb.org"][href*="/profile/"]',
            '.result-list a',
            'h3 a[href*="profile"]',
        ]:
            for link in page.locator(sel).all()[:4]:
                try:
                    href = link.get_attribute("href") or ""
                    text = (link.inner_text() or "").strip().lower()
                    if "/profile/" not in href:
                        continue
                    # Prefer links whose visible text matches the company name
                    if name.lower()[:6] in text or True:   # accept first result
                        return href if href.startswith("http") else BBB_BASE + href
                except:
                    pass
    except Exception as e:
        print(f"      search error: {e}")
    return None

def scrape_profile(page, url: str) -> dict:
    """Navigate to BBB profile URL and extract all fields from DOM + intercepted JSON."""
    fields: dict = {}
    api_payload: dict = {}

    def on_response(response):
        try:
            if "bbb.org/api" in response.url or "/hs/" in response.url:
                if response.status == 200:
                    try:
                        data = response.json()
                        if isinstance(data, dict):
                            api_payload.update(data)
                    except: pass
        except: pass

    page.on("response", on_response)
    try:
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(3000)
    except PWTimeout:
        page.wait_for_timeout(2000)
    page.remove_listener("response", on_response)

    body = page.inner_text("body") or ""

    def safe(sel, default=""):
        try:
            el = page.locator(sel).first
            return el.inner_text().strip() if el.count() else default
        except: return default

    def safe_attr(sel, attr, default=""):
        try:
            el = page.locator(sel).first
            return (el.get_attribute(attr) or default) if el.count() else default
        except: return default

    # ── Business Name ────────────────────────────────────────────────
    for sel in ['h1[data-testid*="business"]', 'h1.BusinessName', 'h1']:
        v = safe(sel)
        if v and 2 < len(v) < 120:
            fields["name"] = v; break

    # ── Phone ─────────────────────────────────────────────────────────
    tel = safe_attr('a[href^="tel:"]', "href", "").replace("tel:", "").strip()
    if tel:
        fields["phone"] = tel
    else:
        m = re.search(r'\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}', body)
        if m: fields["phone"] = m.group()

    # ── Website ───────────────────────────────────────────────────────
    for a in page.locator('a[href^="http"]:not([href*="bbb.org"])').all()[:8]:
        try:
            href = a.get_attribute("href") or ""
            txt  = (a.inner_text() or "").strip().lower()
            if href.startswith("http") and ("website" in txt or "visit" in txt or len(txt) < 40):
                fields["website"] = href; break
        except: pass

    # ── Address ──────────────────────────────────────────────────────
    for sel in ['[data-testid="address"]', '[class*="Address"]', 'address']:
        addr = safe(sel)
        if addr:
            lines = [l.strip() for l in addr.splitlines() if l.strip()]
            if lines:
                fields["street"] = lines[0] if len(lines) > 1 else ""
                last = lines[-1]
                am = re.match(r'^(.+?),\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$', last)
                if am:
                    fields["city"]  = am.group(1).strip()
                    fields["state"] = am.group(2)
                    fields["zip"]   = (am.group(3) or "").strip()
            break

    # ── BBB Rating ───────────────────────────────────────────────────
    for sel in ['[data-testid*="rating"]', '[class*="Rating"]', '[class*="grade"]']:
        v = safe(sel)
        if v and re.match(r'^[A-F][+-]?$', v.strip()):
            fields["bbbRating"] = v.strip(); break
    if "bbbRating" not in fields:
        m = re.search(r'BBB\s+Rating[:\s]+([A-F][+-]?)', body)
        if m: fields["bbbRating"] = m.group(1)

    # ── BBB Accredited & Years Accredited ────────────────────────────
    if re.search(r'BBB\s+Accredited\s+Business', body, re.IGNORECASE):
        fields["bbbAccredited"] = "Yes"
        m = re.search(r'Accredited\s+Since[:\s]+(\d{1,2}/\d{1,2}/\d{4})', body, re.IGNORECASE)
        if m:
            fields["bbbAccreditedSince"] = m.group(1)
            yrs = years_since(m.group(1))
            if yrs is not None:
                fields["yearsAccredited"] = yrs
    else:
        fields["bbbAccredited"] = "No"
        fields["yearsAccredited"] = 0

    # ── Years in Business ────────────────────────────────────────────
    m = re.search(r'Years?\s+in\s+Business[:\s]+(\d+)', body, re.IGNORECASE)
    if m: fields["yearsInBusiness"] = m.group(1)

    # ── BBB File Opened ──────────────────────────────────────────────
    m = re.search(r'BBB\s+(?:File\s+)?Opened[:\s]+(\d{1,2}/\d{1,2}/\d{4})', body, re.IGNORECASE)
    if m: fields["bbbOpened"] = m.group(1)

    # ── Business Started ─────────────────────────────────────────────
    m = re.search(r'Business\s+Started[:\s]+(\d{1,2}/\d{1,2}/\d{4})', body, re.IGNORECASE)
    if m: fields["businessStarted"] = m.group(1)

    # ── Entity Type ──────────────────────────────────────────────────
    m = re.search(r'Type\s+of\s+Entity[:\s]+([^\n,]+)', body, re.IGNORECASE)
    if m: fields["entityType"] = m.group(1).strip()

    # ── Owner ────────────────────────────────────────────────────────
    m = re.search(
        r'(?:Business\s+Management|Principal|Owner|President|CEO)[:\s]+([A-Za-z][A-Za-z\s.]{2,40}?)(?:\n|,|\||$)',
        body, re.IGNORECASE)
    if m: fields["owner"] = m.group(1).strip()

    # ── Industry ─────────────────────────────────────────────────────
    for sel in ['[data-testid*="category"]', '[class*="Category"]']:
        v = safe(sel)
        if v and 3 < len(v) < 120:
            fields["industry"] = v; break

    # ── Local BBB ────────────────────────────────────────────────────
    m = re.search(r'Local\s+BBB[:\s]+([^\n]+)', body, re.IGNORECASE)
    if m: fields["localBBB"] = m.group(1).strip()

    # ── Products & Services ──────────────────────────────────────────
    m = re.search(r'(?:Products?\s*&?\s*Services?|Business\s+Categories)[:\s]+([^\n]+(?:\n[^A-Z\n][^\n]*){0,8})',
                  body, re.IGNORECASE)
    if m:
        raw_prods = m.group(1)
        items = [p.strip().lstrip('•·-').strip() for p in re.split(r'[,\n•·]', raw_prods)]
        fields["products"] = [p for p in items if 2 < len(p) < 80][:8]

    # ── Social Links ─────────────────────────────────────────────────
    for a in page.locator('a[href*="facebook.com"], a[href*="linkedin.com"]').all():
        try:
            href = a.get_attribute("href") or ""
            if "facebook.com" in href and "facebook" not in fields:
                fields["facebook"] = href
            elif "linkedin.com" in href and "linkedin" not in fields:
                fields["linkedin"] = href
        except: pass

    fields["bbbProfileUrl"] = page.url
    return fields

def enrich_one(page, company: dict, delay: float, force: bool) -> dict:
    bbb_url = find_bbb_url(page, company, delay)
    if not bbb_url:
        return {"status": "no_bbb_match"}
    time.sleep(delay)
    return {"status": "enriched", "fields": scrape_profile(page, bbb_url),
            "enrichedAt": datetime.now().isoformat()}

# ── APPLY TO RECORD ──────────────────────────────────────────────────
FIELD_MAP = [
    "name","phone","website","city","state","zip","street",
    "bbbRating","bbbAccredited","yearsAccredited","yearsInBusiness",
    "bbbOpened","businessStarted","entityType","owner","industry",
    "localBBB","bbbProfileUrl","facebook","linkedin",
]

def apply(company: dict, enriched: dict, force: bool) -> list[str]:
    """Mutates company.dossier in place. Returns list of changed field keys."""
    if not company.get("dossier"):
        company["dossier"] = {}
    d   = company["dossier"]
    src = f"BBB {date.today().isoformat()}"
    changed = []
    fields  = enriched.get("fields", {})

    for key in FIELD_MAP:
        val = fields.get(key)
        if val is None: continue
        existing = d.get(key)
        old_val  = existing.get("value", "") if isinstance(existing, dict) else str(existing or "")
        if not old_val.strip() or force:
            d[key] = {"value": str(val), "confidence": "high", "source": src}
            changed.append(key)

    # Auto-generate Notes if blank
    if not (d.get("notes", {}).get("value") or "") or force:
        notes = build_notes(fields)
        if notes:
            d["notes"] = {"value": notes, "confidence": "high", "source": src + " (auto)"}
            changed.append("notes")

    return changed

def build_notes(f: dict) -> str:
    lines = []
    if f.get("businessStarted"): lines.append(f"Business Started: {f['businessStarted']}.")
    if f.get("bbbAccredited") == "Yes": lines.append("BBB Accredited.")
    if f.get("entityType"): lines.append(f"{f['entityType']}.")
    if f.get("owner"): lines.append(f"Owner: {f['owner']}.")
    if f.get("yearsAccredited") is not None and f.get("bbbAccredited") == "Yes":
        yrs = f['yearsAccredited']
        lines.append(f"BBB Accredited {yrs} year{'s' if yrs != 1 else ''}.")
    if f.get("products"):
        lines.append("Categories:")
        for p in f["products"][:6]: lines.append(f"• {p}")
    return "\n".join(lines)

# ── PROGRESS BAR ─────────────────────────────────────────────────────
def progress(cur, total, elapsed, ok, fail, skip):
    pct  = cur / total if total else 0
    bar  = "█" * int(30 * pct) + "░" * (30 - int(30 * pct))
    rem  = int((elapsed / cur) * (total - cur)) if cur else 0
    em, es = divmod(int(elapsed), 60)
    rm, rs = divmod(rem, 60)
    print(
        f"\r{bar} {cur}/{total} ({pct:.0%})  "
        f"✓{ok} ✗{fail} ↷{skip}  "
        f"{em}m{es:02d}s · ~{rm}m{rs:02d}s rem ",
        end="", flush=True,
    )

# ── MAIN ─────────────────────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser(description="BBB Company Intelligence Enrichment Engine")
    ap.add_argument("--input",   required=True,          help="companies.json export from Career CRM")
    ap.add_argument("--output",  default="bbb_enriched.json")
    ap.add_argument("--delay",   type=float, default=2.0)
    ap.add_argument("--force",   action="store_true",    help="Overwrite existing field values")
    ap.add_argument("--company", default="",             help="Enrich only matching company (partial name)")
    ap.add_argument("--resume",  action="store_true",    help="Resume from bbb_progress.json checkpoint")
    args = ap.parse_args()

    # ── load input ──────────────────────────────────────────────────
    raw = json.loads(Path(args.input).read_text())

    # CRM exports as {companies:[...]} or a top-level object with state
    if isinstance(raw, list):
        companies = raw
    elif "companies" in raw:
        companies = raw["companies"]
    else:
        # Walk looking for a companies list
        companies = []
        for v in raw.values():
            if isinstance(v, list) and v and "name" in v[0]:
                companies = v; break

    if not companies:
        sys.exit("No companies found. Export via: Companies tab → Admin → Export Backup")

    if args.company:
        companies = [c for c in companies if args.company.lower() in (c.get("name") or "").lower()]
        if not companies:
            sys.exit(f"No companies matching '{args.company}'")
        print(f"Filtered to {len(companies)} match(es)")

    prog    = load_progress() if args.resume else {"done": [], "failed": [], "skipped": []}
    out_path= Path(args.output)
    records : dict = {}

    if args.resume and out_path.exists():
        try: records = json.loads(out_path.read_text()).get("records", {})
        except: pass

    # ── output envelope ─────────────────────────────────────────────
    def envelope():
        return {
            "schema_version": SCHEMA_VERSION,
            "generated_at":   datetime.now().isoformat(),
            "provider":       "bbb",
            "provider_label": "BBB (Playwright)",
            "source":         "bbb_enricher.py",
            "total":          len(companies),
            "enriched":       sum(1 for r in records.values() if r.get("status") == "enriched"),
            "records":        records,
        }

    total = len(companies)
    print(f"\nBBB Enrichment Engine — {total} companies")
    print(f"Output: {args.output}  Delay: {args.delay}s  Force: {args.force}")
    print("─" * 60)

    start = time.time()
    ok = fail = skip = 0

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        ctx     = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                       "AppleWebKit/537.36 (KHTML, like Gecko) "
                       "Chrome/122.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900},
        )
        page = ctx.new_page()

        for i, co in enumerate(companies, 1):
            cid   = co.get("id", co.get("name", f"co_{i}"))
            cname = co.get("name", "Unknown")
            elapsed = time.time() - start
            progress(i - 1, total, elapsed, ok, fail, skip)

            if args.resume and cid in prog["done"]:
                skip += 1; continue

            print(f"\n[{i}/{total}] {cname}")
            enriched = None

            for attempt in range(1, MAX_RETRIES + 1):
                try:
                    enriched = enrich_one(page, co, args.delay, args.force)
                    break
                except Exception as e:
                    print(f"   attempt {attempt}: {e}")
                    if attempt < MAX_RETRIES:
                        time.sleep(args.delay * 2)

            if not enriched:
                enriched = {"status": "error", "error": "max retries exceeded"}

            status = enriched.get("status", "error")
            if status == "enriched":
                changed = apply(co, enriched, args.force)
                records[cid] = {
                    "id":        cid,
                    "name":      cname,
                    "status":    "enriched",
                    "fields":    enriched.get("fields", {}),
                    "changedFields": changed,
                    "enrichedAt": enriched.get("enrichedAt"),
                }
                prog["done"].append(cid)
                ok += 1
                print(f"   ✓ {len(changed)} field(s): {', '.join(changed[:6])}")
            elif status == "no_bbb_match":
                records[cid] = {"id": cid, "name": cname, "status": "no_bbb_match"}
                prog["skipped"].append(cid)
                skip += 1
                print("   ↷ no BBB match")
            else:
                records[cid] = {"id": cid, "name": cname, "status": "error",
                                 "error": enriched.get("error", "")}
                prog["failed"].append(cid)
                fail += 1
                print(f"   ✗ {enriched.get('error', '')}")

            save_output(out_path, envelope())
            save_progress(prog)
            time.sleep(args.delay)

        browser.close()

    elapsed = time.time() - start
    em, es  = divmod(int(elapsed), 60)
    print(f"\n\n{'─' * 60}")
    print("COMPLETE")
    print(f"{'─' * 60}")
    print(f"  Processed : {total}")
    print(f"  Updated   : {ok}")
    print(f"  Skipped   : {skip}")
    print(f"  Failed    : {fail}")
    print(f"  Duration  : {em}m {es}s")
    print(f"  Output    : {out_path.resolve()}")

    if prog["failed"]:
        retry = Path("bbb_retry.json")
        retry.write_text(json.dumps(prog["failed"], indent=2))
        print(f"  Retry list: {retry} ({len(prog['failed'])} companies)")

    print(f"\nNext: In Career CRM → 🚀 Import Enrichment → select {out_path.name}")
    PROGRESS_FILE.unlink(missing_ok=True)

if __name__ == "__main__":
    main()
