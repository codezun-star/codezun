import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Las páginas de ciudades vivían en /ciudades/:ciudad antes de
    // sumar el nivel de país (/ciudades/honduras/:ciudad). Estos
    // redirects cubren esas URLs viejas, que llegaron a estar publicadas.
    const oldCitySlugs = ["tegucigalpa", "san-pedro-sula", "la-ceiba", "choloma"];
    return oldCitySlugs.map((slug) => ({
      source: `/ciudades/${slug}`,
      destination: `/ciudades/honduras/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
