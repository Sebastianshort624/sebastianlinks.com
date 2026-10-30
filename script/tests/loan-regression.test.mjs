import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const builtinsMatch = html.match(/^var BUILTIN_CLIENTS = (\[.*\]);$/m);
assert.ok(builtinsMatch, 'Built-in clients must be present in /script');
const clients = JSON.parse(builtinsMatch[1]);

test('built-in appointments are FLAT client records rather than nested array', () => {
  assert.ok(clients.length >= 15);
  assert.ok(clients.every(c => c && typeof c.name === 'string'));
});

test('Yailin 2026-10-17 estimated payoff: original 120 months, APR 15%, $123/mo, two CALENDAR months', () => {
  const y = clients.find(c => c.name === 'Yailin Linares Acosta');
  assert.ok(y);
  assert.equal(y.apr, 15);
  assert.equal(y.term, 120);
  assert.equal(y.mmo, 123);
  assert.equal(y.pyr, 2026);
  assert.equal(y.pmonth, 8);
  const elapsed = (2026 - y.pyr) * 12 + 10 - y.pmonth;
  assert.equal(elapsed, 2);
  const r = y.apr / 1200;
  const principalEstimate = y.mmo * (1 - Math.pow(1 + r, -y.term)) / r;
  let remainingEstimate = principalEstimate;
  for (let i = 0; i < elapsed; i++) {
    const interest = remainingEstimate * r;
    remainingEstimate -= y.mmo - interest;
  }
  assert.ok(Math.abs(principalEstimate - 7623.890211) < 0.005);
  assert.ok(Math.abs(remainingEstimate - 7568.1412) < 0.005);
  // Elapsed months are CALENDAR months from the resolved contract start
  // (PAYOFF INTEGRITY 2026-10-23): the documented purchase month is the
  // fallback start when no upgrade is documented (qContractStart).
  assert.match(html, /function qContractStart\(c\)/);
  assert.match(html, /getMonth\(\) \+ 1 - st\.m/);
  // The schedule balance is displayed only as a labeled cross-check
  // (fmtC(XC.bal) in the CONFLICTO DE SALDO flag), never as the payoff.
  assert.match(html, /fmtC\(XC\.bal\)/);
  assert.match(html, /NO es un payoff confirmado por el prestamista/);
});

test('manual loan corrections persist; months derive from the documented contract start', () => {
  // A manually typed principal persists as the recorded cfin; an AUTO-INFERRED
  // principal never does (MATEO safeguard, tracked by the qLoanAuto flag).
  assert.match(html, /qLoanAuto/);
  assert.match(html, /never persist an auto-inferred principal as a recorded cfin/);
  // MESES is re-derived on every client sync from qContractStart (contract
  // start on file, else the documented purchase date) instead of resetting blank.
  assert.match(html, /var qst0 = qContractStart\(c\);/);
  assert.match(html, /q_mos'\)\.value = qst0 \?/);
});

test('Eduardo has mortgage and a positive payoff; cannot be classified deed-back', () => {
  const e = clients.find(c => /^Eduardo Rodr[ií]guez/.test(c.name) && /Cynthia Benavente/.test(c.name));
  assert.ok(e);
  assert.equal(e.dtype, 'MTG');
  assert.ok(e.mmo > 0);
  assert.ok(e.payoff > 0);
  // Deed-back guards (current): qSync force-flips a DB record carrying a
  // balance to MTG with a visible classification conflict, and the DEED-BACK
  // button refuses outright while a balance exists.
  assert.match(html, /if \(qDtype === 'DB' && c && \(c\.payoff \|\| 0\) > 0\)/);
  assert.match(html, /NO SE PUEDE MARCAR DEED-BACK/);
});

test('old browser client record receives missing APR/term/purchase month instead of blank model', () => {
  // Per-field fill (regla 2026-10-22): a field that is empty in the local copy
  // is filled from the verified built-in record; a set value is never overwritten.
  assert.match(html, /Relleno por campo/);
  assert.match(html, /'payoff','mmo','mf','term','apr','pyr','pmonth','esc','fee','contracts','cyr','cmonth'/);
});

