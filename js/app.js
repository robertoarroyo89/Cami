const defaultState = {
  lang: 'es',
  light: false,
  step: 'welcome',
  name: '',
  exp: '',
  goal: '',
  duration: 12,
  tab: 'home',
  sound: 'none',
  customInput: '',
  thoughts: [],
  technique: 'relax',
  onboarded: false,
  completedDates: [],
  totalMinutes: 0,
  streak: 0,
  meditation: { active: false, paused: false, phaseIdx: 0, timeLeft: 0, silence: false }
};

let state = Object.assign({}, defaultState);
const persisted = loadState();
if (persisted) {
  state = Object.assign({}, defaultState, persisted);
  state.meditation = { active: false, paused: false, phaseIdx: 0, timeLeft: 0, silence: false };
  state.thoughts = [];
  state.customInput = '';
  if (state.onboarded) {
    state.step = 'app';
    state.tab = 'home';
  } else {
    state.step = 'welcome';
  }
}

let breathTimeout = null;
let sessionTimer = null;
const t = () => i18n[state.lang];

function render() {
  const app = document.getElementById('app');
  app.classList.toggle('light', state.light);
  const scr = document.getElementById('screen');
  const tabs = document.getElementById('tabs');
  if (state.step === 'app') {
    tabs.style.display = 'flex';
    renderTabs();
  } else {
    tabs.style.display = 'none';
  }

  if (state.step === 'welcome') scr.innerHTML = screenWelcome(state, t());
  else if (state.step === 'name') scr.innerHTML = screenName(state, t());
  else if (state.step === 'exp') scr.innerHTML = screenExp(state, t());
  else if (state.step === 'goal') scr.innerHTML = screenGoal(state, t());
  else if (state.step === 'app') {
    if (state.tab === 'home') scr.innerHTML = screenHome(state, t());
    else if (state.tab === 'custom') scr.innerHTML = screenCustom(state, t());
    else if (state.tab === 'cal') scr.innerHTML = screenCal(state, t());
    else if (state.tab === 'me') scr.innerHTML = screenMe(state, t());
  }
  else if (state.step === 'breathing') scr.innerHTML = screenBreathing(state, t());
  else if (state.step === 'complete') scr.innerHTML = screenComplete(state, t());

  bind();
}

function renderTabs() {
  const tabs = document.getElementById('tabs');
  const list = [
    ['home', 'M3 12l9-9 9 9 M5 10v11h14V10'],
    ['custom', 'M4 6h16 M4 12h16 M4 18h10'],
    ['cal', 'M5 4h14v16H5z M5 9h14 M9 4v3 M15 4v3'],
    ['me', 'M12 12a4 4 0 100-8 4 4 0 000 8z M4 21c0-4 4-7 8-7s8 3 8 7']
  ];
  tabs.innerHTML = list.map(([k, p]) => `<button class="tab ${state.tab===k?'active':''}" data-tab="${k}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p.split(' M').map((seg,i)=>`<path d="${i===0?seg:'M'+seg}"/>`).join('')}</svg><span>${t()[k]}</span></button>`).join('');
  tabs.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { state.tab = b.dataset.tab; render(); });
}

function bind() {
  document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { state.lang = b.dataset.lang; saveState(state); render(); });
  document.querySelectorAll('[data-act="next-name"]').forEach(b => b.onclick = () => { state.step = 'name'; render(); });
  document.querySelectorAll('[data-act="save-name"]').forEach(b => b.onclick = () => {
    const v = document.getElementById('name-in').value.trim();
    if (v) { state.name = v; state.step = 'exp'; saveState(state); render(); }
  });
  document.querySelectorAll('[data-exp]').forEach(b => b.onclick = () => { state.exp = b.dataset.exp; state.step = 'goal'; saveState(state); render(); });
  document.querySelectorAll('[data-goal]').forEach(b => b.onclick = () => {
    state.goal = b.dataset.goal;
    state.onboarded = true;
    state.step = 'app';
    state.tab = 'home';
    saveState(state);
    render();
  });

  document.querySelectorAll('[data-goal-profile]').forEach(b => b.onclick = () => {
    state.goal = b.dataset.goalProfile;
    saveState(state);
    render();
  });

  document.querySelectorAll('[data-tech]').forEach(b => b.onclick = () => {
    state.technique = b.dataset.tech;
    document.querySelectorAll('[data-tech]').forEach(x => x.setAttribute('data-active', x.dataset.tech === state.technique));
    saveState(state);
  });
  document.querySelectorAll('[data-dur]').forEach(b => b.onclick = () => {
    state.duration = parseInt(b.dataset.dur);
    document.querySelectorAll('[data-dur]').forEach(x => x.setAttribute('data-active', parseInt(x.dataset.dur) === state.duration));
    const startBtn = document.querySelector('[data-act="start-session"]');
    if (startBtn) startBtn.textContent = `${t().startSession} • ${state.duration} ${t().min}`;
    saveState(state);
  });

  document.querySelectorAll('[data-act="start-session"]').forEach(b => b.onclick = () => startSession(false));
  document.querySelectorAll('[data-act="start-silence"]').forEach(b => b.onclick = () => startSession(true));
  document.querySelectorAll('[data-act="toggle-pause"]').forEach(b => b.onclick = togglePause);
  document.querySelectorAll('[data-act="finish-session"]').forEach(b => b.onclick = finishSession);
  document.querySelectorAll('[data-act="back-home"]').forEach(b => b.onclick = () => { state.step = 'app'; state.tab = 'home'; render(); });
  document.querySelectorAll('[data-act="toggle-light"]').forEach(b => b.onclick = () => { state.light = !state.light; saveState(state); render(); });

  document.querySelectorAll('[data-sound]').forEach(b => b.onclick = () => {
    const v = b.dataset.sound;
    state.sound = v;
    document.querySelectorAll('[data-sound]').forEach(x => x.setAttribute('data-active', x.dataset.sound === state.sound));
    playSound(v);
  });

  const ci = document.getElementById('custom-in');
  if (ci) ci.oninput = e => { state.customInput = e.target.value; };

  document.querySelectorAll('[data-act="generate-thoughts"]').forEach(b => b.onclick = () => {
    if (!state.customInput.trim()) return;
    const key = detectTopicKey(state.customInput);
    const pool = customThoughts[state.lang][key];
    state.thoughts = [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
    render();
  });
}

