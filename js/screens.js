function screenWelcome(state, t) {
  return `<div style="display:flex;flex-direction:column;height:100%;justify-content:center;align-items:center;text-align:center;padding:40px 10px">
    <div class="lang-toggle" style="position:absolute;top:18px;right:22px">
      <button class="${state.lang==='es'?'on':''}" data-lang="es">ES</button>
      <button class="${state.lang==='en'?'on':''}" data-lang="en">EN</button>
    </div>
    <div class="cap-mascot" style="margin-bottom:24px">${Cap(160)}</div>
    <h1 class="serif" style="font-size:30px;margin:0 0 14px;font-weight:400">${t.welcome}</h1>
    <p class="muted" style="font-size:14px;line-height:1.6;margin:0 0 36px;max-width:300px">${t.welcomeSub}</p>
    <button class="btn-primary" data-act="next-name" style="max-width:240px">${t.begin}</button>
  </div>`;
}

function screenName(state, t) {
  return `<div style="padding-top:28px">
    <div class="cap-mascot" style="margin-bottom:18px">${Cap(90)}</div>
    <h1 class="h-title" style="text-align:center">${t.namePrompt}</h1>
    <p class="h-sub" style="text-align:center">${t.nameSub}</p>
    <input class="input-clean" id="name-in" placeholder="${t.namePlaceholder}" value="${state.name||''}" style="margin-bottom:24px"/>
    <button class="btn-primary" data-act="save-name">${t.continue}</button>
  </div>`;
}

function screenExp(state, t) {
  const opts = [['exp1','exp1d','exp1'],['exp2','exp2d','exp2'],['exp3','exp3d','exp3']];
  return `<div style="padding-top:28px">
    <div class="cap-mascot" style="margin-bottom:18px">${Cap(90)}</div>
    <h1 class="h-title" style="text-align:center">${t.expPrompt}</h1>
    <p class="h-sub" style="text-align:center">${t.expSub}</p>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${opts.map(([k,d,v])=>`<button class="option-card" data-exp="${v}"><div style="font-weight:500;margin-bottom:2px">${t[k]}</div><div class="muted" style="font-size:12px">${t[d]}</div></button>`).join('')}
    </div>
  </div>`;
}

function screenGoal(state, t) {
  const goals = [
    ['anxiety','goal1'],['sleep','goal2'],['focus','goal3'],['gratitude','goal4'],
    ['selflove','goal5'],['stress','goal6'],['productivity','goal7']
  ];
  return `<div style="padding-top:28px">
    <div class="cap-mascot" style="margin-bottom:18px">${Cap(90)}</div>
    <h1 class="h-title" style="text-align:center">${t.goalPrompt}</h1>
    <p class="h-sub" style="text-align:center">${t.goalSub}</p>
    <div style="display:flex;flex-direction:column;gap:10px;padding-bottom:40px">
      ${goals.map(([v,k])=>`<button class="option-card" data-goal="${v}"><div style="font-weight:500">${t[k]}</div></button>`).join('')}
    </div>
  </div>`;
}

function screenHome(state, t) {
  const theme = t.themes[state.goal] || t.themes.anxiety;
  const quote = t.quotes[state.goal] || t.quotes.anxiety;
  const totalMin = state.totalMinutes || 0;
  const streak = state.streak || 0;
  return `<div>
    <div class="row" style="margin-bottom:18px">
      <div>
        <div style="font-size:13px" class="muted">${t.greet},</div>
        <div style="font-size:20px;font-weight:500;letter-spacing:-.3px">${state.name||'amig@'}</div>
      </div>
      <div style="width:54px;height:46px">${Cap(54)}</div>
    </div>
    <div class="thought-card" style="margin-bottom:20px;font-size:14px">${quote}</div>
    <div class="surface" style="margin-bottom:14px">
      <div class="label-strong" style="margin-bottom:6px">${t.todaysFocus}</div>
      <div class="serif" style="font-size:22px;line-height:1.3;margin-bottom:14px">${theme}</div>
      <div style="font-size:13px;margin-bottom:10px" class="muted">${t.duration}</div>
      <div style="display:flex;gap:8px">
        ${[6,12,20].map(d=>`<button class="dur-btn" data-dur="${d}" data-active="${state.duration===d}">${d} ${t.min}</button>`).join('')}
      </div>
    </div>
    <div class="surface" style="margin-bottom:18px">
      <div class="label-strong" style="margin-bottom:10px">${t.technique}</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${[['natural','natural','naturalDesc'],['relax','relax','relaxDesc'],['calm','calm','calmDesc']].map(([v,k,d])=>`<button class="tech-btn" data-tech="${v}" data-active="${state.technique===v}"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span style="font-weight:500;font-size:13px">${t[k]}</span><span class="t-desc muted" style="font-size:11px">${t[d]}</span></div></button>`).join('')}
      </div>
    </div>
    <button class="btn-primary" data-act="start-session">${t.startSession} • ${state.duration} ${t.min}</button>
    <div style="height:18px"></div>
    <div class="row" style="font-size:12px">
      <span class="muted">${t.streak}: <b style="color:var(--mint)">${streak} ${t.days}</b></span>
      <span class="muted">${totalMin} ${t.min}</span>
    </div>
  </div>`;
}

