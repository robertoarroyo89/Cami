const customThoughts = {
  es: {
    anxiety: [
      "Esta sensación es temporal, como una nube que pasa.",
      "Mi respiración es mi ancla en este momento.",
      "No tengo que resolverlo todo ahora mismo.",
      "Soy más grande que esta preocupación.",
      "Cada exhalación libera un poco más de tensión."
    ],
    sleep: [
      "Mi cuerpo sabe descansar, solo necesita permiso.",
      "Suelto el día con cada respiración.",
      "No hay nada urgente en este instante.",
      "La quietud me espera, paciente.",
      "Me permito no hacer nada."
    ],
    focus: [
      "Una cosa a la vez es suficiente.",
      "Mi atención es un regalo, lo entrego aquí.",
      "Las distracciones pasan, mi propósito permanece.",
      "Vuelvo amablemente, una y otra vez.",
      "Esto es lo único que importa ahora."
    ],
    gratitude: [
      "Hay tanto que dar por sentado y agradecer.",
      "Este cuerpo, este aliento, este día.",
      "Las pequeñas cosas son las grandes cosas.",
      "Recuerdo a quien me ha sostenido.",
      "La vida es un préstamo precioso."
    ],
    selfworth: [
      "Mi valor no depende de lo que produzco.",
      "Soy suficiente, tal y como soy ahora.",
      "Me hablo con la misma bondad que daría a alguien querido.",
      "Mis errores no me definen, mis intenciones sí.",
      "Merezco ocupar mi espacio en el mundo."
    ],
    clarity: [
      "Las respuestas llegan cuando dejo de perseguirlas.",
      "Lo importante se distingue solo cuando hay silencio.",
      "Puedo no saber, y aun así estar bien.",
      "Una decisión a la vez, sin prisa.",
      "La claridad nace del descanso, no del esfuerzo."
    ],
    patience: [
      "Las cosas suceden a su tiempo, no al mío.",
      "Espero sin ansiedad, confío sin urgencia.",
      "El proceso también es parte del camino.",
      "No tengo que forzar nada ahora.",
      "Lo bueno crece despacio."
    ],
    energy: [
      "Mi descanso es tan productivo como mi acción.",
      "Suelto lo que me pesa, abrazo lo que me sostiene.",
      "Mi cuerpo me pide cuidado y le respondo.",
      "Restaurar es también avanzar.",
      "Vuelvo a mi centro y desde ahí me muevo."
    ],
    general: [
      "Estoy exactamente donde necesito estar.",
      "Mi mente puede descansar ahora.",
      "Lo que siento es válido y pasajero.",
      "Me trato con la misma ternura que daría a un amigo.",
      "Vuelvo siempre a la respiración."
    ]
  },
  en: {
    anxiety: [
      "This feeling is temporary, like a passing cloud.",
      "My breath is my anchor in this moment.",
      "I don't have to fix everything right now.",
      "I am bigger than this worry.",
      "Each exhale releases a little more tension."
    ],
    sleep: [
      "My body knows how to rest — it just needs permission.",
      "I let the day go with every breath.",
      "Nothing is urgent in this instant.",
      "Stillness is waiting, patiently.",
      "I give myself permission to do nothing."
    ],
    focus: [
      "One thing at a time is enough.",
      "My attention is a gift — I offer it here.",
      "Distractions pass, my purpose remains.",
      "I return gently, again and again.",
      "This is the only thing that matters now."
    ],
    gratitude: [
      "There is so much to take for granted and be thankful for.",
      "This body, this breath, this day.",
      "Small things are the big things.",
      "I remember those who have held me.",
      "Life is a precious loan."
    ],
    selfworth: [
      "My worth doesn't depend on what I produce.",
      "I am enough, just as I am now.",
      "I speak to myself with the kindness I'd give a loved one.",
      "My mistakes don't define me, my intentions do.",
      "I deserve to take up space in this world."
    ],
    clarity: [
      "Answers arrive when I stop chasing them.",
      "What matters becomes clear only in silence.",
      "I can not know, and still be okay.",
      "One decision at a time, without rush.",
      "Clarity is born from rest, not effort."
    ],
    patience: [
      "Things happen on their own time, not mine.",
      "I wait without anxiety, trust without urgency.",
      "The process is also part of the path.",
      "I don't have to force anything now.",
      "Good things grow slowly."
    ],
    energy: [
      "My rest is as productive as my action.",
      "I release what weighs me down, embrace what holds me up.",
      "My body asks for care, and I respond.",
      "Restoring is also moving forward.",
      "I return to my center, and from there I move."
    ],
    general: [
      "I am exactly where I need to be.",
      "My mind can rest now.",
      "What I feel is valid and passing.",
      "I treat myself with the kindness I'd give a friend.",
      "I always return to the breath."
    ]
  }
};

function detectTopicKey(text) {
  const t = (text || "").toLowerCase();
  if (/ansi|anxie|stress|estr[eé]s|worry|preocup|nervi/.test(t)) return 'anxiety';
  if (/sleep|sue[ñn]o|insom|dorm|tired|cans/.test(t)) return 'sleep';
  if (/focus|foco|concentr|distra|atenc/.test(t)) return 'focus';
  if (/grat|thank|agradec|aprec/.test(t)) return 'gratitude';
  if (/autoestim|self.?worth|valgo|valor[ae]?|insegur|confianza/.test(t)) return 'selfworth';
  if (/clari|claridad|confus|fog|niebla|decid/.test(t)) return 'clarity';
  if (/pacien|patient|prisa|rush|esper/.test(t)) return 'patience';
  if (/energ[ií]a|cans|agotad|tired|exhaust|fatig/.test(t)) return 'energy';
  return 'general';
}
