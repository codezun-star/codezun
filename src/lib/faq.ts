/**
 * Preguntas frecuentes del sitio.
 *
 * Viven en un archivo de datos y no dentro de un componente porque cada bloque
 * se usa dos veces: una para pintarlo y otra para declararlo como `FAQPage`.
 * Si el texto se escribiera en el JSX, el esquema tendría que repetirlo a mano
 * y acabaría diciendo algo distinto de lo que lee el visitante, que es
 * justamente lo que las guías de datos estructurados prohíben.
 *
 * Sobre el contenido: las respuestas son cortas y se sostienen solas. Un motor
 * de respuestas cita el párrafo, no la página, así que una respuesta que
 * empieza con "como decíamos arriba" no sirve de nada fuera de contexto. Y
 * ninguna afirma nada que la empresa no pueda respaldar — sin cifras de
 * precio que no estén en `lib/precios.ts`, sin plazos inventados y sin
 * clientes que no existen.
 *
 * Todo el texto trata al lector de "usted".
 */
import type { City, Country } from "./cities";
import { PROJECT_PRICES, formatLempiras } from "./precios";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Respuesta a "¿cuánto cuesta?".
 *
 * Mientras los montos de `lib/precios.ts` no estén definidos, la respuesta es
 * la de siempre: se cotiza caso por caso. En cuanto lo estén, cita los mismos
 * "desde" que la tabla visible de la portada, de modo que la pregunta, la
 * tabla y su `FAQPage` no pueden decir cifras distintas.
 */
function pricingAnswer(): string {
  const factors =
    "El precio final depende del alcance real del proyecto: el tipo de sitio, si el diseño es a medida o parte de una plantilla, las funcionalidades especiales (pagos en línea, reservas, paneles de administración) y el mantenimiento posterior.";

  if (!PROJECT_PRICES) {
    return `No hay una tarifa única. ${factors} La forma de saberlo es contarnos qué necesita y recibir un presupuesto para ese caso concreto.`;
  }

  const ranges = PROJECT_PRICES.map(
    (row) => `${row.project.toLowerCase()} desde ${formatLempiras(row.from)}`
  ).join(", ");

  return `Como referencia: ${ranges}. No son precios fijos sino montos de partida, publicados en la sección "Precios de referencia". ${factors} Por eso cada proyecto recibe un presupuesto propio antes de empezar.`;
}

/** Preguntas generales sobre la empresa. Van en la portada. */
export const SITE_FAQ: FaqItem[] = [
  {
    question: "¿Qué hace Codezun?",
    answer:
      "Codezun es una empresa de desarrollo de software con más de 5 años de experiencia. Construimos plataformas SaaS, tiendas online, landing pages, sitios web completos y sistemas a medida —como sistemas de fidelización, paneles administrativos y aplicaciones web instalables en el teléfono—, siempre a la medida del negocio que los necesita.",
  },
  {
    question: "¿Codezun trabaja con clientes fuera de Honduras?",
    answer:
      "Sí. Codezun es una empresa 100% remota y atiende clientes en cualquier parte del mundo. El blog y las páginas por ciudad empiezan por Honduras porque ahí arrancó la estrategia de contenido, no porque sea un límite geográfico.",
  },
  {
    question: "¿Cuánto cuesta una página web o una aplicación a medida?",
    answer: pricingAnswer(),
  },
  {
    question: "¿Cuánto tarda un proyecto de desarrollo web?",
    answer:
      "Depende del alcance, y el plazo se acuerda junto con el presupuesto, una vez que está claro qué incluye el proyecto. Como referencia, un sistema de fidelización a medida toma unas 6 semanas.",
  },
  {
    question: "¿Codezun desarrolla sistemas de fidelización para restaurantes?",
    answer:
      "Sí. Desarrollamos sistemas de fidelización para restaurantes y negocios con varias sucursales: cada compra se registra con un código QR, el cliente acumula premios por monto de compra, el negocio ve las métricas de cada sucursal en un panel y exporta reportes a Excel. El sistema se instala en el teléfono como una aplicación. Los detalles están en la página de sistemas para restaurantes.",
  },
  {
    question: "¿Cuál es la diferencia entre una landing page y un sitio web completo?",
    answer:
      "Una landing page es una sola página enfocada en una acción concreta —dejar los datos, escribir por WhatsApp, comprar un producto— y se usa sobre todo para campañas y lanzamientos. Un sitio web completo tiene varias secciones (servicios, sobre la empresa, contacto, blog) y funciona como la presencia permanente del negocio en internet.",
  },
  {
    question: "¿Codezun da mantenimiento después de entregar el proyecto?",
    answer:
      "Sí. Ofrecemos un mantenimiento mensual que incluye alojamiento y base de datos, respaldos automáticos, monitoreo, hasta 5 horas al mes de cambios pequeños y soporte por WhatsApp con respuesta en 24 horas hábiles. El monto depende del sitio o sistema que se mantenga.",
  },
  {
    question: "¿Codezun tiene productos propios?",
    answer:
      "Sí. Además de los proyectos de clientes desarrollamos herramientas propias; la más consolidada es Firmiu, una plataforma SaaS de firma digital para empresas. Mantener productos propios es lo que nos obliga a estar al día con las tecnologías que después usamos en los proyectos de clientes.",
  },
  {
    question: "¿Cómo empiezo un proyecto con Codezun?",
    answer:
      "Escríbanos por WhatsApp al +504 3227-9672 o a codezun@gmail.com y cuéntenos qué necesita. Conversamos y definimos el alcance, le enviamos una propuesta con precio y plazo y, una vez aprobada, empezamos el desarrollo con avances y revisiones hasta la entrega.",
  },
];

