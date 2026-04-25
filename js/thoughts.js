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
    selflove: [
      "Merezco el mismo amor que doy a los demás.",
      "Soy suficiente, tal y como soy ahora.",
      "Me perdono por mis errores pasados.",
      "Cuidar de mí no es egoísta, es necesario.",
      "Acepto mis luces y mis sombras."
    ],
    stress: [
      "Suelto lo que no puedo controlar.",
      "Esta tormenta también pasará.",
      "Elijo la paz sobre la perfección.",
      "Mi valor no depende de mi productividad.",
      "Inhalo calma, exhalo presión."
    ],
    productivity: [
      "Hago lo mejor que puedo con lo que tengo.",
      "La claridad nace de la pausa.",
      "Me enfoco en el progreso, no en la perfección.",
      "Respeto mi ritmo natural.",
      "Menos es más cuando mi mente está presente."
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
    selflove: [
      "I deserve the same love I give others.",
      "I am enough, exactly as I am now.",
      "I forgive myself for past mistakes.",
      "Self-care is not selfish, it is vital.",
      "I embrace my lights and shadows."
    ],
    stress: [
      "I let go of what I cannot control.",
      "This storm will also pass.",
      "I choose peace over perfection.",
      "My worth is not tied to my productivity.",
      "Inhale calm, exhale pressure."
    ],
    productivity: [
      "I do my best with what I have.",
      "Clarity is born from pausing.",
      "I focus on progress, not perfection.",
      "I respect my natural rhythm.",
      "Less is more when my mind is present."
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
  if (/ansi|anxie|stress|estr[eé]s|worry|preocup|nervi/.test(t)) return 'stress';
  if (/sleep|sue[ñn]o|insom|dorm|tired|cans/.test(t)) return 'sleep';
  if (/focus|foco|concentr|distra|atenc|prod|work|trabaj/.test(t)) return 'productivity';
  if (/grat|thank|agradec|aprec/.test(t)) return 'gratitude';
  if (/love|amor|self|propio|estim|val/.test(t)) return 'selflove';
  return 'general';
}
