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
    // pusher key
    NEXT_PUBLIC_PUSHER_ID: "1722174",
    NEXT_PUBLIC_PUSHER_KEY: "92818db2c676e9c3af64",
    NEXT_PUBLIC_PUSHER_SECRET: "d7da10ff10c3572be6ad",
    NEXT_PUBLIC_PUSHER_CLUSTER: "mt1",

    // auth key
    GOOGLE_CLIENT_ID:
      "1065253511640-j4tmllhq2fqfejh0a9jou6f3uti7vmg8.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
