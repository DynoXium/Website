"use client";

import React, { useState } from "react";
import {
  Check,
  Shield,
  Cpu,
  Zap,
  Globe,
  ChevronDown,
  Activity,
  Headphones,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import GlobalPresence from "@/components/GlobalPresence";

interface PresetPlan {
  name: string;
  priceMonthly: number;
  ram: string;
  vcpu: string;
  storage: string;
  backup: string;
  ports?: string;
}

const minecraftPlans: PresetPlan[] = [
  { name: "Starter", priceMonthly: 1.70, ram: "4 GB", vcpu: "100% CPU", storage: "10 GB NVMe", backup: "2 Backup Slot", ports: "2 Ports" },
  { name: "Basic", priceMonthly: 2.20, ram: "5 GB", vcpu: "200% CPU", storage: "20 GB NVMe", backup: "3 Backup Slot", ports: "3 Ports" },
  { name: "SMP", priceMonthly: 3.40, ram: "8 GB", vcpu: "300% CPU", storage: "35 GB NVMe", backup: "5 Backup Slot", ports: "4 Ports" },
  { name: "Advanced", priceMonthly: 4.30, ram: "10 GB", vcpu: "350% CPU", storage: "50 GB NVMe", backup: "6 Backup Slot", ports: "5 Ports" },
  { name: "DynoX Pro", priceMonthly: 5.10, ram: "12 GB", vcpu: "400% CPU", storage: "70 GB NVMe", backup: "7 Backup Slot", ports: "6 Ports" },
  { name: "Premium", priceMonthly: 6.80, ram: "16 GB", vcpu: "500% CPU", storage: "100 GB NVMe", backup: "8 Backup Slot", ports: "8 Ports" },
  { name: "Enterprise", priceMonthly: 8.50, ram: "20 GB", vcpu: "600% CPU", storage: "200 GB NVMe", backup: "10 Backup Slot", ports: "12 Ports" },
  { name: "Ultimate", priceMonthly: 10.20, ram: "24 GB", vcpu: "800% CPU", storage: "250 GB NVMe", backup: "12 Backup Slot", ports: "16 Ports" },
];

const renderMinecraftBlock = (planName: string) => {
  const name = planName.toLowerCase();
  let top = "#55b848";
  let left = "#866043";
  let right = "#5c3e29";
  let shadow = "rgba(85, 184, 72, 0.4)";

  if (name === "starter") {
    top = "#55b848";
    left = "#866043";
    right = "#5c3e29";
    shadow = "rgba(85, 184, 72, 0.4)";
  } else if (name === "basic") {
    top = "#a0a0a0";
    left = "#808080";
    right = "#606060";
    shadow = "rgba(128, 128, 128, 0.4)";
  } else if (name === "smp") {
    top = "#d86f45";
    left = "#bc5a32";
    right = "#9a4421";
    shadow = "rgba(216, 111, 69, 0.4)";
  } else if (name === "advanced") {
    top = "#fcee4b";
    left = "#f6c323";
    right = "#d49b0d";
    shadow = "rgba(252, 238, 75, 0.4)";
  } else if (name === "professional" || name.includes("pro")) {
    top = "#9cf8f0";
    left = "#5ce7db";
    right = "#2cbab0";
    shadow = "rgba(92, 231, 219, 0.4)";
  } else if (name === "premium") {
    top = "#5df089";
    left = "#17cc53";
    right = "#0ca13d";
    shadow = "rgba(23, 204, 83, 0.4)";
  } else if (name === "enterprise") {
    top = "#3c3056";
    left = "#261d3b";
    right = "#151024";
    shadow = "rgba(60, 48, 86, 0.4)";
  } else if (name === "ultimate") {
    top = "#4c4748";
    left = "#3c3738";
    right = "#2c2728";
    shadow = "rgba(76, 71, 72, 0.4)";
  }

  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 transition-all duration-300 group-hover:scale-110" style={{ filter: `drop-shadow(0 0 4px ${shadow})` }}>
      <path d="M 12 4 L 20 8 L 12 12 L 4 8 Z" fill={top} />
      <path d="M 4 8 L 12 12 L 12 20 L 4 16 Z" fill={left} />
      <path d="M 12 12 L 20 8 L 20 16 L 12 20 Z" fill={right} />
    </svg>
  );
};

