import FadeIn from "./FadeIn";

/**
 * Cómo trabajamos: los cuatro pasos de un proyecto.
 *
 * El único plazo que se menciona es el del sistema de fidelización, que es
 * un dato real. No agregar otros plazos sin confirmarlos.
 */
const STEPS = [
  {
    title: "Conversamos y definimos el alcance",
    description:
      "Nos cuenta qué necesita su negocio y juntos definimos qué tiene que hacer el proyecto y qué no.",
  },
  {
    title: "Propuesta con precio y plazo",
    description:
      "Le enviamos una propuesta por escrito con el precio y el plazo de entrega, antes de empezar.",
  },
  {
    title: "Desarrollo con avances y revisiones",
    description:
      "Le mostramos avances durante el desarrollo para que los revise y ajustemos a tiempo.",
  },
  {
    title: "Entrega, lanzamiento y mantenimiento",
    description:
      "Publicamos el proyecto y, si lo desea, seguimos a cargo de su mantenimiento mensual.",
  },
];

export default function Process() {
  return (
    <section id="como-trabajamos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Cuatro pasos, de la primera conversación a la entrega.
          </p>
        </FadeIn>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <FadeIn
                delay={index * 0.1}
                className="h-full rounded-2xl bg-secondary/25 p-6 ring-1 ring-black/5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-dark text-base font-bold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {step.description}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-foreground/60">
            Como referencia de plazo: un sistema de fidelización a medida toma
            unas 6 semanas.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
