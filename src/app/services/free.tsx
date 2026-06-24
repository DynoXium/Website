"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Shield,
  Users,
  DollarSign,
  Zap,
  Server,
  Globe,
  ArrowRight,
  Cpu,
  Layers,
} from "lucide-react";

export default function FreeHosting() {
  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        {/* Dynamic Glow Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[150px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto z-10 reveal-up">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-purple-400 uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.15)] reveal-up delay-75`}>
          DynoXium Freemium Tier
        </div>
        <h1 className="font-norwester text-4xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Build Your Community For <span className="text-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">Free</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Launch a Minecraft server or website instantly. No credit card required, just pure performance.
        </p>
      </section>

      {/* PRICING PLANS GRID */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-20 space-y-12 reveal-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Free Minecraft Server */}
          <div className="group relative rounded-2xl border border-purple-500/20 bg-[#0E1321]/60 p-8 flex flex-col justify-between space-y-8 transition-all duration-300 hover:border-purple-500/45 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] reveal-up delay-75">
            {/* Tech corner accent brackets */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-purple-500/40 transition-colors" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-purple-500/40 transition-colors" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-purple-500/40 transition-colors" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-purple-500/40 transition-colors" />

            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest font-mono">
                    Free Tier
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight pt-1">
                    Free Minecraft Server
                  </h3>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
                    Host Nodes India/Germany
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <Server className="h-5 w-5" />
                </div>
              </div>

              {/* Price Display */}
              <div className="py-2.5 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-success-teal font-display">
                  FREE
                </span>
                <span className="text-[10px] text-text-muted uppercase font-mono">/ forever</span>
              </div>

              {/* Specs List */}
              <ul className="space-y-3 text-xs sm:text-sm text-text-light font-sans font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>CPU Allocation: <span className="text-white font-bold">150% (Intel Xeon CPU)</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>RAM Capacity: <span className="text-white font-bold">4 GB DDR4 ECC Memory</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>Disk Storage: <span className="text-white font-bold">5 GB SSD Storage</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>Database Limit: <span className="text-white font-bold">1 Database Space</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>Backup Limit: <span className="text-white font-bold">0 Backup Slots</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>Network Ports: <span className="text-white font-bold">0 Additional Ports</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-success-teal flex-shrink-0" />
                  <span>Management Panel: <span className="text-white font-bold">Free Game Panel</span></span>
                </li>
              </ul>
            </div>

            {/* Action button */}
            <button className="w-full py-3 rounded-xl border-2 font-bold text-xs uppercase tracking-widest bg-purple-600 text-white border-purple-600 hover:bg-transparent hover:text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all active:scale-[0.98] cursor-pointer">
              Create Free Server
            </button>
          </div>

          {/* Card 2: Free Webhosting */}
          <div className="group relative rounded-2xl border border-[#2A3650]/40 bg-[#0E1321]/30 p-8 flex flex-col justify-between space-y-8 opacity-75 reveal-up delay-150">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <span className="bg-[#2A3650]/30 border border-[#2A3650]/50 text-text-muted px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest font-mono">
                    Out of Stock
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight pt-1">
                    Free Webhosting
                  </h3>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
                    Website & Mail Space
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#2A3650]/40 bg-[#070A14] text-text-muted">
                  <Globe className="h-5 w-5" />
                </div>
              </div>

              {/* Price Display */}
              <div className="py-2.5 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-text-muted font-display">
                  FREE
                </span>
                <span className="text-[10px] text-text-muted uppercase font-mono">/ forever</span>
              </div>

              {/* Specs List */}
              <ul className="space-y-3 text-xs sm:text-sm text-text-muted font-sans font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>Custom Domains: <span className="text-white font-bold">Single Domain</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>SSD Storage: <span className="text-white font-bold">5 GB SSD Storage</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>Control Console: <span className="text-white font-bold">Supports Plesk Panel</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>Website Tools: <span className="text-white font-bold">Free Website Builder</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>Databases: <span className="text-white font-bold">Unlimited Databases</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>Subdomains: <span className="text-white font-bold">Unlimited Subdomains</span></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-text-muted/50 flex-shrink-0" />
                  <span>SSL Security: <span className="text-white font-bold">Free Let's Encrypt SSL</span></span>
                </li>
              </ul>
            </div>

            {/* Action button */}
            <button disabled className="w-full py-3 rounded-xl border border-[#2A3650]/60 bg-[#0B0F19]/45 text-text-muted font-bold text-xs uppercase tracking-widest select-none cursor-not-allowed">
              Out of Stock
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR FREE HOSTING */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-16 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-purple-400 uppercase tracking-widest">
            WHY CHOOSE US
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Why Choose Our Free Hosting?
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Experience premium features without spending a dime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Community Support", desc: "Join thousands of players in our Discord community for help and friends.", icon: Users, color: "purple" },
            { title: "Basic DDoS Protection", desc: "Your free server comes with basic protection against network attacks.", icon: Shield, color: "blue" },
            { title: "No Hidden Costs", desc: "Completely free with no credit card required or surprise charges.", icon: DollarSign, color: "green" },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            const col = feat.color;
            let borderStyle = "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]";
            let iconStyle = "bg-purple-500/10 border-purple-500/20 text-purple-400";

            if (col === "blue") {
              borderStyle = "hover:border-[#3388FF]/40 hover:shadow-[0_0_20px_rgba(51,136,255,0.05)]";
              iconStyle = "bg-[#3388FF]/10 border-[#3388FF]/20 text-[#3388FF]";
            } else if (col === "green") {
              borderStyle = "hover:border-success-teal/40 hover:shadow-[0_0_20px_rgba(0,229,163,0.05)]";
              iconStyle = "bg-success-teal/10 border-success-teal/20 text-success-teal";
            }

            const delayClass = idx === 0 ? "delay-75" : idx === 1 ? "delay-100" : "delay-150";

            return (
              <div
                key={idx}
                className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 ${borderStyle} hover:scale-[1.01] reveal-up ${delayClass}`}
              >
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#2A3650]/50 group-hover:border-purple-500/40" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#2A3650]/50 group-hover:border-purple-500/40" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#2A3650]/50 group-hover:border-purple-500/40" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#2A3650]/50 group-hover:border-purple-500/40" />

                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors ${iconStyle}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GET STARTED CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-20 text-center space-y-8 border-t border-[#2A3650]/30 reveal-up">
        <span className="font-mono text-[10px] sm:text-xs font-bold text-purple-400 uppercase tracking-widest reveal-up delay-75">
          GET STARTED
        </span>
        <h2 className="font-norwester text-3xl sm:text-6xl text-white uppercase tracking-wider max-w-3xl mx-auto leading-none reveal-up delay-100">
          Ready to Start Your Minecraft Adventure?
        </h2>
        <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto reveal-up delay-150">
          Join thousands of players who already launched their free server!
        </p>
        <div className="flex justify-center reveal-up delay-200">
          <button className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl border-2 font-bold text-xs uppercase tracking-widest bg-purple-600 text-white border-purple-600 hover:bg-transparent hover:text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all active:scale-[0.98] cursor-pointer">
            <Zap className="h-4 w-4" />
            <span>Launch Your Free Server</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
