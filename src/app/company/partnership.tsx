"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  UserCheck,
  Gamepad2,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function PartnershipPage() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    platform: "YouTube",
    channelUrl: "",
    audienceSize: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const benefits = [
    {
      title: "Competitive Commission",
      desc: "Earn up to 20% commission on all sales made through your unique referral link or custom discount code.",
      icon: Coins,
      theme: "amber",
      badge: "High Payouts",
    },
    {
      title: "Dedicated Manager",
      desc: "Work with a dedicated partnership manager who will help you maximize your conversions and optimize earnings.",
      icon: UserCheck,
      theme: "cyan",
      badge: "1-on-1 Support",
    },
    {
      title: "Free Minecraft Server",
      desc: "Get a free high-performance Minecraft server node to use for your community, content creation, or plugin testing.",
      icon: Gamepad2,
      theme: "green",
      badge: "Free Node Access",
    },
    {
      title: "Community Support",
      desc: "Join our exclusive partner Discord community and collaborate with other creators, developers, and designers.",
      icon: Users,
      theme: "cyan",
      badge: "Private Guild",
    },
    {
      title: "Performance Analytics",
      desc: "Access a detailed partner analytics dashboard to track your referrals, conversions, and monthly earnings in real-time.",
      icon: TrendingUp,
      theme: "amber",
      badge: "Live Metrics",
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
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto z-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          Creator & Affiliate Program
        </div>
        <h1 className="font-norwester text-3xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Partnership <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Program</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Join our partnership program and earn rewards while promoting high-quality cloud and Minecraft hosting services to your audience.
        </p>
        <div className="mt-8 flex justify-center reveal-up delay-200">
          <button
            onClick={() => {
              const element = document.getElementById("apply-now");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="px-8 py-3 rounded-lg bg-primary-cyan border border-primary-cyan text-black font-bold text-xs sm:text-sm hover:bg-transparent hover:text-primary-cyan transition-all shadow-[0_0_20px_rgba(108,244,255,0.3)] uppercase tracking-wider"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* WHY PARTNER WITH US SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-10 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <span className="text-xs font-mono text-primary-cyan font-bold uppercase tracking-widest">
            Partnership Benefits
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Why Partner With Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-up delay-100">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const theme = benefit.theme;

            let borderGlow = "hover:border-primary-cyan/40 hover:shadow-[0_0_30px_rgba(108,244,255,0.06)]";
            let iconBox = "bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan";
            let badgeStyle = "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20";
            if (theme === "amber") {
              borderGlow = "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]";
              iconBox = "bg-amber-500/10 border-amber-500/20 text-amber-400";
              badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/20";
            } else if (theme === "green") {
              borderGlow = "hover:border-success-teal/40 hover:shadow-[0_0_30px_rgba(0,229,163,0.06)]";
              iconBox = "bg-success-teal/10 border-success-teal/20 text-success-teal";
              badgeStyle = "bg-success-teal/10 text-success-teal border-success-teal/20";
            }

            return (
              <div
                key={idx}
                className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 pb-12 flex flex-col justify-between space-y-6 transition-all duration-500 ${borderGlow}`}
              >
                {/* Tech bracket accents */}
                <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />

                <div className="space-y-4">
                  {/* Top line: Icon and Badge */}
                  <div className="flex justify-between items-center">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${iconBox}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${badgeStyle}`}>
                      {benefit.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-base sm:text-lg font-extrabold text-white uppercase tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* APPLICATION FORM SECTION */}
      <section id="apply-now" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-20 reveal-up">
        <div className="bg-gradient-to-br from-[#0E1321]/90 to-[#141B30]/75 rounded-2xl border border-primary-cyan/25 p-8 sm:p-12 shadow-[0_0_40px_rgba(108,244,255,0.08)] relative overflow-hidden reveal-up delay-75">
          {/* Grid backdrop */}
          <div className="absolute inset-0 bg-grid-pattern-sm opacity-10 pointer-events-none" />

          {!submitted ? (
            <div className="relative z-10 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
                  Partner Application
                </h2>
                <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
                  Submit your channel, audience stats, and contact details. Our team will review and respond within 48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-text-muted font-bold uppercase text-[10px]">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ashish Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#0B0F19] border border-[#2A3650]/60 rounded-lg p-3 text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/40 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-text-muted font-bold uppercase text-[10px]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. partner@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#0B0F19] border border-[#2A3650]/60 rounded-lg p-3 text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/40 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-text-muted font-bold uppercase text-[10px]">Primary Platform</label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="bg-[#0B0F19] border border-[#2A3650]/60 rounded-lg p-3 text-white focus:outline-none focus:border-primary-cyan/40 transition-all cursor-pointer"
                    >
                      <option value="YouTube">YouTube</option>
                      <option value="Twitch">Twitch</option>
                      <option value="TikTok">TikTok</option>
                      <option value="Blog/Website">Blog/Website</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-text-muted font-bold uppercase text-[10px]">Channel / Website URL</label>
                    <input
                      type="url"
                      required
                      placeholder="e.g. https://youtube.com/c/yourchannel"
                      value={formData.channelUrl}
                      onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                      className="bg-[#0B0F19] border border-[#2A3650]/60 rounded-lg p-3 text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/40 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-text-muted font-bold uppercase text-[10px]">Audience / Subscriber Count</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50k subscribers / 100k monthly views"
                    value={formData.audienceSize}
                    onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                    className="bg-[#0B0F19] border border-[#2A3650]/60 rounded-lg p-3 text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/40 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-text-muted font-bold uppercase text-[10px]">Tell us about your content & plans</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how you plan to promote DynoXium to your audience..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#0B0F19] border border-[#2A3650]/60 rounded-lg p-3 text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-lg bg-primary-cyan border border-primary-cyan text-black font-bold uppercase tracking-wider hover:bg-transparent hover:text-primary-cyan transition-all shadow-[0_0_15px_rgba(108,244,255,0.2)]"
                >
                  Submit Application
                </button>
              </form>
            </div>
          ) : (
            <div className="relative z-10 text-center py-12 space-y-4">
              <CheckCircle className="h-16 w-16 text-success-teal mx-auto animate-bounce" />
              <h3 className="font-norwester text-2xl text-white uppercase tracking-wider">Application Received</h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
                Thank you for applying, <span className="font-bold text-white">{formData.name}</span>! Our partnership coordinators will review your statistics and contact you via email at <span className="font-bold text-white">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-lg bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs uppercase tracking-wider hover:border-primary-cyan/40 transition-all"
              >
                Submit Another Application
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER SPACER */}
      <div className="h-16 flex-shrink-0" />
    </div>
  );
}
