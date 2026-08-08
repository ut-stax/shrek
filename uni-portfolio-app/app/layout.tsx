import type { Metadata } from "next";
import { Inter, Playfair_Display, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dynamic Portfolio | Interactive Work Showcase",
  description: "A high-performance portfolio application providing filterable project showcases, media-rich case study engines.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Dynamic Portfolio | Interactive Work Showcase",
    description: "A high-performance portfolio application providing filterable project showcases, media-rich case study engines.",
    url: siteUrl,
    siteName: "Dynamic Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${figtree.variable}`}>
      <body>
        <Header />
        <main style={{ paddingTop: "20px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
