"use client";

import React, { useState } from "react";
import {
  Gamepad2,
  Users,
  MessageSquare,
  Building2,
  Ticket,
  Loader2,
  Check,
} from "lucide-react";
import Link from "next/link";

type ProfileType = "player" | "partner" | "feedback" | "studio";

interface ProfileOption {
  id: ProfileType;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

export default function ContactPage() {
  const [activeProfile, setActiveProfile] = useState<ProfileType>("player");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const profileOptions: ProfileOption[] = [
    {
      id: "player",
      title: "I'm a player",
      desc: "Have a pre-sales question, need help getting started, or want to find the right server plan?",
      icon: Gamepad2,
    },
    {
      id: "partner",
      title: "I'm a potential partner",
      desc: "Want to collaborate, get a sponsored server, or host for your community?",
      icon: Users,
    },
    {
      id: "feedback",
      title: "I have feedback",
      desc: "Have a suggestion, spotted an issue, or just want to share your experience?",
      icon: MessageSquare,
    },
    {
      id: "studio",
      title: "We're a game studio",
      desc: "Interested in reselling, white-label solutions, or a strategic partnership?",
      icon: Building2,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaClick = () => {
    if (captchaChecked) {
      setCaptchaChecked(false);
      return;
    }
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!captchaChecked) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      setCaptchaChecked(false);
    }, 2000);
  };

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
      <section className="relative pt-40 pb-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 animate-fade-in">
        <h1 className="font-norwester text-3xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-4 uppercase leading-none break-words">
          Contact <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Us</span>
        </h1>
        <p className="text-base sm:text-lg text-text-muted/90 max-w-2xl mx-auto font-sans leading-relaxed font-medium">
          Contact our 24/7 support team
        </p>
      </section>

      {/* MAIN CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0E1321]/60 border border-[#2A3650]/60 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative">
          
          {/* Tech decorative brackets on the large container */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary-cyan/30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary-cyan/30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary-cyan/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary-cyan/30" />

          {/* LEFT COLUMN: PROFILE SELECTOR (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {profileOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeProfile === opt.id;
              
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setActiveProfile(opt.id);
                    setSubmitted(false);
                  }}
                  className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? "bg-primary-cyan/5 border-primary-cyan shadow-[0_0_20px_rgba(108,244,255,0.1)]"
                      : "bg-[#0A0D1A]/50 border-[#2A3650]/50 hover:border-primary-cyan/40 hover:bg-[#0E1225]/45"
                  }`}
                >
                  {/* Decorative corner brackets inside selected card */}
                  {isActive && (
                    <>
                      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary-cyan" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary-cyan" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary-cyan" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary-cyan" />
                    </>
                  )}

                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? "bg-primary-cyan/15 border-primary-cyan text-primary-cyan"
                        : "bg-[#13172C]/80 border-[#2A3650]/60 text-text-muted group-hover:text-white"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className={`font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                        isActive ? "text-primary-cyan" : "text-white"
                      }`}>
                        {opt.title}
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: CONTACT FORM (7 cols) */}
          <div className="lg:col-span-7 bg-[#070A14]/75 border border-[#2A3650]/40 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-success-teal/10 border-2 border-success-teal flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,229,163,0.15)] animate-bounce">
                  <Check className="h-8 w-8 text-success-teal animate-pulse" />
                </div>
                <h3 className="font-norwester text-2xl text-white uppercase tracking-wider">Message Received!</h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We have logged your request under the <span className="text-primary-cyan font-bold capitalize">"{activeProfile}"</span> category. An agent will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#1C2640] border border-[#2A3650]/60 text-white font-bold text-xs uppercase tracking-wider hover:border-primary-cyan/45 transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Names grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
                      First Name<span className="text-[#FF3366] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="First name..."
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#0E1321] border border-[#2A3650]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/20 transition-all font-sans font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name..."
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#0E1321] border border-[#2A3650]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/20 transition-all font-sans font-medium"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Email<span className="text-[#FF3366] ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="hello@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1321] border border-[#2A3650]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/20 transition-all font-sans font-medium"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Subject<span className="text-[#FF3366] ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1321] border border-[#2A3650]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/20 transition-all font-sans font-medium"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Message<span className="text-[#FF3366] ml-0.5">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1321] border border-[#2A3650]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/20 transition-all font-sans font-medium resize-none"
                  />
                </div>

                {/* CAPTCHA PLACEHOLDER */}
                <div className="flex justify-start">
                  <div className="bg-[#0F1424] border border-[#2A3650]/70 rounded-lg p-3 flex items-center justify-between gap-6 shadow-md w-fit">
                    <button
                      type="button"
                      onClick={handleCaptchaClick}
                      className="flex items-center gap-3 focus:outline-none cursor-pointer"
                    >
                      <div className="relative w-6 h-6 border-2 border-[#2A3650] rounded bg-[#070A14] flex items-center justify-center transition-colors">
                        {captchaLoading ? (
                          <Loader2 className="h-4 w-4 text-primary-cyan animate-spin" />
                        ) : captchaChecked ? (
                          <Check className="h-4 w-4 text-success-teal" />
                        ) : null}
                      </div>
                      <span className="text-xs text-white font-sans font-medium">I'm not a robot</span>
                    </button>
                    <div className="flex flex-col items-center select-none opacity-80 pl-2 border-l border-[#2A3650]/40">
                      <img
                        src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                        alt="reCAPTCHA"
                        className="w-6 h-6"
                      />
                      <span className="text-[7px] text-text-muted mt-0.5 uppercase tracking-tighter">reCAPTCHA</span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-cyan text-black font-norwester text-sm uppercase tracking-widest hover:bg-transparent hover:text-primary-cyan border-2 border-primary-cyan transition-all duration-300 shadow-[0_0_20px_rgba(108,244,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION: TICKET CALLOUT */}
      <section className="py-12 border-t border-[#2A3650]/40 bg-[#070A14]/40 text-center relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="font-norwester text-xl sm:text-3xl text-white uppercase tracking-wider">
            Already an existing customer?
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md mx-auto font-sans font-medium">
            We'll get back to you as soon as possible.
          </p>
          <div className="pt-2">
            <Link
              href="/knowledgebase"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2A3650] hover:border-primary-cyan bg-[#0E1321] text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(108,244,255,0.06)]"
            >
              <Ticket className="h-4 w-4 text-primary-cyan" />
              <span>Submit a ticket</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
