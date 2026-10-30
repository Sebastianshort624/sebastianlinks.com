import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../facts.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../facts.css',import.meta.url),'utf8');

// Shipped layout (Sebastian, 2026-10-29): the fact-first summary is the inline
// three-column intel bar (ibL/ibM/ibR) rendered by the page itself, and the
// calculator panels stay EXPANDED in the 3-column grid so more intel is visible
// without scrolling. facts.js/facts.css ship in the repo as an unintegrated
// enhancement (their content is covered by the tests below); the page does not
// load them, so no assertion here may require a #factsLanding container, a
// <details> collapse, or the facts asset tags.
test('fact-first intel bar is above calculator and preserves price + contract anchors',()=>{
 const bar=html.indexOf('class="ib-wrap"');
 assert.ok(bar>0&&bar<html.indexOf('<aside class="calcside calcarea"'));
 for(const id of ['id="ibL"','id="ibM"','id="ibR"'])assert.ok(html.includes(id),id+' present');
 assert.match(html,/id="price-anchor"/);
 assert.match(html,/id="coversheet"/);
});

test('recurring mortgage and expense sections are present in the calculator panels',()=>{
 const a=html.indexOf('<div class="cpanel cpanel-trap">');
 assert.ok(a>0);
 const fee=html.indexOf('id="q_fee"');
 assert.ok(fee>a,'payment and fees remain accessible after the trap panel');
 const panel=html.slice(a,fee);
 assert.match(panel,/SITUACIÓN DEL RESORT/);
 assert.match(panel,/DESGLOSE DE GASTOS/);
 assert.match(panel,/DESGLOSE DEL PRÉSTAMO/);
});

test('reuses Life OS palette and displays distinct fact sections',()=>{
 for(const color of ['#0284C7','#059669','#CA8A04','#F8FAFC'])assert.ok(css.includes(color));
 assert.match(js,/CLIENTE Y CONTACTO/);
 assert.match(js,/RESUMEN FINANCIERO/);
 assert.match(js,/PROPIEDAD Y COMPRA/);
 assert.match(js,/qPipeUrl\(c\)/);
 assert.match(js,/resortLegalName/);
 assert.match(js,/purchaseCity/);
 assert.match(js,/POR VERIFICAR/);
});

test('fact panel does not hardcode or repeat sample financial numbers',()=>{
 for(const val of ['$283.33','$38,487','$1,000'])assert.ok(!js.includes(val));
 assert.equal((js.match(/Costo por noche/g)||[]).length,1);
 assert.equal((js.match(/Total anual/g)||[]).length,1);
 for(const key of ['q_t1','q_t5','q_t10','q_t20'])assert.ok(js.includes(key));
});

test('new JS parses correctly and imports no external client data',()=>{
 assert.doesNotThrow(()=>new Script(js));
 assert.ok(!js.includes('localStorage.setItem'));
});

