# Logo de Codezun

Subí acá el archivo del logo real (SVG o PNG con fondo transparente,
idealmente) y actualizá `src/components/Logo.tsx` para usarlo con
`next/image` en lugar del texto placeholder.

Ejemplo una vez subido el archivo (ej: `codezun.svg`):

```tsx
import Image from "next/image";
<Image src="/logo/codezun.svg" alt="Codezun" width={140} height={32} />
```
