import { Quote } from "lucide-react";
import FadeIn from "./FadeIn";
import { PUBLISHED_TESTIMONIALS } from "@/lib/casos";

/**
 * Testimonios.
 *
 * Solo aparece si hay testimonios cargados y publicados en `lib/casos.ts`.
 * Son citas textuales con nombre real: nunca redactadas por nosotros.
 */
export default function Testimonials() {
  if (PUBLISHED_TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonios" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Testimonios
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Lo que dicen los clientes con los que hemos trabajado.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PUBLISHED_TESTIMONIALS.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.1} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl bg-secondary/25 p-6 ring-1 ring-black/5">
                <Quote size={24} className="text-primary" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/80">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold text-dark">{item.name}</p>
                  <p className="text-sm text-foreground/60">{item.role}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
