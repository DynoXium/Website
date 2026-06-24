"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scale,
  Shield,
  FileText,
  Lock,
  CreditCard,
  AlertTriangle,
  Zap,
  HardDrive,
  UserCheck,
  Building,
  HelpCircle,
  ArrowRight,
  Info,
  UserPlus,
  Server,
  Gift,
  Coins,
  ClipboardList,
  RotateCcw,
  Cpu,
  ShieldAlert,
  Database,
  Globe,
  Handshake,
  Layers,
  Copyright,
  ShieldCheck,
  CloudLightning,
  XCircle,
  Scissors,
  CheckCircle,
} from "lucide-react";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string>("eligibility");
  const [mounted, setMounted] = useState(false);

  const getTheme = (id: string) => {
    if (["prohibited-activities", "abuse-complaints", "staff-harassment", "suspension-termination", "prohibited", "harassment"].includes(id)) {
      return "red";
    }
    if (["services-provided", "paid-services", "payments-billing", "refund-policy", "affiliate-program", "services", "billing"].includes(id)) {
      return "green";
    }
    if (["free-hosting", "vps-root", "user-billing", "data-backups", "free-tier"].includes(id)) {
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
      id: "eligibility",
      title: "1. Eligibility",
      icon: UserCheck,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>You must be at least 14 years old or the legal age in your jurisdiction.</li>
          <li>If acting on behalf of a business, you confirm you have authority to bind that entity.</li>
          <li>We may request identity verification at any time.</li>
          <li>Services may not be used in restricted jurisdictions.</li>
        </ol>
      ),
    },
    {
      id: "registration",
      title: "2. Account Registration",
      icon: UserPlus,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>You must provide accurate, complete, and current information.</li>
          <li>Fake identities or misleading details are prohibited.</li>
          <li>Multiple accounts created to bypass limits may be terminated.</li>
          <li>We reserve the right to suspend accounts pending verification.</li>
          <li>You are responsible for maintaining account security.</li>
        </ol>
      ),
    },
    {
      id: "services-provided",
      title: "3. Services Provided",
      icon: Server,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">DynoXium provides:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Free hosting</li>
            <li>Shared hosting</li>
            <li>Game hosting</li>
            <li>VPS hosting</li>
            <li>Dedicated IP services</li>
            <li>Add-ons and related infrastructure</li>
          </ul>
          <p className="text-xs font-semibold text-primary-cyan mt-3 uppercase tracking-wider">All services are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.</p>
        </div>
      ),
    },
    {
      id: "free-hosting",
      title: "4. Free Hosting Terms",
      icon: Gift,
      content: (
        <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
            <li>Free hosting is provided at our discretion.</li>
            <li>No uptime or backup guarantee applies.</li>
            <li>Resources may be limited or modified at any time.</li>
            <li>Accounts may be removed for inactivity.</li>
            <li>Advertisements or branding may be displayed.</li>
          </ol>
          <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
            <p className="font-bold text-red-400 mb-2">Free plans strictly prohibit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>Crypto mining</li>
              <li>File storage abuse</li>
              <li>Proxy/VPN services</li>
              <li>Pirated software</li>
              <li>Adult content</li>
              <li>High CPU scripts</li>
              <li>Automated bots</li>
            </ul>
            <p className="text-xs font-bold text-red-400/90 mt-2 uppercase tracking-wide">Accounts may be suspended without notice.</p>
          </div>
        </div>
      ),
    },
    {
      id: "paid-services",
      title: "5. Paid Services",
      icon: CreditCard,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>All paid services are billed in advance.</li>
          <li>Service begins after confirmed payment.</li>
          <li>Resource limits must be respected.</li>
          <li>Pricing may change with prior notice.</li>
          <li>Paid services do not grant ownership of infrastructure.</li>
        </ol>
      ),
    },
    {
      id: "vps-root",
      title: "6. VPS & Root Access Responsibility",
      icon: HardDrive,
      content: (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-amber-400 mb-2">If your service includes root or administrative access:</p>
          <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
            <li>You are solely responsible for server security.</li>
            <li>You must maintain firewall and system updates.</li>
            <li>Misconfigured servers causing abuse may be suspended.</li>
            <li>We do not provide system administration unless purchased separately.</li>
          </ol>
        </div>
      ),
    },
    {
      id: "payments-billing",
      title: "7. Payments & Billing",
      icon: Coins,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>All services are prepaid.</li>
          <li>Invoices must be paid before the due date.</li>
          <li>Unpaid invoices may result in suspension.</li>
          <li>Suspended services may incur reactivation fees.</li>
          <li>Taxes (including GST) may apply.</li>
          <li>Chargebacks result in immediate suspension and possible termination.</li>
        </ol>
      ),
    },
    {
      id: "user-billing",
      title: "8. User Responsibility for Billing and Account Management",
      icon: ClipboardList,
      content: (
        <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
            <li>You are solely responsible for managing and monitoring your account, including active services, renewal dates, unpaid invoices, and credit balance.</li>
            <li>
              <span className="font-semibold text-white">You agree to log in regularly to review:</span>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[#A0AEC0]">
                <li>Active and expiring services</li>
                <li>Upcoming renewals</li>
                <li>Outstanding invoices</li>
                <li>Account balance</li>
              </ul>
            </li>
            <li>
              <span className="font-bold text-white">DynoXium is not liable</span> for suspension, termination, service interruption, or data loss caused by failure to check or pay invoice on time. <span className="text-amber-400 font-semibold">Not logging into your account is not a valid excuse.</span>
            </li>
            <li>You must maintain sufficient credit balance to prevent service interruptions.</li>
            <li>While invoice and renewal emails may be sent, you are responsible for ensuring your registered email is functional and monitored. Failure to receive email does not excuse missed payments.</li>
            <li>We are not responsible for actions or negligence by third parties managing your account unless formally authorized by us in writing.</li>
            <li>Data may be permanently deleted after suspension due to non-payment.</li>
          </ol>
        </div>
      ),
    },
    {
      id: "refund-policy",
      title: "9. Refund Policy",
      icon: RotateCcw,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Refund requests must be made within 24 hours of first payment.</li>
          <li>VPS services are strictly non-refundable.</li>
          <li>
            <span className="font-semibold text-white">No refunds for:</span>
            <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[#A0AEC0]">
              <li>Dedicated IPs</li>
              <li>Domains</li>
              <li>Setup fees</li>
              <li>Add-ons</li>
              <li>Abuse-related suspension</li>
            </ul>
          </li>
          <li>Refunds are issued to the original payment method only.</li>
        </ol>
      ),
    },
    {
      id: "resource-usage",
      title: "10. Resource Usage & Fair Use",
      icon: Cpu,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Excessive CPU, RAM, bandwidth, or disk I/O usage may result in throttling or suspension.</li>
          <li>Infinite loops or background abuse processes are prohibited.</li>
          <li>Public file-sharing platforms are not allowed without approval.</li>
          <li>Crypto mining is prohibited unless explicitly permitted.</li>
        </ol>
      ),
    },
    {
      id: "prohibited-activities",
      title: "11. Prohibited Activities",
      icon: ShieldAlert,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">Strictly prohibited:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Malware hosting</li>
            <li>Phishing</li>
            <li>Hacking tools</li>
            <li>Botnets</li>
            <li>DDoS-for-hire services</li>
            <li>Spam campaigns</li>
            <li>Copyright infringement</li>
            <li>Terror-related content</li>
            <li>Carding or fraud</li>
            <li>Blackhat SEO abuse</li>
          </ul>
          <p className="text-xs font-bold text-red-400/90 mt-2 uppercase tracking-wide">Violations may result in immediate termination and reporting to authorities.</p>
        </div>
      ),
    },
    {
      id: "abuse-complaints",
      title: "12. Abuse Complaints",
      icon: Shield,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Abuse reports must be addressed within 24 hours.</li>
          <li>Failure to respond may result in suspension.</li>
          <li>Repeat violations may lead to permanent termination.</li>
        </ol>
      ),
    },
    {
      id: "staff-harassment",
      title: "13. Staff Harassment Policy",
      icon: ShieldAlert,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-2">
          <p className="text-[#A0AEC0]">
            Harassment, threats, insults, slurs, or abusive language toward <span className="font-bold text-white">DynoXium</span> staff via tickets, chat, or Discord will result in <span className="text-red-400 font-bold">immediate termination without refund</span>.
          </p>
          <p className="font-bold text-red-400 uppercase text-xs tracking-wider pt-1">We maintain zero tolerance.</p>
        </div>
      ),
    },
    {
      id: "data-backups",
      title: "14. Data & Backups",
      icon: Database,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>You are responsible for maintaining backups.</li>
          <li>We do not guarantee data restoration.</li>
          <li>We are not liable for data loss due to hardware failure, cyberattacks, or user error.</li>
        </ol>
      ),
    },
    {
      id: "dedicated-ip",
      title: "15. Dedicated IP Policy",
      icon: Globe,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>IP addresses remain our property or that of upstream providers.</li>
          <li>IP misuse may result in revocation without refund.</li>
          <li>You are responsible for maintaining IP reputation.</li>
        </ol>
      ),
    },
    {
      id: "affiliate-program",
      title: "16. Affiliate Program",
      icon: Handshake,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Self-referrals and fraudulent referrals are prohibited.</li>
          <li>Commission may be reversed if the referred user refunds.</li>
          <li>We may terminate affiliate accounts at any time.</li>
        </ol>
      ),
    },
    {
      id: "intellectual-property",
      title: "17. Intellectual Property",
      icon: Copyright,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            All <span className="font-bold text-white">DynoXium</span> branding, software, and systems remain our property. Unauthorized reproduction is prohibited.
          </p>
        </div>
      ),
    },
    {
      id: "limitation-liability",
      title: "18. Limitation of Liability",
      icon: Scale,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-1">To the maximum extent permitted by law:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>We are not liable for indirect or consequential damages.</li>
            <li>Total liability is limited to the amount paid in the previous 30 days.</li>
            <li>We are not liable for third-party failures.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "19. Indemnification",
      icon: ShieldCheck,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            You agree to indemnify and hold <span className="font-bold text-white">DynoXium</span> harmless from claims, damages, losses, and legal expenses arising from your use of our services.
          </p>
        </div>
      ),
    },
    {
      id: "force-majeure",
      title: "20. Force Majeure",
      icon: CloudLightning,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            We are not liable for delays or failures caused by events beyond our control, including natural disasters, war, power failures, government actions, or infrastructure outages.
          </p>
        </div>
      ),
    },
    {
      id: "suspension-termination",
      title: "21. Suspension & Termination",
      icon: XCircle,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">We may suspend or terminate services without notice for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Terms violations</li>
            <li>Non-payment</li>
            <li>Fraud</li>
            <li>Security threats</li>
            <li>Legal compliance requirements</li>
          </ul>
          <p className="text-xs font-bold text-red-400/90 mt-2 uppercase tracking-wide">No refunds will be issued for terminated accounts due to violations.</p>
        </div>
      ),
    },
    {
      id: "severability",
      title: "22. Severability",
      icon: Scissors,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            If any provision is deemed unenforceable, the remaining provisions remain valid.
          </p>
        </div>
      ),
    },
    {
      id: "entire-agreement",
      title: "23. Entire Agreement",
      icon: CheckCircle,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            These Terms, along with our Privacy Policy, AUP, and Refund Policy, constitute the entire agreement between you and <span className="font-bold text-white">DynoXium</span>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* HERO TITLE */}
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto z-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          Legal Agreement
        </div>
        <h1 className="font-norwester text-3xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Terms of <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Service</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Please review the legal terms governing your use of the DynoXium hosting network, servers, and command console. <span className="text-primary-cyan/80 block mt-3 font-mono text-xs sm:text-sm uppercase tracking-wider">Last updated: June 21, 2026</span>
        </p>
      </section>

      {/* MAIN LAYOUT */}
      <section className="py-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 reveal-up delay-200">
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
