/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.aibetguru.com" }],
      destination: "https://aibetguru.com/:path*",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
