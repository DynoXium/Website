"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Server,
  Zap,
  Shield,
  Cpu,
  Layers,
  Users,
  Star,
  Activity,
  Globe,
  Settings,
  Headphones,
  Gamepad2,
  HardDrive,
  Monitor,
  Heart,
  Handshake,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Static Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />

        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[10%] w-[450px] h-[450px] bg-primary-cyan/4 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-secondary-cyan/3 rounded-full blur-[140px]" />

        {/* Skewed Tech Accent Panels */}
        <div className="absolute top-[20%] left-[-5%] w-[35%] h-[12%] bg-gradient-to-r from-[#161C2C]/40 to-transparent border-y border-[#2A3650]/20 -skew-y-6 hidden lg:block" />
        <div className="absolute bottom-[30%] right-[-5%] w-[35%] h-[12%] bg-gradient-to-l from-[#161C2C]/40 to-transparent border-y border-[#2A3650]/20 skew-y-6 hidden lg:block" />

        {/* Diagonal Gradient Stripes */}
        <div className="absolute top-[40%] right-[3%] w-80 h-12 bg-gradient-to-r from-primary-cyan/10 to-transparent rounded-full rotate-45 transform origin-right blur-[2px] hidden xl:block" />
        <div className="absolute bottom-[25%] left-[3%] w-80 h-12 bg-gradient-to-l from-secondary-cyan/10 to-transparent rounded-full rotate-45 transform origin-left blur-[2px] hidden xl:block" />

        {/* Rotating Vector Rings */}
        <div className="absolute -left-20 top-48 w-72 h-72 rounded-full border border-primary-cyan/5 animate-spin-slow" />
        <div className="absolute -right-20 bottom-48 w-80 h-80 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-reverse" />

        {/* Floating Cross Decorations */}
        <div className="absolute top-[15%] right-[15%] text-[#3388FF]/15 font-mono text-xl select-none">+</div>
        <div className="absolute bottom-[25%] left-[15%] text-primary-cyan/20 font-mono text-xl select-none">+</div>
        <div className="absolute top-[60%] left-[6%] text-primary-cyan/15 font-mono text-xl select-none">+</div>
        <div className="absolute bottom-[55%] right-[6%] text-[#3388FF]/15 font-mono text-xl select-none">+</div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-pulse" />
              Who We Are
            </div>
            <h1 className="font-norwester text-4xl sm:text-6xl lg:text-7xl tracking-wide text-white uppercase leading-none reveal-up delay-100">
              About <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">DynoXium</span>
            </h1>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium reveal-up delay-150">
              At DynoXium, we're committed to delivering fast, reliable, and high-performance hosting solutions for gamers, developers, creators, and businesses worldwide.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium reveal-up delay-150">
              Founded on 26 June by Kr Arjan (Founder) and Randeep Royal (Co-Founder), DynoXium was built with a simple vision: to provide premium hosting backed by dependable infrastructure, reliable services, and responsive customer support at affordable pricings.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium reveal-up delay-200">
              We currently offer Minecraft Server Hosting, Discord Bot Hosting, Code Server Hosting, Web Hosting, and Game Server Hosting, VPS Hosting, with many more services planned as we continue to grow. Every solution is designed with performance, security, and reliability at its core, ensuring a smooth experience for every customer.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium reveal-up delay-200">
              Our mission is to provide high-quality, affordable, and reliable hosting services that help our customers achieve their goals. We’re passionate about what we do, and we’re committed to providing our customers with the best possible experience.
            </p>
            <p className="text-base sm:text-lg text-primary-cyan font-bold leading-relaxed font-sans reveal-up delay-200 uppercase tracking-wide">
              Built for Stability. Trusted for Reliability.
            </p>
            <div className="pt-4 flex flex-wrap gap-6 items-center reveal-up delay-300">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">24/7</span>
                <span className="text-xs text-primary-cyan font-mono uppercase tracking-wider">Support Available</span>
              </div>
              <div className="h-10 w-[1px] bg-[#2A3650]/60 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">NVMe</span>
                <span className="text-xs text-success-teal font-mono uppercase tracking-wider">SSD Storage</span>
              </div>
              <div className="h-10 w-[1px] bg-[#2A3650]/60 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">DDoS</span>
                <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">Protection</span>
              </div>
            </div>
          </div>

          {/* Right Visual Graphic Column */}
          <div className="lg:col-span-5 flex justify-center items-center reveal-scale delay-150">
            <div className="relative w-full max-w-[400px] aspect-square rounded-3xl border border-primary-cyan/35 bg-gradient-to-br from-[#0E1321]/90 to-[#141B30]/80 p-8 shadow-[0_0_50px_rgba(108,244,255,0.08)] flex flex-col justify-between items-center group overflow-hidden">
              {/* Dynamic Accent glows on card */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary-cyan/15 rounded-full blur-[30px] group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-[#3388FF]/10 rounded-full blur-[30px] group-hover:scale-125 transition-transform duration-500" />

              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-grid-pattern-sm opacity-15" />

              <div className="relative z-10 w-full flex justify-between items-center border-b border-[#2A3650]/50 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] font-mono text-primary-cyan uppercase tracking-widest">Core.System</span>
              </div>

              {/* Animated Floating Graphic */}
              <div className="relative z-10 flex flex-col items-center justify-center py-6 group-hover:scale-105 transition-transform duration-500">
                <div className="mb-4 animate-bounce-slow flex items-center justify-center">
                  <Image src="/logo.webp" alt="DynoXium Logo" width={80} height={80} className="object-contain" />
                </div>
                <span className="font-norwester text-2xl tracking-widest text-white uppercase">Dyno<span className="text-primary-cyan">Xium</span></span>
              </div>

              <div className="relative z-10 w-full bg-[#080B14]/80 rounded-xl border border-[#2A3650]/60 p-3 font-mono text-[9px] text-[#A0AEC0] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#8A92A6]">LOCATION:</span>
                  <span className="text-white font-bold">India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A92A6]">Services:</span>
                  <span className="text-success-teal font-bold">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A92A6]">NETWORKS:</span>
                  <span className="text-primary-cyan font-bold">DDoS Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 reveal-up">
        <div className="bg-gradient-to-r from-[#0E1321]/90 to-[#141B30]/70 rounded-2xl border border-primary-cyan/25 p-8 sm:p-12 shadow-[0_0_40px_rgba(108,244,255,0.06)] relative overflow-hidden reveal-scale delay-75">
          <div className="absolute top-0 right-0 w-[300px] h-[100px] bg-primary-cyan/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium">
              At DynoXium, our goal is simple: to provide hosting that people can rely on. We believe everyone deserves fast, stable, and affordable hosting backed by honest service and support that truly cares. From gamers and developers to creators and businesses, we're committed to delivering an experience built on performance, reliability, and trust.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium">
              As we continue to grow, our vision is to become a trusted hosting provider for customers around the world. We'll keep improving our infrastructure, expanding our services, and listening to our community, while staying true to the reason DynoXium was created: to build a hosting company that people can genuinely trust.
            </p>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE HOSTING SOLUTIONS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-8 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up">
          <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
            Comprehensive Hosting Solutions
          </h2>
          <p className="text-xs sm:text-sm text-text-muted font-sans font-medium">
            DynoXium offers a wide range of hosting services to meet various requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Game Server Hosting */}
          <div className="metallic-card p-6 sm:p-8 rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 hover:border-primary-cyan/35 transition-all duration-300 flex flex-col justify-between space-y-4 reveal-up delay-75">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-blue-950/40 border border-primary-cyan/35 flex items-center justify-center text-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.15)]">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Game Server Hosting
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                We support over 10+ games, including Minecraft, Hytale, Terraria, ARK and FiveM. Our automated modpack installation and 24/7 support ensure a seamless gaming experience for users of all experience levels.
              </p>
            </div>
            <Link href="/game" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-cyan hover:underline pt-2">
              <span>Explore Game Hosting</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 2: VPS Hosting */}
          <div className="metallic-card p-6 sm:p-8 rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 hover:border-amber-500/35 transition-all duration-300 flex flex-col justify-between space-y-4 reveal-up delay-150">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-950/40 border border-amber-500/35 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                VPS Hosting
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                Take full control with high-performance VPS hosting built for developers, businesses, and power users. Enjoy dedicated resources, fast NVMe storage, flexible upgrades, and the freedom to run your projects exactly the way you want.
              </p>
            </div>
            <Link href="/vps" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline pt-2">
              <span>Configure VPS Node</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 3: Dedicated Server Hosting */}
          <div className="metallic-card p-6 sm:p-8 rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 hover:border-success-teal/35 transition-all duration-300 flex flex-col justify-between space-y-4 reveal-up delay-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success-teal/20 to-emerald-950/40 border border-success-teal/35 flex items-center justify-center text-success-teal shadow-[0_0_10px_rgba(0,229,163,0.15)]">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Virtual Desktop Servers (VDS)
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                For those seeking robust, raw performance, our dedicated servers offer exclusive use of high-powered hardware, ensuring optimal performance for demanding enterprise applications and massive game instances.
              </p>
            </div>
            <Link href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-success-teal hover:underline pt-2">
              <span>View Dedicated Plans</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES / SUPPORT / COMMUNITY */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Unparalleled Support */}
          <div className="metallic-card p-8 rounded-2xl border border-primary-cyan/20 bg-gradient-to-br from-[#0E1321]/90 to-[#141B30]/65 hover:border-primary-cyan/40 transition-all duration-300 relative overflow-hidden reveal-left delay-75">
            <div className="absolute top-0 right-0 w-[200px] h-[50px] bg-primary-cyan/5 rounded-full blur-[40px] pointer-events-none" />
            <div className="flex items-center gap-3 border-b border-[#2A3650]/40 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center text-primary-cyan">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="font-norwester text-xl sm:text-2xl text-white uppercase tracking-wider">
                Unparalleled Support
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
              We believe great support is built on clear communication and reliable assistance.  Our team is available 24/7 to help with everything from quick questions to technical issues. With fast response times and real people ready to assist, you’ll never be left waiting when it matters most.
            </p>
          </div>

          {/* Card 2: Community-Driven */}
          <div className="metallic-card p-8 rounded-2xl border border-primary-cyan/20 bg-gradient-to-br from-[#0E1321]/90 to-[#141B30]/65 hover:border-primary-cyan/40 transition-all duration-300 relative overflow-hidden reveal-right delay-75">
            <div className="absolute top-0 right-0 w-[200px] h-[50px] bg-primary-cyan/5 rounded-full blur-[40px] pointer-events-none" />
            <div className="flex items-center gap-3 border-b border-[#2A3650]/40 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center text-primary-cyan">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-norwester text-xl sm:text-2xl text-white uppercase tracking-wider">
                Community-Driven & Creator-Friendly
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
              From small friend groups to large gaming communities, we're here to help every server succeed. With reliable hosting, powerful tools, and dedicated support, we make it easy to create, manage, and grow your community with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* STUDIO PARTNERSHIPS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="bg-gradient-to-r from-[#0E1321]/90 to-[#141B30]/70 rounded-2xl border border-[#2A3650]/60 p-8 sm:p-12 shadow-[0_0_40px_rgba(108,244,255,0.06)] relative overflow-hidden reveal-scale delay-75">
          <div className="absolute top-0 right-0 w-[300px] h-[100px] bg-[#3388FF]/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-primary-cyan font-mono text-xs uppercase tracking-widest font-bold">
              <Handshake className="h-4.5 w-4.5" />
              <span>Studio Partnerships</span>
            </div>
            <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
              Helping Games Scale with Confidence
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium">
              We're committed to supporting game developers with reliable hosting and responsive technical support. By providing scalable infrastructure and dependable performance, we help studios focus on building great games while we handle the hosting.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="bg-gradient-to-br from-[#0E1321]/90 to-[#141B30]/75 rounded-2xl border border-primary-cyan/25 p-8 sm:p-12 shadow-[0_0_40px_rgba(108,244,255,0.08)] relative overflow-hidden">
          {/* Grid backdrop */}
          <div className="absolute inset-0 bg-grid-pattern-sm opacity-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Image/Mockup Left */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start reveal-left delay-100">
              <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#2A3650]/60 shadow-lg bg-[#080B14]">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-cyan/20 to-blue-500/10 mix-blend-overlay" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center space-y-3">
                  <Sparkles className="h-8 w-8 text-primary-cyan animate-pulse" />
                  <span className="font-norwester text-lg text-white tracking-widest uppercase">Start Your Journey</span>
                  <p className="text-[10px] text-text-muted leading-normal max-w-[200px]">
                    Join gamers and developers building on DynoXium nodes.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Text Right */}
            <div className="lg:col-span-7 space-y-4 reveal-right delay-150">
              <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
                Get Started Today
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                Every great project starts with the right foundation. At DynoXium, we combine powerful infrastructure, reliable performance, and dedicated support to help you launch with confidence. Start today and experience hosting built for gamers, developers, and growing communities.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/game"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-primary-cyan border border-primary-cyan text-black font-bold text-xs sm:text-sm hover:bg-transparent hover:text-white transition-all shadow-[0_0_15px_rgba(108,244,255,0.25)] uppercase tracking-wider group"
                >
                  Get Started
                  <ArrowUpRight className="h-3.5 w-3.5 text-black group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs sm:text-sm hover:border-primary-cyan/40 transition-all uppercase tracking-wider group"
                >
                  Community
                  <ArrowRight className="h-3.5 w-3.5 text-white group-hover:translate-x-0.5 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="py-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 text-center space-y-6 reveal-up">
        <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
          Contact Us
        </h2>
        <p className="text-xs sm:text-sm text-text-muted max-w-2xl mx-auto font-sans font-medium leading-relaxed">
          Have a question or need a custom hosting solution? Whether you're looking for a partnership, business hosting, or expert advice, our team is here to help. Reach out at{" "}
          <a href="mailto:business@dynoxium.tech" className="text-primary-cyan hover:underline">
            business@dynoxium.tech
          </a>{" "}
          or open a ticket through our Ticket System.
        </p>
      </section>
    </div>
  );
}
