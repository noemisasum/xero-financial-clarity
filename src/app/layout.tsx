import type { Metadata, Viewport } from "next";
import { Albert_Sans, Roboto } from "next/font/google";
import LoadingOverlayProvider from "@/components/LoadingOverlayProvider";
import "./globals.css";

// Match aqount.tech typography (observed):
// - Headlines: Albert Sans
// - Headings/body: Roboto + system fallbacks
const albertSans = Albert_Sans({
  variable: "--font-brand-head",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-brand-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Aqount Financial Clarity Diagnostic",
  description:
    "Aqount’s Financial Clarity Diagnostic analyzes your Xero accounting structure and highlights issues affecting reporting, visibility, and decision-making.",
  metadataBase: new URL("https://clarity.aqount.tech"),
  icons: {
    // Cache-bust: Chrome can aggressively cache favicons even in incognito.
    // Prefer the app-router /icon.png pipeline; keep .ico as a fallback.
    icon: [
      { url: "/icon.png?v=2", sizes: "256x256", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Aqount Financial Clarity Diagnostic",
    description:
      "Get your Financial Clarity Score. A complimentary read-only diagnostic for SMEs across Southeast Asia using Xero.",
    url: "https://clarity.aqount.tech",
    siteName: "Aqount",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${albertSans.variable} ${roboto.variable} antialiased`}>
        <LoadingOverlayProvider>{children}</LoadingOverlayProvider>
      </body>
    </html>
  );
}
