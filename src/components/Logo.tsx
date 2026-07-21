import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

/**
 * Logo real de Codezun.
 * Archivo: /public/logo/logo.png. Para actualizarlo, subí el archivo
 * nuevo a esa misma ruta (manteniendo el nombre) o cambiá el `src` de
 * abajo si usás otro nombre de archivo.
 */
export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label={SITE_NAME}>
      <Image
        src="/logo/logo.png"
        alt={SITE_NAME}
        width={410}
        height={323}
        priority
        className={`w-auto ${className}`}
      />
    </Link>
  );
}
