import type { Metadata } from "next";
import { Chelsea_Market, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import ScrollReveal from "@/components/ScrollReveal";
import PageOpenTransition from "@/components/PageOpenTransition";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ScrollToTop from "@/components/ScrollToTop";

const chelseaMarket = Chelsea_Market({
  variable: "--font-chelsea-market",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const norwester = localFont({
  src: "../../public/fonts/norwester.woff",
  variable: "--font-norwester",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DynoXium | Freemium All-In-One Cloud Hosting",
  description:
    "Deploy Minecraft servers, Discord bots, Web apps, VPS servers, and databases with high performance and zero friction. All-In-One freemium hosting built for developers.",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${chelseaMarket.variable} ${jetbrainsMono.variable} ${norwester.variable} h-full dark`}
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=2" />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-dark text-text-light font-sans antialiased">
        <CurrencyProvider>
          <GlobalBackground />
          <ScrollReveal />
          <Header />
          <main className="flex-grow pb-28">
            <PageOpenTransition>{children}</PageOpenTransition>
          </main>
          <Footer />
          <ScrollToTop />
        </CurrencyProvider>
      </body>
    </html>
  );
}
