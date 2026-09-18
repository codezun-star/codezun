import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

/**
 * Logo real de Codezun.
 * Archivo: /public/logo/logo.png. Para actualizarlo, subí el archivo
 * nuevo a esa misma ruta (manteniendo el nombre) o cambiá el `src` de
 * abajo si usás otro nombre de archivo.
 *
 * `priority` se pide, no viene puesto. El componente se usa en dos sitios —el
 * menú y el pie—, y `priority` mete un `<link rel="preload">` en la cabecera
 * que le dice al navegador que descargue la imagen antes que nada. Eso es lo
 * correcto arriba, donde el logo se ve de entrada, y contraproducente abajo:
 * el pie está a una pantalla y media de distancia y ese preload compite por el
 * ancho de banda con la foto del hero, que es el elemento que mide el LCP.
 */
export default function Logo({
  className = "h-16",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label={SITE_NAME}>
      <Image
        src="/logo/logo.png"
        alt={SITE_NAME}
        width={403}
        height={290}
        priority={priority}
        className={`w-auto ${className}`}
      />
    </Link>
  );
}
