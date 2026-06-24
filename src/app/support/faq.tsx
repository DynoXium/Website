"use client";

import React, { useState } from "react";
import {
  Gamepad2,
  HelpCircle,
  Cpu,
  CreditCard,
  HardDrive,
  LifeBuoy,
  ChevronDown,
} from "lucide-react";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  theme: "purple" | "blue" | "teal" | "green" | "red" | "amber";
  items: FAQItem[];
}

export default function FAQPage() {
  // Store expanded states by FAQ item ID
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData: FAQCategory[] = [
    {
      title: "Minecraft Hosting",
      desc: "Everything you need to know about our Minecraft server hosting.",
      icon: Gamepad2,
      theme: "purple",
      items: [
        {
          id: "mc-1",
          q: "Is DynoXium suitable for hosting Minecraft servers?",
          a: "Yes! DynoXium is custom-tailored for Minecraft servers. We use high-frequency Ryzen CPUs and high-speed NVMe SSDs to ensure zero lag, instant chunk loading, and maximum tick stability for both vanilla and heavily modded servers.",
        },
        {
          id: "mc-2",
          q: "How easy is it to manage my Minecraft server?",
          a: "Incredibly easy. Our unified control panel allows you to start, stop, restart, configure settings, install plugins with a single click, manage files via SFTP, and schedule automated backups without needing any command line knowledge.",
        },
        {
          id: "mc-3",
          q: "What makes DynoXium the best choice for Minecraft hosting?",
          a: "We offer the perfect mix of high-end enterprise hardware, robust DDoS protection, sub-millisecond route optimization, and a freemium model that enables you to test resources before scaling to dedicated performance packages.",
        },
        {
          id: "mc-4",
          q: "What kind of support does DynoXium provide?",
          a: "We provide 24/7 technical support. Our server architects are available via live chat, ticket support, and our Discord server to help with anything from plugin configuration to performance optimization.",
        },
        {
          id: "mc-5",
          q: "Do you provide DDoS protection for Minecraft servers?",
          a: "Absolutely. All Minecraft servers hosted on DynoXium are shielded by our advanced multi-layered DDoS protection, filtering malicious traffic at the edge under 2 seconds without dropping active players.",
        },
      ],
    },
    {
      title: "General",
      desc: "Everything you need to know about getting started.",
      icon: HelpCircle,
      theme: "blue",
      items: [
        {
          id: "gen-1",
          q: "How long does setup take?",
          a: "Setup is instantaneous. As soon as your order is verified, our automated systems provision your node and send login credentials directly to your email in under 60 seconds.",
        },
        {
          id: "gen-2",
          q: "Can I transfer my existing server to DynoXium?",
          a: "Yes! You can easily upload your world files, plugins, and configurations via SFTP. If you need help, our support team can migrate your entire server from your previous host free of charge.",
        },
        {
          id: "gen-3",
          q: "Can I upgrade or downgrade my server later?",
          a: "Yes, you can upgrade or downgrade your resources at any time through our client portal. The process is fully automated and retains all of your data and IP addresses.",
        },
        {
          id: "gen-4",
          q: "Do I need to configure port forwarding?",
          a: "No. Your server is automatically allocated a dedicated port (and optional dedicated IP) on our networks, eliminating the need to set up port forwarding on your own router.",
        },
        {
          id: "gen-5",
          q: "Is there a limit on player slots?",
          a: "No! We do not artificially limit player slots on our hosting plans. You can configure as many slots as your allocated memory and CPU power can comfortably support.",
        },
        {
          id: "gen-6",
          q: "Where are your servers located?",
          a: "Our network spans premium tier-4 data centers worldwide, including Mumbai (India), Singapore, and North America, ensuring minimal latency globally.",
        },
      ],
    },
    {
      title: "VPS Hosting",
      desc: "Everything about our Virtual Private Server hosting.",
      icon: Cpu,
      theme: "teal",
      items: [
        {
          id: "vps-1",
          q: "Does DynoXium provide Unlimited bandwidth?",
          a: "Yes, all our VPS hosting plans feature unmetered fair-use bandwidth on high-speed 1Gbps ports, so you never have to worry about unexpected overage fees.",
        },
        {
          id: "vps-2",
          q: "Do you provide a control panel with VPS?",
          a: "Yes. Every VPS instance comes with access to our customized dashboard, letting you reinstall OS distributions, view resource graphs, configure firewall rules, and access the VNC console.",
        },
        {
          id: "vps-3",
          q: "How does your DDoS protection work?",
          a: "Our system routes incoming packets through global scrubbing centers that analyze and filter out volumetric and protocol-based attacks, keeping your VPS online through massive traffic spikes.",
        },
        {
          id: "vps-4",
          q: "Do you provide Managed VPS services?",
          a: "We offer both self-managed (unmanaged) and fully managed VPS add-ons. With managed support, our systems engineers handle OS patches, software installations, and custom configurations for you.",
        },
        {
          id: "vps-5",
          q: "Can I upgrade or downgrade my VPS later?",
          a: "Yes. You can instantly upgrade your VPS specifications (CPU, RAM, storage) dynamically through your console. Downgrades are supported but require a quick storage adjustment block.",
        },
      ],
    },
    {
      title: "Payment",
      desc: "Billing, refunds, and subscription details.",
      icon: CreditCard,
      theme: "green",
      items: [
        {
          id: "pay-1",
          q: "What payment methods do you accept?",
          a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and localized bank transfer options depending on your country.",
        },
        {
          id: "pay-2",
          q: "Can I pay with Crypto?",
          a: "Yes, we support cryptocurrency payments, including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), and USD Coin (USDC) via secure gateway payment processors.",
        },
        {
          id: "pay-3",
          q: "Is there a money-back guarantee?",
          a: "Yes, we offer a risk-free 7-day money-back guarantee for first-time customers. If you are not satisfied with your hosting performance, contact billing for a refund.",
        },
        {
          id: "pay-4",
          q: "Are there any hidden fees?",
          a: "Never. The price you see on our checkout page is exactly what you pay. There are no setup fees, hidden resource taxes, or surprise renewal increases.",
        },
        {
          id: "pay-5",
          q: "Do you offer free trials?",
          a: "Yes! We offer freemium tiers for specific services like discord bot hosting and development containers so you can build and test your setups completely free.",
        },
        {
          id: "pay-6",
          q: "How do cancellations work?",
          a: "You can request cancellation at any time directly through the client area. You can choose to cancel immediately or at the end of the current billing cycle.",
        },
      ],
    },
    {
      title: "Hardware",
      desc: "Specs, performance, and infrastructure.",
      icon: HardDrive,
      theme: "red",
      items: [
        {
          id: "hw-1",
          q: "What CPUs do you use for Game Hosting?",
          a: "We utilize latest-generation high-frequency AMD Ryzen (e.g. Ryzen 9 7900X/7950X) and Intel Xeon processors boasting boost clock speeds up to 4.5GHz+ for maximum single-threaded game performance.",
        },
        {
          id: "hw-2",
          q: "Do you offer Dedicated IPs?",
          a: "Yes, dedicated IPv4 allocations are available as an add-on during checkout or can be assigned to your server later through a support request.",
        },
        {
          id: "hw-3",
          q: "What type of storage do you use?",
          a: "We use enterprise-grade NVMe SSDs in RAID 10 configurations, which deliver up to 10x faster read/write speeds compared to standard SSDs and eliminate chunk rendering bottlenecks.",
        },
        {
          id: "hw-4",
          q: "What is your network uptime?",
          a: "We offer a 99.9% uptime SLA. Our data centers feature redundant power supplies, multiple internet transit links, and failover network routing to guarantee steady operation.",
        },
        {
          id: "hw-5",
          q: "How much RAM do I really need?",
          a: "For vanilla Minecraft with a few friends, 2GB–4GB is plenty. Modpacks or heavy servers with 20+ players should opt for 6GB–8GB+ RAM. Web and bot servers usually run smoothly on 1GB–2GB.",
        },
        {
          id: "hw-6",
          q: "Is DDoS protection included?",
          a: "Yes, enterprise DDoS protection is integrated out-of-the-box on all nodes at no extra cost, providing defense against attacks up to 1+ Tbps.",
        },
      ],
    },
    {
      title: "Support",
      desc: "Help with your server and account.",
      icon: LifeBuoy,
      theme: "amber",
      items: [
        {
          id: "sup-1",
          q: "How do I contact support?",
          a: "You can reach us through live chat on our website, by opening a formal ticket in the billing client area, or by pinging support helper bots in our official Discord community.",
        },
        {
          id: "sup-2",
          q: "Can you help fix server crashes?",
          a: "Yes! Our technical team can analyze your crash logs, identify faulty plugins, database connection issues, or memory limits, and guide you on how to resolve them.",
        },
        {
          id: "sup-3",
          q: "Do you help with modpack installation?",
          a: "Yes, our Minecraft hosting panel features a 1-click modpack installer for CurseForge, FTB, and Modrinth packs. If you have custom files, we can assist in getting them configured.",
        },
        {
          id: "sup-4",
          q: "Do you offer managed support?",
          a: "Yes, we offer fully managed add-on options where our technical team takes over active administration, system upgrades, routine backups, and configuration tasks.",
        },
        {
          id: "sup-5",
          q: "Is support available in other languages?",
          a: "Our primary support is in English, but our global team can assist in multiple regional languages using translation tools to ensure your issues are resolved.",
        },
        {
          id: "sup-6",
          q: "Is there a community Discord?",
          a: "Yes! You can join our Discord server to connect with thousands of other server owners, get fast peer assistance, share tips, and receive platform status updates.",
        },
      ],
    },
  ];

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
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          Help Center
        </div>
        <h1 className="font-norwester text-3xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Frequently Asked <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Questions</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Everything you need to know about our services, billing, and technical details.
        </p>
      </section>

      {/* FAQ CONTENT GRID BY CATEGORY */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-20 pb-32 reveal-up">
        <div className="text-center font-mono text-[10px] sm:text-xs font-bold text-primary-cyan uppercase tracking-[0.25em] mb-12 reveal-up delay-75">
          Common Questions
        </div>

        {faqData.map((category, catIdx) => {
          const Icon = category.icon;
          const theme = category.theme;

          let borderGlow = "hover:border-primary-cyan/45 hover:shadow-[0_0_20px_rgba(108,244,255,0.04)]";
          let iconColor = "text-primary-cyan";
          let iconBoxBg = "bg-primary-cyan/10 border-primary-cyan/20";
          let faqBorderGlow = "hover:border-primary-cyan/40";

          if (theme === "purple") {
            borderGlow = "hover:border-purple-500/45 hover:shadow-[0_0_20px_rgba(168,85,247,0.04)]";
            iconColor = "text-purple-400";
            iconBoxBg = "bg-purple-500/10 border-purple-500/20";
            faqBorderGlow = "hover:border-purple-500/40";
          } else if (theme === "blue") {
            borderGlow = "hover:border-[#3388FF]/45 hover:shadow-[0_0_20px_rgba(51,136,255,0.04)]";
            iconColor = "text-[#3388FF]";
            iconBoxBg = "bg-[#3388FF]/10 border-[#3388FF]/20";
            faqBorderGlow = "hover:border-[#3388FF]/40";
          } else if (theme === "teal") {
            borderGlow = "hover:border-teal-500/45 hover:shadow-[0_0_20px_rgba(20,184,166,0.04)]";
            iconColor = "text-teal-400";
            iconBoxBg = "bg-teal-500/10 border-teal-500/20";
            faqBorderGlow = "hover:border-teal-500/40";
          } else if (theme === "green") {
            borderGlow = "hover:border-success-teal/45 hover:shadow-[0_0_20px_rgba(0,229,163,0.04)]";
            iconColor = "text-success-teal";
            iconBoxBg = "bg-success-teal/10 border-success-teal/20";
            faqBorderGlow = "hover:border-success-teal/40";
          } else if (theme === "red") {
            borderGlow = "hover:border-red-500/45 hover:shadow-[0_0_20px_rgba(239,68,68,0.04)]";
            iconColor = "text-red-400";
            iconBoxBg = "bg-red-500/10 border-red-500/20";
            faqBorderGlow = "hover:border-red-500/40";
          } else if (theme === "amber") {
            borderGlow = "hover:border-amber-500/45 hover:shadow-[0_0_20px_rgba(245,158,11,0.04)]";
            iconColor = "text-amber-400";
            iconBoxBg = "bg-amber-500/10 border-amber-500/20";
            faqBorderGlow = "hover:border-amber-500/40";
          }

          return (
            <div key={catIdx} className="space-y-8 reveal-up">
              {/* Category Header */}
              <div className="flex items-start gap-4 reveal-up delay-75">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${iconBoxBg}`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display text-lg sm:text-xl font-extrabold text-white uppercase tracking-wider">
                    {category.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                    {category.desc}
                  </p>
                </div>
              </div>

              {/* Accordion Questions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, itemIdx) => {
                  const isExpanded = !!expandedItems[item.id];
                  const delayClass = itemIdx % 2 === 0 ? "delay-75" : "delay-150";
                  return (
                    <div
                      key={item.id}
                      className={`group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/40 transition-all duration-300 ${faqBorderGlow} h-fit overflow-hidden reveal-up ${delayClass}`}
                    >
                      {/* Tech corner accent lines */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#2A3650]/50 group-hover:border-primary-cyan/30 transition-colors" />
                      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#2A3650]/50 group-hover:border-primary-cyan/30 transition-colors" />

                      {/* Header/Question Trigger Button */}
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left text-white focus:outline-none cursor-pointer"
                      >
                        <span className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase group-hover:text-primary-cyan transition-colors">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${
                            isExpanded ? "transform rotate-180 text-primary-cyan" : ""
                          }`}
                        />
                      </button>

                      {/* Expandable Answer */}
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isExpanded ? "max-h-[300px] border-t border-[#2A3650]/40" : "max-h-0"
                        }`}
                      >
                        <div className="p-5 text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium bg-[#0B0F19]/25">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
