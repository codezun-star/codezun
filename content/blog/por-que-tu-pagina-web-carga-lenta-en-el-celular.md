---
title: "Por qué tu página web carga lenta en el celular (y cómo arreglarlo)"
description: "Las causas más comunes de que un sitio web cargue lento en el celular, cómo medirlo con herramientas gratuitas y qué se puede corregir en cada caso."
date: "2026-07-29"
keywords:
  - página web lenta en celular
  - velocidad de carga sitio web
  - optimizar sitio web móvil
faq:
  - question: "¿Por qué mi página web carga lenta en el celular?"
    answer: "Las causas más frecuentes son imágenes pesadas subidas sin optimizar, exceso de plugins y scripts de terceros, un hosting lento, la falta de caché y elementos decorativos como carruseles o videos de fondo que obligan al teléfono a descargar mucho antes de mostrar algo."
  - question: "¿Cómo puedo medir la velocidad de mi sitio web?"
    answer: "Con PageSpeed Insights de Google o con Lighthouse, incluido en el navegador Chrome. Ambos son gratuitos, analizan la versión móvil por separado de la de escritorio y entregan una lista concreta de qué está pesando de más en tu sitio."
  - question: "¿Cuánto afecta la lentitud a las ventas?"
    answer: "Bastante, porque la persona que espera no ve una barra de progreso: ve una pantalla en blanco y asume que el sitio no funciona. Cada segundo de espera hace que más visitantes se vayan antes de llegar a ver lo que ofrecés, y esa visita perdida rara vez vuelve."
  - question: "¿Se puede arreglar un sitio lento sin rehacerlo?"
    answer: "En muchos casos sí. Comprimir y redimensionar las imágenes, quitar plugins que no se usan, activar caché y eliminar scripts de terceros innecesarios resuelve buena parte de los problemas. Cuando el sitio está construido sobre una plantilla muy pesada o un hosting malo, la reconstrucción termina saliendo más barata que seguir parchando."
  - question: "¿Por qué importa tanto la velocidad en móvil y no tanto en computadora?"
    answer: "Porque la mayoría de las visitas llegan desde el teléfono, con conexiones más variables y procesadores menos potentes que los de una computadora. Un sitio que se siente rápido en una oficina con buena conexión puede ser inusable en la calle con señal irregular."
---

Un sitio lento no se percibe como "lento": se percibe como roto. Quien espera no ve una barra de progreso, ve una pantalla en blanco, y muy pocos se quedan a averiguar si vale la pena. Como la mayoría de las visitas en Honduras llegan desde el celular, con conexiones que no siempre son buenas, este problema pesa más de lo que parece.

## Primero: medilo, no lo adivines

Antes de cambiar nada, medí. Dos herramientas gratuitas alcanzan:

- **PageSpeed Insights** (de Google): pegás la dirección de tu sitio y te da una evaluación separada para móvil y para escritorio, con la lista de qué está pesando.
- **Lighthouse**: viene incluido en el navegador Chrome, en las herramientas de desarrollador.

Un detalle importante: probá siempre la versión móvil. Es normal que un sitio dé buen resultado en escritorio y muy malo en celular, y es la de celular la que importa.

## Las causas más comunes

### 1. Imágenes pesadas

Es la causa número uno, con diferencia. Una foto que sale de una cámara o de un celular moderno puede pesar varios megabytes, y muchas veces se sube tal cual. El navegador tiene que descargarla entera aunque se muestre en un espacio pequeño.

**Qué hacer:** redimensionar las imágenes al tamaño real en que se muestran, comprimirlas y usar formatos modernos como WebP. Y activar la carga diferida, para que las imágenes de más abajo se descarguen solo cuando el usuario llega a ellas.

### 2. Demasiados plugins y scripts

Cada plugin agrega archivos que el navegador tiene que descargar y ejecutar. Lo mismo pasa con los scripts de terceros: chats, mapas incrustados, píxeles de publicidad, contadores de visitas, tipografías externas. Cada uno suma.

**Qué hacer:** revisá qué está instalado y sacá lo que no usás. Un plugin desactivado pero instalado sigue siendo una puerta abierta a problemas; uno activo y sin usar es peso muerto.

### 3. Un hosting lento

Se puede tener un sitio impecable sobre un hosting que tarda demasiado en responder. Si el servidor tarda un segundo en entregar la primera respuesta, ese segundo lo pagan todas las visitas, siempre.

**Qué hacer:** medí el tiempo de respuesta del servidor. Si es alto de forma consistente, el problema no está en tu sitio.

### 4. Sin caché

Sin caché, el sitio se reconstruye desde cero en cada visita. Con caché, se entrega una versión ya lista.

**Qué hacer:** activar la caché del sitio y del navegador. Suele ser una de las mejoras más grandes con el menor esfuerzo.

### 5. Carruseles, videos de fondo y efectos

Un carrusel en la parte superior obliga al teléfono a descargar varias imágenes grandes antes de mostrar nada. Un video de fondo, peor todavía. Muchas veces ese elemento decorativo es justamente lo que impide que el visitante vea el contenido.

**Qué hacer:** preguntate si aporta algo real. Casi siempre, una sola imagen bien optimizada con un mensaje claro convierte mejor que un carrusel.

## Cuándo el problema es de fondo

Hay un punto en el que optimizar deja de rendir: cuando el sitio está construido sobre una plantilla sobrecargada, con funciones que nunca se usan pero que igual se cargan. En ese caso, seguir parchando cuesta más tiempo y dinero que reconstruirlo bien. La señal es clara: ya optimizaste imágenes, limpiaste plugins y activaste caché, y sigue lento.

## Un sitio rápido no es solo cuestión de velocidad

La velocidad afecta cuántas visitas se quedan, cuántas consultas recibís y también cómo te evalúan los buscadores. Si estás revisando este tema, te va a servir leer también [qué mirar en un hosting antes de contratarlo](/blog/dominio-y-hosting-para-tu-negocio), porque una parte del problema empieza ahí.

## ¿Tu sitio está lento y no sabés por qué?

En Codezun construimos sitios pensados primero para el celular y para conexiones reales, no solo para verse bien en una computadora de escritorio con buena señal.

[Escribinos](/contacto) y revisamos qué está frenando tu sitio.
