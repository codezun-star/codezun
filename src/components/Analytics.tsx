import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/site-config";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Es la etiqueta oficial de Google tal cual, montada sobre `next/script`
 * en lugar de sobre `@next/third-parties`: ese paquete envuelve estas
 * mismas dos etiquetas y nada más, sigue marcado como experimental y
 * arrastra una dependencia extra, así que no compensa sumarlo al
 * proyecto por diez líneas que se leen enteras acá.
 *
 * `afterInteractive` (el valor por defecto, explícito para que se lea)
 * carga gtag.js en cuanto la página es interactiva. No usamos
 * `lazyOnload`, que esperaría a que el navegador esté ocioso: las
 * visitas que rebotan a los pocos segundos —justo las que hay que
 * medir— se irían antes de que la etiqueta llegara a dispararse.
 *
 * Las navegaciones internas de Next no recargan la página, así que no
 * generan un `page_view` por sí solas; las cuenta la "Medición
 * mejorada" de GA4, que escucha los cambios del historial del navegador
 * (`pushState`) que usa el App Router. Viene activada por defecto en la
 * propiedad: si alguna vez se apaga, las vistas de página caen a una
 * por sesión y hay que mandarlas a mano desde un componente de cliente.
 *
 * Solo se monta en producción. En `next dev` el bloque entero se
 * elimina en tiempo de compilación (`NODE_ENV` es una constante para el
 * bundler), de modo que trabajar en local no ensucia el informe con
 * visitas a localhost que no son de nadie.
 */
export default function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