function startSession(silence) {
  state.step = 'breathing';
  state.meditation = { active: true, paused: false, phaseIdx: 0, timeLeft: state.duration * 60, elapsed: 0, silence };
  render();
  setTimeout(() => { startBreathCycle(); startCountdown(); }, 150);
}

function startBreathCycle() {
  if (!state.meditation.active) return;
  if (state.meditation.paused) return;
  const tech = techniques[state.technique];
  const phase = tech.phases[state.meditation.phaseIdx];
  const r1 = document.getElementById('r1'), r2 = document.getElementById('r2'), r3 = document.getElementById('r3');
  const phaseText = document.getElementById('phase-text');
  if (!r1 || !r2 || !r3 || !phaseText) { breathTimeout = setTimeout(startBreathCycle, 300); return; }
  const targetScale = phase.scale * 2.4;
  const isHold = phase.name === 'hold' || phase.name === 'rest';
  const easing = isHold ? 'linear' : 'cubic-bezier(.45,.05,.55,.95)';
  [r1, r2, r3].forEach(el => {
    el.style.transition = `transform ${phase.dur}s ${easing}, opacity ${phase.dur}s ease`;
    el.style.transform = `scale(${targetScale})`;
  });
  let label = t()[phase.name] || t().observe;
  if (state.technique === 'natural') label = t().observe;
  phaseText.style.opacity = '0';
  setTimeout(() => {
    const el = document.getElementById('phase-text');
    if (el) { el.textContent = label; el.style.opacity = '1'; }
  }, 250);
  state.meditation.phaseIdx = (state.meditation.phaseIdx + 1) % tech.phases.length;
  breathTimeout = setTimeout(startBreathCycle, phase.dur * 1000);
}

function startCountdown() {
  if (sessionTimer) clearInterval(sessionTimer);
  sessionTimer = setInterval(() => {
    if (!state.meditation.active) { clearInterval(sessionTimer); return; }
    if (state.meditation.paused) return;
    state.meditation.timeLeft--;
    state.meditation.elapsed = (state.meditation.elapsed || 0) + 1;
    const el = document.getElementById('time-display');
    if (el) {
      const mm = Math.floor(state.meditation.timeLeft / 60), ss = state.meditation.timeLeft % 60;
      el.textContent = `${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
    }
    if (state.meditation.timeLeft <= 0) finishSession();
  }, 1000);
}

function togglePause() {
  state.meditation.paused = !state.meditation.paused;
  const btn = document.querySelector('[data-act="toggle-pause"]');
  if (btn) btn.textContent = state.meditation.paused ? t().resume : t().pause;

  const r1 = document.getElementById('r1'), r2 = document.getElementById('r2'), r3 = document.getElementById('r3');
  if (state.meditation.paused) {
    [r1, r2, r3].forEach(el => {
      if (!el) return;
      const cs = getComputedStyle(el).transform;
      el.style.transition = 'none';
      el.style.transform = cs === 'none' ? 'scale(1)' : cs;
    });
  } else {
    setTimeout(() => { startBreathCycle(); }, 50);
  }
}

function finishSession() {
  state.meditation.active = false;
  if (breathTimeout) clearTimeout(breathTimeout);
  if (sessionTimer) clearInterval(sessionTimer);
  stopSound();
  const elapsedSec = state.meditation.elapsed || 0;
  if (elapsedSec >= 30) {
    const minutesDone = Math.max(1, Math.round(elapsedSec / 60));
    recordSession(state, minutesDone);
  }
  state.step = 'complete';
  render();
}

render();
