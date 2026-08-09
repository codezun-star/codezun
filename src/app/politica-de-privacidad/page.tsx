import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { CONTACT_EMAIL, SITE_CONTENT_DATE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Codezun trata la información de contacto que compartís por email o por el formulario del sitio, qué cookies de analítica usa codezun.com y qué derechos tenés sobre esos datos.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaDePrivacidad() {
  return (
    <LegalLayout title="Política de privacidad" updatedAt={SITE_CONTENT_DATE}>
      <p>
        En Codezun respetamos tu privacidad. Esta política describe qué
        información recopilamos a través de codezun.com (el
        &quot;Sitio&quot;) y cómo la utilizamos.
      </p>

      <h2>Información que recopilamos</h2>
      <p>
        El Sitio no cuenta con formularios que envíen datos a un
        servidor propio. Si nos contactás por correo electrónico o
        completás el formulario de contacto (que abre tu cliente de
        correo), recibimos únicamente la información que decidas
        incluir en ese mensaje: por ejemplo, tu nombre, tu email y el
        contenido de tu consulta.
      </p>
      <p>
        Aparte de eso, el Sitio usa una herramienta de analítica de
        terceros (Google Analytics 4) para saber cuánta gente lo visita
        y qué páginas lee. Esa herramienta no nos dice quién sos: lo que
        vemos son datos agregados y estadísticos.
      </p>

      <h2>Uso de la información</h2>
      <p>
        La información que nos compartís por correo electrónico se
        utiliza exclusivamente para responder tu consulta y, en caso de
        avanzar con un proyecto, para gestionar la relación comercial
        correspondiente.
      </p>
      <p>
        Los datos de analítica se utilizan únicamente para entender qué
        contenido resulta útil y mejorar el Sitio. No se cruzan con la
        información de contacto que nos hayas enviado, ni se usan para
        publicidad, ni se venden o ceden a terceros.
      </p>

      <h2>Cookies y analítica</h2>
      <p>
        El Sitio utiliza Google Analytics 4, un servicio de analítica
        web de Google. Para distinguir visitas nuevas de visitas
        recurrentes, Google Analytics instala cookies propias en tu
        navegador (<code>_ga</code> y <code>_ga_&lt;id&gt;</code>), con
        una duración predeterminada de hasta dos años.
      </p>
      <p>
        A través de esa herramienta recibimos información técnica y de
        uso: páginas vistas, tiempo de permanencia, tipo de dispositivo
        y navegador, desde qué sitio o buscador llegaste y una
        ubicación aproximada a nivel de ciudad. Google Analytics 4 no
        registra ni nos entrega tu dirección IP, y nosotros no
        recibimos ningún dato que permita identificarte personalmente.
      </p>
      <p>
        El tratamiento de esos datos por parte de Google se rige por sus
        propias condiciones; podés consultarlas en la{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          política de privacidad de Google
        </a>
        .
      </p>
      <p>
        Si preferís no ser incluido en estas estadísticas, podés
        bloquear o eliminar las cookies desde la configuración de tu
        navegador, navegar en modo privado, o instalar el{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          complemento de inhabilitación de Google Analytics
        </a>
        . El Sitio funciona igual sin esas cookies: no se usan para
        ninguna función necesaria.
      </p>
      <p>
        El Sitio no utiliza cookies publicitarias, de remarketing ni de
        redes sociales.
      </p>

      <h2>Conservación y seguridad</h2>
      <p>
        Conservamos la información de contacto únicamente durante el
        tiempo necesario para atender tu consulta o mientras dure la
        relación comercial, y tomamos medidas razonables para
        protegerla.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Podés solicitarnos en cualquier momento que te informemos,
        corrijamos o eliminemos los datos que nos hayas compartido,
        escribiéndonos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2>Cambios en esta política</h2>
      <p>
        Esta Política de Privacidad puede actualizarse periódicamente.
        Cualquier cambio será publicado en esta misma página.
      </p>
    </LegalLayout>
  );
}
