const $ = (s) => document.querySelector(s);
const P = {
home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
chart:'<path d="M18 20V10M12 20V4M6 20v-6"/>',
play:'<path d="M6 4l14 8-14 8z" fill="currentColor"/>',
award:'<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
nav:'<path d="M3 11 22 2l-9 19-2-8z"/>',
calc:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
cup:'<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><path d="M6 1v3M10 1v3M14 1v3"/>',
back:'<path d="M15 18l-6-6 6-6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
trash:'<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
star:'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/>',
pause:'<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/>',
stop:'<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>',
lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
check:'<path d="M22 11v1a10 10 0 1 1-6-9.1M22 4 12 14l-3-3"/>',
flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
trend:'<path d="m23 6-9.5 9.5-5-5L1 18M17 6h6v6"/>',
pulse:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
refresh:'<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/>'
};
const ic = (n, z = 20) => '<svg width="'+z+'" height="'+z+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+P[n]+'</svg>';
Object.assign(P, { user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>' });
const NUTRI = {
  pre: [['Banana + pasta de amendoim','30–60 min antes. Energia rápida.'],['Pão com mel ou geleia','1h antes. Carboidrato fácil de digerir.'],['Aveia com fruta','1–2h antes. Energia mais duradoura.'],['Água','Beba aos poucos nas horas anteriores.']],
  pos: [['Ovos + pão ou tapioca','Proteína + carbo para recuperar.'],['Iogurte com frutas e granola','Prático e rápido.'],['Arroz, feijão e frango','Refeição completa em até 2h.'],['Água ou água de coco','Repor líquidos e minerais.']]
};
Object.assign(P, { more:'<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>', edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>' });
let S = { tab:'home', planEditor:false, planImportErr:'', userPlan:null, planBuild:null, synced:[], treino:null, cloud:'', runs:[], perfil:{nivel:'Iniciante',objetivo:'Saúde',dias:3}, plano:null, claimed:{}, open:null, err:'', chartRange:7, menuRun:null, editRun:null, runEditErr:'', deletedRuns:[], dirtyRuns:[], openWeeks:null, openSession:null, activeWorkout:null, sessionView:'detail', sessionLogErr:'', sessionSaved:null, completed:{}, runLinks:{}, pendingRunLink:null, runLinkErr:'', authMode:'in', authBusy:false };
try {
  const g = (k) => JSON.parse(localStorage.getItem(k) || 'null');
  S.userPlan = g('r2_user_plan'); S.runs = g('r2_runs') || []; S.perfil = g('r2_perfil') || S.perfil; S.plano = g('r2_plano'); S.claimed = g('r2_claimed') || {}; S.synced = g('r2_synced') || []; S.deletedRuns = g('r2_deleted_runs') || []; S.dirtyRuns = g('r2_dirty_runs') || []; S.completed = g('r2_completed') || {}; S.runLinks = g('r2_run_links') || {}; S.pendingRunLink = g('r2_pending_run_link');
} catch (e) {}
const saveLocal = () => { try { localStorage.setItem('r2_user_plan', JSON.stringify(S.userPlan)); localStorage.setItem('r2_runs', JSON.stringify(S.runs)); localStorage.setItem('r2_perfil', JSON.stringify(S.perfil)); localStorage.setItem('r2_plano', JSON.stringify(S.plano)); localStorage.setItem('r2_claimed', JSON.stringify(S.claimed)); localStorage.setItem('r2_synced', JSON.stringify(S.synced)); localStorage.setItem('r2_deleted_runs', JSON.stringify(S.deletedRuns)); localStorage.setItem('r2_dirty_runs', JSON.stringify(S.dirtyRuns)); localStorage.setItem('r2_completed', JSON.stringify(S.completed)); localStorage.setItem('r2_run_links', JSON.stringify(S.runLinks)); localStorage.setItem('r2_pending_run_link', JSON.stringify(S.pendingRunLink)); } catch (e) {} };
const save = () => { saveLocal(); cloudSave(); };

const toSecs = (s) => { if (!s) return null; const p = String(s).trim().split(':').map(Number); if (p.some(isNaN)) return null; if (p.length === 1) return p[0]*60; if (p.length === 2) return p[0]*60+p[1]; return p[0]*3600+p[1]*60+p[2]; };
const pad = (n) => String(n).padStart(2,'0');
const fmtTime = (t) => { t = Math.round(t); const h = Math.floor(t/3600), m = Math.floor((t%3600)/60), s = t%60; return h > 0 ? h+':'+pad(m)+':'+pad(s) : m+':'+pad(s); };
const fmtPace = (t) => fmtTime(t) + ' /km';
const num = (s) => { const n = parseFloat(String(s).replace(',', '.')); return isNaN(n) ? null : n; };
const arred = (v) => Math.round(v*10)/10;
const dkey = (ts) => { const d = new Date(ts); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); };
const diaIdx = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000;
const iniSemana = () => { const d = new Date(), w = (d.getDay()+6)%7; return new Date(d.getFullYear(), d.getMonth(), d.getDate()-w); };

function parseData(str) {
  const v = String(str || '').trim(), hoje = new Date();
  if (!v) return { ts: Date.now(), l: hoje.getDate()+'/'+(hoje.getMonth()+1) };
  const p = v.split(/[\/\-.]/).map(Number);
  if (p.length < 2 || p.length > 3 || p.some(isNaN)) return null;
  let ano = p.length === 3 ? p[2] : hoje.getFullYear(); if (ano < 100) ano += 2000;
  const dt = new Date(ano, p[1]-1, p[0], 12);
  if (dt.getFullYear() !== ano || dt.getMonth() !== p[1]-1 || dt.getDate() !== p[0]) return null;
  if (diaIdx(dt) > diaIdx(hoje)) return null;
  return { ts: dt.getTime() + (Date.now() % 1000), l: p[0]+'/'+p[1] };
}
function calcStats(runs) {
  const km = runs.reduce((a, r) => a + r.dist, 0), maior = runs.reduce((a, r) => Math.max(a, r.dist), 0);
  const dias = [...new Set(runs.map((r) => dkey(r.id)))].map((k) => { const [y,m,d] = k.split('-').map(Number); return Date.UTC(y,m-1,d)/86400000; }).sort((a,b) => a-b);
  let longest = 0, cur = 0, prev = null;
  for (const d of dias) { cur = prev !== null && d === prev+1 ? cur+1 : 1; longest = Math.max(longest, cur); prev = d; }
  const atual = prev !== null && prev >= diaIdx(new Date()) - 1 ? cur : 0;
  const rap = (l) => runs.some((r) => r.dist >= 3 && r.secs/r.dist <= l);
  return { km, n: runs.length, maior, longest, atual, gps: runs.some((r) => r.route), p6: rap(360), p5: rap(300) };
}
const CONQ = [
 { n:'Primeiro passo', d:'Registre sua 1ª corrida', xp:20, i:'trend', ok:(s) => s.n >= 1 },
 { n:'Explorador', d:'Complete uma corrida com GPS', xp:30, i:'pin', ok:(s) => s.gps },
 { n:'3 dias seguidos', d:'Corra em 3 dias consecutivos', xp:40, i:'cal', ok:(s) => s.longest >= 3 },
 { n:'Cinco mil', d:'Corra 5 km de uma vez', xp:50, i:'flag', ok:(s) => s.maior >= 5 },
 { n:'Rotina', d:'Complete 10 corridas', xp:60, i:'refresh', ok:(s) => s.n >= 10 },
 { n:'Veloz', d:'3 km ou mais com pace até 6:00/km', xp:70, i:'clock', ok:(s) => s.p6 },
 { n:'50 km', d:'Some 50 km no total', xp:80, i:'pin', ok:(s) => s.km >= 50 },
 { n:'Dez mil', d:'Corra 10 km de uma vez', xp:100, i:'zap', ok:(s) => s.maior >= 10 },
 { n:'Semana perfeita', d:'Corra em 7 dias consecutivos', xp:150, i:'zap', ok:(s) => s.longest >= 7 },
 { n:'Foguete', d:'3 km ou mais com pace até 5:00/km', xp:150, i:'clock', ok:(s) => s.p5 },
 { n:'Hábito de ferro', d:'Complete 50 corridas', xp:200, i:'award', ok:(s) => s.n >= 50 },
 { n:'200 km', d:'Some 200 km no total', xp:200, i:'flag', ok:(s) => s.km >= 200 },
 { n:'Meia maratona', d:'Corra 21,1 km de uma vez', xp:250, i:'award', ok:(s) => s.maior >= 21.1 }
];
function desafios() {
  const ini = iniSemana(), sem = S.runs.filter((r) => r.id >= ini.getTime());
  const km = sem.reduce((a, r) => a + r.dist, 0), maior = sem.reduce((a, r) => Math.max(a, r.dist), 0), dias = new Set(sem.map((r) => dkey(r.id))).size;
  const mk = { 'Iniciante':6, 'Intermediário':12, 'Avançado':25 }[S.perfil.nivel] || 6, ml = { 'Iniciante':3, 'Intermediário':5, 'Avançado':10 }[S.perfil.nivel] || 3, sk = dkey(ini.getTime());
  return [
    { id:'km', i:'trend', n:'Corra '+mk+' km na semana', v:km, meta:mk, xp:50, u:'km' },
    { id:'dias', i:'cal', n:'Corra em 3 dias diferentes', v:dias, meta:3, xp:40, u:'dias' },
    { id:'longa', i:'flag', n:'Faça uma corrida de '+ml+' km ou mais', v:maior, meta:ml, xp:60, u:'km' }
  ].map((d) => ({ ...d, key: sk+':'+d.id }));
}
function gerarPlano({ nivel, objetivo, dias }) {
  const base = { 'Iniciante':3, 'Intermediário':5, 'Avançado':8 }[nivel], meta = { 'Saúde':1, '5K':1.2, '10K':1.6, '21K':2.2 }[objetivo], r = (x) => Math.round(x*10)/10;
  return [
    { n:'Corrida leve', km:r(base), d:'Ritmo confortável, você consegue conversar.' },
    { n:'Longão', km:r(base*meta*1.5), d:'Bem tranquilo. Foco em completar a distância.' },
    nivel === 'Iniciante' ? { n:'Caminha + corre', km:r(base*.8), d:'1 min correndo, 1 min caminhando, repita.' } : { n:'Intervalado', km:r(base*.8), d:'6x 400m forte, 1 min de trote entre os tiros.' },
    { n:'Regenerativo', km:r(base*.6), d:'Muito leve, só para soltar as pernas.' },
    { n:'Corrida leve', km:r(base*.9), d:'Ritmo confortável.' }
  ].slice(0, dias);
}
function xpTotal() {
  const s = calcStats(S.runs);
  return Math.round(s.km*10) + CONQ.filter((c) => c.ok(s)).reduce((a, c) => a + c.xp, 0) + Object.values(S.claimed).reduce((a, v) => a + v, 0);
}
function niceStep(value) {
  const raw = Math.max(value || 1, .01), power = Math.pow(10, Math.floor(Math.log10(raw))), unit = raw / power;
  return (unit <= 1 ? 1 : unit <= 2 ? 2 : unit <= 5 ? 5 : 10) * power;
}
const svgEsc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
function chartSvg(data, kind) {
  if (!data.length) return '<div class="chart-empty">Sem corridas neste período.</div>';
  const width = Math.max(360, data.length * 48 + 58), height = 220, left = 46, right = width - 14, top = 18, bottom = 166;
  const plotW = right - left, plotH = bottom - top, slot = plotW / data.length, x = (i) => left + slot * (i + .5), labelEvery = Math.max(1, Math.ceil(data.length / 10));
  const axis = [], labels = [];
  if (kind === 'distance') {
    const max = Math.max(...data.map((r) => Number(r.dist) || 0)), step = niceStep(max / 4), ceiling = step * 4;
    for (let i = 0; i <= 4; i++) {
      const v = ceiling * i / 4, y = bottom - plotH * i / 4;
      axis.push('<line class="chart-grid" x1="'+left+'" y1="'+y+'" x2="'+right+'" y2="'+y+'"/><text class="chart-axis" x="'+(left-8)+'" y="'+(y+3)+'" text-anchor="end">'+(step < 1 ? v.toFixed(1) : v.toFixed(0))+'</text>');
    }
    data.forEach((r, i) => {
      const v = Number(r.dist) || 0, h = Math.max(2, v / ceiling * plotH), bx = x(i) - Math.min(28, slot*.62)/2, by = bottom-h, bw = Math.min(28, slot*.62), title = svgEsc(r.l+' · '+v.toFixed(2)+' km');
      axis.push('<rect class="chart-bar" x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+h+'" rx="5"><title>'+title+'</title></rect>');
      if (slot >= 34) axis.push('<text class="chart-value" x="'+x(i)+'" y="'+Math.max(top+10,by-5)+'" text-anchor="middle">'+v.toFixed(1)+'</text>');
    });
  } else {
    const values = data.map((r) => Number(r.secs) / Number(r.dist)).filter(Number.isFinite), min = Math.min(...values), max = Math.max(...values), pad = Math.max(30,(max-min)*.2);
    let low = Math.floor((min-pad)/30)*30, high = Math.ceil((max+pad)/30)*30;
    if (high-low < 120) { const center = (high+low)/2; low = Math.floor((center-60)/30)*30; high = low+120; }
    const yOf = (v) => top + (high-v)/(high-low)*plotH;
    for (let i = 0; i <= 4; i++) {
      const v = high - (high-low)*i/4, y = top + plotH*i/4;
      axis.push('<line class="chart-grid" x1="'+left+'" y1="'+y+'" x2="'+right+'" y2="'+y+'"/><text class="chart-axis" x="'+(left-8)+'" y="'+(y+3)+'" text-anchor="end">'+fmtTime(v)+'</text>');
    }
    const points = data.map((r,i) => x(i)+','+yOf(Number(r.secs)/Number(r.dist))).join(' ');
    axis.push('<polyline class="chart-line" points="'+points+'"/>');
    data.forEach((r,i) => { const v=Number(r.secs)/Number(r.dist); axis.push('<circle class="chart-point" cx="'+x(i)+'" cy="'+yOf(v)+'" r="5"><title>'+svgEsc(r.l+' · '+fmtTime(v)+' /km')+'</title></circle>'); });
  }
  data.forEach((r,i) => { if (i % labelEvery === 0 || i === data.length-1) labels.push('<text class="chart-date" x="'+x(i)+'" y="190" text-anchor="middle">'+svgEsc(r.l)+'</text>'); });
  return '<div class="chart-scroll"><svg class="chart-svg" width="'+width+'" height="'+height+'" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+(kind === 'distance' ? 'Distância em quilômetros por corrida' : 'Pace médio por quilômetro nas corridas')+'">'+axis.join('')+labels.join('')+'</svg></div>';
}
function setChartRange(value) { S.chartRange = value === 'all' ? 'all' : Number(value); render(); }
function manualRun(r) { return !(r.route && r.route.length) && (r.source === 'manual' || !r.source); }
function runEditDate(ts) { const d = new Date(ts); return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear(); }
function runHistoryCard(r) {
  const gps = r.route && r.route.length > 1, editable = manualRun(r), editing = S.editRun === r.id && editable, menu = S.menuRun === r.id;
  const details = '<div class="flex run-summary"><div class="ibox">'+ic(gps ? 'pin' : 'trend',18)+'</div><div style="flex:1"><b>'+r.dist+' km</b><div class="mut" style="font-size:12px">'+r.l+' · '+fmtTime(r.secs)+'</div></div><b class="run-pace">'+fmtPace(r.secs/r.dist)+'</b><button class="run-menu-button" aria-label="Opções da corrida" onclick="event.stopPropagation();toggleRunMenu('+r.id+')">'+ic('more',20)+'</button></div>';
  const actions = menu ? '<div class="run-menu" onclick="event.stopPropagation()">'+(editable ? '<button onclick="event.stopPropagation();editRun('+r.id+')">'+ic('edit',17)+'Editar</button>' : '')+'<button class="delete-action" onclick="event.stopPropagation();deleteRun('+r.id+')">'+ic('trash',17)+'Apagar</button></div>' : '';
  const form = editing ? '<div class="run-edit" onclick="event.stopPropagation()"><label>Distância (km)<input id="edit-dist-'+r.id+'" inputmode="decimal" value="'+Number(r.dist).toFixed(2)+'"></label><label>Tempo<input id="edit-time-'+r.id+'" inputmode="decimal" value="'+fmtTime(r.secs)+'"></label><label>Data (DD/MM/AAAA)<input id="edit-date-'+r.id+'" value="'+runEditDate(r.id)+'"></label>'+(S.runEditErr ? '<p class="err">'+S.runEditErr+'</p>' : '')+'<div class="run-edit-buttons"><button class="btn" onclick="saveRunEdit('+r.id+')">Salvar</button><button class="btn alt" onclick="cancelRunEdit()">Cancelar</button></div></div>' : '';
  return '<div class="card run-card"'+(gps ? ' onclick="toggleRun('+r.id+')" style="cursor:pointer"' : '')+'>'+details+actions+form+(S.open === r.id && gps ? '<div id="hm" class="lmap" style="height:200px;margin:12px 0 0"></div>' : '')+'</div>';
}
const tile = (i, v, l) => '<div class="card tile"><div class="ibox">'+ic(i,18)+'</div><div class="big">'+v+'</div><div class="lbl" style="margin:2px 0 0">'+l+'</div></div>';
const field = (l, id, ph, mode) => '<div class="lbl">'+l+'</div><input id="'+id+'" placeholder="'+ph+'"'+(mode ? ' inputmode="'+mode+'"' : '')+' oninput="'+(id[0]==='k' ? 'calc()' : '')+'">';

let sim = null;
const V = {
  login() {
    const creating = S.authMode === 'up';
    return '<main class="auth-wrap"><div class="brand auth-brand"><div class="logo">'+ic('pulse',24)+'</div><div><b>RITMO</b><small>corrida inteligente</small></div></div><div class="card auth-card"><h1>'+(creating ? 'Criar conta' : 'Bem-vindo')+'</h1><p class="sub">'+(creating ? 'Crie sua conta para salvar suas corridas e acompanhar sua evolução.' : 'Entre para acessar seus treinos e suas corridas.')+'</p><div class="lbl">E-MAIL</div><input id="ce" type="email" autocomplete="email" placeholder="voce@email.com"><div class="lbl">SENHA</div><input id="cs" type="password" autocomplete="'+(creating ? 'new-password' : 'current-password')+'" placeholder="Mínimo de 6 caracteres">'+(S.err ? '<div class="err">'+S.err+'</div>' : '')+'<button class="btn" style="margin-top:14px" onclick="authDo(\''+(creating ? 'up' : 'in')+'\')" '+(S.authBusy ? 'disabled' : '')+'>'+(S.authBusy ? 'Aguarde...' : (creating ? 'Criar conta' : 'Entrar'))+'</button><button class="auth-switch" onclick="authMode(\''+(creating ? 'in' : 'up')+'\')">'+(creating ? 'Já tem conta? Entrar' : 'Não tem conta? Criar conta')+'</button></div><p class="auth-foot">Seus dados de corrida ficam associados à sua conta.</p></main>';
  },
  home() {
    const s=calcStats(S.runs), xp=xpTotal(), lvl=Math.floor(xp/100)+1, ult=S.runs[S.runs.length-1];
    return '<div class="brand"><div class="logo">'+ic('pulse',24)+'</div><div><b>RITMO</b><small>corrida inteligente</small></div><button class="back" style="margin:0 0 0 auto" onclick="go(\'conta\')" aria-label="Conta">'+ic('user',24)+'</button></div>'+
      '<div class="hero"><div class="l">SEU NÍVEL</div><div class="flex" style="justify-content:space-between;align-items:flex-end"><div class="n">'+lvl+'</div><div style="font-weight:700;margin-bottom:10px">'+xp+' XP</div></div><div class="hbar"><i style="width:'+(xp%100)+'%"></i></div><div style="font-size:12px;margin-top:8px;color:rgba(255,255,255,.75)">Faltam '+(100-xp%100)+' XP para o nível '+(lvl+1)+'</div></div>'+
      homeWorkoutCard()+'<div class="row">'+tile('pin',s.km.toFixed(1)+' km','TOTAL')+tile('trend',s.n,'CORRIDAS')+tile('zap',s.atual,s.atual===1?'DIA SEGUIDO':'DIAS SEGUIDOS')+'</div>'+
      (ult ? '<div class="card"><div class="lbl">ÚLTIMA CORRIDA</div><div class="big">'+ult.dist+' km · '+fmtPace(ult.secs/ult.dist)+'</div><div class="mut" style="font-size:13px;margin-top:2px">'+ult.l+' · '+fmtTime(ult.secs)+'</div></div>' : '')+
      '<div class="row" style="margin-top:14px"><button class="card flex" style="margin:0;color:inherit;font:700 13px Sora,sans-serif;cursor:pointer;text-align:left" onclick="go(\'calc\')"><span class="ibox">'+ic('calc',18)+'</span>Calculadora</button><button class="card flex" style="margin:0;color:inherit;font:700 13px Sora,sans-serif;cursor:pointer;text-align:left" onclick="go(\'comida\')"><span class="ibox">'+ic('cup',18)+'</span>Alimentação</button></div>';
  },  corridas() {
    const today = new Date(); today.setHours(0,0,0,0);
    const range = S.chartRange || 7;
    const filtered = range === 'all' ? S.runs : range === 7 ? S.runs.slice(-7) : S.runs.filter((r) => r.id >= today.getTime() - range*86400000);
    const data = filtered.slice(-40), totalKm = filtered.reduce((a,r) => a + Number(r.dist || 0),0), totalSecs = filtered.reduce((a,r) => a + Number(r.secs || 0),0);
    const avgKm = filtered.length ? totalKm/filtered.length : 0, avgPace = totalKm ? totalSecs/totalKm : 0;
    const bestPace = filtered.length ? Math.min(...filtered.map((r) => r.secs/r.dist)) : 0;
    const period = range === 7 ? 'Últimas 7 corridas' : range === 'all' ? 'Todo o histórico' : 'Últimos '+range+' dias';
    const metric = (label,value) => '<div class="chart-metric"><span>'+label+'</span><b>'+value+'</b></div>';
    const ranges = [[7,'7 corridas'],[30,'30 dias'],[90,'90 dias'],['all','Tudo']];
    return '<h1>Corridas</h1><div class="card">'+field('DISTÂNCIA (KM)','cd','ex: 5','decimal')+field('TEMPO (MM:SS OU H:MM:SS)','ct','ex: 28:30')+field('DATA (DD/MM/AAAA, VAZIO = HOJE)','cdt','ex: 22/11/2026')+
      '<button class="btn" onclick="addRun()">'+ic('plus',18)+'Salvar corrida</button>'+
      '<label class="btn alt" style="margin-top:12px">'+ic('upload',18)+'Importar arquivo GPX<input type="file" accept=".gpx,application/gpx+xml" style="display:none" onchange="importGpx(this)"></label>'+(S.err ? '<div class="err">'+S.err+'</div>' : '')+'</div>'+
      pendingRunLinkCard()+'<section class="progress-section"><h2>Seu progresso</h2><p class="sub">Veja sua distância e seu ritmo ao longo do tempo.</p><div class="chips chart-filters">'+ranges.map(([v,l]) => '<button class="chip '+(String(range)===String(v)?'on':'')+'" onclick="setChartRange(\''+v+'\')">'+l+'</button>').join('')+'</div>'+
      (filtered.length ? '<p class="chart-period">'+period+' · '+filtered.length+' '+(filtered.length===1?'corrida':'corridas')+'</p><div class="chart-summary">'+metric('DISTÂNCIA TOTAL',totalKm.toFixed(1)+' km')+metric('MÉDIA POR CORRIDA',avgKm.toFixed(1)+' km')+metric('PACE MÉDIO',fmtPace(avgPace))+metric('MELHOR PACE',fmtPace(bestPace))+'</div>'+
      '<div class="card chart-card"><h3>Distância por corrida</h3><p class="chart-help">Cada barra representa uma corrida. Barra mais alta = mais quilômetros.</p>'+chartSvg(data,'distance')+'</div>'+
      '<div class="card chart-card"><h3>Ritmo (pace)</h3><p class="chart-help">Pace é o tempo por quilômetro. Ponto mais baixo = mais rápido.</p>'+chartSvg(data,'pace')+'</div>'+
      (filtered.length>data.length?'<p class="chart-note">Os gráficos mostram as 40 corridas mais recentes deste período; o resumo considera todas.</p>':'') : '<div class="card chart-empty">Ainda não há corridas neste período. Registre uma corrida para ver sua evolução.</div>')+
      '</section>'+
      (S.runs.length ? '<h2>Histórico completo</h2>' + [...S.runs].reverse().map(runHistoryCard).join('') : '');
  },  correr() {
    if (!G) {
      const live = localStorage.getItem('r2_live');
      return '<h1>Correr</h1><div id="map" class="lmap"></div><p class="note" id="preview-fx" style="text-align:center;margin:-4px 0 12px">Buscando precisão do GPS...</p>' + (live ? '<div class="card"><h2>Corrida interrompida</h2><p class="sub">O navegador fechou durante uma corrida. Quer retomar de onde parou?</p><button class="btn" onclick="gResume()">Retomar corrida</button><div style="height:10px"></div><button class="btn alt" onclick="gDiscard()">Descartar</button></div>' : '') +
        '<div class="card"><div class="ibox" style="width:52px;height:52px;border-radius:16px;margin-bottom:14px">'+ic('nav',26)+'</div><p class="sub">O app registra distância, tempo e pace pelo GPS e desenha seu trajeto no mapa. Mantenha o Ritmo aberto e a tela ligada durante a corrida.</p><button class="btn" onclick="gStart()">'+ic('play',18)+'Iniciar corrida</button>'+(S.err ? '<div class="err">'+S.err+'</div>' : '')+'</div>';
    }
    const pace = G.dist > 0.02 ? gEl()/G.dist : null;
    return '<h1>Correr</h1><div id="map" class="lmap"></div>' +
      '<div class="card" style="text-align:center"><div class="lbl">TEMPO</div><div id="tm" style="font-size:54px;font-weight:800;letter-spacing:-1px">'+fmtTime(gEl())+'</div></div>' +
      '<div class="row">'+tile('pin','<span id="ds">'+G.dist.toFixed(2)+'</span> km','DISTÂNCIA')+tile('clock','<span id="pc">'+(pace ? fmtTime(pace) : '--:--')+'</span>','PACE /KM')+'</div>' +
      '<p class="note" id="fx" style="text-align:center;margin:0 0 14px">'+G.fix+'</p>' +
      '<div class="row"><button class="btn alt" onclick="gPause()">'+ic(G.st === 'run' ? 'pause' : 'play',18)+(G.st === 'run' ? 'Pausar' : 'Continuar')+'</button><button class="btn" onclick="gFinish()">'+ic('stop',18)+'Finalizar</button></div>';
  },
  metas() {
    const s = calcStats(S.runs), des = desafios(), feitas = CONQ.filter((c) => c.ok(s)).length;
    return '<h1>Metas</h1><div class="hero flex"><div class="ibox" style="width:54px;height:54px;border-radius:18px;background:rgba(255,255,255,.18);color:#fff">'+ic('zap',28)+'</div><div><div style="font-size:26px;font-weight:800">'+s.atual+' '+(s.atual === 1 ? 'dia' : 'dias')+'</div><div style="font-size:12px;color:rgba(255,255,255,.75)">de sequência · recorde '+s.longest+'</div></div></div>' +
      '<h2>Desafios da semana</h2><p class="sub" style="margin-top:-6px">Reiniciam toda segunda-feira. Resgate para ganhar XP.</p>' +
      des.map((d, i) => { const ok = d.v >= d.meta, got = S.claimed[d.key] !== undefined;
        return '<div class="card"><div class="flex"><div class="ibox">'+ic(d.i,18)+'</div><b style="flex:1;font-size:14px">'+d.n+'</b></div><div class="bar"><i style="width:'+Math.min(1,d.v/d.meta)*100+'%"></i></div><div class="mut" style="font-size:12px;margin:8px 0 '+(ok ? 12 : 0)+'px">'+arred(d.v)+' / '+d.meta+' '+d.u+' · +'+d.xp+' XP</div>' +
          (ok && !got ? '<button class="btn" onclick="resgatar('+i+')">'+ic('star',18)+'Resgatar +'+d.xp+' XP</button>' : '') + (got ? '<div class="flex" style="gap:6px;color:var(--acc);font-weight:700;font-size:14px">'+ic('check',18)+'Resgatado</div>' : '') + '</div>'; }).join('') +
      '<h2>Conquistas ('+feitas+'/'+CONQ.length+')</h2>' +
      CONQ.map((c) => { const ok = c.ok(s); return '<div class="card flex" style="opacity:'+(ok ? 1 : .5)+'"><div class="medal '+(ok ? '' : 'lk')+'">'+ic(ok ? c.i : 'lock', ok ? 22 : 18)+'</div><div style="flex:1"><b style="font-size:14px">'+c.n+'</b><div class="mut" style="font-size:12px;margin-top:2px">'+c.d+'</div></div><b style="color:'+(ok ? 'var(--acc2)' : 'var(--mut)')+'">+'+c.xp+'</b></div>'; }).join('');
  },
  calc() {
    return '<button class="back" onclick="go(\'home\')">'+ic('back',20)+'Início</button><h1>Calculadora</h1><p class="sub">Preencha 2 campos e o app calcula o 3º.</p><div class="card">' +
      field('DISTÂNCIA (KM)','kd','ex: 5','decimal')+field('TEMPO (MM:SS OU H:MM:SS)','kt','ex: 28:30')+field('PACE (MM:SS POR KM)','kp','ex: 5:42')+'<button class="btn alt" onclick="limpar()">'+ic('refresh',18)+'Limpar</button></div><div id="res"></div>';
  },
  treino() {
    const p=S.perfil, T0=S.userPlan||S.treino, weeks=getPlanWeeks();
    const chips=(k,o)=>'<div class="chips">'+o.map((x)=>'<button class="chip '+(String(p[k])===String(x)?'on':'')+'" onclick="setP(\''+k+'\',\''+x+'\')">'+x+'</button>').join('')+'</div>';
    return '<h1>Meu treino</h1><button class="btn" style="margin:8px 0 14px" onclick="openPlanEditor()">'+ic('plus',18)+'Criar plano</button>'+(T0?'<p class="sub">Plano personalizado'+(T0.gerado?' · gerado em '+T0.gerado:'')+'</p>':'<p class="sub">'+(S.plano?'Seu plano básico, organizado por semana.':'Ainda não há plano personalizado. Enquanto isso, você pode gerar um plano básico.')+'</p>')+
      (weeks.length?weeks.map((w,i)=>weekCard(w,i,T0&&T0.inicio)).join(''):'')+
      (T0&&T0.dicas&&T0.dicas.length?'<div class="card"><h2>Dicas</h2>'+T0.dicas.map((x)=>'<div class="mut" style="margin-bottom:8px;font-size:14px;line-height:1.5">• '+x+'</div>').join('')+'</div>':'')+
      '<div class="card"><h2>Seu perfil</h2><div class="lbl">NÍVEL</div>'+chips('nivel',['Iniciante','Intermediário','Avançado'])+'<div class="lbl">OBJETIVO</div>'+chips('objetivo',['Saúde','5K','10K','21K'])+'<div class="lbl">DIAS POR SEMANA</div>'+chips('dias',[2,3,4,5])+
      (T0||S.plano?'':'<button class="btn" onclick="gerar()">'+ic('star',18)+'Gerar plano básico</button>')+'<p class="note">O nível ajusta as metas dos desafios semanais.</p></div>';
  },  planEditor() {
    const b=S.planBuild||{weeks:4,sessions:3,rows:[]}, inputs=b.rows.length?b.rows.map((r,i)=>'<div class="card plan-session-edit"><div class="lbl">SEMANA '+(r.week||Math.floor(i/b.sessions)+1)+' · TREINO '+(i+1)+'</div><div class="row"><label class="plan-field">Dia<input id="pe-day-'+i+'" value="'+(r.dia||'')+'" placeholder="Ex.: Seg"></label><label class="plan-field">Nome<input id="pe-type-'+i+'" value="'+(r.tipo||'Corrida leve')+'" placeholder="Corrida leve"></label></div><div class="row"><label class="plan-field">Distância (km)<input id="pe-km-'+i+'" inputmode="decimal" value="'+(r.km||'')+'" placeholder="4"></label><label class="plan-field">Tempo alvo<input id="pe-time-'+i+'" value="'+(r.tempoAlvo||'')+'" placeholder="MM:SS"></label></div><label class="plan-field">Pace alvo (MM:SS / km)<input id="pe-pace-'+i+'" value="'+(r.paceAlvo||'')+'" placeholder="06:00"></label><label class="plan-field">Aquecimento<textarea id="pe-warm-'+i+'" placeholder="Ex.: 5 min caminhada">'+(r.aquecimento||'')+'</textarea></label><label class="plan-field">O que fazer no treino<textarea id="pe-desc-'+i+'" placeholder="Descreva o treino">'+(r.descricao||'')+'</textarea></label><label class="plan-field">Desaquecimento<textarea id="pe-cool-'+i+'" placeholder="Ex.: 5 min caminhando">'+(r.desaquecimento||'')+'</textarea></label></div>').join(''):'';
    return '<button class="back" onclick="closePlanEditor()">'+ic('back',20)+'Meu treino</button><h1>Criar plano</h1><p class="sub">Importe uma planilha Excel ou monte o plano por semanas. Ao salvar, ele substitui o plano ativo.</p><div class="card"><h2>Importar do Excel</h2><p class="note">Use a primeira linha como cabeçalho: Semana, Dia, Treino, Distância (km), Tempo-alvo, Pace, Aquecimento, Descrição, Desaquecimento, Antes, Depois. Uma linha por treino.</p><label class="btn alt plan-upload">'+ic('upload',18)+'Escolher arquivo .xlsx<input type="file" accept=".xlsx,.xls" onchange="importPlanFile(this)"></label>'+(S.planImportErr?'<p class="err">'+S.planImportErr+'</p>':'')+'<button class="home-link" onclick="downloadPlanTemplate()">Baixar modelo Excel</button></div><div class="card"><h2>Montar manualmente</h2><div class="row"><label class="plan-field">Semanas<input id="plan-weeks" type="number" min="1" max="24" value="'+b.weeks+'"></label><label class="plan-field">Treinos por semana<input id="plan-sessions" type="number" min="1" max="7" value="'+b.sessions+'"></label></div><button class="btn alt" onclick="buildPlanRows()">Montar treinos</button></div>'+inputs+(inputs?'<button class="btn" onclick="saveBuiltPlan()">Salvar e substituir plano</button>':'');
  },
  sessionDetail() {
    const item=activeWorkoutData(); if(!item) return '<div class="card">Treino não encontrado.</div>';
    const linked=linkedRunForSession(item.key), done=!!S.completed[item.key];
    const pre=Array.isArray(item.day.pre)&&item.day.pre.length ? '<div class="card workout-section"><h2>Antes do treino</h2>'+item.day.pre.map((x)=>'<p>• '+x+'</p>').join('')+'</div>' : '';
    const post=Array.isArray(item.day.pos)&&item.day.pos.length ? '<div class="card workout-section"><h2>Depois do treino</h2>'+item.day.pos.map((x)=>'<p>• '+x+'</p>').join('')+'</div>' : '';
    return '<button class="back" onclick="closeWorkout()">'+ic('back',20)+'Meu treino</button><div class="workout-detail-head"><div class="lbl">SEMANA '+(item.weekIndex+1)+' · '+item.dayLabel+'</div><h1>'+item.type+'</h1><div class="workout-detail-meta">'+(Number(item.day.km)>0?String(item.day.km).replace('.',',')+' km planejados':'Treino planejado')+(done?' · Concluído':'')+'</div></div>'+
(item.day.tempoAlvo||item.day.paceAlvo?'<p class="workout-target">Meta: '+(item.day.tempoAlvo?'tempo '+item.day.tempoAlvo:'')+(item.day.tempoAlvo&&item.day.paceAlvo?' · ':'')+(item.day.paceAlvo?'pace '+item.day.paceAlvo+'/km':'')+'</p>':'')+
      '<div class="card workout-section"><div class="workout-section-label">AQUECIMENTO</div><p>'+sessionWarmup(item.day)+'</p></div>'+
      '<div class="card workout-section"><div class="workout-section-label">TREINO PRINCIPAL</div><p>'+sessionMain(item.day)+'</p></div>'+
      '<div class="card workout-section"><div class="workout-section-label">DESAQUECIMENTO</div><p>'+sessionCooldown(item.day)+'</p></div>'+pre+post+
      (linked?'<div class="card workout-recorded"><b>Treino registrado</b><p>'+linked.dist+' km · '+fmtTime(linked.secs)+'</p><button class="btn alt" onclick="go(\'corridas\')">Ver corrida</button></div>':'<button class="btn" onclick="openSessionLog()">'+ic('check',18)+(done?'Registrar resultado':'Concluir treino')+'</button>');
  },
  sessionLog() {
    const item=activeWorkoutData(); if(!item) return '<div class="card">Treino não encontrado.</div>';
    return '<button class="back" onclick="backToSessionDetails()">'+ic('back',20)+'Detalhes do treino</button><h1>Registrar treino</h1><p class="sub">'+item.type+(Number(item.day.km)>0?' · '+String(item.day.km).replace('.',',')+' km planejados':'')+'</p><div class="card"><label class="session-input-label">Distância realizada (km)<input id="session-km" type="text" inputmode="decimal" placeholder="Ex.: 4,0"></label><label class="session-input-label">Tempo total<input id="session-time" type="text" inputmode="decimal" placeholder="MM:SS ou H:MM:SS"></label>'+(S.sessionLogErr?'<div class="err">'+S.sessionLogErr+'</div>':'')+'<button class="btn" style="margin-top:8px" onclick="finishSessionLog()">'+ic('check',18)+'Salvar e concluir</button></div>';
  },
  sessionSuccess() {
    const r=S.runs.find((x)=>String(x.id)===String(S.sessionSaved && S.sessionSaved.runId));
    return '<div class="session-success"><div class="session-success-icon">'+ic('check',30)+'</div><p class="lbl">TREINO REGISTRADO</p><h1>Boa, treino concluído!</h1><p class="sub">'+(r?r.dist+' km · '+fmtTime(r.secs)+' · '+fmtPace(r.secs/r.dist):'Seu progresso semanal foi atualizado.')+'</p><button class="btn" onclick="go(\'treino\')">Voltar ao plano</button><button class="home-link" onclick="go(\'corridas\')">Ver histórico</button></div>';
  },  comida() {
    const bl = (t, a) => '<div class="card"><h2>'+t+'</h2>'+a.map((x) => '<div style="margin-bottom:12px"><b style="font-size:14px">'+x[0]+'</b><div class="mut" style="font-size:13px">'+x[1]+'</div></div>').join('')+'</div>';
    const li = (t, a) => '<div class="lbl" style="margin-top:12px">'+t+'</div>'+(a || []).map((x) => '<div style="margin-bottom:4px;font-size:14px">• '+x+'</div>').join('');
    return '<button class="back" onclick="go(\'home\')">'+ic('back',20)+'Início</button><h1>Alimentação</h1>' +
      (S.treino ? semChips() + S.treino.semanas[semAtual()].dias.map((x) => '<div class="card"><h2>'+x.dia+' · '+x.tipo+'</h2>'+li('ANTES', x.pre)+li('DEPOIS', x.pos)+'</div>').join('') : bl('Pré-corrida',NUTRI.pre)+bl('Pós-corrida',NUTRI.pos));
  },
  conta() {
    const bk = '<button class="back" onclick="go(\'home\')">'+ic('back',20)+'Início</button><h1>Conta</h1>';
    if (!window.FB || !FB.configured) return bk + '<div class="card"><p class="sub">A sincronização está desativada. Preencha a configuração do Firebase no arquivo firebase.js para guardar seus dados na nuvem e usá-los em mais de um aparelho.</p></div>';
    if (FB.user) return bk + '<div class="card"><div class="lbl">CONECTADO COMO</div><div class="big" style="font-size:16px;word-break:break-all">'+FB.user.email+'</div><p class="note">'+(S.cloud === 'ok' ? 'Dados sincronizados.' : (S.cloud || 'Pronto para sincronizar.'))+'</p><button class="btn" onclick="cloudPush()">'+ic('refresh',18)+'Sincronizar agora</button><div style="height:10px"></div><button class="btn alt" onclick="FB.signOut()">Sair</button></div>';
    return bk + '<div class="card"><p class="sub">Entre para guardar corridas, metas e plano na nuvem.</p><div class="lbl">E-MAIL</div><input id="ce" type="email" autocomplete="email" placeholder="voce@email.com"><div class="lbl">SENHA</div><input id="cs" type="password" autocomplete="current-password" placeholder="mínimo 6 caracteres"><button class="btn" onclick="authDo(\'in\')">Entrar</button><div style="height:10px"></div><button class="btn alt" onclick="authDo(\'up\')">Criar conta</button>'+(S.err ? '<div class="err">'+S.err+'</div>' : '')+'</div>';
  }
};
function render0() {
  const fb = window.FB;
  if (!fb || !fb.ready || !fb.user) {
    $('#tabs').style.display = 'none';
    if (window.firebaseLoadFailed) $('#app').innerHTML = '<main class="auth-wrap"><div class="brand auth-brand"><div class="logo">'+ic('pulse',24)+'</div><div><b>RITMO</b><small>corrida inteligente</small></div></div><div class="card"><h1>Não foi possível conectar</h1><p class="sub">Confira sua internet e tente abrir o app novamente.</p></div></main>';
    else if (!fb || !fb.ready) $('#app').innerHTML = '<main class="auth-wrap"><div class="brand auth-brand"><div class="logo">'+ic('pulse',24)+'</div><div><b>RITMO</b><small>corrida inteligente</small></div></div><div class="card"><p class="sub">Conectando à sua conta...</p></div></main>';
    else $('#app').innerHTML = V.login();
    return;
  }
  if(S.sessionSaved){ $('#tabs').style.display='none'; $('#app').innerHTML=V.sessionSuccess(); return; }
  if(S.activeWorkout){ $('#tabs').style.display='none'; $('#app').innerHTML=S.sessionView==='log'?V.sessionLog():V.sessionDetail(); return; }
  if(S.planEditor){ $('#tabs').style.display='none'; $('#app').innerHTML=V.planEditor(); return; }
  $('#tabs').style.display = '';
  $('#app').innerHTML = V[S.tab]();
  const T = (k, i) => '<button class="t '+(S.tab === k ? 'on' : '')+'" onclick="go(\''+k+'\')" aria-label="'+k+'">'+ic(i,24)+'<i></i></button>';
  $('#tabs').innerHTML = T('home','home')+T('corridas','chart')+'<button class="fab" onclick="go(\'correr\')" aria-label="Correr">'+ic('play',26)+'</button>'+T('metas','award')+T('treino','cal');
}
function render() { render0(); afterRender(); }
function go(t) { if(t==='correr') previewRequested=false; S.tab=t; S.err=''; S.activeWorkout=null; S.sessionSaved=null; S.planEditor=false; render(); window.scrollTo(0,0); }
function calc() {
  const d = num($('#kd').value), t = toSecs($('#kt').value), p = toSecs($('#kp').value); let r = null;
  if (d && t && !p) r = ['PACE', fmtPace(t/d)]; else if (d && p && !t) r = ['TEMPO', fmtTime(p*d)]; else if (t && p && !d) r = ['DISTÂNCIA', (t/p).toFixed(2)+' km']; else if (d && t && p) r = ['ATENÇÃO', 'Deixe um campo vazio'];
  $('#res').innerHTML = r ? '<div class="hero"><div class="l">'+r[0]+'</div><div style="font-size:30px;font-weight:800">'+r[1]+'</div></div>' : '';
}
function limpar() { ['#kd','#kt','#kp'].forEach((s) => $(s).value = ''); $('#res').innerHTML = ''; }
function addRun() {
  const dist = num($('#cd').value), secs = toSecs($('#ct').value);
  if (!dist || !secs) { S.err = 'Preencha distância e tempo.'; return render(); }
  const dt = parseData($('#cdt').value);
  if (!dt) { S.err = 'Data inválida ou no futuro. Use dd/mm/aaaa.'; return render(); }
  S.err = ''; S.runs.push({ id: dt.ts, dist, secs, l: dt.l, source:'manual' }); S.runs.sort((a, b) => a.id - b.id); save(); render();
}
function toggleRunMenu(id) { S.menuRun = S.menuRun === id ? null : id; S.editRun = null; S.runEditErr = ''; render(); }
function editRun(id) { const r = S.runs.find((x) => x.id === id); if (!r || !manualRun(r)) return; S.editRun = id; S.menuRun = null; S.runEditErr = ''; render(); }
function cancelRunEdit() { S.editRun = null; S.runEditErr = ''; render(); }
function saveRunEdit(id) {
  const r = S.runs.find((x) => x.id === id); if (!r || !manualRun(r)) return;
  const dist = num($('#edit-dist-'+id).value), secs = toSecs($('#edit-time-'+id).value), dt = parseData($('#edit-date-'+id).value);
  if (!dist || dist <= 0 || !secs || secs <= 0) { S.runEditErr = 'Confira a distância e o tempo.'; return render(); }
  if (!dt) { S.runEditErr = 'Data inválida ou no futuro. Use DD/MM/AAAA.'; return render(); }
  let newId = dkey(dt.ts) === dkey(id) ? id : dt.ts;
  while (S.runs.some((x) => x.id === newId && x.id !== id)) newId++;
  S.runs = S.runs.filter((x) => x.id !== id); S.runs.push({ ...r, id:newId, dist, secs, l:dt.l, source:'manual' }); S.runs.sort((x,y) => x.id-y.id);
  if (newId === id) S.dirtyRuns = [...new Set([...S.dirtyRuns,id])]; else { if(S.runLinks[String(id)]) { S.runLinks[String(newId)]=S.runLinks[String(id)]; delete S.runLinks[String(id)]; } if (S.synced.includes(id)) S.deletedRuns = [...new Set([...S.deletedRuns,id])]; }
  S.editRun = null; S.menuRun = null; S.runEditErr = ''; save(); render();
}
function deleteRun(id) {
  const r = S.runs.find((x) => x.id === id); if (!r || !confirm('Apagar esta corrida do histórico?')) return;
  S.runs = S.runs.filter((x) => x.id !== id); delete S.runLinks[String(id)]; if (S.synced.includes(id)) S.deletedRuns = [...new Set([...S.deletedRuns,id])]; if (S.open === id) S.open = null; S.menuRun = null; S.editRun = null; save(); render();
}
function resgatar(i) { const d = desafios()[i]; S.claimed[d.key] = d.xp; save(); render(); }
function setP(k, v) { S.perfil[k] = k === 'dias' ? Number(v) : v; save(); render(); }
function gerar() { S.plano = gerarPlano(S.perfil); save(); render(); }

// ---------- utilidades ----------
const hav = (a, b) => { const R = 6371, rad = (x) => x*Math.PI/180, dLa = rad(b[0]-a[0]), dLo = rad(b[1]-a[1]); const h = Math.sin(dLa/2)**2 + Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(dLo/2)**2; return 2*R*Math.asin(Math.sqrt(h)); };
const decim = (a, max = 1500) => { if (a.length <= max) return a; const st = a.length/max, o = []; for (let i = 0; i < max; i++) o.push(a[Math.floor(i*st)]); o.push(a[a.length-1]); return o; };
function planHtml(w) {
  return (w.foco ? '<div class="card"><div class="lbl">FOCO DA SEMANA</div><div style="line-height:1.6;font-size:14px">'+w.foco+'</div></div>' : '') +
    (w.resumo ? '<div class="card"><div style="line-height:1.6;font-size:14px">'+w.resumo+'</div></div>' : '') +
    w.dias.map((x, i) => '<div class="card"><div class="flex" style="margin-bottom:8px"><div class="ibox" style="font-weight:800">'+(i+1)+'</div><div><div class="lbl" style="margin:0">'+String(x.dia || 'Dia '+(i+1)).toUpperCase()+'</div><div class="big">'+x.tipo+' · '+x.km+' km</div></div></div><div class="mut" style="font-size:14px;line-height:1.5">'+x.descricao+'</div></div>').join('');
}
// plano com várias semanas (treino.json: "semanas") ou uma só ("semana", formato antigo)
function normTreino(j) {
  if (!j) return null;
  if (j.semanas) return j;
  if (j.semana) return { ...j, semanas: [{ titulo: 'Semana', dias: j.semana, resumo: j.resumo }] };
  return null;
}
function semAtual() {
  const t = S.treino; if (!t) return 0;
  if (S.sem != null) return S.sem;
  if (!t.inicio) return 0;
  const n = Math.floor((Date.now() - Date.parse(t.inicio + 'T00:00:00')) / (7*86400000));
  return Math.max(0, Math.min(t.semanas.length-1, n));
}
function getPlanWeeks() {
  if (S.userPlan && Array.isArray(S.userPlan.semanas)) return S.userPlan.semanas;
  if (S.treino && Array.isArray(S.treino.semanas)) return S.treino.semanas;
  if (!S.plano) return [];
  const days=Array.isArray(S.plano) ? S.plano : (Array.isArray(S.plano.semana) ? S.plano.semana : []);
  return days.length ? [{ titulo:'Plano básico', foco:Array.isArray(S.plano) ? '' : S.plano.resumo, dias:days.map((x,i)=>({dia:x.dia||'Treino '+(i+1),tipo:x.tipo||x.n||'Corrida',km:x.km,descricao:x.descricao||x.d,pre:x.pre,pos:x.pos})) }] : [];
}
function planIdentity() {
  if (S.userPlan) return 'user:'+String(S.userPlan.id||'');
  if (S.treino) return 'custom:'+String(S.treino.inicio||'')+':'+String(S.treino.gerado||'')+':'+String(S.treino.resumo||'');
  return S.plano ? 'basic:'+JSON.stringify(S.plano) : 'none';
}
function sessionKey(weekIndex,sessionIndex) {
  const w=getPlanWeeks()[weekIndex], d=w&&Array.isArray(w.dias)?w.dias[sessionIndex]:null;
  if(!w||!d) return '';
  return [planIdentity(),weekIndex,w.titulo||'',sessionIndex,d.dia||'',d.tipo||d.n||'',d.km||''].join('|');
}
function getPlanSessions() {
  return getPlanWeeks().flatMap((w,wi)=>(Array.isArray(w.dias)?w.dias:[]).map((d,si)=>({key:sessionKey(wi,si),weekIndex:wi,sessionIndex:si,weekTitle:w.titulo||('Semana '+(wi+1)),dia:d.dia||('Treino '+(si+1)),type:d.tipo||d.n||'Treino',km:Number(d.km)||0})));
}
function activeWorkoutData() {
  if(!S.activeWorkout) return null;
  const {weekIndex,sessionIndex}=S.activeWorkout, w=getPlanWeeks()[weekIndex], day=w&&Array.isArray(w.dias)?w.dias[sessionIndex]:null;
  if(!w||!day) return null;
  return {weekIndex,sessionIndex,week:w,day,key:sessionKey(weekIndex,sessionIndex),type:day.tipo||day.n||'Treino',dayLabel:day.dia||('Treino '+(sessionIndex+1))};
}
function linkedRunForSession(key) {
  const id=Object.keys(S.runLinks).find((runId)=>S.runLinks[runId]===key);
  return id ? S.runs.find((r)=>String(r.id)===String(id)) || null : null;
}
function workoutWarmup(day) {
  if(Array.isArray(day.aquecimento)) return day.aquecimento.join(' ');
  if(day.aquecimento) return String(day.aquecimento);
  const desc=String(day.descricao||''), parts=[];
  const start=desc.match(/Comece com \d+\s*min de caminhada[^.]*\.?/i);
  if(start) { const text=start[0], split=text.match(/^(.*?)(?:\s+e termine com .*)?\.?$/i); parts.push(split&&split[1] ? split[1].replace(/\.$/,'')+'.' : text); }
  const explicit=desc.match(/Aqueça\s+[^.]+\.?/i) || desc.match(/\d+(?:[,.]\d+)?\s*km leve de aquecimento/i);
  if(explicit) parts.push(explicit[0].replace(/\.$/,'')+'.');
  return parts.length ? [...new Set(parts)].join(' ') : 'O plano não detalha este aquecimento. Comece com alguns minutos de caminhada leve ou trote confortável e aumente o ritmo aos poucos.';
}
function workoutCooldown(day) {
  if(Array.isArray(day.desaquecimento)) return day.desaquecimento.join(' ');
  if(day.desaquecimento) return String(day.desaquecimento);
  const desc=String(day.descricao||''), finish=desc.match(/termine com ([^.]+)/i) || desc.match(/\d+(?:[,.]\d+)?\s*km leve para desacelerar/i);
  return finish ? finish[0].replace(/^termine com /i,'').replace(/\.$/,'')+'.' : 'Finalize desacelerando e caminhe alguns minutos se isso for confortável.';
}
function workoutMain(day) {
  let text=String(day.descricao||'');
  text=text.replace(/Comece com \d+\s*min de caminhada[^.]*\.?/ig,' ')
    .replace(/Aqueça\s+[^.]+\.?/ig,' ')
    .replace(/\d+(?:[,.]\d+)?\s*km leve de aquecimento/ig,' ')
    .replace(/\d+(?:[,.]\d+)?\s*km leve para desacelerar\.?/ig,' ')
    .replace(/\s+/g,' ').replace(/^\s*[,;]+\s*/,'').trim();
  return text || 'Siga a distância e o tipo de esforço indicados no plano.';
}
function openPlanEditor() { S.planEditor=true; S.planBuild={weeks:4,sessions:3,rows:[]}; S.planImportErr=''; render(); window.scrollTo(0,0); }
function closePlanEditor() { S.planEditor=false; S.planImportErr=''; render(); }
function buildPlanRows() {
  const weeks=Math.max(1,Math.min(24,Number($('#plan-weeks').value)||1)), sessions=Math.max(1,Math.min(7,Number($('#plan-sessions').value)||1));
  S.planBuild={weeks,sessions,rows:Array.from({length:weeks*sessions},(_,i)=>({week:Math.floor(i/sessions)+1,dia:'Treino '+(i%sessions+1),tipo:'Corrida leve'}))}; render();
}
function planFromRows(rows,title) {
  const grouped=new Map();
  rows.forEach((r)=>{const n=Math.max(1,Number(r.week)||1); if(!grouped.has(n)) grouped.set(n,[]); const split=(v)=>String(v||'').split(/[\n;]+/).map((x)=>x.trim()).filter(Boolean);
    grouped.get(n).push({dia:String(r.day||'Treino '+(grouped.get(n).length+1)),tipo:String(r.type||'Corrida'),km:Number(String(r.km||'').replace(',','.'))||0,tempoAlvo:String(r.time||''),paceAlvo:String(r.pace||''),aquecimento:String(r.warm||''),descricao:String(r.description||''),desaquecimento:String(r.cool||''),pre:split(r.before),pos:split(r.after)});});
  const semanas=[...grouped.entries()].sort((a,b)=>a[0]-b[0]).map(([n,dias])=>({titulo:'Semana '+n,dias}));
  if(!semanas.length) throw new Error('A planilha não contém treinos.');
  return {id:'plan-'+Date.now(),titulo:title||'Meu plano',gerado:new Date().toLocaleDateString('pt-BR'),inicio:new Date().toISOString().slice(0,10),semanas};
}
function saveNewPlan(plan) {
  if((S.userPlan||S.treino||S.plano)&&!confirm('Salvar este plano vai substituir o plano ativo. Quer continuar?')) return;
  S.userPlan=plan; S.plano=null; S.completed={}; S.openWeeks=[0]; S.planEditor=false; S.planImportErr=''; S.activeWorkout=null; S.sessionSaved=null; S.tab='treino'; save(); render(); window.scrollTo(0,0);
}
function saveBuiltPlan() {
  const b=S.planBuild; if(!b||!b.rows.length)return;
  const rows=b.rows.map((r,i)=>({week:r.week,day:$('#pe-day-'+i).value,type:$('#pe-type-'+i).value,km:$('#pe-km-'+i).value,time:$('#pe-time-'+i).value,pace:$('#pe-pace-'+i).value,warm:$('#pe-warm-'+i).value,description:$('#pe-desc-'+i).value,cool:$('#pe-cool-'+i).value}));
  if(rows.some((r)=>!r.type.trim())) { S.planImportErr='Dê um nome para cada treino.'; return render(); }
  if(rows.some((r)=>!(num(r.km)>0))) { S.planImportErr='Informe a distância planejada de cada treino.'; return render(); }
  try{saveNewPlan(planFromRows(rows,'Meu plano'));}catch(e){S.planImportErr=e.message;render();}
}
async function downloadPlanTemplate() {
  try { await ensureXlsx(); const rows=[['Semana','Dia','Treino','Distância (km)','Tempo-alvo','Pace','Aquecimento','Descrição','Desaquecimento','Antes','Depois'],[1,'Seg','Corrida leve',4,'28:00','07:00','5 min caminhando','Corra em ritmo confortável','5 min caminhando','','']]; const ws=XLSX.utils.aoa_to_sheet(rows), wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Plano'); XLSX.writeFile(wb,'modelo-plano-ritmo.xlsx'); }
  catch(e){S.planImportErr=e.message;render();}
}function ensureXlsx() {
  if(window.XLSX)return Promise.resolve();
  if(window.xlsxLoading)return window.xlsxLoading;
  window.xlsxLoading=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='lib/xlsx.full.min.js';s.onload=resolve;s.onerror=()=>reject(new Error('Não consegui carregar o leitor Excel. Confira a internet e tente novamente.'));document.head.appendChild(s);});
  return window.xlsxLoading;
}
async function importPlanFile(input) {
  const file=input.files&&input.files[0]; if(!file)return;
  try {
    await ensureXlsx(); const data=await file.arrayBuffer(), wb=XLSX.read(data,{type:'array'}), sheet=wb.Sheets[wb.SheetNames[0]], matrix=XLSX.utils.sheet_to_json(sheet,{header:1,defval:''});
    if(matrix.length<2)throw new Error('A planilha precisa ter cabeçalho e pelo menos uma linha de treino.');
    const norm=(x)=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    const headers=matrix[0].map(norm), find=(...names)=>headers.findIndex((h)=>names.includes(h));
    const col={week:find('semana','week'),day:find('dia','day'),type:find('treino','tipo','atividade','workout'),km:find('distancia km','distancia','km'),time:find('tempo alvo','tempo'),pace:find('pace','ritmo'),warm:find('aquecimento'),description:find('descricao','treino principal'),cool:find('desaquecimento'),before:find('antes'),after:find('depois')};
    if(col.week<0||col.type<0)throw new Error('Não encontrei as colunas Semana e Treino no cabeçalho.');
    const cell=(row,key)=>col[key]<0?'':row[col[key]], rows=matrix.slice(1).filter((r)=>r.some((v)=>String(v).trim())).map((r)=>({week:cell(r,'week'),day:cell(r,'day'),type:cell(r,'type'),km:cell(r,'km'),time:cell(r,'time'),pace:cell(r,'pace'),warm:cell(r,'warm'),description:cell(r,'description'),cool:cell(r,'cool'),before:cell(r,'before'),after:cell(r,'after')}));
    saveNewPlan(planFromRows(rows,file.name.replace(/\.[^.]+$/,'')));
  } catch(e) { S.planImportErr=e.message||'Não consegui ler esta planilha.'; render(); }
  finally { input.value=''; }
}function openWorkout(weekIndex,sessionIndex) { if(!sessionKey(weekIndex,sessionIndex)) return; S.activeWorkout={weekIndex,sessionIndex}; S.sessionView='detail'; S.sessionLogErr=''; S.sessionSaved=null; render(); window.scrollTo(0,0); }
function closeWorkout() { S.activeWorkout=null; S.sessionView='detail'; S.sessionLogErr=''; render(); window.scrollTo(0,0); }
function openSessionLog() { if(!activeWorkoutData()) return; S.sessionView='log'; S.sessionLogErr=''; render(); window.scrollTo(0,0); }
function backToSessionDetails() { S.sessionView='detail'; S.sessionLogErr=''; render(); }
function finishSessionLog() {
  const item=activeWorkoutData(); if(!item) return;
  const dist=num($('#session-km').value), secs=toSecs($('#session-time').value);
  if(!dist||dist<=0||!secs||secs<=0) { S.sessionLogErr='Informe uma distância e um tempo válidos.'; return render(); }
  const d=new Date(); let id=Date.now(); while(S.runs.some((r)=>r.id===id)) id++;
  const run={id,dist,secs,l:d.getDate()+'/'+(d.getMonth()+1),source:'manual'};
  S.runs.push(run); S.runs.sort((x,y)=>x.id-y.id); S.runLinks[String(id)]=item.key; S.completed[item.key]=true;
  S.sessionSaved={runId:id,weekIndex:item.weekIndex,sessionIndex:item.sessionIndex}; S.activeWorkout=null; S.sessionView='detail'; S.sessionLogErr=''; S.tab='treino';
  S.openWeeks=Array.isArray(S.openWeeks)?[...new Set([...S.openWeeks,item.weekIndex])]:[item.weekIndex]; save(); render(); window.scrollTo(0,0);
}function homeWorkoutCard() {
  const weeks=getPlanWeeks();
  if(!weeks.length) return '<div class="home-next"><div class="home-next-label">SEU PLANO</div><p>Monte um plano para ver seu próximo treino aqui.</p><button class="btn alt" onclick="go(\'treino\')">Ver meu treino</button></div>';
  const sessions=getPlanSessions(), next=sessions.find((x)=>!S.completed[x.key]);
  if(!next) return '<div class="home-next home-next-done"><div class="home-next-label">PLANO</div><b>Todos os treinos estão marcados como concluídos.</b><button class="btn alt" onclick="go(\'treino\')">Rever meu plano</button></div>';
  const weekSessions=sessions.filter((x)=>x.weekIndex===next.weekIndex), done=weekSessions.filter((x)=>S.completed[x.key]).length;
  return '<div class="home-next"><div class="home-next-top"><span class="home-next-label">PRÓXIMO TREINO</span><span class="home-next-week">Semana '+(next.weekIndex+1)+'</span></div><h2>'+next.type+'</h2><p>'+next.dia+(next.km?' · '+String(next.km).replace('.',',')+' km':'')+'</p><div class="home-next-progress"><span>'+done+' de '+weekSessions.length+' feitos nesta semana</span><div class="week-progress">'+weekSessions.map((x)=>'<i class="week-segment '+(S.completed[x.key]?'done':'')+'"></i>').join('')+'</div></div><div class="home-next-actions"><button class="btn" onclick="go(\'correr\')">'+ic('play',17)+'Começar corrida</button><button class="home-link" onclick="go(\'treino\')">Ver plano</button></div></div>';
}
function pendingRunLinkCard() {
  if (S.pendingRunLink == null) return '';
  const run=S.runs.find((r)=>String(r.id)===String(S.pendingRunLink)), options=getPlanSessions().filter((x)=>!S.completed[x.key]);
  if(!run) return '<div class="run-link-card"><p>Corrida salva. Não encontrei sessões pendentes para associar.</p><button class="btn alt" onclick="dismissRunLink()">Fechar</button></div>';
  if(!options.length) return '<div class="run-link-card"><div class="home-next-label">CORRIDA SALVA</div><p>'+(getPlanWeeks().length?'Não há treinos pendentes no plano para associar.':'Crie um plano para vincular esta corrida a um treino.')+'</p><div class="run-link-actions"><button class="btn alt" onclick="go(\'treino\')">Ver meu plano</button><button class="home-link" onclick="dismissRunLink()">Agora não</button></div></div>';
  return '<div class="run-link-card"><div class="home-next-label">CORRIDA SALVA</div><h2>Associar ao plano?</h2><p>'+run.dist.toFixed(2).replace('.',',')+' km · '+fmtTime(run.secs)+'</p><label class="run-link-label">Escolha o treino</label><select id="run-link-session">'+options.map((x)=>'<option value="'+svgEsc(x.key)+'">'+svgEsc(x.weekTitle+' · '+x.type+(x.km?' · '+String(x.km).replace('.',',')+' km':''))+'</option>').join('')+'</select>'+(S.runLinkErr?'<p class="err">'+S.runLinkErr+'</p>':'')+'<div class="run-link-actions"><button class="btn" onclick="associateRunWithSession('+run.id+')">Vincular corrida</button><button class="home-link" onclick="dismissRunLink()">Agora não</button></div></div>';
}
function associateRunWithSession(runId) {
  const key=$('#run-link-session') && $('#run-link-session').value;
  if(!key || !getPlanSessions().some((x)=>x.key===key)) { S.runLinkErr='Escolha um treino válido.'; return render(); }
  S.runLinks[String(runId)]=key; S.completed[key]=true; S.pendingRunLink=null; S.runLinkErr=''; save(); render();
}
function dismissRunLink() { S.pendingRunLink=null; S.runLinkErr=''; saveLocal(); render(); }function weekDateLabel(start,index) {
  if (!start) return '';
  const d = new Date(start+'T12:00:00'); if (Number.isNaN(d.getTime())) return '';
  d.setDate(d.getDate()+index*7); const end = new Date(d); end.setDate(end.getDate()+6);
  const months=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return 'De '+d.getDate()+' '+months[d.getMonth()]+' a '+end.getDate()+' '+months[end.getMonth()];
}
function workoutClass(type) {
  const t=String(type||'').toLowerCase();
  return /ritmo|interval|fartlek|acelera|tiro/.test(t) ? 'quality' : /longo/.test(t) ? 'long' : /leve|regener/.test(t) ? 'easy' : 'general';
}
function toggleWeek(index) {
  const open=Array.isArray(S.openWeeks) ? [...S.openWeeks] : [semAtual()], i=open.indexOf(index);
  if(i>=0) open.splice(i,1); else open.push(index); S.openWeeks=open; render();
}
function toggleSession(week,index) { const key=week+'-'+index; S.openSession=S.openSession===key ? null : key; render(); }
function weekCard(w,index,start) {
  const open=Array.isArray(S.openWeeks) ? S.openWeeks.includes(index) : index===semAtual();
  const days=Array.isArray(w.dias)?w.dias:[], total=days.reduce((sum,d)=>sum+(Number(d.km)||0),0), title=w.titulo||('Semana '+(index+1));
  const completed=days.filter((d,j)=>S.completed[sessionKey(index,j)]).length;
  const segments=days.map((d,j)=>'<i class="week-segment '+(S.completed[sessionKey(index,j)]?'done':'')+'"></i>').join('');
  const rows=days.map((d,j)=>{
    const type=d.tipo||d.n||'Treino', dia=d.dia||('Treino '+(j+1)), done=!!S.completed[sessionKey(index,j)], distance=Number(d.km)>0?String(d.km).replace('.',',')+' km':'';
    return '<div class="session-item '+(done?'is-complete':'')+'"><button class="session-open" aria-label="Abrir detalhes: '+type+'" onclick="openWorkout('+index+','+j+')"><span class="session-day">'+dia+'</span><span class="workout-badge '+workoutClass(type)+'"></span><span class="session-title">'+type+'</span><span class="session-distance">'+distance+'</span>'+(done?'<span class="session-done-marker" aria-label="Concluído">'+ic('check',15)+'</span>':'')+ic('back',18)+'</button></div>';
  }).join('');
  return '<article class="week-card '+(open?'is-open':'')+'"><button class="week-toggle" aria-expanded="'+open+'" onclick="toggleWeek('+index+')"><span class="week-topline">'+weekDateLabel(start,index)+'</span><span class="week-heading"><b>'+title+'</b>'+ic('back',21)+'</span><span class="week-progress" aria-label="'+completed+' de '+days.length+' treinos concluídos">'+segments+'</span><span class="week-progress-label">'+completed+' de '+days.length+' treinos concluídos</span><span class="week-stats"><span>Total de treinos: <b>'+days.length+'</b></span><span>Distância: <b>'+total.toFixed(2).replace('.',',')+' km</b></span></span></button>'+(open ? '<div class="week-sessions">'+(w.foco ? '<p class="week-focus">'+w.foco+'</p>' : '')+rows+'</div>' : '')+'</article>';
}const semChips = () => S.treino.semanas.length > 1 ? '<div class="chips">'+S.treino.semanas.map((w, i) => '<button class="chip '+(semAtual() === i ? 'on' : '')+'" onclick="setSem('+i+')">Semana '+(i+1)+'</button>').join('')+'</div>' : '';
function setSem(i) { S.sem = i; render(); }

// ---------- mapa (Leaflet + OpenStreetMap) ----------
let map = null, poly = null, dot = null, accuracyRing = null, tileFallbackUsed = false;
function mapTiles(m) {
  tileFallbackUsed = false;
  const primary = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(m);
  primary.on('tileerror', () => {
    if (tileFallbackUsed || !map) return;
    tileFallbackUsed = true; map.removeLayer(primary);
    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(m);
  });
}
function mapInit(id) {
  if (!window.L || !$('#'+id)) return null;
  const m = L.map(id, { zoomControl: false }).setView([-14.2, -51.9], 4);
  mapTiles(m); setTimeout(() => m.invalidateSize(), 100); return m;
}
let previewRequested = false;
function afterRender() {
  try { if (map) map.remove(); } catch (e) {}
  map = poly = dot = accuracyRing = null;
  if (S.tab === 'correr') {
    map = mapInit('map');
    if (map && G) { poly = L.polyline(G.pts, { color: '#5B94FF', weight: 5 }).addTo(map); if (G.pts.length) gMap(true); if (G.lastFix) gShowFix(G.lastFix, G.lastAccuracy, true); }
    else if (map && !previewRequested && navigator.geolocation) { previewRequested=true; navigator.geolocation.getCurrentPosition((p)=>{ if(S.tab!=='correr'||G||!map)return; const q=[p.coords.latitude,p.coords.longitude], acc=Number(p.coords.accuracy)||999; gShowFix(q,acc,true); const el=document.getElementById("preview-fx"); if(el) el.textContent=acc<=25?'GPS pronto · precisão aproximada de '+Math.round(acc)+' m':'GPS com precisão de '+Math.round(acc)+' m. Vá para um local aberto antes de iniciar.'; },()=>{ const el=document.getElementById("preview-fx"); if(el) el.textContent='Permita a localização para conferir o sinal antes de começar.'; },{enableHighAccuracy:true,maximumAge:0,timeout:20000}); }
  } else if (S.tab === 'corridas' && S.open) {
    const r = S.runs.find((x) => x.id === S.open);
    if (r && r.route && r.route.length > 1) {
      map = mapInit('hm');
      if (map) {
        poly = L.polyline(r.route, { color: '#5B94FF', weight: 5 }).addTo(map);
        L.circleMarker(r.route[0], { radius: 6, color: '#fff', fillColor: '#8CC8FF', fillOpacity: 1, weight: 2 }).addTo(map);
        L.circleMarker(r.route[r.route.length-1], { radius: 7, color: '#fff', fillColor: '#5B94FF', fillOpacity: 1, weight: 3 }).addTo(map);
        map.fitBounds(poly.getBounds(), { padding: [24, 24] });
      }
    }
  }
}
function toggleRun(id) { S.open = S.open === id ? null : id; render(); }

// ---------- corrida ao vivo (GPS) ----------
let G = null;
const gEl = () => Math.max(0, Math.floor((Date.now() - G.t0 - G.pausedMs - (G.st === 'pause' ? Date.now() - G.pAt : 0)) / 1000));
function gShowFix(q, accuracy, center) {
  if (!map || !q) return;
  if (!dot) dot = L.circleMarker(q, { radius: 8, color: '#fff', fillColor: '#5B94FF', fillOpacity: 1, weight: 3 }).addTo(map); else dot.setLatLng(q);
  if (accuracyRing) accuracyRing.setLatLng(q).setRadius(accuracy || 0);
  else accuracyRing = L.circle(q, { radius: accuracy || 0, color: '#8CC8FF', weight: 1, fillColor: '#5B94FF', fillOpacity: .12 }).addTo(map);
  if (center) map.setView(q, 17); else map.panTo(q);
}
function gMap(first) {
  if (!map || !G.pts.length) return;
  const last = G.pts[G.pts.length-1]; poly.setLatLngs(G.pts);
  if (first || G.pts.length === 1) map.setView(last, 17); else map.panTo(last);
}
function gUi() {
  if (!G) return;
  const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
  set('#tm', fmtTime(gEl())); set('#ds', G.dist.toFixed(2)); set('#pc', G.dist > 0.02 ? fmtTime(gEl()/G.dist) : '--:--'); set('#fx', G.fix);
}
function gSaveLive() { try { localStorage.setItem('r2_live', JSON.stringify({ t0: G.t0, pausedMs: G.pausedMs, pAt: G.pAt, st: G.st, pts: G.pts, dist: G.dist })); } catch (e) {} }
function gLock() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then((l) => { if (G) G.wl = l; }).catch(() => {}); } catch (e) {} }
function gWatch() {
  G.wid = navigator.geolocation.watchPosition(gPos, (e) => { G.fix = e.code === 1 ? 'Permissão de localização negada' : 'Sem sinal de GPS'; gUi(); }, { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 });
  G.iv = setInterval(gUi, 1000);
}
function gPos(p) {
  if (!G || G.st !== 'run') return;
  const c = p.coords, accuracy = Number(c.accuracy) || 999, q = [+c.latitude, +c.longitude];
  if (q.some((v) => !Number.isFinite(v))) return;
  const previousAccuracy = G.lastAccuracy; G.lastFix = q; G.lastAccuracy = accuracy; gShowFix(q, accuracy, !G.centered); G.centered = true;
  if (accuracy > 25) { G.goodFixes = 0; G.last = null; G.lastAt = 0; G.fix = 'Sinal fraco (' + Math.round(accuracy) + ' m). Vá para um local aberto.'; return gUi(); }
  G.goodFixes = (G.goodFixes || 0) + 1;
  if (G.goodFixes < 3) { G.fix = 'Calibrando GPS (' + G.goodFixes + '/3 leituras boas)...'; return gUi(); }
  G.fix = 'GPS pronto · precisão ' + Math.round(accuracy) + ' m';
  const prev = G.last;
  if (prev) {
    const d = hav(prev, q), elapsed = Math.max(.5, (p.timestamp - (G.lastAt || p.timestamp - 1000)) / 1000);
    if (d / elapsed > 9) { G.last = q; G.lastAt = p.timestamp; G.fix = 'Ajustando salto do GPS...'; return gUi(); }
    const noise = Math.max(.003, Math.min(.008, ((accuracy + (previousAccuracy || accuracy)) / 2) / 1000));
    if (d < noise) { G.lastAt = p.timestamp; return gUi(); }
    G.dist += d;
  }
  G.last = q; G.lastAt = p.timestamp; G.pts.push([+q[0].toFixed(5), +q[1].toFixed(5)]); gMap(!prev); gUi(); gSaveLive();
}
function gStart() {
  if (!navigator.geolocation) { S.err = 'Este navegador não tem GPS.'; return render(); }
  S.err = ''; G = { st: 'run', t0: Date.now(), pausedMs: 0, pAt: 0, pts: [], dist: 0, last: null, lastAt: 0, goodFixes: 0, centered: false, fix: 'Procurando sinal de GPS...' };
  gWatch(); gLock(); gSaveLive(); render();
}
function gResume() {
  try { const o = JSON.parse(localStorage.getItem('r2_live')); G = { ...o, st: 'run', last: null, lastAt: 0, goodFixes: 0, centered: false, lastFix: null, lastAccuracy: 0, fix: 'Recalibrando GPS...' }; if (o.st === 'pause') { G.pausedMs += Date.now() - o.pAt; } gWatch(); gLock(); } catch (e) { G = null; }
  render();
}
function gDiscard() { try { localStorage.removeItem('r2_live'); } catch (e) {} render(); }
function gPause() {
  if (G.st === 'run') { G.st = 'pause'; G.pAt = Date.now(); }
  else { G.pausedMs += Date.now() - G.pAt; G.st = 'run'; G.last = null; G.lastAt = 0; G.goodFixes = 0; G.fix = 'Recalibrando GPS...'; }
  gSaveLive(); render();
}
function gFinish() {
  navigator.geolocation.clearWatch(G.wid); clearInterval(G.iv); try { G.wl && G.wl.release(); } catch (e) {}
  const secs = gEl(), d = new Date(); let id = null;
  if (G.dist >= 0.01 && secs > 0) { id = Date.now(); S.runs.push({ id, dist: Math.round(G.dist*100)/100, secs, l: d.getDate()+'/'+(d.getMonth()+1), route: decim(G.pts), source:'gps' }); S.runs.sort((a, b) => a.id - b.id); S.pendingRunLink=id; S.runLinkErr=''; save(); }
  try { localStorage.removeItem('r2_live'); } catch (e) {}
  G = null; S.open = id; go('corridas');
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && G) { gLock(); gUi(); } });

