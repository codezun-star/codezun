"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import FadeIn from "./FadeIn";
import WhatsAppIcon from "./WhatsAppIcon";
import {
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
  whatsappLink,
} from "@/lib/site-config";

/**
 * Formulario de contacto que envía por WhatsApp.
 *
 * El sitio no tiene backend ni base de datos, así que el formulario no
 * guarda nada: al enviarlo arma un enlace de wa.me con el nombre, el
 * correo y el mensaje ya escritos, y abre WhatsApp (la app en el teléfono,
 * WhatsApp Web en la computadora). La persona solo tiene que tocar
 * "Enviar" y el mensaje llega al número de la empresa.
 *
 * Se abre en una pestaña nueva para que el visitante no pierda la página.
 * Si el navegador bloquea la pestaña, se navega en la misma.
 *
 * El correo es opcional: la respuesta va a llegar por WhatsApp, y pedir un
 * dato que no hace falta es un motivo más para no enviar el formulario.
 *
 * Cuando haya un backend (Resend, un endpoint propio…), reemplazar
 * handleSubmit por la llamada real.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      "Hola, les escribo desde el formulario de codezun.com.",
      "",
      `Nombre: ${name.trim()}`,
      ...(email.trim() ? [`Email: ${email.trim()}`] : []),
      "",
      "Mensaje:",
      message.trim(),
    ];
    const url = whatsappLink(lines.join("\n"));

    const tab = window.open(url, "_blank");
    if (tab) {
      tab.opener = null;
    } else {
      window.location.href = url;
    }
  }

  return (
    <section id="contacto" className="bg-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hablemos de su proyecto
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/70">
              Cuéntenos qué necesita y le respondemos a la brevedad.
              Si lo prefiere, escríbanos directamente por WhatsApp o por
              correo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Escríbanos por WhatsApp al ${WHATSAPP_DISPLAY} (se abre en una pestaña nueva)`}
                data-whatsapp-cta
                className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <WhatsAppIcon size={20} />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/20"
              >
                <Mail size={20} />
                {CONTACT_EMAIL}
              </a>
            </div>
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
                  placeholder="Su nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-dark"
                >
                  Email{" "}
                  <span className="font-normal text-foreground/50">
                    (opcional)
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="nombre@empresa.com"
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
                  placeholder="Cuéntenos sobre su proyecto"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                <WhatsAppIcon size={18} />
                Enviar por WhatsApp
              </button>
              <p className="text-center text-xs text-foreground/60">
                Se abrirá WhatsApp con su mensaje ya escrito: solo tiene que
                tocar Enviar.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
