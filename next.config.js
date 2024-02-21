/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
