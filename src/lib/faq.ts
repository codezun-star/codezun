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
 * precio, sin plazos inventados y sin clientes que no existen.
 */
import type { City, Country } from "./cities";

export type FaqItem = {
  question: string;
  answer: string;
};

/** Preguntas generales sobre la empresa. Van en la portada. */
export const SITE_FAQ: FaqItem[] = [
  {
    question: "¿Qué hace Codezun?",
    answer:
      "Codezun es una empresa de desarrollo de software con más de 5 años de experiencia. Construimos cuatro tipos de proyecto: plataformas SaaS, tiendas online, landing pages y sitios web completos, siempre a medida del negocio que los necesita.",
  },
  {
    question: "¿Codezun trabaja con clientes fuera de Honduras?",
    answer:
      "Sí. Codezun es una empresa 100% remota y atiende clientes en cualquier parte del mundo. El blog y las páginas por ciudad empiezan por Honduras porque ahí arrancó la estrategia de contenido, no porque sea un límite geográfico.",
  },
  {
    question: "¿Cuánto cuesta una página web o una aplicación a medida?",
    answer:
      "No hay una tarifa única, porque el precio depende del alcance real del proyecto: el tipo de sitio, si el diseño es a medida o parte de una plantilla, las funcionalidades especiales (pagos en línea, reservas, paneles de administración) y el mantenimiento posterior. La forma de saberlo es contarnos qué necesitás y recibir un presupuesto para ese caso concreto.",
  },
  {
    question: "¿Cuánto tarda un proyecto de desarrollo web?",
    answer:
      "Depende del alcance. Una landing page es el proyecto más corto de los cuatro que hacemos y una plataforma SaaS el más largo, porque incluye diseño de arquitectura, desarrollo y pruebas. El plazo se acuerda junto con el presupuesto, una vez que está claro qué incluye el proyecto.",
  },
  {
    question: "¿Cuál es la diferencia entre una landing page y un sitio web completo?",
    answer:
      "Una landing page es una sola página enfocada en una acción concreta —dejar los datos, escribir por WhatsApp, comprar un producto— y se usa sobre todo para campañas y lanzamientos. Un sitio web completo tiene varias secciones (servicios, sobre la empresa, contacto, blog) y funciona como la presencia permanente del negocio en internet.",
  },
  {
    question: "¿Codezun da mantenimiento después de entregar el proyecto?",
    answer:
      "Sí. Acompañamos el producto en todas sus etapas, desde la idea inicial hasta el desarrollo, el lanzamiento y el mantenimiento a largo plazo. Conviene acordar desde el principio qué incluye ese mantenimiento, para no tener sorpresas más adelante.",
  },
  {
    question: "¿Codezun tiene productos propios?",
    answer:
      "Sí. Además de los proyectos de clientes desarrollamos herramientas propias; la más consolidada es Firmiu, una plataforma SaaS de firma digital para empresas. Mantener productos propios es lo que nos obliga a estar al día con las tecnologías que después usamos en los proyectos de clientes.",
  },
  {
    question: "¿Cómo empiezo un proyecto con Codezun?",
    answer:
      "Escribinos a codezun@gmail.com o por WhatsApp al +504 3227-9672 contándonos qué necesitás. A partir de ahí conversamos el alcance, definimos la solución que se ajuste a tu presupuesto y te pasamos una propuesta.",
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
      answer: `Los mismos cuatro que en el resto del sitio: sitios web completos, tiendas online, landing pages para campañas concretas y plataformas SaaS a medida. Qué conviene depende del negocio, no de la ciudad: un comercio que quiere vender en línea necesita algo distinto de una empresa que quiere digitalizar un proceso interno.`,
    },
    {
      question: `¿Cómo se trabaja a distancia con un negocio de ${city.name}?`,
      answer: `Igual que presencialmente, pero por correo, WhatsApp y videollamada. Definimos el alcance, acordamos presupuesto y plazo, y durante el desarrollo se revisan avances hasta el lanzamiento. Trabajar en remoto es lo que nos permite atender ${city.name}, ${country.name} y cualquier otro lugar sin costes de desplazamiento.`,
    },
    {
      question: `¿Cuánto cuesta un sitio web para un negocio en ${city.name}?`,
      answer: `El precio no depende de la ciudad sino del proyecto: el tipo de sitio, si el diseño es a medida, las funcionalidades que necesita (pagos, reservas, catálogo) y el mantenimiento posterior. Contanos qué buscás y te pasamos un presupuesto para tu caso.`,
    },
  ];
}
