import { ViewTransition } from "react";

/**
 * Transición entre páginas, como en una app.
 *
 * Va en un template y no en el layout porque el template se vuelve a montar
 * en cada navegación, que es lo que dispara `enter`/`exit`; el layout
 * persiste y nunca los dispararía. El encabezado y la barra de pestañas
 * llevan su propio `viewTransitionName` y no se animan (ver globals.css):
 * solo cambia el contenido.
 *
 * Los navegadores sin View Transitions navegan igual, sin animación.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="pagina" exit="pagina" default="none">
      {children}
    </ViewTransition>
  );
}
