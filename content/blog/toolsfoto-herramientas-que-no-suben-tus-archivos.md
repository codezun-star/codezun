---
title: "ToolsFoto: más de 240 herramientas que no suben tus archivos a ningún servidor"
description: "Qué es ToolsFoto, nuestra plataforma de herramientas para imagen, PDF, vídeo, audio y desarrollo, con todo el procesamiento ocurriendo dentro del navegador."
date: "2026-08-11"
keywords:
  - comprimir imágenes online
  - unir y dividir PDF
  - convertir vídeo online
  - herramientas online sin subir archivos
faq:
  - question: "¿Qué es ToolsFoto?"
    answer: "ToolsFoto es una plataforma web, en toolsfoto.com, con más de 240 herramientas para trabajar con archivos: 60 de imagen, 43 de PDF, 42 de vídeo, 53 de audio y 43 para desarrolladores. Todas procesan los archivos dentro del navegador."
  - question: "¿Es seguro subir un documento con datos personales a una web para convertirlo?"
    answer: "En la mayoría de convertidores online el archivo se sube de verdad a un servidor ajeno, donde se procesa y se guarda un tiempo. Para un contrato, una nómina o un documento de identidad eso supone entregar el archivo a un tercero. Las herramientas que procesan en el propio navegador evitan el problema porque el archivo nunca sale del dispositivo."
  - question: "¿Se puede convertir un vídeo sin subirlo a internet?"
    answer: "Sí. Existe una versión de FFmpeg compilada a WebAssembly que se ejecuta dentro del navegador, así que la conversión ocurre en tu propia máquina. Es algo más lenta que en un servidor potente, porque usa el procesador de tu equipo, pero el archivo no viaja a ninguna parte."
  - question: "¿Cómo sé si una herramienta online sube mis archivos o no?"
    answer: "Un indicio fiable es la velocidad con archivos grandes: si un vídeo de 500 MB queda listo casi al instante y tu conexión de subida es lenta, no se subió. La comprobación segura es abrir las herramientas de desarrollo del navegador, en la pestaña de red, y mirar si hay una petición saliente con el peso del archivo."
---

Necesitás comprimir una imagen, unir dos PDF o pasar un audio a MP3. Buscás en
internet, entrás en la primera web que aparece y arrastrás el archivo. Y en ese
momento, sin pensarlo demasiado, acabás de mandar ese archivo a un servidor de
alguien que no conocés.

Casi siempre no pasa nada. Pero si ese PDF era un contrato, una nómina o el
escaneo de un documento de identidad, acabás de entregárselo a un tercero cuyas
políticas de retención no leíste.