/**
 * Preguntas de la página de sistemas para restaurantes.
 *
 * Igual que el resto: lo que se ofrece, sin clientes nombrados ni cifras de
 * resultados. El único plazo es el de referencia que usa todo el sitio.
 */
export const RESTAURANT_FAQ: FaqItem[] = [
  {
    question: "¿Qué es un sistema de fidelización para restaurantes?",
    answer:
      "Es un programa que premia a los clientes que vuelven. Cada compra queda registrada y, cuando el cliente acumula el monto que el restaurante define, recibe un premio. El negocio, por su parte, ve cuánto compra cada cliente y cómo se comporta cada sucursal.",
  },
  {
    question: "¿Funciona si el restaurante tiene varias sucursales?",
    answer:
      "Sí, está pensado para eso. Las compras de un cliente se acumulan sin importar en qué sucursal las haga, y el panel administrativo muestra las métricas de cada sucursal por separado, además de permitir exportar los reportes a Excel.",
  },
  {
    question: "¿Los clientes tienen que descargar una aplicación de una tienda?",
    answer:
      "No. Es una aplicación web que se instala en el teléfono directamente desde el navegador, sin pasar por la tienda de aplicaciones, y queda con su ícono en la pantalla de inicio como cualquier otra aplicación.",
  },
  {
    question: "¿Cuánto tarda en estar listo un sistema de fidelización?",
    answer:
      "Como referencia, un sistema de fidelización a medida toma unas 6 semanas. El plazo exacto se confirma en la propuesta, junto con el precio, una vez definido el alcance.",
  },
  {
    question: "¿El sistema es a medida o es una plataforma genérica?",
    answer:
      "Es a medida: los premios, los montos que hay que acumular, las sucursales y los reportes se configuran según cómo funciona su negocio, y el sistema queda a nombre del negocio, no de una plataforma de terceros.",
  },
];

/**
 * Preguntas de una página de ciudad.
 *
 * La primera es deliberadamente incómoda: preguntar por la oficina y contestar
 * que no la hay. Una página titulada "Desarrollo de software en Tegucigalpa"
 * hace que tanto un visitante como un asistente asuman que hay local en la
 * ciudad; decirlo antes de que lo pregunten es más honesto, y evita que un
 * motor de respuestas invente una sede que no existe.
 */
export function cityFaq(country: Country, city: City): FaqItem[] {
  return [
    {
      question: `¿Codezun tiene oficina en ${city.name}?`,
      answer: `No. Codezun trabaja de forma 100% remota y no tiene local físico en ${city.name} ni en ninguna otra ciudad. Eso no cambia el servicio: el proyecto se coordina por correo, WhatsApp y videollamada, y se entrega igual que a cualquier otro cliente.`,
    },
    {
      question: `¿Qué tipo de proyectos desarrolla Codezun para negocios en ${city.name}?`,
      answer: `Los mismos que en el resto del sitio: sitios web completos, tiendas online, landing pages para campañas concretas, plataformas SaaS y sistemas a medida, como sistemas de fidelización o paneles administrativos. Qué conviene depende del negocio, no de la ciudad: un comercio que quiere vender en línea necesita algo distinto de una empresa que quiere digitalizar un proceso interno.`,
    },
    {
      question: `¿Cómo se trabaja a distancia con un negocio de ${city.name}?`,
      answer: `Igual que presencialmente, pero por correo, WhatsApp y videollamada. Definimos el alcance, acordamos presupuesto y plazo, y durante el desarrollo se revisan avances hasta el lanzamiento. Trabajar en remoto es lo que nos permite atender ${city.name}, ${country.name} y cualquier otro lugar sin costes de desplazamiento.`,
    },
    {
      question: `¿Cuánto cuesta un sitio web para un negocio en ${city.name}?`,
      answer: `El precio no depende de la ciudad sino del proyecto: el tipo de sitio, si el diseño es a medida, las funcionalidades que necesita (pagos, reservas, catálogo) y el mantenimiento posterior. Cuéntenos qué busca y le enviamos un presupuesto para su caso.`,
    },
  ];
}
