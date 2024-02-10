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
  env: {
    NEXT_PUBLIC_PUSHER_ID: "1722174",
    NEXT_PUBLIC_PUSHER_KEY: "92818db2c676e9c3af64",
    NEXT_PUBLIC_PUSHER_SECRET: "d7da10ff10c3572be6ad",
    NEXT_PUBLIC_PUSHER_CLUSTER: "mt1",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
