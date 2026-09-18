import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

/**
 * 404 propia.
 *
 * La de Next es una pantalla en blanco con "This page could not be found":
 * en inglés, sin la marca y —lo que importa— sin ninguna salida. Una URL rota
 * la produce cualquier cosa: un enlace viejo, una dirección mal copiada, un
 * artículo renombrado. Que esa visita termine en un callejón es perder a quien
 * ya había llegado.
 *
 * Esta lleva el menú y el pie del sitio (se renderiza dentro del layout) y
 * además ofrece los destinos que alguien puede estar buscando, incluidos los
 * últimos artículos, que es a donde apunta la mayoría de los enlaces rotos.
 *
 * Next devuelve 404 en la respuesta, así que el buscador la retira del índice
 * igual que antes; no hace falta —ni conviene— marcarla `noindex`.
 */

const DESTINATIONS = [
  { label: "Inicio", href: "/", description: "Qué hacemos y nuestros proyectos" },
  { label: "Blog", href: "/blog", description: "Artículos sobre desarrollo web y SaaS" },
  { label: "Ciudades", href: "/ciudades", description: "Dónde ofrecemos el servicio" },
  { label: "Contacto", href: "/contacto", description: "Contanos qué necesitás" },
];

export default function NotFound() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          Esta página no existe
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/70">
          Puede que el enlace esté roto o que la dirección se haya escrito mal.
          Desde acá podés seguir a cualquier parte del sitio.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="group rounded-2xl bg-white p-5 ring-1 ring-black/5 transition-shadow hover:shadow-lg"
            >
              <span className="flex items-center gap-2 font-semibold text-dark">
                {destination.label}
                <ArrowRight
                  size={16}
                  className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="mt-1 block text-sm text-foreground/70">
                {destination.description}
              </span>
            </Link>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-12 border-t border-black/5 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
              Últimos artículos
            </h2>
            <ul className="mt-4 space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
