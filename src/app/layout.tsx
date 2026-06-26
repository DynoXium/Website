import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import ScrollReveal from "@/components/ScrollReveal";
import PageOpenTransition from "@/components/PageOpenTransition";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ScrollToTop from "@/components/ScrollToTop";

const chelseaMarket = localFont({
  src: "../../public/fonts/chelsea-market-regular.woff2",
  variable: "--font-chelsea-market",
  weight: "400",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/space-grotesk-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-grotesk-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-grotesk-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-grotesk-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-grotesk-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/jetbrains-mono-100.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-100italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-200.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-200italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-300italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-500italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-600italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-700italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/jetbrains-mono-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-800italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
        <link rel="preload" href="/minecraft-bg.webp" as="image" type="image/webp" fetchPriority="high" />
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
