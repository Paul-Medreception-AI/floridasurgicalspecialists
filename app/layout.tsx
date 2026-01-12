import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "./_components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Florida Surgical Specialists | Personalized Robotic Surgery",
  description:
    "Personalized surgical care for Bradenton and Sarasota delivered by Florida Surgical Specialists with robotic expertise and faster recovery pathways.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-953PG65914" strategy="afterInteractive" />
        <Script id="ga4-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-953PG65914');`}
        </Script>
      </head>
      <body
        className={`${inter.variable} antialiased bg-[var(--color-background)] text-[var(--color-foreground)]`}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
