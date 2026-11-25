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
let S = { tab:'home', synced:[], treino:null, cloud:'', runs:[], perfil:{nivel:'Iniciante',objetivo:'Saúde',dias:3}, plano:null, claimed:{}, open:null, err:'' };
try {
  const g = (k) => JSON.parse(localStorage.getItem(k) || 'null');
  S.runs = g('r2_runs') || []; S.perfil = g('r2_perfil') || S.perfil; S.plano = g('r2_plano'); S.claimed = g('r2_claimed') || {}; S.synced = g('r2_synced') || [];
} catch (e) {}
const saveLocal = () => { try { localStorage.setItem('r2_runs', JSON.stringify(S.runs)); localStorage.setItem('r2_perfil', JSON.stringify(S.perfil)); localStorage.setItem('r2_plano', JSON.stringify(S.plano)); localStorage.setItem('r2_claimed', JSON.stringify(S.claimed)); localStorage.setItem('r2_synced', JSON.stringify(S.synced)); } catch (e) {} };
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
function bars(data, fmt, color, invert) {
  if (!data.length) return '<span class="mut">Registre corridas para ver o gráfico.</span>';
  const vs = data.map((d) => d.v), max = Math.max(...vs), min = Math.min(...vs);
  return '<div class="chart">' + data.map((d) => { const h = invert ? 30+(1-(d.v-min)/(max-min||1))*70 : 15+(d.v/(max||1))*85;
    return '<div><small>'+fmt(d.v)+'</small><b style="height:'+h+'px;background:'+color+';box-shadow:0 2px 8px '+color+'80"></b><small>'+d.l+'</small></div>'; }).join('') + '</div>';
}
const tile = (i, v, l) => '<div class="card tile"><div class="ibox">'+ic(i,18)+'</div><div class="big">'+v+'</div><div class="lbl" style="margin:2px 0 0">'+l+'</div></div>';
const field = (l, id, ph, mode) => '<div class="lbl">'+l+'</div><input id="'+id+'" placeholder="'+ph+'"'+(mode ? ' inputmode="'+mode+'"' : '')+' oninput="'+(id[0]==='k' ? 'calc()' : '')+'">';

