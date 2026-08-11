---
title: "Grupo Z&H: un sitio de servicios contables con SEO local en 40 ciudades"
description: "Cómo construimos grupozh.net, el sitio de una firma de servicios contables en Honduras: páginas por ciudad, blog en Markdown y preparación para buscadores de IA."
date: "2026-08-11"
keywords:
  - contadores en Honduras
  - SEO local por ciudad
  - sitio web para firma contable
  - páginas de ciudad para negocios
faq:
  - question: "¿Qué es Grupo Z&H?"
    answer: "Grupo Z&H es una firma de servicios contables en Honduras, y grupozh.net es su sitio web. Ofrece contabilidad para pequeñas empresas, declaraciones de impuestos, solución de problemas fiscales, formalización y trámites, y asesoría fiscal continua."
  - question: "¿Sirve de algo tener una página por ciudad en un sitio web?"
    answer: "Sirve cuando cada página aporta contenido propio y responde a una búsqueda real, como \"contadores en Choluteca\". No sirve, y puede penalizarse, cuando son copias del mismo texto con el nombre de la ciudad cambiado, porque eso es contenido duplicado sin valor para quien lo lee."
  - question: "¿Por qué un sitio de servicios profesionales necesita un blog?"
    answer: "Porque la mayoría de las búsquedas de un cliente potencial no son \"contador en mi ciudad\", sino la duda concreta que tiene: qué pasa si presentó tarde una declaración, cómo se formaliza un negocio o qué obligaciones tiene una empresa nueva. Un artículo que responde esa duda es lo que hace que esa persona llegue al sitio antes de saber que necesita contratar a alguien."
  - question: "¿Qué es un archivo llms.txt y para qué sirve en un sitio de negocio?"
    answer: "Es un resumen del sitio escrito en texto plano para que lo lean modelos de lenguaje: qué hace el negocio, qué servicios ofrece, cómo se le contacta y qué contiene cada página. Sirve para que un asistente como ChatGPT o Perplexity pueda citar la información correcta en lugar de deducirla o inventarla."
---

