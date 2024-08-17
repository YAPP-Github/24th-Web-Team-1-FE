const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: [
      "github.com",
      "oopy.lazyrockets.com",
      "eehhqckznniu25210545.cdn.ntruss.com",
      "d3ex4vlh373syu.cloudfront.net",
      "storage.mrblog.net",
      "d3ex4vlh373syu.cloudfront.net",
      "www.fig1.kr",
      "cdn.maily.so",
      "maily.so",
      "pension.inmostadvisor.com",
      "localhost",
    ],
    formats: ["image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [240, 280, 300, 320, 350, 400, 480],
  },
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (context.isServer) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      } else {
        config.resolve.alias["msw/browser"] = false;
      }
    } else {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/node", alias: false });
      } else {
        config.resolve.alias["msw/node"] = false;
      }
    }
    return config;
  },
};

export default nextConfig;
