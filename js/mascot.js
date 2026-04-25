function Cap(s) {
  s = s || 64;
  return `<svg width="${s}" height="${s * 0.85}" viewBox="0 0 120 102" xmlns="http://www.w3.org/2000/svg" aria-label="Cami the capybara">
    <ellipse cx="60" cy="98" rx="56" ry="3" fill="#1a3a36" opacity=".4"/>
    <ellipse cx="60" cy="92" rx="50" ry="4" fill="#4a7d75" opacity=".55"/>
    <path d="M14 84 Q34 80 60 84 T106 84" stroke="#9ed1bb" stroke-width="1.2" fill="none" opacity=".7"/>
    <path d="M22 78 Q42 75 62 78 T102 78" stroke="#9ed1bb" stroke-width="1" fill="none" opacity=".5"/>
    <ellipse cx="60" cy="74" rx="36" ry="14" fill="#8a6240"/>
    <ellipse cx="60" cy="62" rx="30" ry="24" fill="#a87a52"/>
    <ellipse cx="44" cy="50" rx="5" ry="6" fill="#8a6240"/>
    <ellipse cx="76" cy="50" rx="5" ry="6" fill="#8a6240"/>
    <ellipse cx="44" cy="50" rx="2.5" ry="3.5" fill="#d4a584"/>
    <ellipse cx="76" cy="50" rx="2.5" ry="3.5" fill="#d4a584"/>
    <circle cx="48" cy="60" r="2.8" fill="#1a0f08"/>
    <circle cx="72" cy="60" r="2.8" fill="#1a0f08"/>
    <circle cx="48.8" cy="59.3" r="0.9" fill="#fff"/>
    <circle cx="72.8" cy="59.3" r="0.9" fill="#fff"/>
    <ellipse cx="60" cy="68" rx="3.5" ry="2.5" fill="#1a0f08"/>
    <path d="M52 73 Q60 76 68 73" stroke="#1a0f08" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="40" cy="68" rx="3.5" ry="2.2" fill="#e8a8a0" opacity=".55"/>
    <ellipse cx="80" cy="68" rx="3.5" ry="2.2" fill="#e8a8a0" opacity=".55"/>
  </svg>`;
}