En este blog hablamos con frecuencia de presencia en línea para negocios en
Honduras. [Grupo Z&H](https://grupozh.net) es uno de nuestros proyectos y sirve
bien como ejemplo concreto de esa estrategia aplicada de principio a fin: una
firma de servicios contables, un sitio estático, y un trabajo de SEO local en
cuarenta ciudades.

Vale la pena desmontarlo, porque casi todo lo que tiene se puede aplicar a
cualquier negocio de servicios profesionales: una clínica, un bufete, un taller,
una constructora.

## Lo primero: qué vende y para quién

El sitio organiza cinco servicios, con nombres escritos como los diría un cliente
y no como los diría un contador:

- Contabilidad para pequeñas empresas
- Declaraciones de impuestos
- Solución de problemas con impuestos
- Formalización y trámites
- Asesoría fiscal continua

Ese tercero es el más interesante desde el punto de vista comercial. "Solución de
problemas con impuestos" no es un servicio que se le ocurra listar a la mayoría
de las firmas, pero es exactamente el estado mental de la persona que busca con
más urgencia: alguien que ya tiene un problema encima. Nombrar el servicio por el
problema del cliente, y no por la tarea técnica, es de las decisiones que más
rinden y no cuesta nada.

## Cuarenta páginas de ciudad, y por qué no son copias

El sitio tiene una sección de "Contadores en [Ciudad]" que cubre cuarenta
localidades hondureñas: Tegucigalpa, San Pedro Sula, La Ceiba, Choloma, El
Progreso, Choluteca, Comayagua, Puerto Cortés y muchas más.

Esta técnica tiene mala fama, y con razón, porque casi siempre se hace mal. La
versión mala consiste en escribir un texto y duplicarlo cuarenta veces cambiando
el nombre de la ciudad. Para un buscador eso es contenido duplicado sin valor, y
para quien lo lee es evidente a los tres segundos.

La versión que funciona exige que cada página tenga algo propio que decir sobre
ese lugar, y que lo que afirme sea verdad. Aquí conviene ser explícito sobre un
límite que respetamos también en nuestro propio sitio: **una página de ciudad no
puede insinuar que hay una oficina donde no la hay**. Es contenido local, no una
sede. Decir "podemos atender a negocios en X" es honesto; decir "nuestra sucursal
en X" cuando no existe es mentir, y además es el tipo de afirmación que los
buscadores acaban comprobando.

Las páginas se generan desde un único archivo de datos con las ciudades. Añadir
una es añadir una entrada: no hay que tocar código ni duplicar una plantilla a
mano, y por eso el conjunto no se desincroniza.

## Veintiún artículos que responden dudas reales

El blog está en Markdown, sin base de datos: cada artículo es un archivo y
publicar es añadirlo.

Lo relevante no es el formato sino el criterio editorial. Cada artículo tiene que
llevar dos piezas obligatorias:

- Un **`tldr`**: la respuesta corta y directa a la pregunta central, en dos o tres
  frases, que se muestra en un bloque de "respuesta rápida" arriba del todo.
- Entre cuatro y seis **preguntas frecuentes**, con las dudas reales de un dueño
  de negocio y respuestas que se entiendan sin haber leído el artículo.

Ese último requisito parece un detalle de estilo y es lo contrario. Esas
respuestas se citan sueltas, fuera de la página, en el resultado de un buscador o
en la respuesta de un asistente. Una que empiece por "como vimos antes" no sirve
para nada en ese contexto.

## Preparado para que lo citen los buscadores de IA

Cada vez más gente pregunta directamente a ChatGPT, Perplexity o Gemini en lugar
de buscar y hacer clic. Eso cambia el trabajo: ya no basta con posicionar una
página, hay que ponérselo fácil a un modelo para que extraiga el dato correcto.

En grupozh.net eso se traduce en tres cosas concretas:

- **`FAQPage` visible en todas partes**: portada, servicios, los veintiún
  artículos y las cuarenta páginas de ciudad. Las preguntas están en el texto que
  ve el visitante y, a la vez, declaradas como datos estructurados. Nunca solo en
  los datos: marcar una pregunta que la página no muestra va contra las guías y
  se penaliza.
- **Un archivo `/llms.txt`** con el resumen del negocio en texto plano —servicios,
  contacto, artículos y ciudades—, generado desde las mismas fuentes que las
  páginas, así que un artículo nuevo aparece ahí solo.
- **Un `robots.txt`** que permite explícitamente a los rastreadores de IA
  (GPTBot, ClaudeBot, PerplexityBot, Applebot-Extended y compañía). Si no se les
  nombra, no está garantizado que el sitio entre en sus respuestas.

## Estático, gratis de operar y difícil de tumbar

El sitio está hecho con Astro y Tailwind, se genera estático y se publica solo al
hacer push. No hay servidor de aplicaciones ni base de datos que mantener,
actualizar o rescatar un domingo.

Para un negocio de servicios profesionales esto es casi siempre la elección
correcta. El coste de operación es mínimo, el sitio carga rápido desde cualquier
conexión, y la superficie de ataque es prácticamente nula: no hay panel de
administración que hackear ni base de datos que filtrar.

El contacto va por WhatsApp, que es como la gente en Honduras realmente escribe a
un negocio, en lugar de un formulario que manda un correo que nadie lee.

## Lo mismo, para tu negocio

Nada de lo que describimos aquí es exclusivo de una firma contable. Servicios
nombrados como los busca el cliente, páginas locales honestas, artículos que
responden dudas concretas y un sitio rápido que se pueda citar: eso funciona para
casi cualquier negocio de servicios.

Podés ver el resultado en [grupozh.net](https://grupozh.net). Y si querés algo
así para el tuyo, [hablemos](/contacto).
