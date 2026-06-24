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
  Eye,
  Briefcase,
  FileQuestion,
  UserX,
  Share2,
  FileSpreadsheet,
} from "lucide-react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("scope");
  const [mounted, setMounted] = useState(false);

  const getTheme = (id: string) => {
    if (["prohibited-activities", "abuse-complaints", "staff-harassment", "suspension-termination", "prohibited", "harassment", "children-privacy", "law-enforcement", "account-deletion"].includes(id)) {
      return "red";
    }
    if (["services-provided", "paid-services", "payments-billing", "refund-policy", "affiliate-program", "services", "billing", "payment-processing", "sharing", "third-party", "business-transfers"].includes(id)) {
      return "green";
    }
    if (["free-hosting", "vps-root", "user-billing", "data-backups", "user-responsibilities", "free-tier", "data-backups", "retention", "security-measures", "user-responsibilities"].includes(id)) {
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
      id: "scope",
      title: "1. Scope of This Policy",
      icon: Eye,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">This Privacy Policy applies to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Visitors of our website</li>
            <li>Registered customers</li>
            <li>Users of free and paid hosting services</li>
            <li>Affiliates and partners</li>
            <li>Individuals contacting us for support</li>
          </ul>
          <p className="text-xs font-semibold text-text-muted mt-3">This policy does not apply to third-party websites or services not owned or controlled by DynoXium.</p>
        </div>
      ),
    },
    {
      id: "collection",
      title: "2. Information We Collect",
      icon: FileSpreadsheet,
      content: (
        <div className="space-y-4">
          <p className="text-[#A0AEC0]">We collect information necessary to provide secure, reliable hosting services.</p>

          <div className="border border-[#2A3650]/40 rounded-xl p-5 space-y-3 bg-[#0E1321]/60">
            <h4 className="font-bold text-white text-sm border-b border-[#2A3650]/30 pb-2">2.1 Information You Provide Directly</h4>
            <p className="text-xs text-text-muted">When you register or purchase services, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#A0AEC0]">
              <li>Full legal name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing address</li>
              <li>Company name (if applicable)</li>
              <li>Government-issued identification (if required for verification)</li>
              <li>Payment-related information</li>
              <li>Support ticket messages</li>
              <li>Communications via email or Discord</li>
            </ul>
            <p className="text-[10px] font-bold text-primary-cyan mt-2">You are responsible for ensuring the accuracy of this information.</p>
          </div>

          <div className="border border-[#2A3650]/40 rounded-xl p-5 space-y-3 bg-[#0E1321]/60">
            <h4 className="font-bold text-white text-sm border-b border-[#2A3650]/30 pb-2">2.2 Automatically Collected Information</h4>
            <p className="text-xs text-text-muted">When you access our website or services, we may automatically collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#A0AEC0]">
              <li>IP address</li>
              <li>Login timestamps</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Pages visited</li>
              <li>Bandwidth usage</li>
              <li>Server access logs</li>
            </ul>
            <p className="text-[10px] font-bold text-primary-cyan mt-2">This data helps us maintain security, prevent abuse, and improve performance.</p>
          </div>

          <div className="border border-[#2A3650]/40 rounded-xl p-5 space-y-3 bg-[#0E1321]/60">
            <h4 className="font-bold text-white text-sm border-b border-[#2A3650]/30 pb-2">2.3 Service-Related Data</h4>
            <p className="text-xs text-text-muted">If you use hosting services, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#A0AEC0]">
              <li>Server resource usage (CPU, RAM, storage, bandwidth)</li>
              <li>Network logs</li>
              <li>Abuse-related activity logs</li>
              <li>Firewall alerts</li>
              <li>Login attempts and security logs</li>
            </ul>
            <p className="text-[10px] font-bold text-amber-400 mt-2">We do not monitor your private content unless required for abuse investigation or legal compliance.</p>
          </div>
        </div>
      ),
    },
    {
      id: "legal-basis",
      title: "3. Legal Basis for Processing",
      icon: Scale,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">We process personal data based on:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Performance of a contract (providing hosting services)</li>
            <li>Legal obligations (tax, fraud prevention, law enforcement requests)</li>
            <li>Legitimate business interests (security, system stability, fraud detection)</li>
            <li>Your consent (where required by law)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "use-info",
      title: "4. How We Use Your Information",
      icon: ClipboardList,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">We use your information to:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Create and manage your account</li>
            <li>Process payments and invoices</li>
            <li>Deliver hosting services</li>
            <li>Provide technical support</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Enforce our Terms of Service</li>
            <li>Maintain infrastructure stability</li>
            <li>Send important service notifications</li>
            <li>Improve platform performance and reliability</li>
          </ol>
          <p className="text-xs font-bold text-primary-cyan mt-3 uppercase tracking-wider">We do not sell, rent, or trade your personal information.</p>
        </div>
      ),
    },
    {
      id: "payment-processing",
      title: "5. Payment Processing",
      icon: CreditCard,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-2">
          <p className="text-[#A0AEC0] leading-relaxed">
            All payments are processed through trusted third-party providers such as Stripe and PayPal. <span className="font-bold text-white">DynoXium</span> does not store complete credit card numbers on its servers.
          </p>
          <p className="text-xs text-text-muted mt-2">Payment providers handle sensitive financial information under their own privacy and security standards.</p>
        </div>
      ),
    },
    {
      id: "retention",
      title: "6. Data Retention Policy",
      icon: Database,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">We retain data only as long as necessary for operational and legal purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li><span className="font-semibold text-white">Active accounts:</span> Data retained while services remain active.</li>
            <li><span className="font-semibold text-white">Inactive accounts:</span> May be deleted after extended inactivity.</li>
            <li><span className="font-semibold text-white">Billing records:</span> Retained as required by tax laws.</li>
            <li><span className="font-semibold text-white">Abuse and fraud records:</span> May be retained indefinitely for security purposes.</li>
            <li><span className="font-semibold text-white">Suspended accounts:</span> Retained to prevent repeat violations.</li>
          </ul>
          <p className="text-xs font-semibold text-primary-cyan mt-3">After retention periods expire, data may be securely deleted.</p>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "7. Data Sharing and Disclosure",
      icon: Share2,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">We may share limited data with:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Payment processors</li>
            <li>Infrastructure providers</li>
            <li>Control panel software vendors</li>
            <li>Legal authorities when required by law</li>
            <li>Professional advisors (legal/accounting)</li>
          </ul>
          <p className="text-xs text-text-muted">We only share information necessary for service delivery or legal compliance.</p>
          <p className="text-xs font-bold text-primary-cyan uppercase tracking-wider">We do not share personal data for advertising or marketing.</p>
        </div>
      ),
    },
    {
      id: "law-enforcement",
      title: "8. Law Enforcement Requests",
      icon: ShieldAlert,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">We may disclose information if required by:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Court orders</li>
            <li>Government authorities</li>
            <li>Law enforcement investigations</li>
            <li>Legal obligations under applicable law</li>
          </ul>
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">We reserve the right to comply with valid legal requests.</p>
        </div>
      ),
    },
    {
      id: "security-measures",
      title: "9. Data Security Measures",
      icon: Lock,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-4">
          <p className="font-bold text-white mb-2">We implement industry-standard security practices including:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>SSL/TLS encryption</li>
            <li>Firewalls and intrusion detection systems</li>
            <li>Access control restrictions</li>
            <li>Role-based staff permissions</li>
            <li>Security monitoring</li>
            <li>DDoS protection systems</li>
          </ul>
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3 text-xs font-semibold text-amber-400 text-center">
            Despite these measures, no system can guarantee absolute security.
          </div>
        </div>
      ),
    },
    {
      id: "user-responsibilities",
      title: "10. User Responsibilities",
      icon: ClipboardList,
      content: (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-amber-400 mb-2">You are responsible for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Securing your login credentials</li>
            <li>Enabling strong passwords</li>
            <li>Maintaining backups of your hosted data</li>
            <li>Keeping your registered email active and monitored</li>
            <li>Implementing security measures on VPS servers</li>
          </ul>
          <p className="text-xs font-bold text-amber-400/90 mt-2 uppercase tracking-wide border-t border-amber-500/20 pt-2 text-center">
            DynoXium is not responsible for account compromise caused by weak passwords or user negligence.
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "11. Cookies and Tracking Technologies",
      icon: Globe,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">We use cookies to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Maintain login sessions</li>
            <li>Store user preferences</li>
            <li>Improve website performance</li>
            <li>Analyze traffic patterns</li>
          </ul>
          <p className="text-xs text-text-muted">You may disable cookies via browser settings; however, certain features may not function correctly.</p>
        </div>
      ),
    },
    {
      id: "transfers",
      title: "12. International Data Transfers",
      icon: Globe,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-2">
          <p className="text-[#A0AEC0] leading-relaxed">
            Your data may be stored or processed in data centers located outside your country of residence. By using our services, you consent to such international transfers.
          </p>
          <p className="text-xs font-semibold text-primary-cyan mt-3">We take reasonable steps to ensure data protection regardless of location.</p>
        </div>
      ),
    },
    {
      id: "data-rights",
      title: "13. Your Data Rights",
      icon: Handshake,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
          </ul>
          <p className="text-xs text-text-muted mt-3 pt-2 border-t border-white/5">Requests must be submitted via the official support ticket system.</p>
          <p className="text-xs font-bold text-primary-cyan">We may verify identity before fulfilling requests.</p>
        </div>
      ),
    },
    {
      id: "account-deletion",
      title: "14. Account Deletion",
      icon: UserX,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">If you request account deletion:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Active services will be terminated</li>
            <li>Hosted data may be permanently removed</li>
            <li>Billing records may be retained for legal compliance</li>
            <li>Abuse records may be retained for security reasons</li>
          </ul>
          <p className="text-xs font-bold text-red-400 mt-2 uppercase tracking-wide">Deletion requests cannot reverse billing obligations.</p>
        </div>
      ),
    },
    {
      id: "third-party",
      title: "15. Third-Party Services",
      icon: Layers,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">Our platform integrates third-party software such as:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>WHMCS</li>
            <li>Pterodactyl</li>
            <li>Stripe</li>
            <li>PayPal</li>
          </ul>
          <p className="text-xs text-text-muted mt-3">We are not responsible for the privacy practices of third-party platforms. Users should review their policies separately.</p>
        </div>
      ),
    },
    {
      id: "children-privacy",
      title: "16. Children's Privacy",
      icon: ShieldAlert,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-2">
          <p className="text-[#A0AEC0]">
            Our services are not intended for individuals under 14 years of age. We do not knowingly collect personal data from minors.
          </p>
          <p className="font-bold text-red-400 uppercase text-xs tracking-wider pt-2">
            If we become aware of such collection, we will take appropriate steps to delete the data.
          </p>
        </div>
      ),
    },
    {
      id: "business-transfers",
      title: "17. Business Transfers",
      icon: Briefcase,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-2">
          <p className="text-[#A0AEC0] leading-relaxed">
            In the event of a merger, acquisition, restructuring, or asset sale, user data may be transferred as part of business operations.
          </p>
          <p className="text-xs font-semibold text-primary-cyan mt-3">Any successor entity will be required to honor this Privacy Policy.</p>
        </div>
      ),
    },
    {
      id: "liability-limitation",
      title: "18. Limitation of Liability",
      icon: Scale,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">While we take reasonable measures to protect personal information, DynoXium is not liable for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Unauthorized access beyond our control</li>
            <li>Cyberattacks targeting user-managed servers</li>
            <li>Data loss caused by user misconfiguration</li>
            <li>Third-party service failures</li>
          </ul>
        </div>
      ),
    },
    {
      id: "changes-policy",
      title: "19. Changes to This Privacy Policy",
      icon: FileQuestion,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="text-[#A0AEC0] leading-relaxed">
            We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes.
          </p>
          <p className="text-xs font-bold text-primary-cyan uppercase tracking-wider">
            The updated version will be published on our website with a revised &ldquo;Last Updated&rdquo; date. Continued use of services constitutes acceptance of the updated policy.
          </p>
        </div>
      ),
    },
    {
      id: "contact-info",
      title: "20. Contact Information",
      icon: Info,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            If you have any questions regarding this Privacy Policy or our data practices, please contact us at <a href="mailto:support@dynoxium.com" className="text-primary-cyan hover:underline">support@dynoxium.com</a> or submit a ticket via our client portal.
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
          Privacy <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Policy</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          DynoXium is committed to protecting your privacy and safeguarding your personal data. <span className="text-primary-cyan/80 block mt-3 font-mono text-xs sm:text-sm uppercase tracking-wider">Last updated: June 21, 2026</span>
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