function screenCustom(state, t) {
  return `<div>
    <h1 class="h-title">${t.customMed}</h1>
    <p class="h-sub">${t.customSub}</p>
    <textarea class="input-clean" id="custom-in" rows="5" placeholder="${t.customPlaceholder}" style="resize:none;margin-bottom:14px;font-family:'Poppins',sans-serif">${state.customInput||''}</textarea>
    <button class="btn-primary" data-act="generate-thoughts" style="margin-bottom:22px">${t.generate}</button>
    ${state.thoughts && state.thoughts.length ? `
      <div class="label-strong" style="margin-bottom:10px">${t.yourThoughts}</div>
      ${state.thoughts.map(th=>`<div class="thought-card">${th}</div>`).join('')}
      <button class="btn-primary" data-act="start-silence" style="margin-top:14px">${t.beginSilence}</button>
    `:''}
  </div>`;
}

function screenCal(state, t) {
  const dayNames = state.lang === 'es' ? ['L','M','X','J','V','S','D'] : ['M','T','W','T','F','S','S'];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthNames = state.lang === 'es'
    ? ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName = `${monthNames[month]} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const completed = (state.completedDates || []).map(s => s.slice(0, 10));
  const todayStr = today.toISOString().slice(0, 10);
  let cells = '';
  for (let i = 0; i < offset; i++) cells += `<div class="cal-cell empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const cls = completed.includes(iso) ? 'done' : (iso === todayStr ? 'today' : '');
    cells += `<div class="cal-cell ${cls}">${d}</div>`;
  }
  const totalMin = state.totalMinutes || 0;
  const streak = state.streak || 0;
  return `<div>
    <h1 class="h-title">${t.calendar}</h1>
    <p class="h-sub">${monthName}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
      <div class="surface" style="text-align:center">
        <div style="font-size:11px" class="muted">${t.streak}</div>
        <div style="font-size:24px;font-weight:500;color:var(--mint);margin-top:4px">${streak}</div>
        <div style="font-size:11px" class="muted">${t.days}</div>
      </div>
      <div class="surface" style="text-align:center">
        <div style="font-size:11px" class="muted">${t.totalMin}</div>
        <div style="font-size:24px;font-weight:500;color:var(--mint);margin-top:4px">${totalMin}</div>
        <div style="font-size:11px" class="muted">${t.min}</div>
      </div>
    </div>
    <div class="cal-grid" style="margin-bottom:6px">${dayNames.map(d=>`<div style="text-align:center;font-size:10px;color:#7e9893;padding:4px">${d}</div>`).join('')}</div>
    <div class="cal-grid">${cells}</div>
  </div>`;
}

