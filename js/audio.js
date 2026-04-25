const audio = { ctx: null, nodes: [], gain: null, current: 'none' };

function ensureCtx() {
  if (!audio.ctx) {
    try {
      audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return false;
    }
  }
  if (audio.ctx.state === 'suspended') audio.ctx.resume();
  return true;
}

function stopSound() {
  audio.nodes.forEach(n => {
    try { n.stop && n.stop(); n.disconnect && n.disconnect(); } catch (e) {}
  });
  audio.nodes = [];
  if (audio.gain) {
    try { audio.gain.disconnect(); } catch (e) {}
    audio.gain = null;
  }
  audio.current = 'none';
}

function playSound(kind) {
  stopSound();
  if (kind === 'none') return;
  if (!ensureCtx()) return;

  const ctx = audio.ctx;
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.2);
  audio.gain = master;

  const bufSec = 2;
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(1, sr * bufSec, sr);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;

  if (kind === 'rain') {
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 900; hp.Q.value = 0.7;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 6000;
    const g = ctx.createGain(); g.gain.value = 0.55;
    noise.connect(hp); hp.connect(lp); lp.connect(g); g.connect(master);
    noise.start();
    audio.nodes.push(noise, hp, lp, g);
  } else if (kind === 'forest') {
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1800;
    const g = ctx.createGain(); g.gain.value = 0.4;
    noise.connect(lp); lp.connect(g); g.connect(master);
    noise.start();
    audio.nodes.push(noise, lp, g);
    const chirp = () => {
      if (audio.current !== 'forest' || !audio.ctx) return;
      const o = ctx.createOscillator(); o.type = 'sine';
      const f = 1800 + Math.random() * 1400;
      o.frequency.value = f;
      const eg = ctx.createGain(); eg.gain.value = 0;
      o.connect(eg); eg.connect(master);
      const now = ctx.currentTime;
      eg.gain.linearRampToValueAtTime(0.06, now + 0.05);
      o.frequency.linearRampToValueAtTime(f * 1.2, now + 0.12);
      eg.gain.linearRampToValueAtTime(0, now + 0.18);
      o.start(now); o.stop(now + 0.22);
      setTimeout(chirp, 1800 + Math.random() * 3200);
    };
    setTimeout(chirp, 800);
  } else if (kind === 'ocean') {
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 600;
    const g = ctx.createGain(); g.gain.value = 0.55;
    noise.connect(lp); lp.connect(g); g.connect(master);
    noise.start();
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.5;
    lfo.connect(lfoGain); lfoGain.connect(g.gain);
    lfo.start();
    audio.nodes.push(noise, lp, g, lfo, lfoGain);
  }
  audio.current = kind;
}
