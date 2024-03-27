import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import MainLayout from "@/app/layouts/MainLayout";
import { StoreProvider } from "@/app/providers/StoreProvider";
import "../src/app/styles/root.scss";
import "../src/app/styles/globals.scss";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { WebVitals, YmMetrika } from "@/features/analytics";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "AIBetGuru",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <WebVitals />
        <NextTopLoader showSpinner={false} />

        <StoreProvider>
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </StoreProvider>
        {/* <Suspense>
          <YmMetrika />
        </Suspense> */}
      </body>
    </html>
  );
}
