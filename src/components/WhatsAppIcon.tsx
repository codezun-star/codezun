/**
 * Ícono de WhatsApp. lucide-react no incluye íconos de marca (ni este
 * ni ningún otro logo de red social), así que este es un SVG propio
 * que reproduce el glifo reconocible de WhatsApp (auricular dentro de
 * una burbuja de chat), para usar junto al color de marca #25D366.
 */
export default function WhatsAppIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2.5c-5.26 0-9.54 4.27-9.54 9.54 0 1.68.44 3.31 1.28 4.75L2.5 21.5l4.86-1.27a9.5 9.5 0 0 0 4.68 1.23h.01c5.26 0 9.54-4.27 9.54-9.54 0-2.55-.99-4.94-2.79-6.75a9.47 9.47 0 0 0-6.76-2.67zm0 17.45h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .78.8-2.92-.19-.3a7.87 7.87 0 0 1-1.21-4.2c0-4.36 3.55-7.91 7.92-7.91a7.86 7.86 0 0 1 5.6 2.32 7.86 7.86 0 0 1 2.32 5.6c0 4.36-3.55 7.9-7.91 7.9zm4.34-5.92c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}
