import type { Metadata } from "next";
import { Chelsea_Market, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import { CurrencyProvider } from "@/context/CurrencyContext";
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

export const metadata: Metadata = {
  title: "DynoXium | Freemium All-In-One Cloud Hosting",
  description:
    "Deploy Minecraft servers, Discord bots, Web apps, VPS servers, and databases with high performance and zero friction. All-In-One freemium hosting built for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${chelseaMarket.variable} ${jetbrainsMono.variable} h-full dark`}
    >
      <body className="min-h-screen flex flex-col bg-bg-dark text-text-light font-sans antialiased">
        <CurrencyProvider>
          <GlobalBackground />
          <Header />
          <main className="flex-grow pb-28">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
