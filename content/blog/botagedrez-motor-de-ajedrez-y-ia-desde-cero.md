---
title: "botAgedrez: cómo funciona un motor de ajedrez y una IA hechos desde cero"
description: "Qué es botAgedrez, nuestro ajedrez online gratuito: motor propio sin librerías, una IA que piensa en segundo plano, cuatro niveles de dificultad y sistema ELO."
date: "2026-08-11"
keywords:
  - ajedrez online gratis
  - jugar ajedrez contra la computadora
  - motor de ajedrez
  - inteligencia artificial en juegos
faq:
  - question: "¿Qué es botAgedrez?"
    answer: "botAgedrez es un juego de ajedrez que se juega en el navegador, gratis y sin registro, contra una inteligencia artificial con cuatro niveles de dificultad. Está en botagedrez.codezun.com y lo desarrolló Codezun como proyecto propio."
  - question: "¿Hay que instalar algo o crear una cuenta para jugar ajedrez en línea?"
    answer: "En botAgedrez no. Se abre la página y se empieza a jugar. La partida, el historial y la puntuación se guardan en el propio navegador, así que no hace falta registrarse ni descargar nada."
  - question: "¿Cómo decide una computadora qué jugada hacer en el ajedrez?"
    answer: "Explora el árbol de jugadas posibles: prueba una jugada, imagina las respuestas del rival, y así varios turnos hacia adelante. A cada posición final le asigna una puntuación según el material, la seguridad del rey, la movilidad de las piezas y la estructura de peones, y elige la jugada que lleva a la mejor puntuación suponiendo que el rival también juega bien."
  - question: "¿Por qué un juego en el navegador no se congela mientras la máquina piensa?"
    answer: "Porque el cálculo se ejecuta en un hilo aparte del que dibuja la pantalla, lo que en la web se llama un Web Worker. Si ambos compartieran hilo, la página quedaría bloqueada durante todo el tiempo que la máquina tarda en decidir y no respondería ni al ratón."
---

