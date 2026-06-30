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
  Terminal,
  Activity,
  Lock,
  RefreshCw,
  Eye,
  Settings,
  Flame,
  Layout,
  Users,
  Headphones,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import GlobalPresence from "@/components/GlobalPresence";

type LocationType = "in" | "sg" | "de";
type CpuType = "intel" | "epyc" | "ryzen";
type PanelTab = "overview" | "os" | "ssh" | "monitoring" | "firewall" | "rescue" | "tasks";

interface Plan {
  id: string;
  name: string;
  priceIntel: number;
  priceEpyc: number;
  priceRyzen: number;
  cores: number;
  ram: number;
  storage: number;
  bandwidth: string;
}

export default function VpsDbHosting() {
  const { formatPrice } = useCurrency();

  // States
  const [location, setLocation] = useState<LocationType>("in");
  const [cpu, setCpu] = useState<CpuType>("intel");
  const [activePanelTab, setActivePanelTab] = useState<PanelTab>("overview");
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Autoplay loop slideshow for control panel showcase
  React.useEffect(() => {
    const tabs: PanelTab[] = ["overview", "os", "ssh", "monitoring", "firewall", "rescue", "tasks"];
    const interval = setInterval(() => {
      setActivePanelTab((prev) => {
        const idx = tabs.indexOf(prev);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 3000); // switch tab every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // 8 Plans definition
  const plans: Plan[] = [
    { id: "xs", name: "Xeon Standard XS", priceIntel: 285.87, priceEpyc: 320.50, priceRyzen: 360.75, cores: 2, ram: 4, storage: 60, bandwidth: "Unmetered (1 Gbps)" },
    { id: "s", name: "Xeon Standard S", priceIntel: 381.16, priceEpyc: 430.00, priceRyzen: 480.20, cores: 2, ram: 8, storage: 80, bandwidth: "Unmetered (1 Gbps)" },
    { id: "m", name: "Xeon Standard M", priceIntel: 571.74, priceEpyc: 640.25, priceRyzen: 710.60, cores: 4, ram: 12, storage: 100, bandwidth: "Unmetered (1 Gbps)" },
    { id: "l", name: "Xeon Standard L", priceIntel: 762.32, priceEpyc: 850.50, priceRyzen: 940.80, cores: 6, ram: 16, storage: 160, bandwidth: "Unmetered (1 Gbps)" },
    { id: "xl", name: "Xeon Standard XL", priceIntel: 1143.48, priceEpyc: 1280.00, priceRyzen: 1420.40, cores: 6, ram: 20, storage: 200, bandwidth: "Unmetered (1 Gbps)" },
    { id: "xxl", name: "Xeon Standard XXL", priceIntel: 1524.64, priceEpyc: 1710.10, priceRyzen: 1900.50, cores: 8, ram: 32, storage: 300, bandwidth: "Unmetered (1 Gbps)" },
    { id: "2xl", name: "Xeon Standard 2XL", priceIntel: 1905.80, priceEpyc: 2140.40, priceRyzen: 2380.90, cores: 10, ram: 48, storage: 380, bandwidth: "Unmetered (1 Gbps)" },
    { id: "3xl", name: "Xeon Standard 3XL", priceIntel: 2477.54, priceEpyc: 2780.00, priceRyzen: 3090.50, cores: 12, ram: 64, storage: 450, bandwidth: "Unmetered (1 Gbps)" },
  ];

  // Helper to format flag SVGs
  const renderFlag = (loc: LocationType) => {
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

  const getPlanPrice = (plan: Plan) => {
    let basePrice = plan.priceIntel;
    if (cpu === "epyc") basePrice = plan.priceEpyc;
    if (cpu === "ryzen") basePrice = plan.priceRyzen;

    // Apply currency format directly if needed, but since formatPrice handles conversion:
    return formatPrice(basePrice);
  };

  const getPlanProcessorInfo = () => {
    if (cpu === "intel") return "Intel® Xeon® (Gold / Platinum)";
    if (cpu === "epyc") return "AMD EPYC™ (7002/7003 Series)";
    return "AMD Ryzen™ (9 5950X / 7950X)";
  };

  const getCpuNote = () => {
    if (cpu === "intel") {
      return "Intel Xeon CPU options (up to 2.80 GHz). Built for stable virtualization workloads and multi-tenant database clusters.";
    }
    if (cpu === "epyc") {
      return "AMD EPYC processor options. Excellent high-core counts optimized for memory-bound apps and complex microservice stacks.";
    }
    return "AMD Ryzen processor options (up to 4.5 GHz+ boost). Ideal for high-speed single-threaded tasks and extreme performance KVM containers.";
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
      <section className="relative pt-28 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          KVM Virtualization Nodes
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          High-Performance <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">VPS Hosting</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Full root access, enterprise-grade hardware, and 99.9% uptime guarantee.
        </p>
      </section>

      {/* CONFIGURATOR SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-primary-cyan uppercase tracking-widest">
            Enterprise Grade Infrastructure
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Configure Your VPS
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Select your preferred location and processor to view available plans.
          </p>
        </div>

        {/* Configuration Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#0E1321]/60 border border-[#2A3650]/60 p-5 rounded-2xl max-w-2xl mx-auto backdrop-blur-md reveal-up delay-100">
          {/* Location */}
          <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
            <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Location:</span>
            <div className="flex bg-[#070A14] border border-[#2A3650]/50 p-1.5 rounded-xl gap-1">
              {[
                { id: "in", label: "India" },
                { id: "sg", label: "Singapore" },
                { id: "de", label: "Germany" },
              ].map((locOption) => (
                <button
                  key={locOption.id}
                  onClick={() => setLocation(locOption.id as LocationType)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${location === locOption.id
                    ? "bg-primary-cyan text-black"
                    : "text-text-muted hover:text-white"
                    }`}
                >
                  {renderFlag(locOption.id as LocationType)}
                  <span>{locOption.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-[#2A3650]/40" />

          {/* CPU Type */}
          <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
            <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">CPU Type:</span>
            <div className="flex bg-[#070A14] border border-[#2A3650]/50 p-1.5 rounded-xl gap-1">
              {[
                { id: "intel", label: "Intel - Standard" },
                { id: "epyc", label: "AMD EPYC - Premium" },
                { id: "ryzen", label: "AMD Ryzen™ - Premium" },
              ].map((cpuOption) => (
                <button
                  key={cpuOption.id}
                  onClick={() => setCpu(cpuOption.id as CpuType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${cpu === cpuOption.id
                    ? "bg-primary-cyan text-black"
                    : "text-text-muted hover:text-white"
                    }`}
                >
                  {cpuOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic CPU Note banner */}
        <div className="max-w-3xl mx-auto bg-[#131A2E]/50 border border-[#2A3650]/50 rounded-2xl p-5 flex gap-4 items-start relative overflow-hidden reveal-up delay-150">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-cyan" />
          <Cpu className="h-6 w-6 text-primary-cyan flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              {cpu === "intel" ? "Intel Xeon E5/Platinum Series" : cpu === "epyc" ? "AMD EPYC High-Density Cores" : "AMD Ryzen Max Core-Clock"}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
              {getCpuNote()}
            </p>
          </div>
        </div>

        {/* 8 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4 reveal-up delay-200">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-primary-cyan/45 hover:shadow-[0_0_25px_rgba(108,244,255,0.06)] hover:scale-[1.01]"
            >
              {/* Tech corner accent brackets */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-wider font-mono">
                      {renderFlag(location)}
                      <span className="capitalize">{location === "in" ? "India" : location === "sg" ? "Singapore" : "Germany"}</span>
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center text-primary-cyan flex-shrink-0">
                    <Server className="h-4 w-4" />
                  </div>
                </div>

                {/* Price Display */}
                <div className="py-2 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-success-teal font-display">{getPlanPrice(plan)}</span>
                  <span className="text-[10px] text-text-muted uppercase font-mono">/ month</span>
                </div>

                {/* Specs List */}
                <ul className="space-y-2.5 text-xs text-text-light font-sans font-medium">
                  <li className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5 text-primary-cyan flex-shrink-0" />
                    <span>Processor: <span className="text-text-muted font-bold block leading-none mt-1">{getPlanProcessorInfo()}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Cores: <span className="text-white font-bold">{plan.cores} vCPUs</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Memory: <span className="text-white font-bold">{plan.ram} GB DDR4 ECC</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Storage: <span className="text-white font-bold">{plan.storage} GB NVMe SSD</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Bandwidth: <span className="text-white font-bold">{plan.bandwidth}</span></span>
                  </li>
                </ul>
              </div>

              <a
                href="https://discord.dynoxium.com/verify/DynoXium%20Community"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-primary-cyan text-black hover:bg-transparent hover:text-primary-cyan border-2 border-primary-cyan font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(108,244,255,0.1)] active:scale-[0.98] cursor-pointer text-center block"
              >
                Order Now
              </a>
            </div>
          ))}
        </div>

        {/* Operating Systems Row */}
        <div className="bg-[#070A14]/40 border border-[#2A3650]/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Supported OS Templates
            </h4>
            <p className="text-xs text-text-muted leading-relaxed font-sans">
              Instantly deploy custom OS templates directly from your dashboard.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            {["Fedora", "Windows", "Alpine", "Arch", "Rocky", "openSUSE", "RHEL", "CentOS"].map((os) => (
              <span key={os} className="text-xs sm:text-sm font-mono font-bold text-white border border-[#2A3650]/40 px-3 py-1 rounded bg-[#0A0D18]/80 hover:border-primary-cyan/40 hover:opacity-100 transition-all select-none">
                {os}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Cutting-Edge <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">Features</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Discover unparalleled server performance and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            const delayClass = idx === 0 ? "delay-75" : idx === 1 ? "delay-100" : idx === 2 ? "delay-150" : idx === 3 ? "delay-200" : idx === 4 ? "delay-300" : "delay-400";

            return (
              <div
                key={feat.title}
                className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:scale-[1.01] ${borderStyle} reveal-up ${delayClass}`}
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

      {/* VIRTUALIZOR CONTROL PANEL SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Experience Our <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">Virtualizor Panel</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Manage your VPS with our custom control panel, offering ultimate control and zero complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal-up delay-150">
          {/* Tabs Menu (5 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {[
              { id: "overview", label: "Panel Overview", desc: "View active statuses, reboot controls, and host statistics.", icon: Layout },
              { id: "os", label: "OS Reinstallation", desc: "Format and deploy Ubuntu, Debian, CentOS, or Windows.", icon: RefreshCw },
              { id: "ssh", label: "SSH Keys & Access", desc: "Inject root public keys and configure VNC fallback consoles.", icon: Terminal },
              { id: "monitoring", label: "Real-time Monitoring", desc: "Graph active CPU loads, disk IOPS, and network flows.", icon: Activity },
              { id: "firewall", label: "Advanced Firewall", desc: "Create stateless firewall rules for ports at the edge.", icon: Shield },
              { id: "rescue", label: "Rescue Mode", desc: "Mount custom rescue ISOs to rebuild broken grubs.", icon: LifeBuoy },
              { id: "tasks", label: "Task History", desc: "Audit trail record logs of all panel actions and API keys.", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePanelTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePanelTab(tab.id as PanelTab)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${isActive
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
                console.dynoxium.org
              </span>
            </div>

            {/* Screen Content Render based on selected Tab */}
            <div className="flex-grow flex items-center justify-center min-h-[320px] relative z-10 select-none">
              <img
                src={`/vps-panel/${activePanelTab}.png`}
                alt={`${activePanelTab} view`}
                className="w-full h-auto max-h-[340px] object-contain rounded-lg"
              />
            </div>

            {/* Simulated Panel footer */}
            <div className="border-t border-[#2A3650]/40 pt-4 mt-6 flex justify-between items-center text-[10px] text-text-muted font-mono flex-shrink-0">
              <span className="uppercase">Virtualizor Client v3.4.1</span>
              <span>All changes apply dynamically in real-time</span>
            </div>
          </div>
        </div>
      </section>

      <GlobalPresence />

      {/* FAQs SECTION WITH NEED HELP SIDECARD */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-up delay-100">
          {/* FAQ Accordions (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
                Frequently Asked <span className="text-primary-cyan">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { id: "vfaq-1", q: "Does DynoXium provide Unlimited Bandwidth?", a: "Yes, all our VPS hosting plans feature unmetered fair-use bandwidth on high-speed 1Gbps ports, so you never have to worry about unexpected overage fees." },
                { id: "vfaq-2", q: "How does your DDoS protection work?", a: "Our system routes incoming packets through global scrubbing centers that analyze and filter out volumetric and protocol-based attacks, keeping your VPS online through massive traffic spikes." },
                { id: "vfaq-3", q: "Can I upgrade or downgrade my VPS later?", a: "Yes. You can instantly upgrade your VPS specifications (CPU, RAM, storage) dynamically through your console. Downgrades are supported but require a quick storage adjustment block." },
                { id: "vfaq-4", q: "Do you provide a control panel with VPS?", a: "Yes. Every VPS instance comes with access to our customized dashboard, letting you reinstall OS distributions, view resource graphs, configure firewall rules, and access the VNC console." },
                { id: "vfaq-5", q: "Do you provide Managed VPS services?", a: "We offer both self-managed (unmanaged) and fully managed VPS add-ons. With managed support, our systems engineers handle OS patches, software installations, and custom configurations for you." },
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
                        className={`h-4 w-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${isExpanded ? "transform rotate-180 text-primary-cyan" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[300px] border-t border-[#2A3650]/40" : "max-h-0"
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
