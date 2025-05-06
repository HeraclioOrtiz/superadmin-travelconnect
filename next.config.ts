// next.config.ts
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['localhost'],
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['@mui/material'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESTA LÍNEA ES LA CLAVE
  },
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

// ⚠️ Importante: `export default` a `module.exports`
module.exports = nextConfig;
