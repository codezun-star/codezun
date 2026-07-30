/**
 * Rastreadores de los motores de respuestas.
 *
 * Un `User-agent: *` que permite todo ya los deja pasar, así que nombrarlos
 * puede parecer redundante. No lo es, por tres razones.
 *
 * La primera es cómo se lee robots.txt: un rastreador obedece **un solo**
 * grupo, el más específico que coincida con su nombre, e ignora `*` por
 * completo. Es decir que, en cuanto alguien añada una regla suya, el bloque
 * `*` deja de aplicarles — y una regla escrita para tapar un directorio
 * privado puede acabar cerrando el sitio entero a los asistentes sin que nadie
 * se dé cuenta. Teniendo el grupo escrito, el permiso es explícito y la
 * próxima persona que toque el archivo lo ve.
 *
 * La segunda es que dos de estos nombres no son rastreadores sino
 * interruptores: `Google-Extended` y `Applebot-Extended` no descargan nada,
 * solo deciden si el contenido ya rastreado puede usarse para responder en
 * Gemini y en Apple Intelligence. Solo existen aquí.
 *
 * La tercera es la distinción entre índice y visita: `GPTBot` o `ClaudeBot`
 * rastrean para construir un índice, mientras que `ChatGPT-User`,
 * `Claude-User` y `Perplexity-User` van a buscar la página **en el momento**
 * en que alguien pregunta algo. Bloquear los segundos no protege nada: la
 * visita ya la pidió una persona. Pero deja al asistente respondiendo de
 * memoria en lugar de con la página real, que es la peor de las dos opciones.
 */
export const ANSWER_ENGINE_CRAWLERS = [
  // OpenAI: índice de búsqueda, rastreo general y visita a petición del usuario.
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  // Anthropic (Claude).
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity: índice y visita a petición.
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini y las respuestas generadas en Search) y Apple Intelligence.
  // No descargan nada por su cuenta: autorizan el uso de lo ya rastreado.
  "Google-Extended",
  "Applebot-Extended",
  // Los asistentes del resto de buscadores.
  "DuckAssistBot",
  "Amazonbot",
  "MistralAI-User",
  "cohere-ai",
  "meta-externalagent",
] as const;
