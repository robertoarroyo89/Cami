const STORAGE_KEY = 'cami-app-v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveState(s) {
  try {
    const persist = {
      lang: s.lang,
      light: s.light,
      name: s.name,
      exp: s.exp,
      goal: s.goal,
      duration: s.duration,
      technique: s.technique,
      onboarded: s.onboarded || false,
      completedDates: s.completedDates || [],
      totalMinutes: s.totalMinutes || 0,
      streak: s.streak || 0,
      lastSession: s.lastSession || null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  } catch (e) {}
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function recordSession(state, minutes) {
  const today = todayISO();
  state.completedDates = state.completedDates || [];
  if (!state.completedDates.includes(today)) {
    state.completedDates.push(today);
  }
  state.totalMinutes = (state.totalMinutes || 0) + minutes;

  const sorted = [...state.completedDates].sort();
  let streak = 0;
  let cursor = new Date();
  for (let i = 0; i < 365; i++) {
    const iso = cursor.toISOString().slice(0, 10);
    if (sorted.includes(iso)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  state.streak = streak;
  state.lastSession = today;
  saveState(state);
}
