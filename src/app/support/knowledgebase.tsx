"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Gamepad2,
  Cpu,
  Globe,
  Bot,
  CreditCard,
  Wrench,
  MessageSquare,
  Ticket,
  Mail,
  HelpCircle,
  Terminal,
} from "lucide-react";

interface Category {
  title: string;
  desc: string;
  count: number;
  icon: React.ComponentType<any>;
  theme: "blue" | "green" | "cyan" | "purple" | "amber" | "teal";
  blogCategory: string;
}

interface SupportOption {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  theme: "green" | "blue" | "purple" | "pink";
  actionText: string;
}

export default function KnowledgebasePage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories: Category[] = [
    {
      title: "Getting Started",
      desc: "New to DynoXium? Start here for comprehensive setup guides and platform basics.",
      count: 8,
      icon: BookOpen,
      theme: "blue",
      blogCategory: "Company",
    },
    {
      title: "Minecraft Java",
      desc: "Guides for Java Edition server setup, optimizations, plugin configurations, and mods.",
      count: 24,
      icon: Gamepad2,
      theme: "green",
      blogCategory: "Gaming",
    },
    {
      title: "Minecraft Bedrock",
      desc: "Configure Bedrock Edition servers, add-ons, behavior packs, and cross-platform play.",
      count: 12,
      icon: Gamepad2,
      theme: "cyan",
      blogCategory: "Gaming",
    },
    {
      title: "Other Games",
      desc: "Setup and management guides for games like Rust, ARK, Valheim, Palworld, and CS2.",
      count: 15,
      icon: Terminal,
      theme: "purple",
      blogCategory: "Gaming",
    },
    {
      title: "VPS Hosting",
      desc: "Virtual Private Server management, Linux SSH commands, firewall rules, and custom OS setup.",
      count: 19,
      icon: Cpu,
      theme: "amber",
      blogCategory: "VPS",
    },
    {
      title: "Web Hosting",
      desc: "Configure website hosting, domain DNS records, free SSL certificates, and cPanel/Nginx.",
      count: 14,
      icon: Globe,
      theme: "teal",
      blogCategory: "Web Hosting",
    },
    {
      title: "Bot Hosting",
      desc: "Deploy Discord bots, run Node.js/Python runtimes, set up key vaults, and check active logs.",
      count: 10,
      icon: Bot,
      theme: "purple",
      blogCategory: "VPS",
    },
    {
      title: "Billing & Account",
      desc: "Manage payments, invoices, subscription renewals, refunds, and billing details.",
      count: 7,
      icon: CreditCard,
      theme: "green",
      blogCategory: "Company",
    },
    {
      title: "Technical Support",
      desc: "Troubleshoot latency spikes, hardware diagnostics, backup restorations, and nodes status.",
      count: 11,
      icon: Wrench,
      theme: "blue",
      blogCategory: "Company",
    },
  ];

  const supportOptions: SupportOption[] = [
    {
      title: "Live Chat",
      desc: "Chat with our server architects and support specialists in real-time.",
      icon: MessageSquare,
      theme: "green",
      actionText: "Start Chat",
    },
    {
      title: "Discord",
      desc: "Join our vibrant developer community and get quick peer assistance.",
      icon: HelpCircle,
      theme: "blue",
      actionText: "Join Server",
    },
    {
      title: "Ticket Support",
      desc: "Open a formal support ticket for complex hardware or network investigations.",
      icon: Ticket,
      theme: "purple",
      actionText: "Open Ticket",
    },
    {
      title: "Email Us",
      desc: "Send general business inquiries, enterprise requests, or abuse notifications.",
      icon: Mail,
      theme: "pink",
      actionText: "Send Mail",
    },
  ];

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Static Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />

        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-secondary-cyan/3 rounded-full blur-[120px]" />

        {/* Rotating Vector Rings */}
        <div className="absolute -left-20 top-48 w-80 h-80 rounded-full border border-primary-cyan/5 animate-spin-slow" />
        <div className="absolute -right-20 bottom-48 w-80 h-80 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-reverse" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          Knowledge Base & Guides
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Knowledge <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Base</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium mb-10 reveal-up delay-150">
          Explore our comprehensive guides, tutorials, and documentation to get the most out of your server.
        </p>

        {/* Glowing Search Bar */}
        <div className="max-w-2xl mx-auto relative group reveal-up delay-200">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-cyan to-secondary-cyan opacity-25 blur-lg group-hover:opacity-40 transition duration-300" />
          <div className="relative flex items-center bg-[#0E1321] border border-[#2A3650]/80 rounded-xl px-4 py-3 shadow-xl">
            <Search className="h-5 w-5 text-text-muted mr-3" />
            <input
              type="text"
              placeholder="Search for articles, game server setups, and features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-text-muted focus:outline-none font-sans text-sm sm:text-base font-medium"
            />
          </div>
        </div>
      </section>

      {/* KNOWLEDGE CATEGORIES GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 reveal-up">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, idx) => {
              const Icon = cat.icon;
              const theme = cat.theme;

              let borderGlow = "hover:border-primary-cyan/45 hover:shadow-[0_0_25px_rgba(108,244,255,0.06)]";
              let iconBox = "bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan";

              if (theme === "green") {
                borderGlow = "hover:border-success-teal/45 hover:shadow-[0_0_25px_rgba(0,229,163,0.06)]";
                iconBox = "bg-success-teal/10 border-success-teal/20 text-success-teal";
              } else if (theme === "purple") {
                borderGlow = "hover:border-purple-500/45 hover:shadow-[0_0_25px_rgba(168,85,247,0.06)]";
                iconBox = "bg-purple-500/10 border-purple-500/20 text-purple-400";
              } else if (theme === "amber") {
                borderGlow = "hover:border-amber-500/45 hover:shadow-[0_0_25px_rgba(245,158,11,0.06)]";
                iconBox = "bg-amber-500/10 border-amber-500/20 text-amber-400";
              } else if (theme === "teal") {
                borderGlow = "hover:border-teal-500/45 hover:shadow-[0_0_25px_rgba(20,184,166,0.06)]";
                iconBox = "bg-teal-500/10 border-teal-500/20 text-teal-400";
              } else if (theme === "blue") {
                borderGlow = "hover:border-[#3388FF]/45 hover:shadow-[0_0_25px_rgba(51,136,255,0.06)]";
                iconBox = "bg-[#3388FF]/10 border-[#3388FF]/20 text-[#3388FF]";
              }

              const delayClass = idx % 3 === 0 ? "delay-75" : idx % 3 === 1 ? "delay-150" : "delay-225";

              return (
                <Link
                  key={idx}
                  href={`/blog?category=${encodeURIComponent(cat.blogCategory)}`}
                  className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 pb-12 flex flex-col justify-between space-y-6 transition-all duration-300 ${borderGlow} hover:scale-[1.01] reveal-up ${delayClass}`}
                >
                  {/* Tech corner brackets */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />

                  <div className="space-y-4">
                    {/* Top line: Icon and Articles count */}
                    <div className="flex justify-between items-center">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${iconBox}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-text-muted/80 uppercase tracking-widest bg-[#131B2E] border border-[#2A3650]/50 px-2 py-0.5 rounded">
                        {cat.count} Articles
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-base sm:text-lg font-extrabold text-white uppercase tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0E1321]/30 border border-[#2A3650]/40 rounded-2xl p-8 max-w-xl mx-auto space-y-4 reveal-up">
            <HelpCircle className="h-12 w-12 text-[#FF3366] mx-auto animate-bounce" />
            <h3 className="font-norwester text-xl text-white uppercase tracking-wider">No Guides Found</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              We couldn't find any articles matching "<span className="font-bold text-white">{searchQuery}</span>". Try searching for topics like "Minecraft", "Linux", or "SSL".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-5 py-2 rounded-lg bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs uppercase tracking-wider hover:border-primary-cyan/45 transition-all"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* DIRECT HELP SUPPORT SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-10 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-2 reveal-up delay-75">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Need Direct Help?
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            We're here to help you 24/7. Reach out through any of our support channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((opt, idx) => {
            const Icon = opt.icon;
            const theme = opt.theme;

            let borderGlow = "hover:border-primary-cyan/40 hover:shadow-[0_0_20px_rgba(108,244,255,0.05)]";
            let iconBox = "bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan";
            let btnStyle = "bg-primary-cyan text-black hover:bg-transparent hover:text-primary-cyan border-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.15)]";

            if (theme === "green") {
              borderGlow = "hover:border-success-teal/40 hover:shadow-[0_0_20px_rgba(0,229,163,0.05)]";
              iconBox = "bg-success-teal/10 border-success-teal/20 text-success-teal";
              btnStyle = "bg-success-teal text-black hover:bg-transparent hover:text-success-teal border-success-teal shadow-[0_0_10px_rgba(0,229,163,0.15)]";
            } else if (theme === "purple") {
              borderGlow = "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]";
              iconBox = "bg-purple-500/10 border-purple-500/20 text-purple-400";
              btnStyle = "bg-[#a855f7] text-white hover:bg-transparent hover:text-purple-400 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.15)]";
            } else if (theme === "pink") {
              borderGlow = "hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.05)]";
              iconBox = "bg-pink-500/10 border-pink-500/20 text-pink-400";
              btnStyle = "bg-[#ec4899] text-white hover:bg-transparent hover:text-pink-400 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.15)]";
            }

            const delayClass = idx % 4 === 0 ? "delay-75" : idx % 4 === 1 ? "delay-150" : idx % 4 === 2 ? "delay-225" : "delay-300";

            return (
              <div
                key={idx}
                className={`group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-5 flex flex-col justify-between space-y-5 transition-all duration-300 ${borderGlow} hover:scale-[1.01] reveal-up ${delayClass}`}
              >
                {/* Tech corner accent brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors" />

                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${iconBox}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                    {opt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                    {opt.desc}
                  </p>
                </div>

                <button className={`w-full py-2 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] cursor-pointer ${btnStyle}`}>
                  {opt.actionText}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER SPACER */}
      <div className="h-16 flex-shrink-0" />
    </div>
  );
}