let sim = null;
const V = {
  home() {
    const s = calcStats(S.runs), xp = xpTotal(), lvl = Math.floor(xp/100)+1, ult = S.runs[S.runs.length-1];
    return '<div class="brand"><div class="logo">'+ic('pulse',24)+'</div><div><b>RITMO</b><small>corrida inteligente</small></div><button class="back" style="margin:0 0 0 auto" onclick="go(\'conta\')" aria-label="Conta">'+ic('user',24)+'</button></div>' +
      '<div class="hero"><div class="l">SEU NÍVEL</div><div class="flex" style="justify-content:space-between;align-items:flex-end"><div class="n">'+lvl+'</div><div style="font-weight:700;margin-bottom:10px">'+xp+' XP</div></div><div class="hbar"><i style="width:'+(xp%100)+'%"></i></div><div style="font-size:12px;margin-top:8px;color:rgba(255,255,255,.75)">Faltam '+(100-xp%100)+' XP para o nível '+(lvl+1)+'</div></div>' +
      '<div class="row">'+tile('pin', s.km.toFixed(1)+' km','TOTAL')+tile('trend', s.n,'CORRIDAS')+tile('zap', s.atual, s.atual === 1 ? 'DIA SEGUIDO' : 'DIAS SEGUIDOS')+'</div>' +
      (ult ? '<div class="card"><div class="lbl">ÚLTIMA CORRIDA</div><div class="big">'+ult.dist+' km · '+fmtPace(ult.secs/ult.dist)+'</div><div class="mut" style="font-size:13px;margin-top:2px">'+ult.l+' · '+fmtTime(ult.secs)+'</div></div>' : '') +
      '<button class="btn" onclick="go(\'correr\')">'+ic('play',18)+'Iniciar corrida</button>' +
      '<div class="row" style="margin-top:14px"><button class="card flex" style="margin:0;color:inherit;font:700 13px Sora,sans-serif;cursor:pointer;text-align:left" onclick="go(\'calc\')"><span class="ibox">'+ic('calc',18)+'</span>Calculadora</button><button class="card flex" style="margin:0;color:inherit;font:700 13px Sora,sans-serif;cursor:pointer;text-align:left" onclick="go(\'comida\')"><span class="ibox">'+ic('cup',18)+'</span>Alimentação</button></div>';
  },
  corridas() {
    const last = S.runs.slice(-7);
    return '<h1>Corridas</h1><div class="card">'+field('DISTÂNCIA (KM)','cd','ex: 5','decimal')+field('TEMPO (MM:SS OU H:MM:SS)','ct','ex: 28:30')+field('DATA (DD/MM/AAAA, VAZIO = HOJE)','cdt','ex: 22/11/2026')+
      '<button class="btn" onclick="addRun()">'+ic('plus',18)+'Salvar corrida</button>'+
      '<label class="btn alt" style="margin-top:12px">'+ic('upload',18)+'Importar arquivo GPX<input type="file" accept=".gpx,application/gpx+xml" style="display:none" onchange="importGpx(this)"></label>'+(S.err ? '<div class="err">'+S.err+'</div>' : '')+'</div>' +
      '<div class="card"><h2>Distância (km)</h2>'+bars(last.map((r) => ({v:r.dist,l:r.l})), (v) => v.toFixed(1), '#5B94FF')+'</div>' +
      '<div class="card"><h2>Pace (mais alto = mais rápido)</h2>'+bars(last.map((r) => ({v:r.secs/r.dist,l:r.l})), fmtTime, '#8CC8FF', true)+'</div>' +
      (S.runs.length ? '<h2>Histórico</h2>' + [...S.runs].reverse().map((r) => { const gps = r.route && r.route.length > 1;
        return '<div class="card"'+(gps ? ' onclick="toggleRun('+r.id+')" style="cursor:pointer"' : '')+'><div class="flex"><div class="ibox">'+ic(gps ? 'pin' : 'trend',18)+'</div><div style="flex:1"><b>'+r.dist+' km</b><div class="mut" style="font-size:12px">'+r.l+' · '+fmtTime(r.secs)+'</div></div><b style="color:var(--acc2);font-size:13px">'+fmtPace(r.secs/r.dist)+'</b></div>'+(S.open === r.id && gps ? '<div id="hm" class="lmap" style="height:200px;margin:12px 0 0"></div>' : '')+'</div>'; }).join('') +
        '<button class="btn alt" onclick="apagar()">'+ic('trash',18)+'Apagar histórico</button>' : '');
  },
  correr() {
    if (!G) {
      const live = localStorage.getItem('r2_live');
      return '<h1>Correr</h1>' + (live ? '<div class="card"><h2>Corrida interrompida</h2><p class="sub">O navegador fechou durante uma corrida. Quer retomar de onde parou?</p><button class="btn" onclick="gResume()">Retomar corrida</button><div style="height:10px"></div><button class="btn alt" onclick="gDiscard()">Descartar</button></div>' : '') +
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
    const p = S.perfil, chips = (k, o) => '<div class="chips">'+o.map((x) => '<button class="chip '+(String(p[k]) === String(x) ? 'on' : '')+'" onclick="setP(\''+k+'\',\''+x+'\')">'+x+'</button>').join('')+'</div>';
    const T0 = S.treino, w = T0 ? T0.semanas[semAtual()] : (S.plano ? { dias: S.plano.semana, resumo: S.plano.resumo } : null);
    return '<h1>Meu treino</h1>' + (S.treino ? '<p class="sub">Plano personalizado'+(S.treino.gerado ? ' · gerado em '+S.treino.gerado : '')+'</p>' : '<p class="sub">Ainda não há plano personalizado. Peça ao Claude para gerar o seu e salve em treino.json. Enquanto isso, dá para gerar um plano básico.</p>') +
      (T0 ? semChips() : '') + (w && w.titulo ? '<h2>'+w.titulo+'</h2>' : '') + (w ? planHtml(w) : '') +
      (T0 && T0.dicas && T0.dicas.length ? '<div class="card"><h2>Dicas</h2>'+T0.dicas.map((x) => '<div class="mut" style="margin-bottom:8px;font-size:14px;line-height:1.5">• '+x+'</div>').join('')+'</div>' : '') +
      '<div class="card"><h2>Seu perfil</h2><div class="lbl">NÍVEL</div>'+chips('nivel',['Iniciante','Intermediário','Avançado'])+'<div class="lbl">OBJETIVO</div>'+chips('objetivo',['Saúde','5K','10K','21K'])+'<div class="lbl">DIAS POR SEMANA</div>'+chips('dias',[2,3,4,5]) +
      (S.treino ? '' : '<button class="btn" onclick="gerar()">'+ic('star',18)+'Gerar plano básico</button>')+'<p class="note">O nível ajusta as metas dos desafios semanais.</p></div>';
  },
  comida() {
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
  $('#app').innerHTML = V[S.tab]();
  const T = (k, i) => '<button class="t '+(S.tab === k ? 'on' : '')+'" onclick="go(\''+k+'\')" aria-label="'+k+'">'+ic(i,24)+'<i></i></button>';
  $('#tabs').innerHTML = T('home','home')+T('corridas','chart')+'<button class="fab" onclick="go(\'correr\')" aria-label="Correr">'+ic('play',26)+'</button>'+T('metas','award')+T('treino','cal');
}
function render() { render0(); afterRender(); }
function go(t) { S.tab = t; S.err = ''; render(); window.scrollTo(0, 0); }
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
  S.err = ''; S.runs.push({ id: dt.ts, dist, secs, l: dt.l }); S.runs.sort((a, b) => a.id - b.id); save(); render();
}
function apagar() { S.runs = []; save(); render(); }
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
const semChips = () => S.treino.semanas.length > 1 ? '<div class="chips">'+S.treino.semanas.map((w, i) => '<button class="chip '+(semAtual() === i ? 'on' : '')+'" onclick="setSem('+i+')">Semana '+(i+1)+'</button>').join('')+'</div>' : '';
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
function afterRender() {
  try { if (map) map.remove(); } catch (e) {}
  map = poly = dot = accuracyRing = null;
  if (S.tab === 'correr' && G) {
    map = mapInit('map');
    if (map) { poly = L.polyline(G.pts, { color: '#5B94FF', weight: 5 }).addTo(map); if (G.pts.length) gMap(true); if (G.lastFix) gShowFix(G.lastFix, G.lastAccuracy, true); }
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
  G.lastFix = q; G.lastAccuracy = accuracy; gShowFix(q, accuracy, !G.centered); G.centered = true;
  if (accuracy > 25) { G.goodFixes = 0; G.fix = 'Sinal fraco (' + Math.round(accuracy) + ' m). Vá para um local aberto.'; return gUi(); }
  G.goodFixes = (G.goodFixes || 0) + 1;
  if (G.goodFixes < 3) { G.fix = 'Calibrando GPS (' + G.goodFixes + '/3 leituras boas)...'; return gUi(); }
  G.fix = 'GPS pronto · precisão ' + Math.round(accuracy) + ' m';
  const prev = G.last;
  if (prev) {
    const d = hav(prev, q), elapsed = Math.max(.5, (p.timestamp - (G.lastAt || p.timestamp - 1000)) / 1000);
    if (d / elapsed > 9) { G.last = q; G.lastAt = p.timestamp; G.fix = 'Ajustando salto do GPS...'; return gUi(); }
    const noise = Math.max(.003, Math.min(.008, ((accuracy + (G.lastAccuracy || accuracy)) / 2) / 1000));
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
  if (G.dist >= 0.01 && secs > 0) { id = Date.now(); S.runs.push({ id, dist: Math.round(G.dist*100)/100, secs, l: d.getDate()+'/'+(d.getMonth()+1), route: decim(G.pts) }); S.runs.sort((a, b) => a.id - b.id); save(); }
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
    const ids = new Set(S.runs.map((r) => r.id)), syn = new Set(S.synced);
    for (const r of S.runs) if (!syn.has(r.id)) { await FB.saveRun(r); syn.add(r.id); }
    for (const id of [...syn]) if (!ids.has(id)) { await FB.delRun(id); syn.delete(id); }
    await FB.saveMeta({ perfil: S.perfil, plano: S.plano, claimed: S.claimed });
    S.synced = [...syn]; saveLocal(); S.cloud = 'ok';
  } catch (e) { S.cloud = 'Erro ao sincronizar: ' + (e.code || e.message); }
  if (S.tab === 'conta') render();
}
window.addEventListener('fb-auth', async () => {
  if (FB.user) {
    try {
      const c = await FB.load(), m = new Map(S.runs.map((r) => [r.id, r]));
      c.runs.forEach((r) => m.set(r.id, r));
      S.runs = [...m.values()].sort((a, b) => a.id - b.id);
      S.synced = [...new Set([...S.synced, ...c.runs.map((r) => r.id)])];
      if (c.meta) { S.perfil = c.meta.perfil || S.perfil; S.plano = c.meta.plano || S.plano; S.claimed = { ...(c.meta.claimed || {}), ...S.claimed }; }
      saveLocal(); await cloudPush();
    } catch (e) { S.cloud = 'Erro ao carregar: ' + (e.code || e.message); }
  }
  render();
});
async function authDo(mode) {
  const e = $('#ce').value.trim(), p = $('#cs').value; S.err = '';
  try { await (mode === 'in' ? FB.signIn(e, p) : FB.signUp(e, p)); }
  catch (x) {
    const m = { 'auth/invalid-credential': 'E-mail ou senha incorretos.', 'auth/email-already-in-use': 'Este e-mail já tem conta. Use Entrar.', 'auth/weak-password': 'Senha fraca: use 6 caracteres ou mais.', 'auth/invalid-email': 'E-mail inválido.', 'auth/operation-not-allowed': 'Ative o login por e-mail e senha no Firebase.' };
    S.err = m[x.code] || ('Erro: ' + (x.code || x.message)); render();
  }
}

// ---------- plano personalizado + offline ----------
fetch('treino.json', { cache: 'no-cache' }).then((r) => r.json()).then((j) => { S.treino = normTreino(j); render(); }).catch(() => {});
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
render();