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
  RefreshCw,
  Settings,
  Users,
  Database,
  Lock,
  Activity,
  Headphones,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import GlobalPresence from "@/components/GlobalPresence";

type PanelTab = "console" | "files" | "databases" | "startup" | "version";

interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  ram: string;
  cpu: string;
  storage: string;
  bandwidth: string;
  databases: string;
}

export default function BotHosting() {
  const { formatPrice } = useCurrency();

  // States
  const [activePanelTab, setActivePanelTab] = useState<PanelTab>("console");
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Autoplay loop slideshow for control panel showcase
  React.useEffect(() => {
    const tabs: PanelTab[] = ["console", "files", "databases", "startup", "version"];
    const interval = setInterval(() => {
      setActivePanelTab((prev) => {
        const idx = tabs.indexOf(prev);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 3 Discord Bot Plans definition
  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter Plan",
      priceMonthly: 0.8,
      ram: "1 GB DDR5",
      cpu: "1 Core High Frequency",
      storage: "Unmetered NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      databases: "3 MySQL Databases",
    },
    {
      id: "coder",
      name: "Coder Plan",
      priceMonthly: 1.5,
      ram: "2 GB DDR5",
      cpu: "1.5 Cores High Frequency",
      storage: "Unmetered NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      databases: "4 MySQL Databases",
    },
    {
      id: "developer",
      name: "Developer Plan",
      priceMonthly: 2.4,
      ram: "4 GB DDR5",
      cpu: "2 Cores High Frequency",
      storage: "Unmetered NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      databases: "6 MySQL Databases",
    },
  ];

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
          Discord bot hosting
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Premium <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Bot Hosting</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Run your Discord bots with reliable performance, fast DDR5 memory, and instant deployment—built for Node.js and Python.
        </p>
      </section>

      {/* PRICING PLANS SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-primary-cyan uppercase tracking-widest">
            CHOOSE YOUR PLAN
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            READY TO GO WITH PLANS
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Choose the plan that fits your needs. Every plan includes instant activation, reliable uptime, and full support for Node.js and Python.
          </p>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4 reveal-up delay-100">
          {plans.map((plan, idx) => {
            const delayClass = idx === 0 ? "delay-75" : idx === 1 ? "delay-100" : "delay-150";
            return (
              <div
                key={plan.id}
                className={`group relative rounded-2xl border bg-[#0E1321]/50 p-8 flex flex-col justify-between space-y-8 transition-all duration-300 reveal-up ${delayClass} ${
                  plan.id === "coder"
                    ? "border-primary-cyan shadow-[0_0_30px_rgba(108,244,255,0.08)] scale-[1.02] md:scale-[1.04]"
                    : "border-[#2A3650]/60 hover:border-primary-cyan/45 hover:shadow-[0_0_25px_rgba(108,244,255,0.06)]"
                }`}
              >
              {plan.id === "coder" && (
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
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
                    Discord Bot Hosting
                  </span>
                </div>

                {/* Price Display */}
                <div className="py-3 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-success-teal font-display">
                    {formatPrice(plan.priceMonthly)}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase font-mono">/ month</span>
                </div>

                {/* Specs list */}
                <div className="space-y-3 font-sans text-xs font-semibold text-text-light">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>RAM: <span className="text-white font-extrabold">{plan.ram}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>CPU: <span className="text-white font-extrabold">{plan.cpu}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>Storage: <span className="text-white font-extrabold">{plan.storage}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>Bandwidth: <span className="text-white font-extrabold">{plan.bandwidth}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary-cyan flex-shrink-0" />
                    <span>Databases: <span className="text-white font-extrabold">{plan.databases}</span></span>
                  </div>
                </div>

                {/* Additional Features list */}
                <ul className="space-y-2.5 text-xs text-text-muted font-sans font-medium border-t border-[#2A3650]/40 pt-4">
                  {["Instant Setup", "24/7 Uptime", "Node.js & Python", "Free SSL", "DDoS Protection", "24/7 Support"].map((feat, idx) => (
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
          )})}
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
                key={idx}
                className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 ${borderStyle} hover:scale-[1.01] reveal-up ${delayClass}`}
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

      {/* EXPERIENCE OUR CONTROL PANEL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Experience Our <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">Bot Control Panel</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Manage your bot scripts, monitor memory footprints, and access live console logs from a simple dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal-up delay-100">
          {/* Tabs Menu (5 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {[
              { id: "console", label: "Logs Console", desc: "Interact with your running bot scripts and see log traces live.", icon: Terminal },
              { id: "files", label: "File Manager", desc: "Upload and edit your index.js, bot.py, and configs visually.", icon: Layers },
              { id: "databases", label: "Databases Control", desc: "Configure MySQL schemas and copy runtime connection strings.", icon: Database },
              { id: "startup", label: "Startup Settings", desc: "Select Node.js, Python, or Go versions and start arguments.", icon: Cpu },
              { id: "version", label: "Tasks & Backups", desc: "Create automated snapshots and run chron task scripts.", icon: RefreshCw },
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
                bot.dynoxium.host
              </span>
            </div>

            {/* Screen Content Render based on selected Tab */}
            <div className="flex-grow flex items-center justify-center min-h-[320px] relative z-10 select-none">
              <img
                src={`/panel/game/${activePanelTab === "files" ? "mods" : activePanelTab === "databases" ? "plugins" : activePanelTab === "startup" ? "egg" : activePanelTab}.png`}
                alt={`${activePanelTab} view`}
                className="w-full h-auto max-h-[340px] object-contain rounded-lg"
              />
            </div>

            {/* Simulated Panel footer */}
            <div className="border-t border-[#2A3650]/40 pt-4 mt-6 flex justify-between items-center text-[10px] text-text-muted font-mono flex-shrink-0">
              <span className="uppercase">Bot Panel Dashboard v1.1.2</span>
              <span>All commands apply live and instantly</span>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE LATENCY MAP */}
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
                { id: "faq-1", q: "What languages are supported for bot hosting?", a: "Our bot hosting environment is completely language-agnostic. We provide optimized Docker-based container instances for Node.js (JavaScript/TypeScript), Python, Java, Go, Ruby, and C++." },
                { id: "faq-2", q: "Do I get a persistent database for my bot?", a: "Yes. Every bot plan comes with a set number of free MySQL database clusters. You can manage them directly from your panel settings and obtain connection strings instantly." },
                { id: "faq-3", q: "How do you handle bot restarts and crashes?", a: "Our system includes an automated crash-detection daemon. If your bot halts or encounters a process crash, the panel will automatically reboot the thread within seconds." },
                { id: "faq-4", q: "Can I view my bot's logs in real-time?", a: "Yes, our dashboard features a live terminal console showing bot output, error streams, and active RAM/CPU consumption graphs in real-time." },
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
