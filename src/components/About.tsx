import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="sobre-nosotros" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Sobre nosotros
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Codezun es una empresa de desarrollo de software con más de
              5 años de experiencia diseñando y construyendo aplicaciones
              web y móviles. Trabajamos junto a nuestros clientes en cada
              etapa del producto: desde la idea inicial hasta el
              desarrollo, lanzamiento y mantenimiento a largo plazo.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              Además de proyectos para clientes, desarrollamos nuestras
              propias herramientas y productos digitales, lo que nos
              permite mantenernos actualizados con las últimas
              tecnologías y mejores prácticas del sector.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-4xl font-bold text-primary">5+</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Años de experiencia en desarrollo de aplicaciones
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-4xl font-bold text-primary">Web</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Y apps móviles, de punta a punta
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-4xl font-bold text-primary">SaaS</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Herramientas y productos propios
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-4xl font-bold text-primary">A medida</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Soluciones adaptadas a cada negocio
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
