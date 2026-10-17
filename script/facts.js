/* Fact-first /script: one concise summary; existing calculator remains editable, collapsed. */
(function(){
  'use strict';
  function has(v){return v !== undefined && v !== null && String(v).trim() !== '';}
  function positive(v){return has(v) && Number(v)>0;}
  function amount(v){return Number.isFinite(Number(v)) ? fmtC(Number(v)) : '—';}
  function line(label,v){
    return '<div class="fact-line"><span class="fl">'+escH(label)+'</span><span class="fr">'+escH(String(v))+'</span></div>';
  }
  function kpi(label,v,cls){
    return '<div class="fact-kpi '+(cls||'')+'"><div class="fk">'+escH(label)+'</div><div class="fv">'+escH(String(v))+'</div></div>';
  }
  function summary(c){
    if(!c || !document.getElementById('ibL'))return;
    var payoff=positive(c.payoff)?Number(c.payoff):null;
    var monthly=positive(c.mmo)?Number(c.mmo):null;
    var deed=c.dtype==='DB' && !positive(c.payoff) && !positive(c.mmo);
    if(deed)monthly=0;
    var maintenance=positive(c.mf)?Number(c.mf):null;
    var totalMonthly=monthly!==null&&maintenance!==null?monthly+maintenance/12:null;
    var totalYear=monthly!==null&&maintenance!==null?monthly*12+maintenance:null;
    var show=function(v){return v===null?'—':amount(v);};
    var status=deed?'<span class="fact-tag green">DEED BACK · PAGADO</span>':
      (monthly!==null||payoff!==null?'<span class="fact-tag blue">HIPOTECA · NO DEED BACK</span>':'<span class="fact-tag gold">TIPO PENDIENTE DE VERIFICAR</span>');
    var late='';
    if(c.behind===0||c.behind==='0')late='<span class="fact-tag green">AL CORRIENTE</span>';
    else if(positive(c.behind)||/atras/i.test(String(c.behind||'')))late='<span class="fact-tag red">ATRASADO: '+escH(String(c.behind))+' MESES</span>';
    var phones=[c.phone,c.phone2].filter(Boolean).map(fmtPhone).filter(function(v,i,a){return a.indexOf(v)===i;}).join(' · ');
    var links=[];
    if(qPipeUrl(c))links.push('<a href="'+escH(qPipeUrl(c))+'" target="_blank" rel="noopener">↗ CRM PIPELINE</a>');
    else links.push('<span class="fact-tag gold">FALTA ENLACE CRM</span>');
    if(c.sheetUrl)links.push('<a href="'+escH(c.sheetUrl)+'" target="_blank" rel="noopener">↗ PRE-CALL</a>');
    if(c.id)links.push('<a href="#" onclick="qCopyInfo(\'script\',this);return false;">🔗 COPIAR ENLACE</a>');
    if(c.docusignUrl)links.push('<a href="'+escH(c.docusignUrl)+'" target="_blank" rel="noopener">DocuSign</a>');
    document.getElementById('ibL').innerHTML=
      '<div class="fact-kicker">01 · CLIENTE Y CONTACTO</div>'+
      '<div class="ib-client">'+qNameLink(c)+'</div><div>'+status+late+'</div>'+
      (c.appt?'<div class="fact-sub">📅 '+escH(c.appt)+'</div>':'')+
      '<div class="fact-sub"><b>Case Analyst:</b> '+escH(c.ca||'—')+'</div>'+
      (phones?'<div class="fact-sub">📞 '+escH(phones)+'</div>':'')+
      (c.email?'<div class="fact-sub">✉️ '+escH(c.email)+'</div>':'')+
      (c.address?'<div class="fact-sub">🏠 '+escH(c.address)+'</div>':'')+
      '<div class="fact-links">'+links.join('')+'</div>';
    var rate=positive(c.apr)?Number(c.apr).toLocaleString('es-CO',{maximumFractionDigits:2})+'%':'—';
    var projections=[['1 año','q_t1'],['5 años','q_t5'],['10 años','q_t10'],['20 años','q_t20']];
    var projHtml=projections.map(function(p){
      var v=document.getElementById(p[1]), value=v&&v.textContent?v.textContent:'—';
      return '<div><span>'+p[0]+'</span><b>'+escH(value)+'</b></div>';
    }).join('');
    document.getElementById('ibM').innerHTML=
      '<div class="fact-kicker">02 · RESUMEN FINANCIERO</div>'+
      '<div class="fact-kpis">'+
      kpi('Saldo reportado',show(payoff),'saldo')+
      kpi('Total mensual',show(totalMonthly),'emph')+
      kpi('Hipoteca / mes',show(monthly),'')+
      kpi('Mantenimiento / año',show(maintenance),'')+
      kpi('Total anual',show(totalYear),'')+
      kpi('APR registrado',rate,'')+
      '</div><div class="fact-proj">'+projHtml+'</div>'+
      '<div class="fact-note">Proyecciones ilustrativas; aumento MF supuesto: '+escH(positive(c.esc)?String(c.esc)+'%':'no indicado')+'. El saldo no es un payoff verificado sin prueba del acreedor.</div>';
    var months=['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var m=Number(c.pmonth), yr=positive(c.pyr)?String(c.pyr):'';
    var bought=(Number.isInteger(m)&&m>=1&&m<=12?months[m]+' ':'')+yr;
    var developer=c.developerBrand||c.developer||c.resort||'No registrado';
    var property=c.resortLegalName||c.exactResortName||'POR VERIFICAR';
    var city=c.purchaseCity||c.cityPurchased||'POR VERIFICAR';
    var costNight=totalYear!==null&&positive(c.nights)?amount(totalYear/Number(c.nights)):'—';
    var original=Number((document.getElementById('q_loan')||{}).value);
    document.getElementById('ibR').innerHTML=
      '<div class="fact-kicker">03 · PROPIEDAD Y COMPRA</div>'+
      line('Desarrollador / marca',developer)+
      line('Resort legal exacto',property)+
      line('Ciudad de compra',city)+
      (c.propertyCity?line('Ciudad del resort',c.propertyCity):'')+
      (c.loc?line('Ubicación registrada',c.loc):'')+
      line('Compra',bought||'—')+
      line('Contratos',positive(c.contracts)?String(c.contracts):'—')+
      (positive(c.points)?line('Puntos',Number(c.points).toLocaleString('es-CO')):'')+
      line('Plazo de préstamo',positive(c.term)?String(c.term)+' meses':'—')+
      (positive(original)?line('Préstamo original (modelo)',amount(original)):'')+
      line('Noches / año',positive(c.nights)?String(c.nights):'—')+
      line('Costo por noche',costNight);
  }
  function initialize(){
    var container=document.getElementById('factsLanding'), bar=document.getElementById('cbar');
    if(container&&bar)container.appendChild(bar);
    if(typeof window.renderBar==='function'){
      var originalRender=window.renderBar;
      window.renderBar=function(c,n){originalRender(c,n);summary(c);};
    }
    if(typeof cur!=='undefined'&&cur)summary(cur);
    if(typeof window.aptLayout==='function')window.aptLayout();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();
