import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../facts.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../facts.css',import.meta.url),'utf8');

test('dashboard is above calculator and preserves price + contract anchors',()=>{
 const facts=html.indexOf('id="factsLanding"');
 assert.ok(facts>0&&facts<html.indexOf('<aside class="calcside calcarea">'));
 assert.match(html,/id="price-anchor"/);
 assert.match(html,/id="coversheet"/);
 assert.match(html,/href="\/script\/facts.css"/);
 assert.match(html,/src="\/script\/facts.js"/);
});

test('detailed recurring mortgage and projection sections are available but collapsed',()=>{
 const a=html.indexOf('<details class="cpanel cpanel-trap sl-details">');
 const b=html.indexOf('</details>',a);
 assert.ok(a>0&&b>a);
 const hidden=html.slice(a,b);
 assert.match(hidden,/SITUACIÓN DEL RESORT/);
 assert.match(hidden,/PROYECCIÓN — LA TRAMPA/);
 assert.match(hidden,/DESGLOSE DE GASTOS/);
 assert.match(hidden,/DESGLOSE DEL PRÉSTAMO/);
 assert.ok(html.indexOf('id="q_fee"')>b,'payment and fees remain accessible');
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
