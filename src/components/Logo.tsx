import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

/**
 * Placeholder de logo.
 *
 * Por ahora muestra el nombre "Codezun" estilizado en texto. Cuando
 * tengas el archivo del logo real:
 *
 * 1. Subí la imagen a /public/logo/ (ej: /public/logo/codezun.svg)
 * 2. Reemplazá el <span> de abajo por, por ejemplo:
 *
 *    import Image from "next/image";
 *    <Image src="/logo/codezun.svg" alt={SITE_NAME} width={140} height={32} />
 *
 * Se recomienda un SVG o PNG con fondo transparente.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`text-xl font-bold tracking-tight text-dark ${className}`}
    >
      {SITE_NAME}
      <span className="text-primary">.</span>
    </Link>
  );
}
