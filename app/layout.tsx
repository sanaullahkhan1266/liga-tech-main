import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lega-tech.example"),
  title: "lega-tech — AI + Tech Talent",
  description: "Find top AI and blockchain experts to bring your vision to life.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "lega-tech — AI + Tech Talent",
    description: "Hire senior AI and UX experts. Start shipping in days.",
    url: "https://lega-tech.example",
    siteName: "lega-tech",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "lega-tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "lega-tech — AI + Tech Talent",
    description: "Hire senior AI and UX experts. Start shipping in days.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
