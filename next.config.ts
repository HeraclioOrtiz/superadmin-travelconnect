import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Desactivado para evitar doble renderizado de MUI
  compiler: {
    emotion: true, // Necesario para MUI v5 con Next.js
  },
  images: {
    domains: ['localhost'], // Agrega tus dominios de imágenes
  },
  experimental: {
    esmExternals: 'loose', // Mejor compatibilidad con MUI
    serverComponentsExternalPackages: ['@mui/material'], // Para RSC
  },
  webpack: (config) => {
    // Soporte para svg como componentes
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;