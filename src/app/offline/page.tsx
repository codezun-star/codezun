import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { pageMetadata } from "@/lib/metadata";
import { WHATSAPP_DISPLAY } from "@/lib/site-config";

/**
 * Página sin conexión. La sirve `public/sw.js` cuando no hay internet y la
 * página pedida no se visitó antes. No se indexa ni va en el sitemap.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Sin conexión",
    description: "No hay conexión a internet en este momento.",
    path: "/offline",
  }),
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-md px-6 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50 text-dark">
          <WifiOff size={30} aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-dark">
          Sin conexión a internet
        </h1>
        <p className="mt-3 leading-relaxed text-foreground/70">
          Esta página no está guardada en su teléfono. Las que ya visitó sí
          funcionan sin conexión. Cuando vuelva la señal, puede seguir donde
          estaba.
        </p>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/60">
          <WhatsAppIcon size={16} />
          WhatsApp: {WHATSAPP_DISPLAY}
        </p>
      </div>
    </section>
  );
}
