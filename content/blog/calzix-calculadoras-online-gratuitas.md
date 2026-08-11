---
title: "Calzix: más de 270 calculadoras online que funcionan sin enviar tus datos"
description: "Qué es Calzix, nuestra plataforma de calculadoras online gratuitas: de hipotecas y nóminas a energía solar, obra y física, todas resolviéndose en el navegador."
date: "2026-08-11"
keywords:
  - calculadoras online gratis
  - calculadora de hipoteca
  - calculadora de ahorro solar
  - herramientas de cálculo web
faq:
  - question: "¿Qué es Calzix?"
    answer: "Calzix es una plataforma web de calculadoras online gratuitas, en calzix.com, con más de 270 herramientas repartidas en casi cincuenta categorías: finanzas, hogar, energía, obra, salud, estudios, ciencia y viajes, entre otras. No requiere registro."
  - question: "¿Es seguro meter datos personales o financieros en una calculadora online?"
    answer: "Depende de dónde se haga el cálculo. Si la web envía los datos a un servidor para calcular, esos datos salen de tu dispositivo. En Calzix el cálculo entero ocurre en el navegador con JavaScript, así que las cifras que escribís no viajan a ningún sitio ni quedan guardadas en ninguna base de datos."
  - question: "¿Por qué una web de calculadoras carga tan rápido?"
    answer: "Porque las páginas se generan una sola vez al publicar el sitio y se sirven ya construidas, en lugar de armarse en un servidor cada vez que alguien entra. A eso se le llama generación estática, y significa que el visitante recibe el HTML terminado casi de inmediato."
  - question: "¿Cuánto se ahorra al cambiar las bombillas de casa por LED?"
    answer: "Depende de cuántas bombillas sean, de la potencia de las viejas y las nuevas, de las horas que estén encendidas cada día y del precio del kilovatio hora en tu tarifa. Una bombilla incandescente de 60 W sustituida por un LED equivalente consume alrededor de un 85 % menos, pero la cifra concreta de ahorro anual solo sale al meter tus propios números."
---

Buscás "calculadora de hipoteca", entrás en el primer resultado y te encontrás
con tres bloques de publicidad, un formulario que pide tu correo antes de darte
el número y la sospecha razonable de que los datos que acabás de escribir —tu
sueldo, lo que querés pedir prestado— se acaban de guardar en algún sitio.

