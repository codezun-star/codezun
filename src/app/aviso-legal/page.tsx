import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { CONTACT_EMAIL, SITE_CONTENT_DATE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Identificación del titular del sitio, condiciones de uso del contenido y política de cookies de codezun.com.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso legal" updatedAt={SITE_CONTENT_DATE}>
      <h2>Identificación</h2>
      <p>
        El presente sitio web, codezun.com (el &quot;Sitio&quot;), es
        operado por Codezun, empresa de desarrollo de software. Para
        cualquier consulta relacionada con este aviso legal, podés
        escribirnos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2>Objeto del sitio</h2>
      <p>
        El Sitio tiene como finalidad presentar a Codezun, sus servicios
        de desarrollo de software (web, móvil y soluciones a medida) y
        una selección de proyectos propios a modo de portafolio.
      </p>

      <h2>Responsabilidad sobre el contenido</h2>
      <p>
        Codezun procura que la información publicada en el Sitio sea
        correcta y esté actualizada, pero no garantiza la exactitud,
        vigencia o integridad total de dicha información en todo
        momento.
      </p>

      <h2>Cookies</h2>
      <p>
        Este Sitio, en su versión actual, no utiliza cookies de
        seguimiento ni cookies de terceros con fines analíticos o
        publicitarios. Únicamente podría utilizarse almacenamiento
        técnico estrictamente necesario para el funcionamiento básico
        del Sitio. Si en el futuro se incorporan cookies adicionales
        (por ejemplo, de analítica), este apartado será actualizado y,
        de corresponder, se solicitará el consentimiento necesario.
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        El uso de este Sitio se rige por la legislación aplicable en
        materia de comercio electrónico y protección de datos vigente
        en el territorio donde opera Codezun.
      </p>
    </LegalLayout>
  );
}
