"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
              Who We Are
            </div>
            <h1 className="font-norwester text-4xl sm:text-6xl lg:text-7xl tracking-wide text-white uppercase leading-none reveal-up delay-100">
              About <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">DynoXium</span>
            </h1>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium reveal-up delay-150">
              At DynoXium, we are dedicated to delivering exceptional server hosting solutions tailored to the diverse needs of gamers, content creators, developers, and studios. Founded in India by Kr Arjan, our journey began with a passion for gaming and hosting, and a commitment to revolutionize the hosting experience.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium reveal-up delay-200">
              Frustrated by subpar customer support and prolonged wait times from existing providers, we set out to create a platform where customers would receive prompt, knowledgeable, and comprehensive assistance.
            </p>
            <div className="pt-4 flex flex-wrap gap-6 items-center reveal-up delay-300">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">10,000+</span>
                <span className="text-xs text-primary-cyan font-mono uppercase tracking-wider">Servers Configured</span>
              </div>
              <div className="h-10 w-[1px] bg-[#2A3650]/60 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">99.99%</span>
                <span className="text-xs text-success-teal font-mono uppercase tracking-wider">Uptime Average</span>
              </div>
              <div className="h-10 w-[1px] bg-[#2A3650]/60 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">15 Min</span>
                <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">Response Guarantee</span>
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
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary-cyan/20 to-blue-500/20 border border-primary-cyan/30 flex items-center justify-center shadow-[0_0_30px_rgba(108,244,255,0.15)] mb-4 animate-bounce-slow">
                  <Server className="h-12 w-12 text-primary-cyan" />
                </div>
                <span className="font-norwester text-2xl tracking-widest text-white uppercase">Dyno<span className="text-primary-cyan">Node</span></span>
                <span className="text-[10px] font-mono text-text-muted mt-1 uppercase tracking-wide">Active Node Cluster v2.6</span>
              </div>

              <div className="relative z-10 w-full bg-[#080B14]/80 rounded-xl border border-[#2A3650]/60 p-3 font-mono text-[9px] text-[#A0AEC0] space-y-1">
                <div className="flex justify-between">
                  <span className="text-text-muted">LOCATION:</span>
                  <span className="text-white font-bold">New Delhi, IN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">CAPACITY:</span>
                  <span className="text-success-teal font-bold">94.8% Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">NETWORKS:</span>
                  <span className="text-primary-cyan font-bold">100Gbps Backbone</span>
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
              Our mission is to empower our clients through player-oriented server options, scalable hosting solutions, and unrivaled support along the way. We strive to build a community where gamers are valued and creators can realize their visions without limitations.
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
            DynoXium offers a wide array of hosting services to meet various requirements.
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
                Specializing in game server hosting, we support over 100+ games, including Minecraft, Rust, Palworld, and FiveM. Our automated modpack installation and 24/7 support ensure a seamless gaming experience for users of all experience levels.
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
                Our Virtual Private Server (VPS) hosting provides full control over your server environment, allowing you to host websites, manage databases, run scripts, or scale application containers with ease. With multiple flexible plans, our VPS servers are both affordable and scalable.
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
                Dedicated Server Hosting
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
              We pride ourselves on offering <span className="font-bold text-white">24/7/365 support</span> and an average response time of under 15 minutes. That means there's always someone knowledgeable and ready to talk to! Our experienced staff is equipped to assist with a variety of technical issues, ensuring that you receive the help you need without unnecessary delays.
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
              We believe in the power of community. We are dedicated to fostering a thriving ecosystem where both gamers and developers can flourish. By promoting player-owned servers, we enhance game visibility, attract active players, and build robust developer communities globally.
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
              High-Performance Studio Collaboration
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans font-medium">
              Our experience and technical expertise make us an ideal partner for game studios looking to deliver seamless, high-performance multiplayer experiences. We collaborate closely with developers to tailor hosting solutions to their needs, ensuring games run smoothly on our platform, all while facilitating community building at all levels.
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
                    Join thousands of gamers and developers building on DynoXium nodes.
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
                Whether you're a gamer seeking a hassle-free hosting experience or a game studio looking for a strategic partner, DynoXium is here to support you. Our 24/7 support team, custom-built tools, and robust infrastructure are designed to provide peace of mind and exceptional performance.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/game"
                  className="px-6 py-2.5 rounded-lg bg-primary-cyan border border-primary-cyan text-black font-bold text-xs sm:text-sm hover:bg-transparent hover:text-primary-cyan transition-all shadow-[0_0_15px_rgba(108,244,255,0.25)] uppercase tracking-wider"
                >
                  Configure Server
                </Link>
                <Link
                  href="#"
                  className="px-6 py-2.5 rounded-lg bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs sm:text-sm hover:border-primary-cyan/40 transition-all uppercase tracking-wider"
                >
                  Get Pro Support
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
          For partnership inquiries, customized enterprise server configurations, or to learn more about our hardware, please contact us at{" "}
          <a href="mailto:business@dynoxium.com" className="text-primary-cyan hover:underline">
            business@dynoxium.com
          </a>{" "}
          or submit a ticket via our client portal.
        </p>
      </section>
    </div>
  );
}
