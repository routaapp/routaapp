import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Routa — Experiencias turísticas en LATAM",
  description:
    "Descubre y reserva experiencias únicas con guías locales verificados en toda Latinoamérica.",
  keywords: ["turismo", "LATAM", "experiencias", "tours", "guías locales"],
  openGraph: {
    title: "Routa",
    description: "Experiencias turísticas auténticas en LATAM",
    url: "https://itsrouta.com",
    siteName: "Routa",
    locale: "es_LA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
