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
  title: "Aqount Financial Clarity Diagnostic",
  description:
    "Aqount’s Financial Clarity Diagnostic analyzes your Xero accounting structure and highlights issues affecting reporting, visibility, and decision-making.",
  metadataBase: new URL("https://clarity.aqount.tech"),
  openGraph: {
    title: "Aqount Financial Clarity Diagnostic",
    description:
      "What’s your Financial Clarity Score? A complimentary read-only diagnostic for SMEs across Southeast Asia using Xero.",
    url: "https://clarity.aqount.tech",
    siteName: "Aqount",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
