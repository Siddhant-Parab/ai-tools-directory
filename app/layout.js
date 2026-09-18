import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Fonts are loaded via a <link> tag rather than next/font/google so the
// project builds in network-restricted environments (CI, sandboxes). If you
// prefer next/font's self-hosting + zero layout shift, swap this for
// `import { Space_Grotesk, Inter } from "next/font/google"` — see README.

export const metadata = {
  title: "Free AI Tools Directory — Updated Daily | BestTools",
  description:
    "Discover the best free AI tools, updated daily. Browse 110 tools across chat, image, video, voice, music, writing, code, design, business, study, and website building.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-paper text-ink min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
