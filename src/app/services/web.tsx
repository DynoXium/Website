"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Shield,
  Cpu,
  Layers,
  ArrowUpRight,
  Server,
  Zap,
  Globe,
  LifeBuoy,
  MessageSquare,
  HelpCircle,
  Ticket,
  ChevronDown,
  RefreshCw,
  Eye,
  Settings,
  Users,
  Database,
  Lock,
  Globe2,
  Mail,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

type PanelTab =
  | "git"
  | "domain"
  | "ssl"
  | "env";

interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  domains: string;
  storage: string;
  emails: string;
  features: string[];
}

export default function WebHosting() {
  const { formatPrice } = useCurrency();

  // States
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [activePanelTab, setActivePanelTab] = useState<PanelTab>("git");
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Autoplay loop slideshow for cPanel showcase
  React.useEffect(() => {
    const tabs: PanelTab[] = [
      "git",
      "domain",
      "ssl",
      "env",
    ];
    const interval = setInterval(() => {
      setActivePanelTab((prev) => {
        const idx = tabs.indexOf(prev);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 3000); // Switch tab every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // 3 Web Space Plans definition
  const plans: Plan[] = [
    {
      id: "s",
      name: "WebSpace S",
      priceMonthly: 95.29,
      domains: "1 Domain",
      storage: "20 GB NVMe SSD",
      emails: "10 Email Accounts",
      features: [
        "cPanel Access",
        "Unlimited Subdomains",
        "1-Click WordPress",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
      ],
    },
    {
      id: "m",
      name: "WebSpace M",
      priceMonthly: 190.58,
      domains: "3 Domains",
      storage: "50 GB NVMe SSD",
      emails: "20 Email Accounts",
      features: [
        "cPanel Access",
        "Unlimited Subdomains",
        "1-Click WordPress",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
      ],
    },
    {
      id: "l",
      name: "WebSpace L",
      priceMonthly: 381.16,
      domains: "Unlimited Domains",
      storage: "100 GB NVMe SSD",
      emails: "50 Email Accounts",
      features: [
        "cPanel Access",
        "Unlimited Subdomains",
        "1-Click WordPress",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
      ],
    },
  ];

  const getPlanPrice = (plan: Plan) => {
    // 20% discount on yearly billing
    let basePrice = plan.priceMonthly;
    if (billingCycle === "yearly") {
      basePrice = plan.priceMonthly * 0.8;
    }
    return formatPrice(basePrice);
  };

  // Helper to format flag SVGs
  const renderFlag = (loc: string) => {
    if (loc === "in") {
      return (
        <svg className="w-4 h-4 rounded-sm flex-shrink-0" viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f4c2c2" d="M0 0h640v480H0z" />
          <path fill="#FF9933" d="M0 0h640v160H0z" />
          <path fill="#fff" d="M0 160h640v160H0z" />
          <path fill="#138808" d="M0 320h640v160H0z" />
          <circle cx="320" cy="240" r="40" fill="#000080" />
        </svg>
      );
    }
    if (loc === "sg") {
      return (
        <svg className="w-4 h-4 rounded-sm flex-shrink-0" viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" d="M0 240h640v240H0z" />
          <path fill="#DF151A" d="M0 0h640v240H0z" />
          <circle cx="100" cy="100" r="40" fill="#fff" />
          <circle cx="120" cy="100" r="40" fill="#DF151A" />
        </svg>
      );
    }
    if (loc === "de") {
      return (
        <svg className="w-4 h-4 rounded-sm flex-shrink-0" viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFCE00" d="M0 320h640v160H0z" />
          <path fill="#D00" d="M0 160h640v160H0z" />
          <path fill="#000" d="M0 0h640v160H0z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[120px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)]">
          Web hosting services
        </div>
        <h1 className="font-norwester text-3xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words">
          Fast & Reliable <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Web Hosting</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium">
          Power your websites with blazing-fast NVMe SSD storage and 99.5% uptime.
        </p>
      </section>

      {/* PRICING PLANS SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-primary-cyan uppercase tracking-widest">
            CHOOSE YOUR PERFECT HOSTING PLAN
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Simple, Transparent Pricing
          </h2>
        </div>

        {/* Monthly / Yearly Toggle Selector */}
        <div className="flex justify-center items-center gap-4">
          <div className="flex bg-[#070A14] border border-[#2A3650]/50 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-primary-cyan text-black"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-primary-cyan text-black"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className={`text-[9px] font-extrabold uppercase px-1 rounded ${billingCycle === "yearly" ? "bg-black/20 text-black" : "bg-primary-cyan/20 text-primary-cyan"}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative rounded-2xl border bg-[#0E1321]/50 p-8 flex flex-col justify-between space-y-8 transition-all duration-300 ${
                plan.id === "m"
                  ? "border-primary-cyan shadow-[0_0_30px_rgba(108,244,255,0.08)] scale-[1.02] md:scale-[1.04]"
                  : "border-[#2A3650]/60 hover:border-primary-cyan/45 hover:shadow-[0_0_25px_rgba(108,244,255,0.06)]"
              }`}
            >
              {plan.id === "m" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-cyan text-black px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(108,244,255,0.25)]">
                  Most Popular
                </span>
              )}

              {/* Tech corner accent brackets */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-1">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-white uppercase tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                {/* Price Display */}
                <div className="py-3 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-success-teal font-display">
                    {getPlanPrice(plan)}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase font-mono">/ month</span>
                </div>

                {/* Specs list */}
                <div className="space-y-3 font-sans text-xs font-semibold text-text-light">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>Domains: <span className="text-white font-extrabold">{plan.domains}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>Storage: <span className="text-white font-extrabold">{plan.storage}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>Emails: <span className="text-white font-extrabold">{plan.emails}</span></span>
                  </div>
                </div>

                {/* Additional Features list */}
                <ul className="space-y-2.5 text-xs text-text-muted font-sans font-medium border-t border-[#2A3650]/40 pt-4">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-text-light">
                      <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order button */}
              <button className="w-full py-2.5 rounded-xl bg-primary-cyan text-black hover:bg-transparent hover:text-primary-cyan border-2 border-primary-cyan font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(108,244,255,0.1)] active:scale-[0.98] cursor-pointer">
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Cutting-Edge <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">Features</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Discover unparalleled server performance and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Instant Setup", desc: "Deployment in under 60 seconds. Our automated systems provision your resources the moment your payment is confirmed.", icon: Zap, color: "blue" },
            { title: "DDoS Protection", desc: "Enterprise-grade mitigation capable of filtering up to 1Tbps+. Stay online during the most volumetric attacks.", icon: Shield, color: "green" },
            { title: "99.9% Uptime", desc: "Tier 3+ certified data centers with redundant power, cooling, and network links to ensure your services never go offline.", icon: Server, color: "cyan" },
            { title: "24/7 Support", desc: "Real-world experts at your service. Our average response time is under 15 minutes, day or night.", icon: LifeBuoy, color: "purple" },
            { title: "Powerful Hardware", desc: "Utilizing latest-gen Intel/AMD Ryzen CPUs, and enterprise NVMe Gen4 storage for maximum performance.", icon: Cpu, color: "amber" },
            { title: "Global Locations", desc: "A globally distributed network with premium peerings to ensure ultra-low latency specifically optimized for hosting.", icon: Globe, color: "teal" },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            const col = feat.color;
            let borderStyle = "hover:border-primary-cyan/40 hover:shadow-[0_0_20px_rgba(108,244,255,0.05)]";
            let iconStyle = "bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan";

            if (col === "green") {
              borderStyle = "hover:border-success-teal/40 hover:shadow-[0_0_20px_rgba(0,229,163,0.05)]";
              iconStyle = "bg-success-teal/10 border-success-teal/20 text-success-teal";
            } else if (col === "purple") {
              borderStyle = "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]";
              iconStyle = "bg-purple-500/10 border-purple-500/20 text-purple-400";
            } else if (col === "amber") {
              borderStyle = "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)]";
              iconStyle = "bg-amber-500/10 border-amber-500/20 text-amber-400";
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
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#2A3650]/50 group-hover:border-primary-cyan/40" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#2A3650]/50 group-hover:border-primary-cyan/40" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#2A3650]/50 group-hover:border-primary-cyan/40" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#2A3650]/50 group-hover:border-primary-cyan/40" />

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

      {/* CPANEL SHOWCASE SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Experience Our <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">cPanel Control Panel</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            The industry standard for web hosting management. Control your files, databases, and emails from a single, beautiful dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tabs Menu (5 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {[
              { id: "git", label: "Git Integration", desc: "Automated git hook pushes and instant live deployments.", icon: Layers },
              { id: "domain", label: "Domain Manager", desc: "Attach domains and manage custom reverse-proxy routings.", icon: Server },
              { id: "ssl", label: "AutoSSL Security", desc: "Installs free Let's Encrypt certificates automatically.", icon: Shield },
              { id: "env", label: "Environment Config", desc: "Set persistent environment variables and database credentials.", icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePanelTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePanelTab(tab.id as PanelTab)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isActive
                      ? "bg-primary-cyan/5 border-primary-cyan text-primary-cyan shadow-[0_0_15px_rgba(108,244,255,0.06)]"
                      : "bg-[#0E1321]/30 border-[#2A3650]/40 text-text-muted hover:border-primary-cyan/45 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider font-display leading-none">
                      {tab.label}
                    </h4>
                    <p className="text-[10px] text-text-muted leading-tight font-sans font-medium">
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Panel Display Screen (8 cols) */}
          <div className="lg:col-span-8 bg-[#070A14] border border-[#2A3650]/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Window Topbar */}
            <div className="flex justify-between items-center pb-4 border-b border-[#2A3650]/40 mb-6 flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest bg-[#0E1321] px-3 py-1 rounded border border-[#2A3650]/30 select-none">
                cpanel.web.dynoxium.cloud
              </span>
            </div>

            {/* Screen Content Render based on selected Tab */}
            <div className="flex-grow flex items-center justify-center min-h-[320px] relative z-10 select-none">
              <img
                src={`/panel/web/${activePanelTab}.png`}
                alt={`${activePanelTab} view`}
                className="w-full h-auto max-h-[340px] object-contain rounded-lg"
              />
            </div>

            {/* Simulated Panel footer */}
            <div className="border-t border-[#2A3650]/40 pt-4 mt-6 flex justify-between items-center text-[10px] text-text-muted font-mono flex-shrink-0">
              <span className="uppercase">cPanel Client Dashboard v110.0</span>
              <span>All operations synchronize instantly</span>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE LATENCY MAP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Global Presence, <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">Local Performance</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Our rapidly expanding datacenter network spans across the globe, delivering ultra-low latency and lightning-fast connections wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Display (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E1321]/50 border border-[#2A3650]/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
            {/* World Map vector mockup */}
            <div className="relative min-h-[280px] w-full bg-[url('/world-map.svg')] bg-center bg-no-repeat bg-contain opacity-80 flex items-center justify-center">
              {/* Location Pins */}
              <div className="absolute top-[35%] left-[25%] group">
                <div className="w-3.5 h-3.5 bg-[#3388FF] rounded-full flex items-center justify-center relative shadow-[0_0_15px_#3388FF]">
                  <div className="absolute inset-0 bg-[#3388FF] rounded-full animate-ping opacity-60" />
                </div>
              </div>
              <div className="absolute top-[68%] left-[64%] group">
                <div className="w-3.5 h-3.5 bg-primary-cyan rounded-full flex items-center justify-center relative shadow-[0_0_15px_#6cf4ff]">
                  <div className="absolute inset-0 bg-primary-cyan rounded-full animate-ping opacity-60" />
                </div>
              </div>
              <div className="absolute top-[30%] left-[45%] group">
                <div className="w-3.5 h-3.5 bg-[#a855f7] rounded-full flex items-center justify-center relative shadow-[0_0_15px_#a855f7]">
                  <div className="absolute inset-0 bg-[#a855f7] rounded-full animate-ping opacity-60" />
                </div>
              </div>
              <div className="absolute top-[52%] left-[72%] group">
                <div className="w-3.5 h-3.5 bg-success-teal rounded-full flex items-center justify-center relative shadow-[0_0_15px_#00e5a3]">
                  <div className="absolute inset-0 bg-success-teal rounded-full animate-ping opacity-60" />
                </div>
              </div>

              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest absolute bottom-2 left-2 select-none">
                Dynamic Nodes Latency Routing Enabled
              </span>
            </div>
          </div>

          {/* Locations Status Cards Grid (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { id: "in", label: "India", desc: "Mumbai Datacenter Cluster", pin: "14ms", status: "Optimal", color: "green" },
              { id: "sg", label: "Singapore", desc: "Equinix SG2 Edge Cluster", pin: "32ms", status: "Optimal", color: "green" },
              { id: "us", label: "USA", desc: "Oregon High-Memory Cluster", pin: "112ms", status: "Normal", color: "blue" },
              { id: "de", label: "Germany", desc: "Frankfurt FR5 Cloud Cluster", pin: "88ms", status: "Normal", color: "blue" },
            ].map((node) => {
              let tagColor = "text-success-teal border-success-teal/20 bg-success-teal/10";
              let statusText = "bg-success-teal";
              if (node.color === "blue") {
                tagColor = "text-primary-cyan border-primary-cyan/20 bg-primary-cyan/10";
                statusText = "bg-primary-cyan";
              }

              return (
                <div
                  key={node.id}
                  className="group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-4 flex justify-between items-center transition-all duration-300 hover:border-primary-cyan/45 hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3">
                    {renderFlag(node.id === "us" ? "sg" : node.id)}
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide font-display">
                        {node.label}
                      </h4>
                      <p className="text-[10px] text-text-muted font-sans font-medium">
                        {node.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      {node.pin}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${tagColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusText}`} />
                      {node.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs SECTION WITH NEED HELP SIDECARD */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordions (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
                Frequently Asked <span className="text-primary-cyan">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { id: "faq-1", q: "Which control panel do you provide for web hosting?", a: "We provide the industry-standard cPanel control panel, which includes powerful tools for managing domains, emails, databases, and files with ease." },
                { id: "faq-2", q: "Is free SSL included with every domain?", a: "Yes, free Let's Encrypt / AutoSSL certificates are automatically generated and renewed for all domains and subdomains configured on your hosting account." },
                { id: "faq-3", q: "Do you offer daily backups?", a: "Yes, we run automated daily backups of your complete web hosting server, including files, databases, and mail accounts, with a 7-day retention history." },
                { id: "faq-4", q: "Can I host multiple websites on one plan?", a: "WebSpace S allows 1 domain, WebSpace M allows up to 3 domains, and WebSpace L allows unlimited domains. You can host multiple websites under one account by upgrading to WebSpace M or L." },
              ].map((faq) => {
                const isExpanded = !!expandedFaqs[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/50 transition-all duration-300 hover:border-primary-cyan/40 h-fit overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left text-white focus:outline-none cursor-pointer"
                    >
                      <span className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase group-hover:text-primary-cyan transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${
                          isExpanded ? "transform rotate-180 text-primary-cyan" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isExpanded ? "max-h-[300px] border-t border-[#2A3650]/40" : "max-h-0"
                      }`}
                    >
                      <div className="p-5 text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium bg-[#0B0F19]/25">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Need Help Sidebar Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#0E1321]/60 border border-[#2A3650]/60 rounded-3xl p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/40" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/40" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-primary-cyan/40" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-primary-cyan/40" />

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center text-primary-cyan">
                <HelpCircle className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                Need Help?
              </h3>
              <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                Our team is online 24/7 to assist you.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Live Chat", icon: MessageSquare, desc: "Instant response from our team" },
                { label: "Discord Community", icon: Users, desc: "Join our active servers" },
                { label: "Submit Ticket", icon: Ticket, desc: "Formal technical support" },
              ].map((link, idx) => {
                const Icon = link.icon;
                return (
                  <button
                    key={idx}
                    className="w-full p-3.5 rounded-xl border border-[#2A3650]/60 bg-[#070A14]/50 text-left flex items-center gap-3 group hover:border-primary-cyan/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#141C2E]/80 border border-[#2A3650]/40 flex items-center justify-center text-text-muted group-hover:text-primary-cyan group-hover:border-primary-cyan/20 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-display leading-none group-hover:text-primary-cyan transition-colors">
                        {link.label}
                      </h4>
                      <p className="text-[9px] text-text-muted leading-tight font-sans font-medium mt-0.5">
                        {link.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#2A3650]/30 space-y-2">
              <Link
                href="/knowledgebase"
                className="w-full py-2.5 rounded-xl border border-[#2A3650] hover:border-primary-cyan bg-[#070A14]/80 text-[10px] font-bold text-white uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(108,244,255,0.05)]"
              >
                <span>Browse Knowledge Base</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/faq"
                className="w-full py-2.5 rounded-xl border border-[#2A3650] hover:border-primary-cyan bg-[#070A14]/80 text-[10px] font-bold text-white uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(108,244,255,0.05)]"
              >
                <span>Visit FAQs Page</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
