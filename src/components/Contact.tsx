"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import FadeIn from "./FadeIn";
import { CONTACT_EMAIL } from "@/lib/site-config";

/**
 * Formulario de contacto simple.
 *
 * Por ahora NO envía nada a un backend: al enviar, arma un mailto:
 * con los datos cargados y abre el cliente de correo del usuario.
 * Cuando se conecte un backend/servicio de envío (ej. Resend, un
 * endpoint propio, etc.), reemplazar handleSubmit por la llamada real.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`Contacto desde codezun.com — ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contacto" className="bg-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hablemos de tu proyecto
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/70">
              Contanos qué necesitás y te respondemos a la brevedad.
              También podés escribirnos directamente por correo.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/20"
            >
              <Mail size={20} />
              {CONTACT_EMAIL}
            </a>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 sm:p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-dark"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-dark"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-dark"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Contanos sobre tu proyecto"
                />
              </div>

              <button
                type="submit"
                className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Enviar mensaje
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
