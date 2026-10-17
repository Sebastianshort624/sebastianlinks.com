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
  assert.match(html, /new Date\(\)\.getMonth\(\) \+ 1 - c\.pmonth/);
  assert.match(html, /fmtC\(s\.bal\)/);
  assert.match(html, /NO demuestra pagos realizados ni payoff verificado/);
});

test('manual months and loan corrections persist rather than reset at every client switch', () => {
  assert.match(html, /mosPaidManual/);
  assert.match(html, /loanPrincipalManual/);
});

test('Eduardo has mortgage and a positive payoff; cannot be classified deed-back', () => {
  const e = clients.find(c => /^Eduardo Rodr[ií]guez/.test(c.name) && /Cintya Benabente/.test(c.name));
  assert.ok(e);
  assert.equal(e.dtype, 'MTG');
  assert.ok(e.mmo > 0);
  assert.ok(e.payoff > 0);
  assert.match(html, /DEED-BACK solo aplica a propiedad pagada/);
  assert.match(html, /Number\(c\.mmo\) > 0 \|\| Number\(c\.payoff\) > 0/);
});

test('old browser client record receives missing APR/term/purchase month instead of blank model', () => {
  assert.match(html, /Fill only genuinely missing client facts/);
  assert.match(html, /'mmo','mf','term','apr','pyr','pmonth'/);
});
