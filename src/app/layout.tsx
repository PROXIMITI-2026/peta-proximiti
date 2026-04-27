import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarLayout from "@/components/SidebarLayout";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PROXIMITI Dashboard — Kaderisasi",
  description: "Dashboard terpusat untuk manajemen peserta dan panitia kaderisasi PROXIMITI — Telkom University.",
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/logo-proximiti.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>
        <SidebarLayout>
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}
