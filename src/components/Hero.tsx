import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { WHATSAPP_LINK } from "@/lib/site-config";
import teamPhoto from "../../public/hero/team.jpg";

/**
 * Tagline del hero. Opciones de copy propuestas (elegí la que prefieras
 * o escribí la tuya):
 *
 * 1. "Desarrollamos software que impulsa negocios."
 * 2. "Convertimos ideas en aplicaciones web y móviles."
 * 3. "Software a medida, de la idea al producto."
 */
const TAGLINE = "Desarrollamos software que impulsa negocios.";

/*
 * La entrada del texto es una animación CSS (`.entrada`, en globals.css),
 * no de Framer Motion. Con Motion el texto se servía con `opacity: 0` y solo
 * aparecía cuando el JavaScript terminaba de cargar: con señal lenta se veía
 * la foto sola durante segundos y después el título de golpe. La animación
 * CSS arranca en cuanto llega el HTML, y por eso este componente ya no es de
 * cliente.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/*
        Foto de fondo del equipo (/public/hero/team.jpg) con un velo
        blanco semitransparente encima para que el texto siga siendo
        legible. Para reemplazarla, subí un archivo nuevo a esa misma
        ruta (o cambiá el import de arriba si usás otro nombre).

        Es JPEG y no PNG a propósito: el PNG original pesaba 2 MB y en el
        teléfono la foto tardaba y aparecía de golpe. El JPEG pesa ~190 KB
        con la misma imagen. Al importarla (en vez de pasar la ruta como
        texto) Next genera una miniatura borrosa que se muestra mientras
        carga (`placeholder="blur"`), así la foto aparece suave.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={teamPhoto}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/72" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
        <span className="entrada rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-dark"
        >
          Codezun · Desarrollo de software
        </span>

        <h1 className="entrada mt-6 [animation-delay:80ms] max-w-3xl text-4xl font-bold tracking-tight text-dark sm:text-5xl md:text-6xl"
        >
          {TAGLINE}
        </h1>

        <p className="entrada mt-6 [animation-delay:160ms] max-w-2xl text-lg text-foreground/70"
        >
          Construimos sitios web, tiendas online, landing pages, productos
          SaaS y sistemas a medida para negocios en Honduras y en cualquier
          parte del mundo, con más de 5 años de experiencia.
        </p>

        <div className="entrada mt-10 [animation-delay:240ms] flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Link
            href="/#contacto"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-accent/30"
          >
            Conversemos de su proyecto
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          {/*
            WhatsApp desde la primera pantalla, como botón secundario para
            no competir en color con la llamada principal.
          */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbanos por WhatsApp (se abre en una pestaña nueva)"
            data-whatsapp-cta
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-dark shadow-sm ring-1 ring-dark/15 transition-colors hover:bg-secondary/40"
          >
            <WhatsAppIcon size={20} className="text-[#25D366]" />
            Escríbanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
