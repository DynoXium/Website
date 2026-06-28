"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Server,
  Zap,
  Shield,
  Cpu,
  Layers,
  Globe,
  Terminal,
  Activity,
  Check,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Monitor,
  Code,
  Gamepad2,
  Bookmark,
  Coins,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

type CategoryFilter = "all" | "vps" | "runtimes" | "gaming";

// Services specs & starting pricing definitions
interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: CategoryFilter;
  tagline: string;
  description: string;
  startingPrice: number; // in Noida, IN Intel base or equivalent
  isFree?: boolean;
  features: string[];
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    network: string;
  };
  icon: React.ComponentType<any>;
  popular?: boolean;
  color: string; // for card hover glow border
}

export default function ServicesShowcase() {
  const { formatPrice } = useCurrency();

  // Recommendation Wizard States
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedSlug, setRecommendedSlug] = useState<string | null>(null);

  // General Filter State
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  // FAQ State
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const services: ServiceItem[] = [
    {
      id: "vps",
      name: "VPS Hosting",
      slug: "vps",
      category: "vps",
      tagline: "High Performance KVM VPS Nodes",
      description: "Dedicated virtual private servers with full root access, tailored for demanding production workloads, databases, and general infrastructure.",
      startingPrice: 285.87,
      features: [
        "100% Dedicated KVM Virtualization",
        "Ryzen / EPYC / Xeon Processor options",
        "Full OS Customization & Root ISO mount",
        "Enterprise-grade NVMe Storage (Gen4/5)",
        "Instant Deployment under 30 seconds"
      ],
      specs: {
        cpu: "Up to 12 Cores (High Freq)",
        ram: "Up to 64 GB DDR5",
        storage: "Up to 450 GB NVMe Gen4",
        network: "1 Gbps Unmetered Uplink"
      },
      icon: Cpu,
      popular: true,
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: "rdp",
      name: "RDP Hosting",
      slug: "rdp",
      category: "vps",
      tagline: "Dedicated Windows Remote Desktops",
      description: "Optimized virtual workstations running Windows Server with low-latency graphics performance, multi-user sessions, and preconfigured administration tools.",
      startingPrice: 476.45,
      features: [
        "Pre-activated Windows Server License",
        "Administrator access & Remote Desktop Protocol",
        "GPU Acceleration support available",
        "Smooth multi-session workstation hosting",
        "Vibrant Noida, Germany & Singapore locations"
      ],
      specs: {
        cpu: "Up to 16 Cores (Dedicated)",
        ram: "Up to 64 GB DDR5",
        storage: "Up to 400 GB NVMe SSD",
        network: "1 Gbps Unmetered Uplink"
      },
      icon: Monitor,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "web",
      name: "Web Hosting",
      slug: "web",
      category: "runtimes",
      tagline: "Next-gen Static & Dynamic Edge Web Space",
      description: "Frictionless application hosting with git integration, auto-SSL certificates, databases, and custom domain mapping for developers.",
      startingPrice: 95.29,
      features: [
        "Developer-friendly Control Panel",
        "Git Integration & Automatic deployments",
        "Free Let's Encrypt SSL Certificates",
        "Unlimited Subdomains & WordPress 1-Click",
        "High-performance Edge caching"
      ],
      specs: {
        cpu: "Shared Core Runtimes",
        ram: "Up to 8 GB DDR5 alloc",
        storage: "Up to 120 GB NVMe SSD",
        network: "Unlimited Bandwidth"
      },
      icon: Globe,
      color: "from-teal-400 to-emerald-500"
    },
    {
      id: "game",
      name: "Game Servers",
      slug: "game",
      category: "gaming",
      tagline: "Ultra-low Latency Game Node Hosting",
      description: "Optimized server instances for Minecraft, Rust, Ark, CS:GO, and more, equipped with high-CPU clocks, custom control panel, mod managers, and global routing.",
      startingPrice: 190.58,
      features: [
        "Advanced Pterodactyl-based Control Panel",
        "1-Click plugin & Modpack installer",
        "Real-time console, file manager, schedules",
        "Enterprise-grade DDoS mitigation shield",
        "No player limit cap constraints"
      ],
      specs: {
        cpu: "High-Frequency Ryzen cores",
        ram: "Dedicated allocations (No oversell)",
        storage: "Unmetered NVMe SSD space",
        network: "Low-Ping Premium Routing"
      },
      icon: Gamepad2,
      color: "from-amber-400 to-orange-500"
    },
    {
      id: "bot",
      name: "Discord Bot Hosting",
      slug: "bot",
      category: "runtimes",
      tagline: "Always-online Bot & Script Runtime Nodes",
      description: "Lightweight runtimes for Node.js, Python, Java, and Go bots. Fully managed container panels with zero-downtime restarts and automatic updates.",
      startingPrice: 95.29,
      features: [
        "Interactive console & File editing panel",
        "Multi-language runtime support out-of-box",
        "Zero-downtime automated deployment",
        "Up to 6 MySQL databases included",
        "Auto-restart on script crash/errors"
      ],
      specs: {
        cpu: "Up to 2 Cores High Freq",
        ram: "Up to 4 GB DDR5",
        storage: "Unmetered NVMe SSD",
        network: "Unmetered Bandwidth"
      },
      icon: Terminal,
      color: "from-purple-400 to-pink-500"
    },
    {
      id: "free",
      name: "Free Cloud Hosting",
      slug: "free",
      category: "runtimes",
      tagline: "Generous Developer Freemium Tier",
      description: "Start deploying web projects and small bots at absolutely zero cost. Upgrade to premium nodes easily when you grow.",
      startingPrice: 0,
      isFree: true,
      features: [
        "100% Free - No credit card required ever",
        "Supports web, small bots, and databases",
        "Free subdomains and SSL certificates",
        "Upgrade path to dedicated resources",
        "Community discord support group"
      ],
      specs: {
        cpu: "Fair-use Shared CPU Core",
        ram: "512 MB - 1 GB DDR5",
        storage: "5 GB NVMe SSD space",
        network: "Standard Cloud Routing"
      },
      icon: Coins,
      color: "from-green-400 to-teal-500"
    }
  ];

  const wizardQuestions = [
    {
      id: "objective",
      question: "What is your main hosting objective?",
      options: [
        { label: "Host a website, API, or static page", value: "web" },
        { label: "Deploy a virtual desktop/admin server", value: "rdp" },
        { label: "Run a game server (Minecraft, Rust, etc.)", value: "game" },
        { label: "Host a Discord Bot, background script or database", value: "bot" },
        { label: "General development / full root access VM", value: "vps" }
      ]
    },
    {
      id: "budget",
      question: "What is your budget preference?",
      options: [
        { label: "I want a free hosting environment to start", value: "free" },
        { label: "I need professional premium resources with SLA", value: "premium" }
      ]
    }
  ];

  const handleWizardAnswer = (questionId: string, optionValue: string) => {
    const nextAnswers = { ...answers, [questionId]: optionValue };
    setAnswers(nextAnswers);

    if (questionId === "objective" && optionValue === "rdp") {
      setRecommendedSlug("rdp");
      setWizardStep(2);
    } else if (questionId === "objective" && optionValue === "game") {
      setRecommendedSlug("game");
      setWizardStep(2);
    } else if (questionId === "objective" && optionValue === "vps") {
      setRecommendedSlug("vps");
      setWizardStep(2);
    } else if (wizardStep < wizardQuestions.length - 1) {
      setWizardStep((prev) => prev + 1);
    } else {
      // Calculate final recommendation
      if (nextAnswers.budget === "free") {
        setRecommendedSlug("free");
      } else {
        setRecommendedSlug(nextAnswers.objective);
      }
      setWizardStep(2);
    }
  };

  const resetWizard = () => {
    setWizardStep(0);
    setAnswers({});
    setRecommendedSlug(null);
  };

  const filteredServices = services.filter(
    (s) => activeFilter === "all" || s.category === activeFilter
  );

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqs = [
    {
      id: "uptime",
      q: "What is DynoXium's network uptime guarantee?",
      a: "All of our premium hosting nodes (VPS, RDP, Web, Game, and Bot hosting) come with a 99.9% uptime Service Level Agreement (SLA). We run high-quality redundant hardware and multi-homed BGP network uplinks in tier-3 datacenters."
    },
    {
      id: "locations",
      q: "Where are your datacenter server locations?",
      a: "We currently deploy servers in Noida (Delhi-NCR, India), Frankfurt (Germany), and Singapore. This offers excellent coverage and low latency paths for Asian, European, and Middle Eastern developers."
    },
    {
      id: "free_upgrade",
      q: "Can I upgrade from the Free hosting tier to a Paid tier later?",
      a: "Absolutely! You can upgrade your free hosting resources seamlessly through our client portal. All databases, scripts, and configurations can be migrated to premium cores with a single click."
    },
    {
      id: "support",
      q: "How does support work for different services?",
      a: "Paid services receive prioritized support tickets with 24/7 coverage. Free hosting users can access our community support Discord server, where our engineers and experienced users help troubleshoot setup tasks."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Dynamic Background FX */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-primary-cyan/5 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-secondary-cyan/3 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-primary-cyan/3 rounded-full blur-[140px]" />
      </div>

      {/* HERO / WELCOME */}
      <section className="relative pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-6 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)]">
          <Sparkles className="w-4 h-4 text-primary-cyan" /> Complete Cloud Services Ecosystem
        </div>
        <h1 className="font-norwester text-4xl sm:text-6xl md:text-8xl tracking-wider text-white mb-6 uppercase leading-none">
          Explore Our <span className="text-gradient drop-shadow-[0_0_35px_rgba(108,244,255,0.3)]">Services</span>
        </h1>
        <p className="text-text-muted font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From full root VPS environments and Windows desktops to edge web spaces, low-ping game servers, and background bot runtimes — choose the ideal foundation for your applications.
        </p>
      </section>

      {/* INTERACTIVE HOSTING WIZARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 z-10 relative">
        <div className="glass-panel border-primary-cyan/30 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-cyan/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-primary-cyan/10 border border-primary-cyan/35 text-primary-cyan">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-norwester text-lg sm:text-xl text-white uppercase tracking-wider">Service Finder</h3>
              <p className="text-text-muted font-mono text-xs">Let us suggest the perfect hosting tier for you</p>
            </div>
          </div>

          {wizardStep < 2 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-cyan/20 text-xs font-mono font-bold text-primary-cyan border border-primary-cyan/30">
                  {wizardStep + 1}
                </span>
                <span className="text-sm font-semibold text-text-light font-sans">
                  {wizardQuestions[wizardStep].question}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {wizardQuestions[wizardStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWizardAnswer(wizardQuestions[wizardStep].id, option.value)}
                    className="flex items-center justify-between text-left p-4 rounded-xl border border-border-dark bg-[#141C2F]/50 hover:bg-primary-cyan/5 hover:border-primary-cyan/50 hover:shadow-[0_0_15px_rgba(108,244,255,0.08)] transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-sm font-medium text-text-light group-hover:text-primary-cyan font-sans">
                      {option.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-cyan transform group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {(() => {
                const rec = services.find((s) => s.slug === recommendedSlug);
                if (!rec) return null;
                return (
                  <div className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-xl border border-primary-cyan/30 bg-primary-cyan/[0.03]">
                    <div className="p-4 rounded-xl bg-primary-cyan/10 border border-primary-cyan/20 text-primary-cyan self-start md:self-center">
                      <rec.icon className="w-10 h-10" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-cyan/20 text-primary-cyan uppercase tracking-wider font-mono">
                        Best Match Recommendation
                      </div>
                      <h4 className="font-norwester text-xl sm:text-2xl text-white uppercase tracking-wider">{rec.name}</h4>
                      <p className="text-text-muted text-xs sm:text-sm font-sans">{rec.description}</p>
                      <div className="text-xs sm:text-sm text-text-light font-sans font-medium flex items-center gap-1">
                        <Check className="w-4 h-4 text-success-teal" /> Starter Price:{" "}
                        <span className="text-primary-cyan font-bold font-mono">
                          {rec.isFree ? "Free (No Card)" : `${formatPrice(rec.startingPrice)}/mo`}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                      <Link
                        href={`/${rec.slug}`}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-cyan text-bg-dark font-bold font-sans text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(108,244,255,0.4)] transition-all duration-300 text-center"
                      >
                        Launch Service <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={resetWizard}
                        className="px-5 py-2.5 rounded-lg border border-border-dark bg-[#141C2F]/50 text-text-light font-bold font-sans text-xs uppercase tracking-wider hover:bg-border-dark transition-all duration-300 cursor-pointer"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 z-10 relative">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border-dark pb-6">
          {[
            { id: "all", label: "All Hosting" },
            { id: "vps", label: "Virtual Machines (VPS/RDP)" },
            { id: "runtimes", label: "App & Script Runtimes" },
            { id: "gaming", label: "Game Server Rigs" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as CategoryFilter)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                activeFilter === btn.id
                  ? "bg-primary-cyan text-bg-dark border-primary-cyan shadow-[0_0_20px_rgba(108,244,255,0.25)]"
                  : "bg-surface-panel/40 text-text-muted border-border-dark hover:border-primary-cyan/40 hover:text-text-light"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="metallic-card hover:border-primary-cyan/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(108,244,255,0.15)]"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-[#141C2F] border border-border-dark text-primary-cyan group-hover:border-primary-cyan/40 group-hover:shadow-[0_0_15px_rgba(108,244,255,0.15)] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.popular ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/35 uppercase tracking-widest font-mono">
                        Popular
                      </span>
                    ) : service.isFree ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-success-teal/20 text-success-teal border border-success-teal/35 uppercase tracking-widest font-mono">
                        Free Tier
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-norwester text-xl sm:text-2xl text-white uppercase tracking-wider mb-2 group-hover:text-primary-cyan transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-text-muted font-sans text-xs mb-4 leading-normal font-medium">
                    {service.tagline}
                  </p>
                  <p className="text-text-muted/80 text-xs sm:text-sm font-sans mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features checklist */}
                  <div className="border-t border-border-dark/60 pt-6 mb-6">
                    <h5 className="font-norwester text-xs text-white uppercase tracking-wider mb-3">Key Inclusions:</h5>
                    <ul className="space-y-2">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-text-muted font-sans">
                          <Check className="w-3.5 h-3.5 text-success-teal flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Footer Actions */}
                <div className="border-t border-border-dark/60 pt-6 mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs text-text-muted font-sans font-medium">Starting at</span>
                    <span className="text-lg sm:text-xl font-norwester text-white">
                      {service.isFree ? (
                        <span className="text-success-teal font-bold uppercase">Free</span>
                      ) : (
                        <>
                          <span className="text-primary-cyan font-bold font-mono">
                            {formatPrice(service.startingPrice)}
                          </span>
                          <span className="text-xs text-text-muted font-sans font-normal font-mono">/mo</span>
                        </>
                      )}
                    </span>
                  </div>

                  <Link
                    href={`/${service.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border-dark bg-[#141C2F]/80 text-text-light font-bold font-sans text-xs uppercase tracking-wider hover:bg-primary-cyan hover:text-bg-dark hover:border-primary-cyan hover:shadow-[0_0_20px_rgba(108,244,255,0.25)] group-hover:border-primary-cyan/45 transition-all duration-300 text-center"
                  >
                    Configure Server <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICE COMPARISON MATRIX */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider mb-4">
            Compare Hosting Tiers
          </h2>
          <p className="text-text-muted font-sans text-xs sm:text-sm max-w-xl mx-auto">
            Find the right allocation level based on your technical dependencies and control requirements.
          </p>
        </div>

        <div className="glass-panel border-border-dark/60 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#141C2F] border-b border-border-dark">
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold font-norwester text-white uppercase tracking-wider">Service</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold font-norwester text-white uppercase tracking-wider">CPU Power</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold font-norwester text-white uppercase tracking-wider">RAM Allocation</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold font-norwester text-white uppercase tracking-wider">Storage</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold font-norwester text-white uppercase tracking-wider">Access Scope</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold font-norwester text-white uppercase tracking-wider">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark/40 font-sans text-xs sm:text-sm">
                {services.map((item) => (
                  <tr key={item.id} className="hover:bg-[#141C2F]/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary-cyan flex-shrink-0" />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-text-muted">{item.specs.cpu}</td>
                    <td className="p-4 sm:p-5 text-text-muted">{item.specs.ram}</td>
                    <td className="p-4 sm:p-5 text-text-muted">{item.specs.storage}</td>
                    <td className="p-4 sm:p-5 text-text-muted font-mono text-xs">
                      {item.id === "vps" || item.id === "rdp" ? "Full Root / Administrator" : "Container Panel / API"}
                    </td>
                    <td className="p-4 sm:p-5 text-text-muted font-medium">{item.tagline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 z-10 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-dark bg-[#141C2F] text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Answered Questions
          </div>
          <h2 className="font-norwester text-2xl sm:text-4xl text-white uppercase tracking-wider">
            General Hosting FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = !!expandedFaqs[faq.id];
            return (
              <div
                key={faq.id}
                className="glass-panel border-border-dark/60 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-semibold text-text-light hover:text-primary-cyan transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? "transform rotate-180 text-primary-cyan" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] border-t border-border-dark/40" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
