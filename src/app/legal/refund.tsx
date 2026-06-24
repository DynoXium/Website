"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  ShieldAlert,
  ClipboardList,
  AlertTriangle,
  CreditCard,
  XCircle,
  Zap,
  Lock,
  FileQuestion,
  ArrowRight,
} from "lucide-react";

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState<string>("eligibility");
  const [mounted, setMounted] = useState(false);

  const getTheme = (id: string) => {
    if (["non-refundable", "chargebacks", "fraud"].includes(id)) {
      return "red";
    }
    if (["method", "eligibility"].includes(id)) {
      return "green";
    }
    if (["conditions", "cancellation"].includes(id)) {
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
      title: "1. General Refund Eligibility",
      icon: Coins,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Refund requests must be submitted within <span className="font-semibold text-white">24 hours</span> of the initial payment.</li>
          <li>Refunds are available <span className="font-semibold text-white">exclusively for first-time customers</span>. If you have previously purchased or used any of our services under the same account, email address, or payment method, you are not eligible for a refund on any subsequent purchase.</li>
          <li>Renewal payments are non-refundable.</li>
          <li>Refunds are not automatic and must be requested through the official support ticket system.</li>
        </ol>
      ),
    },
    {
      id: "non-refundable",
      title: "2. Non-Refundable Services",
      icon: ShieldAlert,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">The following services are strictly non-refundable:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Dedicated IP addresses</li>
            <li>Domain registrations and renewals</li>
            <li>Setup fees</li>
            <li>Custom configurations</li>
            <li>Add-ons or extra resources</li>
            <li>Abuse-related suspensions</li>
            <li>Services terminated for Terms violations</li>
          </ul>
          <p className="text-xs font-bold text-red-400/90 mt-2 uppercase tracking-wide border-t border-red-500/20 pt-2 text-center">
            Due to the nature of instant provisioning and infrastructure allocation, VPS services cannot be refunded under any circumstances.
          </p>
        </div>
      ),
    },
    {
      id: "conditions",
      title: "3. Refund Conditions",
      icon: ClipboardList,
      content: (
        <div className="space-y-4">
          <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 space-y-3">
            <p className="font-bold text-amber-400 mb-2">Refunds may be denied if:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
              <li>The service has been used for abusive or illegal activity</li>
              <li>Resource abuse has been detected</li>
              <li>A chargeback has been filed</li>
              <li>The request is made after 24 hours</li>
              <li>The account has been suspended for violation of policies</li>
              <li>The refund request lacks a valid and verifiable reason. Simply deciding you no longer wish to use the service after having already used it — for example, after 2 or more days of active use — does not constitute a valid reason for a refund.</li>
            </ul>
          </div>
          <p className="text-xs font-semibold text-text-muted text-center">We reserve the right to investigate usage before approving any refund.</p>
        </div>
      ),
    },
    {
      id: "chargebacks",
      title: "4. Chargebacks & Payment Disputes",
      icon: AlertTriangle,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">Filing a chargeback or payment dispute without contacting support first will result in:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Immediate suspension of services</li>
            <li>Termination of the account</li>
            <li>Permanent ban from future purchases</li>
          </ul>
          <p className="text-xs font-bold text-red-400/90 mt-2 uppercase tracking-wide border-t border-red-500/20 pt-2 text-center">
            We reserve the right to dispute fraudulent chargebacks with supporting evidence.
          </p>
        </div>
      ),
    },
    {
      id: "method",
      title: "5. Refund Method",
      icon: CreditCard,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">Approved refunds will:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Be issued to the original payment method</li>
            <li>Be processed within a reasonable timeframe</li>
            <li>Exclude transaction fees where applicable</li>
          </ul>
          <p className="text-xs font-semibold text-text-muted mt-3">We are not responsible for delays caused by banks or payment processors.</p>
        </div>
      ),
    },
    {
      id: "cancellation",
      title: "6. Service Cancellation",
      icon: XCircle,
      content: (
        <ol className="list-decimal pl-5 space-y-2 text-[#A0AEC0]">
          <li>Services must be canceled through the client area before the renewal date.</li>
          <li>Failure to cancel does not automatically qualify you for a refund.</li>
          <li>Cancellation does not reverse previous charges.</li>
        </ol>
      ),
    },
    {
      id: "sla",
      title: "7. SLA Credits vs Refunds",
      icon: Zap,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5 space-y-3">
          <p className="font-bold text-white mb-2">If uptime falls below the guaranteed threshold (for eligible paid plans):</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Compensation will be issued as service credit only</li>
            <li>SLA credits cannot be withdrawn as cash</li>
            <li>SLA credits must be requested within 7 days of the outage</li>
          </ul>
          <p className="text-xs font-semibold text-primary-cyan mt-3">Free plans are not eligible for SLA compensation.</p>
        </div>
      ),
    },
    {
      id: "fraud",
      title: "8. Fraud Prevention",
      icon: Lock,
      content: (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-3">
          <p className="font-bold text-red-400 mb-2">We reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#A0AEC0]">
            <li>Request identity verification</li>
            <li>Delay service activation</li>
            <li>Cancel suspicious orders</li>
            <li>Deny refunds for high-risk transactions</li>
          </ul>
          <p className="text-xs font-bold text-red-400 mt-2 uppercase tracking-wide border-t border-red-500/20 pt-2 text-center">
            Fraudulent activity will result in permanent account termination.
          </p>
        </div>
      ),
    },
    {
      id: "modifications",
      title: "9. Modifications to This Policy",
      icon: FileQuestion,
      content: (
        <div className="bg-[#161C2C]/50 border border-primary-cyan/20 rounded-xl p-5">
          <p className="text-[#A0AEC0] leading-relaxed">
            We reserve the right to update this Refund Policy at any time. Updated versions will be published on our website.
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
          Refund <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Policy</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          DynoXium outlines the conditions under which refunds may or may not be issued for our hosting packages. <span className="text-primary-cyan/80 block mt-3 font-mono text-xs sm:text-sm uppercase tracking-wider">Last updated: June 21, 2026</span>
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