En Codezun no solo desarrollamos para clientes: también construimos productos
propios. Uno de ellos es [botAgedrez](https://botagedrez.codezun.com), un juego
de ajedrez que corre en el navegador, es gratis y no pide registro. Abrís la
página y jugás.

Podríamos habernos apoyado en alguna de las librerías de ajedrez que ya existen
para JavaScript, y habríamos terminado en una tarde. Decidimos lo contrario:
escribir el motor entero desde cero. En este artículo contamos qué implica eso,
porque explica bastante bien cómo trabajamos cuando un proyecto tiene lógica de
verdad detrás.

## Un tablero no es una cuadrícula de imágenes

Lo primero que sorprende a quien nunca ha programado un juego de mesa es cuánto
del trabajo no se ve. Mover una pieza en la pantalla es lo fácil. Lo difícil es
todo lo que el programa tiene que saber para decidir si ese movimiento es
siquiera legal.

El reglamento completo del ajedrez tiene muchos más casos de los que uno
recuerda al jugar: el enroque corto y el largo, cada uno con sus condiciones (ni
el rey ni la torre pueden haberse movido, no puede haber piezas en medio, y el
rey no puede pasar por una casilla atacada); la captura al paso, que solo es
válida en el turno inmediatamente siguiente; la coronación de un peón, que puede
convertirse en cuatro piezas distintas. Y luego están los finales: jaque mate,
ahogado, tablas por triple repetición de la posición, por la regla de los 50
movimientos, o por material insuficiente.

A eso se suma una regla que atraviesa todas las demás: ningún movimiento es
legal si deja al propio rey en jaque. Es decir, cada jugada candidata hay que
simularla y comprobar después si el rey quedó expuesto.

El motor de botAgedrez implementa todo eso, y además lee y escribe los dos
formatos estándar del ajedrez: **FEN** para describir una posición concreta y
**PGN** para guardar una partida entera. Eso significa que podés exportar una
partida y abrirla en cualquier otro programa de ajedrez.

## Cómo comprobamos que el motor no se equivoca

Una lógica así de enredada se rompe en silencio. Un fallo en el enroque no
provoca un error visible: simplemente permite una jugada que no debería ser
legal, y nadie se da cuenta hasta mucho después.

Para esto el mundo del ajedrez tiene una prueba estándar llamada **perft**.
Consiste en contar cuántas partidas distintas existen desde una posición hasta
cierta profundidad. Los números son conocidos y están publicados: desde la
posición inicial, a cuatro movimientos de profundidad hay exactamente 197 281
posiciones. Si tu motor cuenta otra cosa, tiene un fallo, y la diferencia te dice
más o menos dónde buscarlo.

Verificamos el motor con perft y con las posiciones difíciles que la comunidad
usa precisamente porque destapan errores en los casos raros. Es la clase de
comprobación que no se ve en el producto terminado, pero es la razón por la que
el producto terminado funciona.

## Cómo "piensa" la máquina

La inteligencia artificial de botAgedrez no memoriza partidas ni consulta una
base de datos: calcula. Prueba una jugada, imagina la mejor respuesta del rival,
la mejor respuesta a esa respuesta, y así varios turnos hacia adelante. Al final
de cada rama valora la posición y elige el camino que le deja mejor parado
suponiendo que el rival también juega bien. Ese esquema se llama negamax.

El problema es que el árbol de posibilidades crece de forma brutal: cada nivel
extra multiplica el trabajo. Por eso el motor usa varias técnicas para no
explorar de más:

- **Poda alfa-beta**, que descarta ramas enteras en cuanto se sabe que no pueden
  mejorar lo ya encontrado.
- **Ordenación de jugadas**, mirando primero las capturas prometedoras, porque
  cuanto antes aparece una buena jugada, más se puede podar después.
- **Búsqueda de quiescencia**, que evita detener el cálculo en mitad de un
  intercambio de piezas, donde la valoración engañaría.
- **Profundización iterativa** con un presupuesto de tiempo: calcula a
  profundidad 1, luego 2, luego 3, y se queda con lo mejor que alcanzó cuando se
  le acaba el tiempo.

Para puntuar una posición no basta con contar piezas. La evaluación también mira
en qué casillas están (un caballo en el centro vale más que en una esquina), la
seguridad del rey —con una transición según la partida avanza hacia el final—,
la movilidad, la estructura de peones y la pareja de alfiles.

## Por qué la página no se congela

Todo ese cálculo consume tiempo. Si se ejecutara en el mismo hilo que dibuja la
pantalla, la página quedaría bloqueada mientras la máquina piensa: no
respondería al ratón, las animaciones se pararían y en el móvil el navegador
llegaría a sugerir cerrar la pestaña.

Por eso la IA corre en un **Web Worker**, un hilo aparte. La interfaz sigue viva
mientras la máquina calcula. Es un detalle invisible cuando está bien resuelto y
muy visible cuando no.

## Cuatro niveles y una puntuación que sube y baja

Los cuatro niveles de dificultad no son cuatro programas distintos: son el mismo
motor con más o menos profundidad de cálculo y algo de aleatoriedad en los más
fáciles, para que un principiante tenga partida y no se lleve una paliza en doce
jugadas.

Alrededor de eso hay una capa de progreso: un sistema **ELO** simplificado que
arranca en 1200 y sube o baja según los resultados, historial de partidas,
material capturado, rachas y logros que se van desbloqueando. Todo se guarda en
el navegador, así que no hay cuentas ni contraseñas.

El resto es acabado: arrastrar las piezas o moverlas con clic, resaltado de las
jugadas legales y del rey en jaque, sonidos generados en el propio navegador,
modo claro y oscuro, y todo funcionando en móvil.

## Qué tiene que ver esto con tu proyecto

Un juego de ajedrez y una tienda online no se parecen en nada por fuera, pero el
trabajo de fondo es el mismo: reglas de negocio que hay que implementar
completas, casos raros que nadie menciona hasta que fallan, y una interfaz que
tiene que seguir respondiendo mientras algo pesado ocurre por detrás.

Podés probar el resultado en
[botagedrez.codezun.com](https://botagedrez.codezun.com), gratis y sin
registrarte. Y si tenés un proyecto con lógica de verdad detrás,
[hablemos](/contacto).
