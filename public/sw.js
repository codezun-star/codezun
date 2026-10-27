/*
 * Service worker de codezun.com (lo registra src/components/ServiceWorker.tsx)
 *
 * - Páginas (HTML): primero la red, así nunca se sirve una versión vieja del
 *   sitio si hay conexión. Cada página visitada se guarda y queda disponible
 *   sin internet; si no hay copia, se muestra /offline.
 * - /_next/static/* (CSS, JS y fuentes con hash en el nombre): primero la
 *   caché, porque el archivo nunca cambia; un deploy nuevo trae nombres nuevos.
 * - Íconos, logo e imágenes: caché y se refresca en segundo plano.
 * - Las peticiones internas del router de Next (RSC) y todo lo de otros
 *   dominios (Google Analytics, wa.me) pasan directo a la red.
 *
 * Para forzar que todos los teléfonos descarten la caché, sube VERSION.
 */
const VERSION = "v1";
const CACHE_PAGINAS = `codezun-paginas-${VERSION}`;
const CACHE_ESTATICOS = `codezun-estaticos-${VERSION}`;
const OFFLINE_URL = "/offline";
const MAX_PAGINAS = 60;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const paginas = await caches.open(CACHE_PAGINAS);
      const estaticos = await caches.open(CACHE_ESTATICOS);
      // La página sin conexión y el CSS/JS que usa, para que se vea bien
      // aunque nunca se haya visitado otra página.
      try {
        const respuesta = await fetch(OFFLINE_URL, { cache: "reload" });
        if (respuesta.ok) {
          const html = await respuesta.clone().text();
          await paginas.put(OFFLINE_URL, respuesta);
          const recursos = [
            ...html.matchAll(/(?:href|src)="(\/_next\/static\/[^"]+\.(?:css|js|woff2))"/g),
          ].map((m) => m[1]);
          await Promise.all(recursos.map((url) => estaticos.add(url).catch(() => {})));
        }
      } catch {
        // Sin red al instalar: se reintenta en la próxima visita
      }
      await Promise.all(
        ["/logo/logo.png", "/icons/icon-192.png"].map((url) =>
          estaticos.add(url).catch(() => {})
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const vigentes = [CACHE_PAGINAS, CACHE_ESTATICOS];
      const nombres = await caches.keys();
      await Promise.all(
        nombres
          .filter((n) => n.startsWith("codezun-") && !vigentes.includes(n))
          .map((n) => caches.delete(n))
      );
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })()
  );
});

const esGuardable = (respuesta) =>
  respuesta && respuesta.ok && respuesta.type === "basic" && !respuesta.redirected;

async function recortarPaginas(cache) {
  const claves = await cache.keys();
  const sobrantes = claves.filter((r) => new URL(r.url).pathname !== OFFLINE_URL);
  for (const clave of sobrantes.slice(0, Math.max(0, sobrantes.length - MAX_PAGINAS))) {
    await cache.delete(clave);
  }
}

async function pagina(event) {
  const cache = await caches.open(CACHE_PAGINAS);
  try {
    const respuesta = (await event.preloadResponse) || (await fetch(event.request));
    if (esGuardable(respuesta)) {
      const copia = respuesta.clone();
      event.waitUntil(cache.put(event.request.url, copia).then(() => recortarPaginas(cache)));
    }
    return respuesta;
  } catch {
    const guardada = await cache.match(event.request.url, { ignoreSearch: true });
    if (guardada) return guardada;
    const offline = await cache.match(OFFLINE_URL);
    return offline || Response.error();
  }
}

async function primeroCache(request) {
  const cache = await caches.open(CACHE_ESTATICOS);
  const guardada = await cache.match(request);
  if (guardada) return guardada;
  const respuesta = await fetch(request);
  if (esGuardable(respuesta)) cache.put(request, respuesta.clone());
  return respuesta;
}

async function cacheYRefresca(event) {
  const cache = await caches.open(CACHE_ESTATICOS);
  const guardada = await cache.match(event.request);
  const red = fetch(event.request)
    .then((respuesta) => {
      if (esGuardable(respuesta)) cache.put(event.request, respuesta.clone());
      return respuesta;
    })
    .catch(() => undefined);
  if (guardada) {
    event.waitUntil(red);
    return guardada;
  }
  return (await red) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navegaciones internas del router de Next: van a la red. Si fallan sin
  // conexión, Next hace una navegación completa y la atiende pagina().
  if (request.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  if (request.mode === "navigate") {
    event.respondWith(pagina(event));
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(primeroCache(request));
    return;
  }

  if (
    /^\/(icons|logo|portfolio|hero|team)\//.test(url.pathname) ||
    url.pathname.startsWith("/_next/image") ||
    /\.(png|svg|webp|jpg|jpeg|ico)$/.test(url.pathname)
  ) {
    event.respondWith(cacheYRefresca(event));
  }
});
