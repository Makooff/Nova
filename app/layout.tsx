import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreventZoom from "@/components/ui/PreventZoom";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Nova — Agence de Production Vidéo Publicitaire | Belgique & France",
  description:
    "Nova produit des vidéos publicitaires qui convertissent. Tournage, montage, campagnes Ads et agents IA Qwillio pour les entreprises en Belgique et en France.",
  keywords: [
    "production vidéo",
    "publicité",
    "Belgique",
    "France",
    "vidéo publicitaire",
    "Google Ads",
    "Meta Ads",
    "agents IA",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nova",
  },
  openGraph: {
    title: "Nova — Production Vidéo Publicitaire",
    description:
      "Vidéos publicitaires tournées et montées pour convertir, campagnes Ads et accès exclusif aux agents IA Qwillio.",
    type: "website",
    locale: "fr_BE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${sora.variable} ${jakarta.variable} ${dmMono.variable} font-sora antialiased`}
      >
        <PreventZoom />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
