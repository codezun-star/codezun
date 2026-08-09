import type { Metadata } from "next";
import Link from "next/link";
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
        Este Sitio utiliza cookies de analítica de Google Analytics 4,
        que sirven para medir de forma estadística cuántas visitas
        recibe y qué páginas se leen. No se utilizan cookies
        publicitarias, de remarketing ni de redes sociales, y ninguna
        cookie es necesaria para que el Sitio funcione: podés
        bloquearlas o eliminarlas desde tu navegador sin perder acceso a
        ningún contenido.
      </p>
      <p>
        El detalle de qué cookies se instalan, qué información recogen y
        cómo desactivarlas está en la{" "}
        <Link href="/politica-de-privacidad" className="text-primary underline">
          política de privacidad
        </Link>
        .
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
