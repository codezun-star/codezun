# Foto de fondo del Hero

Subí acá la foto del equipo que querés usar de fondo en la primera
sección (justo debajo del header), con el nombre `team.jpg`
(o `team.png` si preferís, pero avisá para ajustar la extensión en el
código).

Cuando el archivo esté en `/public/hero/team.jpg`, en `Hero.tsx` se usa
así (foto de fondo + velo blanco semitransparente encima para que el
texto se siga leyendo bien):

```tsx
import Image from "next/image";

<div className="absolute inset-0 z-0">
  <Image
    src="/hero/team.jpg"
    alt=""
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-white/80" />
</div>
```

No hace falta que la imagen tenga transparencia real (canal alfa): el
efecto de "fondo transparente" se logra con el velo blanco semi
transparente (`bg-white/80`) superpuesto, no con la imagen en sí.