function screenMe(state, t) {
  const sessionsCount = (state.completedDates || []).length;
  const totalMin = state.totalMinutes || 0;
  const streak = state.streak || 0;
  const earned = [
    sessionsCount >= 1,
    streak >= 7,
    streak >= 30,
    totalMin >= 100,
    false,
    false
  ];
  
  const goals = [
    ['anxiety','goal1'],['sleep','goal2'],['focus','goal3'],['gratitude','goal4'],
    ['selflove','goal5'],['stress','goal6'],['productivity','goal7']
  ];

  return `<div>
    <div style="text-align:center;padding:14px 0 22px">
      <div class="cap-mascot" style="margin-bottom:10px">${Cap(90)}</div>
      <div style="font-size:20px;font-weight:500;letter-spacing:-.3px">${state.name||'amig@'}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px">
      <div class="surface" style="text-align:center"><div style="font-size:11px" class="muted">${t.sessions}</div><div style="font-size:22px;font-weight:500;margin-top:4px">${sessionsCount}</div></div>
      <div class="surface" style="text-align:center"><div style="font-size:11px" class="muted">${t.totalMin}</div><div style="font-size:22px;font-weight:500;margin-top:4px">${totalMin}</div></div>
    </div>
    
    <div class="label-strong" style="margin-bottom:12px">${t.goal}</div>
    <div class="surface" style="padding:4px;margin-bottom:24px;display:flex;flex-wrap:wrap;gap:6px">
      ${goals.map(([v,k]) => `<button class="pill" style="cursor:pointer;border-color:${state.goal===v?'var(--mint)':'transparent'};background:${state.goal===v?'rgba(158,209,187,0.15)':'transparent'}" data-goal-profile="${v}">${t[k]}</button>`).join('')}
    </div>

    <div class="label-strong" style="margin-bottom:12px">${t.achievements}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px">
      ${t.badges.map((b,i)=>`<div class="badge ${earned[i]?'earned':'locked'}">${b}</div>`).join('')}
    </div>
    <div class="label-strong" style="margin-bottom:12px">${t.settings}</div>
    <div class="surface" style="padding:6px 16px;margin-bottom:40px">
      <div class="row" style="padding:13px 0;border-bottom:0.5px solid rgba(255,255,255,0.08)">
        <span style="font-size:14px">${t.language}</span>
        <div class="lang-toggle">
          <button class="${state.lang==='es'?'on':''}" data-lang="es">ES</button>
          <button class="${state.lang==='en'?'on':''}" data-lang="en">EN</button>
        </div>
      </div>
      <div class="row" style="padding:13px 0">
        <span style="font-size:14px">${t.lightMode}</span>
        <div class="toggle-sw ${state.light?'on':''}" data-act="toggle-light"></div>
      </div>
    </div>
  </div>`;
}

function screenBreathing(state, t) {
  const m = state.meditation;
  const mm = Math.floor(m.timeLeft / 60), ss = m.timeLeft % 60;
  return `<div style="display:flex;flex-direction:column;align-items:center;padding:24px 10px;min-height:560px;justify-content:space-between">
    <div style="text-align:center">
      <div class="serif" style="font-size:13px;letter-spacing:2px;color:var(--mint);text-transform:uppercase">${m.silence?t.yourThoughts:t.themes[state.goal]||t.themes.anxiety}</div>
      <div class="muted" style="font-size:11px;margin-top:4px">${t[state.technique]} · ${t[state.technique+'Desc']||''}</div>
    </div>
    <div class="breath-stage">
      <div class="breath-ring r1" id="r1"></div>
      <div class="breath-ring r2" id="r2"></div>
      <div class="breath-ring r3" id="r3"></div>
      <div class="breath-text" id="phase-text">${t.inhale}</div>
    </div>
    <div style="text-align:center;width:100%">
      <div id="time-display" style="font-size:36px;font-weight:300;letter-spacing:1px;margin-bottom:16px">${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px;flex-wrap:wrap">
        <span style="font-size:11px;align-self:center;margin-right:2px" class="muted">${t.sounds}:</span>
        ${[['none','none'],['rain','rain'],['forest','forest'],['ocean','ocean']].map(([k,v])=>`<button class="sound-pill" data-sound="${v}" data-active="${state.sound===v}">${t[k]}</button>`).join('')}
      </div>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn-ghost" data-act="toggle-pause" style="padding:12px 28px">${m.paused?t.resume:t.pause}</button>
        <button class="btn-ghost" data-act="finish-session" style="padding:12px 28px">${t.finish}</button>
      </div>
    </div>
  </div>`;
}

function screenComplete(state, t) {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 10px;min-height:520px">
    <div class="cap-mascot" style="margin-bottom:24px">${Cap(160)}</div>
    <h1 class="serif" style="font-size:26px;margin:0 0 10px;font-weight:400">${t.completed}</h1>
    <p class="muted" style="font-size:14px;margin:0 0 30px">${t.completedSub}</p>
    <div class="thought-card" style="text-align:center;font-size:15px;margin-bottom:26px;border-left:none;border-radius:0;padding:18px 0;background:transparent">${t.quotes[state.goal]||t.quotes.anxiety}</div>
    <button class="btn-primary" data-act="back-home" style="max-width:240px">${t.backHome}</button>
  </div>`;
}
