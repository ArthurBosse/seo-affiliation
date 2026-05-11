import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Génération statique pour les pages d'avis (SSG)
  output: "standalone",

  // Optimisation des images WebP/AVIF
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // En-têtes de sécurité et cache
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache agressif pour les assets statiques
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirections tracking affiliation : /go/[slug] → lien externe
  async redirects() {
    return [];
    // Les redirections affiliation sont gérées dynamiquement par /app/go/[slug]/route.ts
  },

  // Compression gzip/brotli activée par défaut dans Next.js
  compress: true,
};

export default nextConfig;
