---
title: "Petnote: el historial médico de tu mascota y un QR para emergencias"
description: "Qué es Petnote, nuestra plataforma para llevar el historial de salud de una mascota: vacunas, peso, documentos y una página de emergencia que se abre con un código QR."
date: "2026-08-11"
keywords:
  - historial médico de mascotas
  - carnet de vacunas digital
  - placa QR para perros
  - control de peso de mascotas
faq:
  - question: "¿Qué es Petnote?"
    answer: "Petnote es una plataforma web, en petnote.codezun.com, para llevar el historial de salud de una mascota: vacunas, desparasitaciones, consultas veterinarias, peso y documentos. Incluye un modo emergencia que genera un código QR con los datos críticos del animal."
  - question: "¿Para qué sirve un código QR en la placa de un perro?"
    answer: "Para que quien encuentre al animal perdido pueda ver de inmediato su nombre, su foto, sus alergias, la medicación que toma y cómo contactar al dueño y al veterinario, sin necesidad de tener cuenta ni instalar nada. Basta con apuntar la cámara del móvil al código."
  - question: "¿Es seguro poner un QR con los datos de mi mascota en su collar?"
    answer: "Depende de qué muestre ese código. En Petnote la página pública enseña solo un conjunto fijo de datos —nombre, foto, especie, raza, alergias, medicación activa y contactos— y nunca el historial clínico, los documentos ni el registro de pesos. Además el dueño puede desactivar el código en cualquier momento si pierde la placa."
  - question: "¿Por qué conviene registrar el peso de una mascota con regularidad?"
    answer: "Porque muchos problemas de salud aparecen antes como una tendencia que como un síntoma. Una pérdida sostenida de peso a lo largo de meses es difícil de notar al ver al animal todos los días, pero salta a la vista en una gráfica, y llegar a la consulta con esa serie de datos le da al veterinario información que no puede reconstruir de memoria."
---

Si tenés perro o gato, es probable que su información de salud esté repartida
entre un carnet de vacunas de papel que no aparece cuando hace falta, unas
cuantas fotos de recetas en la galería del teléfono y la memoria del veterinario.
Funciona hasta el día en que no funciona.

[Petnote](https://petnote.codezun.com) es nuestro proyecto propio para resolver
eso: un sitio donde el historial de una mascota vive completo y ordenado, y donde
además hay una función que puede ser importante justo el día peor.

## Lo que se guarda

Cada mascota tiene una ficha con varias secciones separadas:

- **Vacunas**, con la fecha de aplicación y la de la próxima dosis.
- **Desparasitaciones**, interna y externa, que es lo que más se olvida porque no
  tiene carnet oficial.
- **Historial médico**: consultas, diagnósticos, tratamientos.
- **Peso**, que no es un dato suelto sino una gráfica.
- **Documentos**: análisis, radiografías, certificados, facturas del veterinario.

Lo del peso merece una nota aparte, porque es la sección que más se subestima.
Al animal lo ves todos los días, así que un cambio gradual es casi invisible;
sobre una gráfica de doce meses, en cambio, una pendiente descendente salta a la
vista. Llegar a la consulta con esa serie de datos le da al veterinario algo que
no puede reconstruir preguntándote.

## El modo emergencia

Esta es la parte de la que estamos más contentos, y la razón por la que existe el
proyecto.

Un perro se escapa. Lo encuentra alguien que no te conoce, a tres barrios de
distancia. Esa persona quiere ayudar, pero no sabe cómo se llama el animal, si es
alérgico a algo, si toma alguna medicación que no puede saltarse ni a quién
avisar.

Petnote genera para cada mascota una **página pública de emergencia** con su
propia dirección, y el código QR correspondiente para imprimir y colgar de la
placa del collar. Quien encuentre al animal apunta la cámara del teléfono y ve
enseguida: nombre y foto (para confirmar que es el mismo animal), especie y raza,
alergias, medicación activa, y los datos de contacto del dueño y del veterinario.

No hace falta que esa persona tenga cuenta, ni que instale nada, ni que sepa qué
es Petnote. Es una página web y se abre.

## Cómo evitamos que ese QR sea un problema de privacidad

Publicar datos de tu mascota en una página abierta suena a mala idea, y lo sería
si estuviera mal hecho. Es el punto donde más cuidado pusimos, así que vale la
pena explicar cómo funciona por dentro.

La página de emergencia **no consulta la tabla de mascotas**. El acceso anónimo
pasa por una función de base de datos que devuelve una lista fija de columnas: la
que enumeramos arriba y ninguna más. El historial clínico, los documentos
subidos, el registro de pesos y las notas privadas no están disponibles por esa
vía, ni siquiera si alguien manipulara la petición. No es que estén ocultos en la
interfaz: es que la consulta no puede devolverlos.

Los archivos siguen la misma lógica, separados según a qué se exponen. Las fotos
de las mascotas son de lectura pública, porque la página de emergencia tiene que
poder mostrarlas sin sesión, pero solo el dueño puede escribir en su carpeta. Los
documentos, en cambio, son completamente privados y se sirven mediante enlaces
firmados que caducan a los sesenta segundos.

Y si perdés la placa impresa, podés desactivar el modo emergencia o regenerar el
identificador: el QR viejo deja de funcionar.

## Recordatorios

La otra mitad del problema no es guardar la información, es acordarse. La
revacunación anual, la desparasitación trimestral y la revisión pendiente son
justo las cosas que se posponen hasta que se olvidan.

Petnote tiene una cola de recordatorios que se revisa a diario de forma
automática en el servidor y envía el aviso por correo. No depende de que la app
esté abierta ni de que el teléfono tenga notificaciones activadas.

## Por qué lo construimos así

Petnote está hecho con Next.js y Supabase, con seguridad a nivel de fila en todas
las tablas: cada usuario ve sus mascotas y solo las suyas, y esa regla vive en la
base de datos, no en el código de la interfaz. Es una distinción importante. Si
la restricción está solo en la pantalla, cualquiera que sepa mirar las peticiones
del navegador puede saltársela; si está en la base, no hay pantalla que valga.

El mismo criterio aplica al cobro: el estado de la suscripción lo escribe
únicamente el webhook de la pasarela de pago, y un usuario no tiene permiso de
escritura sobre esa tabla. Nadie puede darse a sí mismo una cuenta de pago
editando una petición.

Son decisiones que no se ven desde fuera y que cuestan tiempo, y son exactamente
las que separan un producto que aguanta de una demo bonita.

## Probalo

[petnote.codezun.com](https://petnote.codezun.com) está en línea. El modo
emergencia y el QR son gratis, porque una función que puede ayudar a que un
animal perdido vuelva a casa no tiene mucho sentido detrás de un muro de pago.

Si tenés una idea de producto y querés que se construya con este nivel de
cuidado en los datos, [escribinos](/contacto).
