/**
 * Datos estructurados en la página.
 *
 * Todos los esquemas se arman con datos de este repositorio (site-config,
 * cities.ts, el frontmatter de los artículos), nunca con texto que venga de
 * fuera, así que serializarlos e inyectarlos es seguro. `JSON.stringify` ya
 * escapa las comillas; lo único que hace falta además es cortar la secuencia
 * que cerraría la etiqueta antes de tiempo: un título que contenga
 * `</script>` terminaría el bloque a mitad y volcaría el resto del JSON a la
 * página como marcado.
 *
 * Se emite un único `<script>` con todos los esquemas dentro de un array, que
 * es la forma que menos peso añade cuando una página declara varios.
 */
export default function JsonLd({
  schemas,
}: {
  schemas: (Record<string, unknown> | null | undefined)[];
}) {
  const valid = schemas.filter(
    (schema): schema is Record<string, unknown> => Boolean(schema)
  );
  if (valid.length === 0) return null;

  const payload = valid.length === 1 ? valid[0] : valid;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
