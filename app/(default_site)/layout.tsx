import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "@/app/layouts/MainLayout";
import { StoreProvider } from "@/app/providers/StoreProvider";
import "../../src/app/styles/root.scss";
import "../../src/app/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIBetGuru",
  description: "Generated by create next app",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <MainLayout>{children}</MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
