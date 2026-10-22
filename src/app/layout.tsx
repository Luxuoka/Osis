import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/global/LoadingScreen";
import { SITE_IDENTITY } from "@/lib/constants";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070D18",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_IDENTITY.DOMAIN}`),
  title: {
    default: SITE_IDENTITY.NAMA_ORGANISASI,
    template: `%s | ${SITE_IDENTITY.NAMA_ORGANISASI}`,
  },
  description: `Website Resmi ${SITE_IDENTITY.NAMA_ORGANISASI} (${SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}). Pusat informasi, pendaftaran, berita ekstrakurikuler, galeri logo, dan kegiatan siswa ${SITE_IDENTITY.NAMA_SEKOLAH}.`,
  keywords: [
    "OSIS",
    SITE_IDENTITY.NAMA_SEKOLAH,
    SITE_IDENTITY.NAMA_ORGANISASI,
    SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH,
    "SMA Santa Maria 1",
    "Santa Maria Bandung",
    "ekstrakurikuler",
    "organisasi siswa",
    "pendaftaran OSIS",
    "Bandung",
  ],
  authors: [{ name: SITE_IDENTITY.NAMA_ORGANISASI }],
  creator: SITE_IDENTITY.NAMA_ORGANISASI,
  publisher: SITE_IDENTITY.NAMA_SEKOLAH,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `https://${SITE_IDENTITY.DOMAIN}`,
    siteName: SITE_IDENTITY.NAMA_ORGANISASI,
    title: SITE_IDENTITY.NAMA_ORGANISASI,
    description: `Website Resmi ${SITE_IDENTITY.NAMA_ORGANISASI} (${SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}). Pusat informasi, pendaftaran, berita ekstrakurikuler, galeri logo, dan kegiatan siswa ${SITE_IDENTITY.NAMA_SEKOLAH}.`,
    images: [
      {
        url: "/osis-logo.jpeg",
        width: 800,
        height: 800,
        alt: `Logo ${SITE_IDENTITY.NAMA_ORGANISASI}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.NAMA_ORGANISASI,
    description: `Website Resmi ${SITE_IDENTITY.NAMA_ORGANISASI} (${SITE_IDENTITY.NAMA_JULUKAN_SEKOLAH}). Pusat informasi, pendaftaran, berita ekstrakurikuler, galeri logo, dan kegiatan siswa ${SITE_IDENTITY.NAMA_SEKOLAH}.`,
    images: ["/osis-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="bg-white text-slate-900 min-h-screen antialiased selection:bg-[#1A56DB] selection:text-white">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
