"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Globe,
  Gamepad2,
  HardDrive,
  Server,
  Network,
  AlertTriangle,
  Layers,
  Cpu,
  Shield,
  Mail,
  Lock,
  Scale,
  ClipboardList,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export default function AcceptableUsePolicy() {
  const [activeSection, setActiveSection] = useState<string>("general");
  const [mounted, setMounted] = useState(false);

  const getTheme = (id: string) => {
    if (["prohibited-content", "network-abuse", "email-spam", "zero-tolerance"].includes(id)) {
      return "red";
    }
    if (["general", "enforcement", "policy-updates"].includes(id)) {
      return "green";
    }
    if (["web-abuse", "game-abuse", "vps-abuse", "dedicated-server", "dedicated-ip", "colocation", "resource-abuse", "abuse-complaints", "security-violations", "customer-responsibility"].includes(id)) {
      return "amber";
    }
    return "cyan";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  const sections = [
    {
      id: "general",
      title: "1. General Principles",
      icon: ShieldCheck,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">You agree to use DynoXium services:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Lawfully</li>
            <li>Responsibly</li>
            <li>Without harming infrastructure, network stability, or other users</li>
            <li>In compliance with our Terms of Service</li>
          </ul>
          <p className="text-xs font-semibold text-primary-cyan mt-3">You are fully responsible for all content and activities under your account.</p>
        </div>
      ),
    },
    {
      id: "prohibited-content",
      title: "2. Prohibited Content (All Services)",
      icon: ShieldAlert,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">The following content is strictly prohibited:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Malware, ransomware, spyware, trojans</li>
            <li>Phishing pages or fake login portals</li>
            <li>Carding operations or financial fraud tools</li>
            <li>Copyright-infringing material</li>
            <li>Pirated software, cracked scripts, warez</li>
            <li>Terror-related or extremist content</li>
            <li>Child exploitation material (reported immediately to authorities)</li>
            <li>Deepfake scam content</li>
            <li>Identity theft tools</li>
            <li>Illegal gambling operations (where prohibited by law)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "web-abuse",
      title: "3. Web Hosting Abuse",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">For shared and reseller web hosting, you may NOT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Host large file storage platforms unrelated to websites</li>
              <li>Run crypto mining scripts</li>
              <li>Use hosting for public download mirrors</li>
              <li>Operate torrent trackers or seedboxes</li>
              <li>Run automated bots causing high CPU load</li>
              <li>Abuse PHP mail functions</li>
              <li>Send bulk unsolicited emails</li>
            </ul>
          </div>
          <p className="text-xs font-bold text-amber-400/90 text-center">Excessive CPU, RAM, or disk I/O usage may result in throttling or suspension.</p>
        </div>
      ),
    },
    {
      id: "game-abuse",
      title: "4. Game Hosting Abuse",
      icon: Gamepad2,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">For game servers (e.g., Minecraft and others), you may NOT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Use crash clients or exploit tools</li>
              <li>Run DDoS tools from game servers</li>
              <li>Host modified servers that distribute pirated assets</li>
              <li>Overload node resources intentionally</li>
              <li>Coordinate attacks against other servers</li>
            </ul>
          </div>
          <p className="text-xs font-bold text-amber-400/90 text-center">Mass alt-account farming and bot-based abuse are prohibited.</p>
        </div>
      ),
    },
    {
      id: "vps-abuse",
      title: "5. VPS / VDS Hosting Abuse",
      icon: HardDrive,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">With root or administrative access, you are fully responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Server security</li>
              <li>Firewall configuration</li>
              <li>System updates</li>
              <li>Installed software</li>
            </ul>
          </div>
          <div className="border border-[#2A3650]/40 rounded-xl p-5 space-y-3 bg-[#0E1321]/60">
            <p className="font-bold text-white text-sm">You may NOT use VPS/VDS for:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#A0AEC0]">
              <li>Botnets</li>
              <li>DDoS-for-hire services</li>
              <li>Spam relays</li>
              <li>Crypto mining farms (unless explicitly allowed)</li>
              <li>Proxy networks for abuse</li>
              <li>Brute-force attack tools</li>
              <li>Mass scanning external networks</li>
            </ul>
            <p className="text-[10px] font-bold text-red-400 mt-2">Misconfigured servers affecting network stability may be suspended immediately.</p>
          </div>
        </div>
      ),
    },
    {
      id: "dedicated-server",
      title: "6. Dedicated Server Policy",
      icon: Server,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">Dedicated servers must not be used for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>High-volume spam operations</li>
              <li>Network flooding</li>
              <li>Unauthorized penetration testing</li>
              <li>Hosting illegal marketplaces</li>
              <li>Blackhat SEO networks</li>
              <li>IP reputation abuse</li>
            </ul>
            <p className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2 mt-2">Customers are responsible for securing dedicated hardware.</p>
          </div>
          <p className="text-xs font-bold text-red-400 text-center uppercase tracking-wide">Repeated abuse may result in immediate termination.</p>
        </div>
      ),
    },
    {
      id: "dedicated-ip",
      title: "7. Dedicated IP Usage Policy",
      icon: Network,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">Dedicated IPs must NOT be used for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Email spam campaigns</li>
              <li>Blackhat SEO</li>
              <li>Botnets</li>
              <li>Open proxies</li>
              <li>Public VPN abuse</li>
              <li>Reputation manipulation</li>
            </ul>
            <p className="text-xs font-semibold text-white/90 border-t border-white/10 pt-2 mt-2">IPs remain the property of DynoXium or upstream providers.</p>
          </div>
          <p className="text-xs font-bold text-red-400 text-center uppercase tracking-wide">IP reputation damage may result in IP revocation without refund.</p>
        </div>
      ),
    },
    {
      id: "network-abuse",
      title: "8. Network Abuse & Security",
      icon: AlertTriangle,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">Strictly prohibited:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>DDoS attacks</li>
            <li>Running stressors or booters</li>
            <li>Port scanning external networks</li>
            <li>BGP hijacking attempts</li>
            <li>Packet sniffing without authorization</li>
            <li>ARP spoofing</li>
            <li>Exploiting network vulnerabilities</li>
          </ul>
          <p className="text-xs font-semibold text-text-muted mt-2 border-t border-red-500/20 pt-2">We monitor network traffic for abuse prevention.</p>
        </div>
      ),
    },
    {
      id: "colocation",
      title: "9. Colocation Policy",
      icon: Layers,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">For colocation customers, you must NOT:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Install illegal hardware</li>
            <li>Connect unauthorized networking equipment</li>
            <li>Tamper with shared infrastructure</li>
            <li>Bypass data center security procedures</li>
            <li>Interfere with cooling or power systems</li>
          </ul>
          <p className="text-xs font-bold text-amber-400 mt-2 uppercase tracking-wide">Physical access is strictly controlled. All colocated equipment must comply with data center regulations.</p>
        </div>
      ),
    },
    {
      id: "resource-abuse",
      title: "10. Resource Abuse & Fair Usage",
      icon: Cpu,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">We enforce fair usage to protect infrastructure against:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Excessive CPU usage</li>
              <li>Constant 100% load</li>
              <li>Continuous high I/O operations</li>
              <li>Network saturation</li>
            </ul>
          </div>
          <div className="border border-[#2A3650]/40 rounded-xl p-5 space-y-3 bg-[#0E1321]/60">
            <p className="font-bold text-white text-sm">Violations may result in:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#A0AEC0]">
              <li>Throttling</li>
              <li>Temporary suspension</li>
              <li>Permanent termination</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "abuse-complaints",
      title: "11. Abuse Complaints",
      icon: Shield,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Abuse notices must be addressed within <span className="font-semibold text-white">24 hours</span>.</li>
          <li>Failure to respond may result in suspension.</li>
          <li>Repeat violations may lead to permanent termination.</li>
          <li>Investigation fees may apply for severe cases.</li>
        </ol>
      ),
    },
    {
      id: "email-spam",
      title: "12. Email & Spam Policy",
      icon: Mail,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">Strictly prohibited:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Sending unsolicited bulk emails</li>
            <li>Purchased email lists</li>
            <li>Email spoofing</li>
            <li>SMTP relay abuse</li>
          </ul>
          <p className="text-xs font-bold text-red-400 mt-2 uppercase tracking-wide border-t border-red-500/20 pt-2 text-center">
            IP blacklisting due to spam may result in permanent service removal.
          </p>
        </div>
      ),
    },
    {
      id: "security-violations",
      title: "13. Security Violations",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">We may immediately suspend services for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Active malware detection</li>
              <li>Network compromise</li>
              <li>Zero-day exploit distribution</li>
              <li>Large-scale scanning activity</li>
            </ul>
          </div>
          <p className="text-xs font-bold text-amber-400 text-center uppercase tracking-wide">No prior notice may be provided in critical security cases.</p>
        </div>
      ),
    },
    {
      id: "zero-tolerance",
      title: "14. Zero Tolerance Violations",
      icon: ShieldAlert,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">Immediate termination without refund for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Child exploitation content</li>
            <li>Terror-related content</li>
            <li>Active fraud operations</li>
            <li>Large-scale network attacks</li>
            <li>Staff harassment</li>
          </ul>
        </div>
      ),
    },
    {
      id: "enforcement",
      title: "15. Enforcement Rights",
      icon: Scale,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">DynoXium reserves the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Suspend services without notice</li>
            <li>Remove harmful content</li>
            <li>Restrict bandwidth</li>
            <li>Revoke IP addresses</li>
            <li>Terminate accounts permanently</li>
            <li>Report illegal activity to authorities</li>
          </ul>
          <p className="text-xs font-semibold text-primary-cyan mt-3 border-t border-white/5 pt-2">We may cooperate fully with law enforcement agencies.</p>
        </div>
      ),
    },
    {
      id: "customer-responsibility",
      title: "16. Customer Responsibility",
      icon: ClipboardList,
      content: (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-amber-400 mb-2">You are responsible for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Securing your services</li>
            <li>Monitoring your applications</li>
            <li>Preventing abuse from your users</li>
            <li>Keeping your software updated</li>
            <li>Maintaining backups</li>
          </ul>
          <p className="text-xs font-bold text-amber-400/90 mt-2 uppercase tracking-wide border-t border-amber-500/20 pt-2 text-center">
            DynoXium is not responsible for abuse originating from your misconfigured systems.
          </p>
        </div>
      ),
    },
    {
      id: "policy-updates",
      title: "17. Policy Updates",
      icon: RotateCcw,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            We may update this AUP at any time. Continued use of services constitutes acceptance of the revised policy.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* HERO TITLE */}
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)]">
          Legal Agreement
        </div>
        <h1 className="font-norwester text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words">
          Acceptable Use <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Policy</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium">
          Our Acceptable Use Policy defines the parameters of system use and infrastructure stability on the DynoXium network. <span className="text-primary-cyan/80 block mt-3 font-mono text-xs sm:text-sm uppercase tracking-wider">Last updated: June 21, 2026</span>
        </p>
      </section>

      {/* MAIN LAYOUT */}
      <section className="py-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Navigation Column */}
          <div className="hidden lg:block lg:col-span-4">
            {/* Sticky Wrapper for both cards */}
            <div className="sticky top-28 flex flex-col gap-3">
              {/* TOC card */}
              <div className="hidden lg:block bg-[#0E1321]/80 rounded-2xl border border-[#2A3650]/60 p-4 backdrop-blur-md">
                <h3 className="text-xs font-mono text-primary-cyan font-bold uppercase tracking-wider mb-3.5 px-2">
                  Table of Contents
                </h3>
                <div className="flex flex-col gap-1 pr-1">
                  {sections.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeSection === sec.id;
                    const theme = getTheme(sec.id);
                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setActiveSection(sec.id);
                          const element = document.getElementById(sec.id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 font-display text-xs sm:text-sm font-bold border ${isActive
                          ? theme === "red"
                            ? "bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                            : theme === "green"
                              ? "bg-success-teal/10 border-success-teal/40 text-success-teal shadow-[0_0_15px_rgba(0,229,163,0.25)]"
                              : theme === "amber"
                                ? "bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                                : "bg-primary-cyan/10 border-primary-cyan/40 text-primary-cyan shadow-[0_0_15px_var(--color-primary-theme-glow)]"
                          : "border-transparent text-text-muted hover:bg-[#161C2C]/50 hover:text-white"
                          }`}
                      >
                        <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-colors duration-300 ${isActive
                          ? theme === "red" ? "text-red-400 fill-red-500/25"
                            : theme === "green" ? "text-success-teal fill-success-teal/25"
                              : theme === "amber" ? "text-amber-400 fill-amber-500/25"
                                : "text-primary-cyan fill-primary-cyan/25"
                          : theme === "red" ? "text-red-500/40"
                            : theme === "green" ? "text-success-teal/40"
                              : theme === "amber" ? "text-amber-500/40"
                                : "text-primary-cyan/40"
                          }`} />
                        <span>{sec.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Support Capsule card */}
              <div className="hidden lg:flex metallic-card p-5 rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/60 flex-col gap-3 font-sans">
                <h4 className="text-xs font-bold text-white font-display">Have legal questions?</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  If you need clarification regarding any of our policies, please submit a legal inquiry ticket.
                </p>
                <Link
                  href="#"
                  className="mt-1 flex items-center justify-center gap-1.5 w-full bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs py-2 rounded-lg hover:border-primary-cyan/40 transition-all text-center"
                >
                  <span>Submit Ticket</span>
                  <ArrowRight className="h-3 w-3 text-primary-cyan" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Document Content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const theme = getTheme(sec.id);
              const isActive = activeSection === sec.id;

              let cardClasses = "";
              if (isActive) {
                if (theme === "red") cardClasses = "border-red-500/40 bg-[#1A0E13]/85 shadow-[0_0_30px_rgba(239,68,68,0.08)]";
                else if (theme === "green") cardClasses = "border-success-teal/40 bg-[#0A1617]/85 shadow-[0_0_30px_rgba(0,229,163,0.08)]";
                else if (theme === "amber") cardClasses = "border-amber-500/40 bg-[#1A140E]/85 shadow-[0_0_30px_rgba(245,158,11,0.08)]";
                else cardClasses = "border-primary-cyan/40 bg-[#0E1321]/80 shadow-[0_0_30px_rgba(108,244,255,0.06)]";
              } else {
                if (theme === "red") cardClasses = "border-[#2D1F24]/50 bg-[#120B0D]/50 hover:border-red-500/20";
                else if (theme === "green") cardClasses = "border-[#1A2624]/50 bg-[#0A1211]/50 hover:border-success-teal/20";
                else if (theme === "amber") cardClasses = "border-[#2D261F]/50 bg-[#120E0B]/50 hover:border-amber-500/20";
                else cardClasses = "border-[#2A3650]/60 bg-[#0E1321]/50";
              }

              let iconContainerClasses = "";
              let svgClasses = "";
              if (isActive) {
                if (theme === "red") {
                  iconContainerClasses = "bg-gradient-to-br from-red-500/20 to-red-950/40 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
                  svgClasses = "text-red-400 fill-red-500/20";
                } else if (theme === "green") {
                  iconContainerClasses = "bg-gradient-to-br from-success-teal/20 to-emerald-950/40 border-success-teal/40 shadow-[0_0_10px_rgba(0,229,163,0.2)]";
                  svgClasses = "text-success-teal fill-success-teal/20";
                } else if (theme === "amber") {
                  iconContainerClasses = "bg-gradient-to-br from-amber-500/20 to-amber-950/40 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
                  svgClasses = "text-amber-400 fill-amber-500/20";
                } else {
                  iconContainerClasses = "bg-gradient-to-br from-primary-cyan/20 to-blue-950/40 border-primary-cyan/40 shadow-[0_0_10px_rgba(108,244,255,0.2)]";
                  svgClasses = "text-primary-cyan fill-primary-cyan/20";
                }
              } else {
                if (theme === "red") {
                  iconContainerClasses = "bg-red-950/10 border-red-950/30";
                  svgClasses = "text-red-500/60 fill-red-500/5";
                } else if (theme === "green") {
                  iconContainerClasses = "bg-emerald-950/10 border-emerald-950/30";
                  svgClasses = "text-success-teal/60 fill-success-teal/5";
                } else if (theme === "amber") {
                  iconContainerClasses = "bg-amber-950/10 border-amber-950/30";
                  svgClasses = "text-amber-500/60 fill-amber-500/5";
                } else {
                  iconContainerClasses = "bg-blue-950/10 border-blue-950/30";
                  svgClasses = "text-primary-cyan/60 fill-primary-cyan/5";
                }
              }

              return (
                <div
                  key={sec.id}
                  id={sec.id}
                  className={`metallic-card p-6 sm:p-8 rounded-2xl border transition-all duration-500 scroll-mt-24 ${cardClasses}`}
                >
                  <div className="flex items-center gap-3 border-b border-[#2A3650]/40 pb-4 mb-5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${iconContainerClasses}`}>
                      <Icon className={`h-5 w-5 transition-colors duration-300 ${svgClasses}`} />
                    </div>
                    <h2 className="font-display text-lg sm:text-xl font-extrabold text-white uppercase tracking-tight">
                      {sec.title}
                    </h2>
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium space-y-4">
                    {sec.content}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile-only Support Capsule card at the bottom, before footer */}
        <div className="mt-8 lg:hidden flex justify-center w-full">
          <div className="metallic-card p-5 rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/60 flex flex-col gap-3 font-sans w-full max-w-md">
            <h4 className="text-xs font-bold text-white font-display">Have legal questions?</h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              If you need clarification regarding any of our policies, please submit a legal inquiry ticket.
            </p>
            <Link
              href="#"
              className="mt-1 flex items-center justify-center gap-1.5 w-full bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs py-2 rounded-lg hover:border-primary-cyan/40 transition-all text-center"
            >
              <span>Submit Ticket</span>
              <ArrowRight className="h-3 w-3 text-primary-cyan" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
