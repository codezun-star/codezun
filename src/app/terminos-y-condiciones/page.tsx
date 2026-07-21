import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Términos y condiciones — Codezun",
};

export default function TerminosYCondiciones() {
  return (
    <LegalLayout title="Términos y condiciones" updatedAt="2026">
      <p>
        Estos Términos y Condiciones regulan el uso del sitio web
        codezun.com (el &quot;Sitio&quot;), operado por Codezun
        (&quot;Codezun&quot;, &quot;nosotros&quot;). Al acceder o utilizar
        el Sitio, aceptás quedar sujeto a estos términos.
      </p>

      <h2>Uso del sitio</h2>
      <p>
        El contenido de este Sitio es informativo y tiene como objetivo
        presentar los servicios de desarrollo de software de Codezun y
        los proyectos de nuestro portafolio. No está permitido utilizar
        el Sitio con fines ilícitos o que puedan dañar, inutilizar o
        sobrecargar el servicio.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, diseños, marcas y demás contenidos de este Sitio son
        propiedad de Codezun o de sus respectivos titulares, y están
        protegidos por la legislación de propiedad intelectual
        aplicable. No se autoriza su reproducción total o parcial sin
        consentimiento previo.
      </p>

      <h2>Servicios</h2>
      <p>
        Los servicios de desarrollo de software ofrecidos por Codezun se
        acuerdan de manera particular con cada cliente, mediante
        propuestas, contratos o acuerdos específicos que prevalecen
        sobre el contenido general de este Sitio.
      </p>

      <h2>Enlaces a terceros</h2>
      <p>
        El Sitio puede incluir enlaces a proyectos o sitios de terceros
        (por ejemplo, en la sección de portafolio). Codezun no se
        responsabiliza por el contenido o las prácticas de esos sitios
        externos.
      </p>

      <h2>Modificaciones</h2>
      <p>
        Codezun puede actualizar estos Términos y Condiciones en
        cualquier momento. Los cambios entrarán en vigencia desde su
        publicación en el Sitio.
      </p>

      <h2>Contacto</h2>
      <p>
        Ante cualquier consulta sobre estos Términos y Condiciones,
        podés escribirnos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
