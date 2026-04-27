import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarLayout from "@/components/SidebarLayout";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PROXIMITI Dashboard — Kaderisasi",
  description: "Dashboard terpusat untuk manajemen peserta dan panitia kaderisasi PROXIMITI — Telkom University.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-proximiti.png",
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