// ---------- GPX ----------
function parseGpx(txt) {
  const x = new DOMParser().parseFromString(txt, 'application/xml');
  const pts = [...x.querySelectorAll('trkpt')].map((p) => ({ la: +p.getAttribute('lat'), lo: +p.getAttribute('lon'), t: (p.querySelector('time') || {}).textContent }));
  if (pts.length < 2) return null;
  let d = 0; for (let i = 1; i < pts.length; i++) d += hav([pts[i-1].la, pts[i-1].lo], [pts[i].la, pts[i].lo]);
  const t0 = Date.parse(pts[0].t), t1 = Date.parse(pts[pts.length-1].t);
  if (isNaN(t0) || isNaN(t1) || t1 <= t0 || d < 0.01) return null;
  const dt = new Date(t0);
  return { id: t0, dist: Math.round(d*100)/100, secs: Math.round((t1-t0)/1000), l: dt.getDate()+'/'+(dt.getMonth()+1), route: decim(pts.map((p) => [+p.la.toFixed(5), +p.lo.toFixed(5)])) };
}
function importGpx(inp) {
  const f = inp.files[0]; if (!f) return;
  f.text().then((txt) => {
    const r = parseGpx(txt);
    if (!r) { S.err = 'Não consegui ler trajeto, tempo e distância desse GPX.'; return render(); }
    S.err = ''; S.runs = S.runs.filter((x) => x.id !== r.id); S.runs.push(r); S.runs.sort((a, b) => a.id - b.id); save(); render();
  });
  inp.value = '';
}