[ToolsFoto](https://toolsfoto.com) es nuestro proyecto propio construido sobre la
premisa contraria: **el archivo no se sube**.

## Más de 240 herramientas, cinco familias

El catálogo está repartido así:

- **Imagen (60):** comprimir, redimensionar, convertir entre formatos, recortar,
  ajustar niveles y HSB, ampliar, quitar fondo, y un largo etcétera.
- **PDF (43):** unir, dividir, comprimir, rotar, añadir texto o imágenes, aplanar,
  proteger, extraer páginas.
- **Vídeo (42):** convertir, recortar, comprimir, extraer audio, añadir
  subtítulos, ajustar color y volumen.
- **Audio (53):** convertir entre formatos, recortar, ajustar volumen, aplicar
  fundidos, afinar, analizar el espectro, añadir silencio.
- **Desarrollo (43):** codificar y decodificar Base64, formatear JSON, generar
  hashes, convertir colores y demás utilidades del día a día.

Cada una vive en su propia dirección, con su título, su descripción y sus
preguntas frecuentes. Quien busca "convertir AAC a MP3" llega a esa herramienta,
no a una portada donde tenga que encontrarla.

## Cómo se procesa un vídeo sin servidor

La parte de imágenes y PDF es relativamente directa: el navegador lleva años
sabiendo manipular imágenes, y existen librerías maduras para leer y escribir PDF
desde JavaScript.

El vídeo y el audio son otra historia, y aquí está la pieza interesante:
**FFmpeg compilado a WebAssembly**. FFmpeg es la herramienta con la que
prácticamente todo el mundo procesa vídeo, normalmente en un servidor. Al
compilarla a WebAssembly —un formato que el navegador ejecuta a velocidad cercana
a la nativa— pasa a correr dentro de la pestaña, usando el procesador de tu
propio equipo.

La contrapartida honesta es la velocidad. Un servidor dedicado convierte más
rápido que tu portátil, y la primera vez hay que descargar el motor, que no es
pequeño. A cambio, el archivo no sale de tu máquina, no hay cola de espera, no
hay límite de tamaño impuesto por el ancho de banda de nadie y no hay una copia
de tu vídeo en un disco ajeno.

Nos pareció el intercambio correcto para el tipo de archivos con los que la gente
trabaja.

## Cómo comprobarlo vos mismo

Una afirmación de privacidad que hay que creerse por fe no vale mucho, así que
esta se puede verificar en treinta segundos y sin conocimientos técnicos:

1. Abrí las herramientas de desarrollo del navegador (F12 en la mayoría).
2. Entrá en la pestaña **Red**.
3. Cargá un archivo grande en cualquier herramienta y procesalo.

Si el archivo se estuviera subiendo, verías una petición saliente pesando lo
mismo que el archivo, y tardaría lo que tarde tu conexión de subida. No la vas a
ver. Es la misma comprobación que recomendamos hacer en cualquier otra web que
prometa lo mismo.

## Una herramienta, una página, cinco preguntas

Un catálogo de este tamaño obliga a decidir cómo se organiza, y la respuesta fácil
—una sola aplicación con un menú de doscientas cuarenta opciones— es la peor para
quien busca.

Nadie busca "plataforma de herramientas para archivos". La gente busca "reducir el
peso de un PDF", "quitar el fondo de una imagen" o "extraer el audio de un vídeo".
Por eso cada herramienta tiene su propia dirección, su título, su descripción y un
mínimo de cinco preguntas frecuentes escritas para esa herramienta concreta.

Esas preguntas no están para rellenar. Son las dudas que aparecen justo cuando
alguien va a usar la herramienta: en qué formato conviene exportar, qué se pierde
al comprimir, por qué el archivo resultante pesa más de lo esperado. Contestarlas
en la propia página evita que la persona tenga que salir a buscarlas, y hace que
la página pueda aparecer también para esa segunda búsqueda.

Es trabajo repetitivo y hay que sostenerlo doscientas cuarenta veces. En el
proyecto está resuelto con una regla explícita: añadir una herramienta implica
registrarla en el catálogo, darle sus metadatos, crear su componente, crear su
página con sus preguntas y documentarla. Si un paso falta, la herramienta queda a
medias y se nota. Escribirlo como una lista obligatoria es lo que impide que el
sitio se degrade a medida que crece.

## Sin cuentas y sin límites artificiales

No hay registro, ni base de datos, ni autenticación. No hay un plan gratis que te
deje procesar tres archivos al día para venderte el de pago. Esas limitaciones
existen porque procesar en servidor cuesta dinero por archivo; cuando el trabajo
lo hace el equipo del usuario, ese coste no existe y la limitación no tendría más
motivo que forzar la conversión.

## Por qué construimos esto

ToolsFoto es un proyecto propio de Codezun y, de paso, la prueba a escala de una
idea que aplicamos también en encargos de clientes: mucho de lo que por costumbre
se manda a un servidor puede resolverse en el navegador, y casi siempre sale
mejor —más rápido, más barato de operar y con menos datos ajenos bajo custodia—.

Un sitio con más de doscientas cuarenta herramientas y trescientas páginas
también obliga a resolver bien las cosas aburridas: que el catálogo se mantenga
coherente, que cada página tenga sus datos estructurados, que el sitio siga
cargando rápido cuando crece. Es el tipo de disciplina que después se nota en
proyectos ajenos.

## Usalo

[toolsfoto.com](https://toolsfoto.com) está abierto y es gratis. Si trabajás con
documentos que preferirías no mandar a un servidor desconocido, empezá por ahí.

Y si tu negocio necesita una herramienta a medida que procese archivos sin
custodiar datos de terceros, [hablemos](/contacto).
