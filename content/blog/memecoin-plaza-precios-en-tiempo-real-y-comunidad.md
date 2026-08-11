---
title: "Memecoin Plaza: precios en tiempo real y foro de la comunidad"
description: "Qué es Memecoin Plaza, nuestro proyecto que cruza un rastreador de precios de meme coins con un foro: veinte monedas, gráficos históricos y comentarios por moneda."
date: "2026-08-11"
keywords:
  - precios de meme coins
  - dogecoin shiba inu pepe bonk
  - foro de criptomonedas en español
  - gráficos de criptomonedas
faq:
  - question: "¿Qué es Memecoin Plaza?"
    answer: "Memecoin Plaza es una web en memecoin.codezun.com que cruza un rastreador de precios de meme coins con un foro. Muestra veinte monedas con su precio actualizado, gráficos históricos y una ficha por moneda, y permite comentar y responder en el hilo de cada una."
  - question: "¿Qué es una meme coin?"
    answer: "Es una criptomoneda nacida de una broma o de una referencia de internet, como Dogecoin o Shiba Inu, cuyo valor depende sobre todo de la atención de una comunidad y no de un producto o unos ingresos. Eso las hace mucho más volátiles que otros activos y su precio puede moverse decenas de puntos porcentuales en un día."
  - question: "¿Cómo se actualiza el precio de una criptomoneda en una web sin recargar la página?"
    answer: "La página vuelve a pedir los datos al servidor cada cierto intervalo y sustituye solo los números que cambiaron, dejando el resto del contenido intacto. En Memecoin Plaza ese intervalo es de veinte segundos, así que el precio se refresca solo mientras la pestaña está abierta."
  - question: "¿Se puede instalar una web como si fuera una aplicación?"
    answer: "Sí. Una web que declara un manifiesto y registra un service worker puede añadirse a la pantalla de inicio del móvil y abrirse sin la barra del navegador. Se le llama aplicación web progresiva o PWA, y no requiere pasar por una tienda de aplicaciones."
---

[Memecoin Plaza](https://memecoin.codezun.com) es uno de nuestros proyectos
propios, y nació de una observación sencilla: la gente que sigue meme coins tiene
siempre dos pestañas abiertas. Una con el precio y otra con la conversación. Nos
pareció que tenían que ser la misma.

Antes de seguir, una aclaración que el propio sitio hace: las meme coins son
activos extremadamente volátiles, cuyo valor depende de la atención de una
comunidad y no de ingresos ni de un producto. Memecoin Plaza muestra datos y
aloja una conversación; no da consejo financiero ni recomienda comprar nada.

## Un tablero que se actualiza solo

La portada lista veinte monedas ordenadas por capitalización, cada una con su
logo, su precio, la variación de las últimas veinticuatro horas y un
minigráfico que resume la tendencia reciente. Hay buscador por nombre o por
símbolo.

Lo que la distingue de una tabla estática es que **los precios se refrescan
solos cada veinte segundos**, sin recargar la página y sin perder el sitio donde
estabas leyendo. Suena menor y no lo es: en un activo que se mueve un quince por
ciento en una tarde, un precio de hace diez minutos no es información, es ruido.

Hay además una cinta de operaciones en tiempo real —compras y ventas
apareciendo según ocurren— que le da a la portada la sensación de estar viva en
lugar de ser una foto fija.

## La ficha de cada moneda

Al entrar en una moneda concreta aparecen los datos que uno espera: precio,
capitalización de mercado, volumen negociado, máximos y mínimos, y el máximo
histórico.

El gráfico permite cambiar el rango entre veinticuatro horas, siete días,
treinta días, noventa días y un año, con rejilla, tooltip al pasar el cursor y
una línea de referencia. Cambiar de rango importa más de lo que parece: una
moneda que en el gráfico de un día parece desplomarse puede llevar meses
subiendo, y al revés.

Cada ficha incluye también un texto largo, de alrededor de mil palabras, que
explica qué es esa moneda concreta, de dónde salió y qué la caracteriza, con sus
propias preguntas frecuentes. Es la diferencia entre una página que solo repite
un número y una que además contesta lo que la persona vino a preguntar.

## La otra mitad: el foro

Cada moneda tiene su hilo de comentarios. Se puede escribir, responder a alguien
—con un nivel de respuesta, para que la conversación no se convierta en un
árbol ilegible—, dar "me gusta" y borrar lo propio.

Los "me gusta" usan actualización optimista: el corazón se marca en el instante
en que hacés clic, sin esperar a que el servidor confirme. Si algo falla, se
revierte. Es un detalle de implementación con un efecto grande en cómo se siente
la aplicación, porque la alternativa —esperar medio segundo a que el servidor
responda antes de pintar nada— hace que una web parezca lenta aunque no lo sea.

Para participar hace falta cuenta, con correo y contraseña, y cada usuario tiene
perfil con nombre, avatar y biografía. El blog del sitio, con artículos
prerenderizados sobre el sector, admite también comentarios y "me gusta", así
que la comunidad no vive solo en las fichas de precio.

## Los permisos viven en la base de datos

Un sitio con cuentas, comentarios y borrado tiene un riesgo evidente: que alguien
borre lo que no es suyo o edite lo que no debe. Y el sitio donde no hay que
resolverlo es la interfaz.

Memecoin Plaza usa Supabase con seguridad a nivel de fila en todas las tablas.
Las reglas —quién puede leer qué, quién puede escribir, quién puede borrar— están
escritas en la propia base de datos, no en el código de la pantalla. Si alguien
manipula una petición desde el navegador, la base la rechaza. Que el botón de
borrar no aparezca en los comentarios ajenos es una comodidad para el usuario, no
una medida de seguridad; la medida de seguridad está debajo.

## Instalable, pero sin fingir que funciona sin internet

El sitio es una aplicación web progresiva: se puede añadir a la pantalla de
inicio del móvil y abrirse sin la barra del navegador, sin pasar por ninguna
tienda de aplicaciones.

Lo que **no** hicimos, a propósito, es modo sin conexión. Habría sido fácil
guardar la última respuesta y mostrarla cuando no hay red, y el resultado sería
una aplicación que enseña precios viejos con toda la confianza del mundo. En un
rastreador de precios, un dato desactualizado sin avisar es peor que no mostrar
nada. Preferimos que diga que no hay conexión.

## Qué demuestra este proyecto

Memecoin Plaza junta cosas que aparecen en muchos encargos reales: datos
externos que hay que consultar y cachear con cabeza, actualización en vivo sin
romper la experiencia, cuentas de usuario, contenido generado por la comunidad
con sus permisos, y un blog que tiene que posicionar.

Podés verlo funcionando en
[memecoin.codezun.com](https://memecoin.codezun.com). Y si necesitás algo
parecido —datos en vivo, cuentas, comunidad— eso es lo que hacemos:
[contanos](/contacto).