[Calzix](https://calzix.com) es nuestra respuesta a eso: una plataforma con más
de doscientas setenta calculadoras online, gratis, sin registro, y donde ninguna
cifra que escribís sale de tu navegador.

## Qué significa "se calcula en el navegador"

Es la decisión técnica de fondo del proyecto y conviene explicarla, porque tiene
consecuencias que se notan.

Una web puede hacer un cálculo de dos maneras. La habitual es mandar los datos al
servidor, que calcula y devuelve el resultado; ese servidor puede guardarlos,
analizarlos o cruzarlos con lo que ya sabe de vos. La otra es que el cálculo lo
haga el propio navegador con el código que ya se descargó. Calzix hace lo
segundo, siempre.

Para el usuario significa tres cosas concretas. Que los números que introduce no
viajan a ninguna parte. Que el resultado aparece al instante, sin la espera de
ida y vuelta hasta un servidor. Y que la calculadora sigue funcionando aunque la
conexión se ponga mala después de cargar la página.

No hay backend, ni base de datos, ni autenticación. No es una promesa de
privacidad que haya que creerse: es que no existe el sitio donde guardarlos.

## Qué hay dentro

Las más de doscientas setenta calculadoras están repartidas en casi cincuenta
categorías. Algunas de las más usadas:

**Dinero y casa.** Amortización de hipoteca, alquilar frente a comprar,
descuentos, propinas, nómina, facturación para autónomos, coste de un viaje.

**Energía y consumo.** Ahorro al cambiar a LED, autoconsumo y ahorro solar,
dimensionado de baterías, ángulo óptimo de los paneles, consumo eléctrico del
hogar, ahorro de agua en el grifo, autonomía de un coche eléctrico, huella de
carbono.

**Obra y jardín.** Baldosas necesarias para un suelo, litros de pintura, áreas de
figuras, superficie de jardín, cálculo de zonas de riego.

**Ciencia y estudio.** Física, química, álgebra, geometría, trigonometría,
estadística, probabilidad, conversiones de longitud, peso, volumen, presión,
temperatura y datos. Notas medias, becas, planificación de estudio y repaso
espaciado.

**Vida diaria.** Sueño, lectura, productividad, equipaje, reciclaje, y un puñado
de calculadoras de las que se hacen por curiosidad más que por necesidad.

## Cada calculadora es una página, y eso es a propósito

Podríamos haber hecho una única aplicación con un menú desplegable de doscientas
setenta opciones. Habría sido menos trabajo. Pero quien necesita calcular cuántas
baldosas le hacen falta no busca "plataforma de calculadoras": busca "calculadora
de baldosas para suelo".

Por eso cada herramienta tiene su propia dirección, su propio título, su propia
descripción y sus propias preguntas frecuentes —un mínimo de cinco por página—.
Cada una puede aparecer en un buscador por lo que realmente resuelve, y quien
llega desde ahí aterriza directamente en la herramienta, no en una portada donde
tenga que buscarla.

Ese es el mismo trabajo de SEO que hacemos para los sitios de clientes, aplicado
a un proyecto propio a una escala que lo pone a prueba.

## El problema de las calculadoras que no explican de dónde sale el número

Hay una trampa habitual en este tipo de sitios, y es más sutil que la
publicidad: la calculadora que da un resultado apoyándose en supuestos que no
enseña.

Una calculadora de ahorro solar necesita saber cuánto cuesta tu kilovatio hora,
cuántas horas de sol útil recibe tu ubicación y qué rendimiento tienen los
paneles. Una de amortización de hipoteca necesita el tipo de interés y el plazo.
Si esos valores están fijados dentro del código y no se ven, el resultado es una
cifra con decimales que aparenta precisión y en realidad describe la situación de
otra persona.

En Calzix, cuando un cálculo depende de un supuesto, ese supuesto es un campo
editable. El valor por defecto está ahí para que puedas empezar sin buscar nada,
no para que te lo creas. Es la diferencia entre una herramienta que te ayuda a
pensar y una que te da un número para que lo repitas.

## Estático, y por eso rápido

El sitio está construido con Astro en modo estático: las páginas se generan una
sola vez al publicar y se sirven ya terminadas. No hay un servidor armando el
HTML cada vez que alguien entra.

La parte interactiva —el formulario de cada calculadora— se carga como una
"isla": solo ese componente lleva JavaScript, el resto de la página es HTML
plano. Es lo contrario de lo habitual, que es mandar el código de toda la
aplicación para que el visitante pueda usar un formulario de cuatro campos.

El resultado es un sitio que abre rápido incluso en un móvil con conexión
regular, que es donde de verdad se usan estas cosas.

## Sin registro y sin cifras inventadas

Ninguna calculadora pide correo antes de dar el resultado. No hay muro, ni
versión de pago, ni "desbloquear informe completo".

Y algo que nos importa: donde una calculadora depende de un supuesto —el precio
del kilovatio hora, un tipo de interés, un rendimiento— ese supuesto es un campo
que podés cambiar, no un número escondido en el código. Un resultado que sale de
una suposición que no ves no es un resultado, es una adivinanza con decimales.

## Miralo

[calzix.com](https://calzix.com) está abierto. Si te sirve alguna, la dirección
de esa calculadora concreta se puede guardar y compartir directamente.

Y si tu negocio necesita una herramienta de cálculo propia —un presupuestador, un
simulador, una cotizadora— eso es exactamente el tipo de proyecto que hacemos en
Codezun: [contanos qué necesitás](/contacto).