// ---------- nuvem (Firebase) ----------
let syncT = null;
function cloudSave() { if (!window.FB || !FB.configured || !FB.user) return; clearTimeout(syncT); syncT = setTimeout(cloudPush, 1500); }
async function cloudPush() {
  if (!window.FB || !FB.user) return;
  try {
    const ids = new Set(S.runs.map((r) => r.id)), syn = new Set(S.synced), dirty = new Set(S.dirtyRuns);
    for (const r of S.runs) if (!syn.has(r.id) || dirty.has(r.id)) { await FB.saveRun(r); syn.add(r.id); dirty.delete(r.id); }
    for (const id of [...syn]) if (!ids.has(id)) { await FB.delRun(id); syn.delete(id); dirty.delete(id); }
    await FB.saveMeta({ perfil:S.perfil, plano:S.plano, userPlan:S.userPlan, claimed:S.claimed, completed:S.completed, runLinks:S.runLinks });
    S.synced = [...syn]; S.dirtyRuns = [...dirty]; S.deletedRuns = S.deletedRuns.filter((id) => syn.has(id)); saveLocal(); S.cloud = 'ok';
  } catch (e) { S.cloud = 'Erro ao sincronizar: ' + (e.code || e.message); }
  if (S.tab === 'conta') render();
}window.addEventListener('fb-auth', async () => {
  if (FB.user) {
    try {
      const c = await FB.load(), m = new Map(S.runs.map((r) => [r.id, r]));
      const gone = new Set(S.deletedRuns), dirty = new Set(S.dirtyRuns); c.runs.forEach((r) => { if (!gone.has(r.id) && !dirty.has(r.id)) m.set(r.id, r); });
      S.runs = [...m.values()].sort((a, b) => a.id - b.id);
      S.synced = [...new Set([...S.synced, ...c.runs.map((r) => r.id)])];
      if (c.meta) { S.perfil = c.meta.perfil || S.perfil; S.plano = c.meta.plano || S.plano; S.userPlan = c.meta.userPlan || S.userPlan; S.claimed = { ...(c.meta.claimed || {}), ...S.claimed }; S.completed = { ...(c.meta.completed || {}), ...S.completed }; S.runLinks = { ...(c.meta.runLinks || {}), ...S.runLinks }; }
      saveLocal(); await cloudPush();
    } catch (e) { S.cloud = 'Erro ao carregar: ' + (e.code || e.message); }
  }
  render();
});
function authMode(mode) { S.authMode = mode; S.err = ""; render(); }
async function authDo(mode) {
  const e = $('#ce').value.trim(), p = $('#cs').value; S.err = '';
  try { await (mode === 'in' ? FB.signIn(e, p) : FB.signUp(e, p)); }
  catch (x) {
    const m = { 'auth/invalid-credential': 'E-mail ou senha incorretos.', 'auth/email-already-in-use': 'Este e-mail já tem conta. Use Entrar.', 'auth/weak-password': 'Senha fraca: use 6 caracteres ou mais.', 'auth/invalid-email': 'E-mail inválido.', 'auth/operation-not-allowed': 'Ative o login por e-mail e senha no Firebase.' };
    S.err = m[x.code] || ('Erro: ' + (x.code || x.message)); render();
  }
}

// ---------- plano personalizado + offline ----------
window.addEventListener('fb-ready', () => render());
fetch('treino.json', { cache: 'no-cache' }).then((r) => r.json()).then((j) => { S.treino = normTreino(j); render(); }).catch(() => {});
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
render();