export default function MinecraftHostingPage() {
  const { formatPrice } = useCurrency();
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const theme = {
    accentColorHex: "#34d399",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
    accentGlow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    cardHover: "hover:border-emerald-500/45 hover:shadow-[0_0_25px_rgba(52,211,153,0.06)]",
    cornerBorderHover: "group-hover:border-emerald-500/40",
    buttonClass: "bg-emerald-500 text-black border-emerald-500 hover:text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]",
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[100px]" style={{ backgroundColor: theme.accentColorHex, opacity: 0.05 }} />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: theme.accentColorHex, opacity: 0.03 }} />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 reveal-up">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold uppercase mb-8 tracking-widest ${theme.accentText} ${theme.accentBorder} reveal-up delay-75`} style={{ boxShadow: `0 0 15px ${theme.accentColorHex}20` }}>
          Minecraft Hosting Nodes
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Minecraft <span className={theme.accentText} style={{ filter: `drop-shadow(0 0 30px ${theme.accentColorHex}40)` }}>Server Hosting</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          High-Frequency Minecraft Server Hosting. Powered by high-speed CPU clock rates.
        </p>
      </section>

      {/* PLANS SELECTION SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <span className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest ${theme.accentText}`}>
            PLANS FOR SERVERS OF ALL SHAPES AND SIZES
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Choose the perfect plan for your community
          </h2>
        </div>



        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4 reveal-up delay-150">
          {minecraftPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl border bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 ${theme.cardHover}`}
            >
              <div className={`absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />
              <div className={`absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />
              <div className={`absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />
              <div className={`absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />

              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
                      Minecraft Server
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border bg-transparent border-[#2A3650]/60">
                    {renderMinecraftBlock(plan.name)}
                  </div>
                </div>

                <div className="py-2 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-success-teal font-display">
                    {formatPrice(plan.priceMonthly)}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase font-mono">/ month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-text-light font-sans font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>CPU: <span className="text-white font-bold">{plan.vcpu}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>RAM: <span className="text-white font-bold">{plan.ram}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Storage: <span className="text-white font-bold">{plan.storage}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Backup Limit: <span className="text-white font-bold">{plan.backup}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Port Settings: <span className="text-white font-bold">{plan.ports || "1 Port"}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Panel: <span className="text-white font-bold">Premium Game Panel</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span className="text-white font-bold">Advanced DDoS Protection</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://discord.dynoxium.com/verify/DynoXium%20Community"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer ${theme.buttonClass} text-center block`}
              >
                Order Now
              </a>
            </div>
          ))}
        </div>

        {/* Custom Plan Discord Banner */}
        <div className="max-w-3xl mx-auto mt-12 text-center reveal-up">
          <div className="bg-[#0E1321]/50 border border-primary-cyan/25 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(108,244,255,0.03)]">
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary-cyan/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary-cyan/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary-cyan/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary-cyan/40" />

            <div className="space-y-4">
              <h3 className="font-norwester text-lg sm:text-2xl text-white uppercase tracking-wider">
                Need a <span className="text-primary-cyan drop-shadow-[0_0_15px_rgba(108,244,255,0.2)]">Custom Plan</span>?
              </h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
                If you want a custom plan tailored to your specific community or performance requirements, you can contact us directly on our Discord server.
              </p>
              <div className="pt-2">
                <a
                  href="https://discord.dynoxium.com/verify/DynoXium%20Community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2.5 px-8 rounded-xl bg-primary-cyan text-black hover:bg-transparent hover:text-primary-cyan border border-primary-cyan font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(108,244,255,0.15)]"
                >
                  Contact Us on Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Cutting-Edge <span className={theme.accentText} style={{ filter: `drop-shadow(0 0 20px ${theme.accentColorHex}30)` }}>Features</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Discover unparalleled server performance and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-up delay-150">
          {[
            { title: "Quick Deployment", desc: "Our automated provisioning system deploys your server shortly after payment confirmation, getting you online as quickly as possible.", icon: Zap, color: "blue" },
            { title: "DDoS Protection", desc: "Powered by trusted infrastructure with advanced DDoS mitigation to help protect your services from network attacks and unexpected traffic spikes.", icon: Shield, color: "green" },
            { title: "Reliable Uptime", desc: "Built on trusted infrastructure designed for stability and dependable performance, helping keep your services available whenever you need them.", icon: Activity, color: "amber" },
            { title: "Responsive Support", desc: "Our support team is here to help whenever you need assistance, providing friendly and reliable support for your hosting services.", icon: Headphones, color: "purple" },
            { title: "Powerful Hardware", desc: "Powered by modern AMD EPYC™ processors and high-speed NVMe SSD storage, delivering fast performance for games, websites, and applications.", icon: Cpu, color: "red" },
            { title: "Global Locations", desc: "Launch your infrastructure from premium locations worldwide. Experience low latency, reliable connectivity, and enterprise-grade performance wherever your users are.", icon: Globe, color: "teal" },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            const col = feat.color;
            let borderStyle = `hover:border-${theme.accentColorHex}/40 hover:shadow-[0_0_20px_rgba(108,244,255,0.05)]`;
            let iconStyle = `${theme.accentBg} ${theme.accentBorder} ${theme.accentText}`;

            if (col === "green") {
              borderStyle = "hover:border-success-teal/40 hover:shadow-[0_0_20px_rgba(0,229,163,0.05)]";
              iconStyle = "bg-success-teal/10 border-success-teal/20 text-success-teal";
            } else if (col === "purple") {
              borderStyle = "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]";
              iconStyle = "bg-purple-500/10 border-purple-500/20 text-purple-400";
            } else if (col === "amber") {
              borderStyle = "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)]";
              iconStyle = "bg-amber-500/10 border-amber-500/20 text-amber-400";
            } else if (col === "red") {
              borderStyle = "hover:border-[#EF4444]/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.05)]";
              iconStyle = "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]";
            } else if (col === "teal") {
              borderStyle = "hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.05)]";
              iconStyle = "bg-teal-500/10 border-teal-500/20 text-teal-400";
            } else if (col === "blue") {
              borderStyle = "hover:border-[#3388FF]/40 hover:shadow-[0_0_20px_rgba(51,136,255,0.05)]";
              iconStyle = "bg-[#3388FF]/10 border-[#3388FF]/20 text-[#3388FF]";
            }

            return (
              <div
                key={idx}
                className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 ${borderStyle} hover:scale-[1.01]`}
              >
                <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#2A3650]/50 ${theme.cornerBorderHover}`} />
                <div className={`absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#2A3650]/50 ${theme.cornerBorderHover}`} />
                <div className={`absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#2A3650]/50 ${theme.cornerBorderHover}`} />
                <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#2A3650]/50 ${theme.cornerBorderHover}`} />

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

      <GlobalPresence />

      {/* FAQs SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-up delay-75">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
              Frequently Asked <span className={theme.accentText}>Questions</span>
            </h2>

            <div className="space-y-4">
              {[
                { id: "faq-1", q: "Is DynoXium suitable for hosting Minecraft servers?", a: "Yes, DynoXium specializes in Minecraft server hosting, providing high-speed CPU performance, lag-free operations and automated setups." },
                { id: "faq-2", q: "What makes DynoXium the best choice for Minecraft hosting?", a: "Our enterprise network, ultra-fast NVMe storage, 24/7 technical support, and user-friendly control panel ensure your hosting is reliable and optimized." },
                { id: "faq-3", q: "Do you provide DDoS protection for Minecraft servers?", a: "Yes, every game server is guarded by our advanced DDoS filtering algorithms, keeping you online during volumetric flood attacks." },
              ].map((faq) => {
                const isExpanded = !!expandedFaqs[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/50 transition-all duration-300 h-fit overflow-hidden ${theme.accentBorder} hover:border-current`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left text-white focus:outline-none cursor-pointer"
                    >
                      <span className={`font-display text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors hover:${theme.accentText}`}>
                        {faq.q}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[300px] border-t border-[#2A3650]/40" : "max-h-0"}`}>
                      <p className="p-5 text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
