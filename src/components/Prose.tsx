import type { ReactNode } from "react";

const PROSE_CLASSES =
  "space-y-5 text-foreground/80 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-dark [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-dark [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-dark [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary/80 [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-secondary/30 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_th]:border [&_th]:border-secondary/60 [&_th]:bg-secondary/30 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-secondary/60 [&_td]:p-2";

/**
 * Estilos tipográficos compartidos para contenido largo (páginas
 * legales, artículos del blog). Se aplican por selector de etiqueta
 * porque el contenido llega como bloque de texto/HTML, no como
 * componentes React individuales.
 *
 * Usá `children` para contenido JSX (páginas legales) o `html` para
 * una cadena de HTML ya generada (por ejemplo, markdown convertido a
 * HTML en el blog).
 */
export default function Prose({
  children,
  html,
  className = "",
}: {
  children?: ReactNode;
  html?: string;
  className?: string;
}) {
  if (html) {
    return (
      <div
        className={`${PROSE_CLASSES} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <div className={`${PROSE_CLASSES} ${className}`}>{children}</div>;
}
