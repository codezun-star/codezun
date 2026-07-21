import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad — Codezun",
};

export default function PoliticaDePrivacidad() {
  return (
    <LegalLayout title="Política de privacidad" updatedAt="2026">
      <p>
        En Codezun respetamos tu privacidad. Esta política describe qué
        información recopilamos a través de codezun.com (el
        &quot;Sitio&quot;) y cómo la utilizamos.
      </p>

      <h2>Información que recopilamos</h2>
      <p>
        Actualmente, el Sitio no cuenta con formularios que envíen datos
        a un servidor propio ni con herramientas de analítica o
        seguimiento de terceros. Si nos contactás por correo electrónico
        o completás el formulario de contacto (que abre tu cliente de
        correo), recibimos únicamente la información que decidas
        incluir en ese mensaje: por ejemplo, tu nombre, tu email y el
        contenido de tu consulta.
      </p>

      <h2>Uso de la información</h2>
      <p>
        La información que nos compartís por correo electrónico se
        utiliza exclusivamente para responder tu consulta y, en caso de
        avanzar con un proyecto, para gestionar la relación comercial
        correspondiente.
      </p>

      <h2>Cookies</h2>
      <p>
        El Sitio no utiliza cookies propias de seguimiento ni cookies de
        terceros con fines publicitarios. Si en el futuro se
        incorporaran herramientas que requieran cookies (por ejemplo,
        analítica), esta política será actualizada para reflejarlo.
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
