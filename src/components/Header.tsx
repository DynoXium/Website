"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Scale,
  ChevronDown,
  Cpu,
  Wrench,
  HelpCircle,
  Info,
  Terminal,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { useCurrency, currencyRates, Currency } from "@/context/CurrencyContext";
import PreferencesModal, { LANGUAGES } from "./PreferencesModal";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency, language } = useCurrency();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [radialOpen, setRadialOpen] = useState(false);
  const [radialCategory, setRadialCategory] = useState<string>("Services");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape key listener to close radial menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRadialOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body and html scroll when radial menu or mobile nav menu is open
  useEffect(() => {
    if (radialOpen || isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [radialOpen, isOpen]);

  // Mobile Accordion States
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    let currentlyScrolled = window.scrollY > 20;
    setScrolled(currentlyScrolled);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== currentlyScrolled) {
        currentlyScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  type NavItem = {
    name: string;
    icon: any;
    items: {
      name: string;
      path: string;
      desc: string;
      badge?: string;
    }[];
  };

  const navItems: NavItem[] = [
    {
      name: "Services",
      icon: Cpu,
      items: [
        { name: "VPS Hosting", path: "/vps", desc: "Dedicated root VPS with KVM cores" },
        { name: "RDP Hosting", path: "/rdp", desc: "High-performance remote desktops" },
        { name: "Web Hosting", path: "/web", desc: "Next-gen static & dynamic web edge" },
        { name: "GameServer", path: "/game", desc: "High-performance game servers" },
        { name: "Discord Bot", path: "/bot", desc: "Always online logs & runtime nodes" },
        { name: "Free Hosting", path: "/free", desc: "Get started for free" },
      ],
    },
    {
      name: "Tools",
      icon: Wrench,
      items: [
        { name: "MC Status", path: "/tools/mc-status", desc: "Check server status" },
        { name: "MOTD Maker", path: "/tools/motd", desc: "Create custom server MOTDs" },
        { name: "MC Skin", path: "/tools/skin", desc: "View and download skins" },
        { name: "Subdomain", path: "#", desc: "Manage your subdomains" },
        { name: "UUID", path: "/tools/uuid", desc: "Find player UUIDs" },
        { name: "Tick Calculator", path: "/tools/tick-calculator", desc: "Convert game ticks to real time" },
        { name: "Coordinate Calculator", path: "/tools/coordinate-calculator", desc: "Nether portal coordinate math" },
        { name: "Server Properties", path: "/tools/server-properties", desc: "Properties file generator" },
        { name: "NBT Editor", path: "/tools/nbt", desc: "Modify data structure files" },
        { name: "Whitelist Editor", path: "/tools/whitelist", desc: "Manage server white-lists" },
        { name: "Circle Generator", path: "/tools/circle", desc: "Pixel building templates" },
      ],
    },
    {
      name: "Support",
      icon: HelpCircle,
      items: [
        { name: "Knowledgebase", path: "/knowledgebase", desc: "Articles and guides" },
        { name: "FAQs", path: "/faq", desc: "Frequently asked questions" },
        { name: "Status", path: "#", desc: "Global node ping & status checks" },
        { name: "Create Ticket", path: "#", desc: "Reach our support architects" },
        { name: "Contact Us", path: "/contact", desc: "Get in touch with us" },
        { name: "Discord", path: "#", desc: "Join our community server" },
      ],
    },
    {
      name: "Company",
      icon: Info,
      items: [
        { name: "About Us", path: "/about", desc: "Learn more about DynoXium" },
        { name: "The Team", path: "/team", desc: "Meet the minds behind DynoXium" },
        { name: "Blogs", path: "/blog", desc: "Latest news and updates" },
        { name: "Partnership", path: "/partnership", desc: "Partner with us" },
        { name: "Infrastructure", path: "/infrastructure", desc: "Our global network and hardware" },
      ],
    },
    {
      name: "Legal",
      icon: Scale,
      items: [
        { name: "Terms of Service", path: "/terms", desc: "DynoXium TOS and legal agreements" },
        { name: "Privacy Policy", path: "/privacy", desc: "How we secure and process data" },
        { name: "Refund Policy", path: "/refund", desc: "TOS refund policies & billing agreements" },
        { name: "Acceptable Use Policy", path: "/aup", desc: "DynoXium Acceptable Use Policy (AUP)" },
      ],
    },
  ];

  const handleMobileMenuToggle = (menuName: string) => {
    setMobileActiveMenu(mobileActiveMenu === menuName ? null : menuName);
  };

  return (
    <>
      <header
        className={`fixed z-50 left-1/2 -translate-x-1/2 w-full transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? "top-3 max-w-[95%] xl:max-w-5xl py-1.5 px-4 sm:px-6 xl:px-8 bg-[#0B0F19]/75 backdrop-blur-xl border border-primary-cyan/25 rounded-2xl shadow-[0_12px_40px_-12px_rgba(108,244,255,0.25)] glow-cyan"
          : "top-0 max-w-full pt-5 pb-2 bg-transparent border border-transparent shadow-none"
          }`}
      >
        <div className={`w-full mx-auto transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-nav-inner ${scrolled ? "max-w-full px-0" : "max-w-[96%] xl:max-w-[1440px] px-4 sm:px-6 xl:px-8"}`}>
          <div className={`flex justify-between items-center transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "h-11" : "h-16"}`}>

            {/* Logo / Brand */}
            <Link
              href="/"
              onClick={() => {
                setIsOpen(false);
                setRadialOpen(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 group flex-shrink-0 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${scrolled ? "scale-[0.65]" : "scale-100"
                }`}
            >
              <img
                src="/logo.png?v=2"
                alt="DynoXium Logo"
                className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 w-12 h-12 sm:w-[68px] sm:h-[68px] animate-logo-zoom"
              />
              <span className="font-norwester tracking-wide sm:tracking-widest text-white text-lg sm:text-[1.95rem] whitespace-nowrap">
                Dyno<span className="text-primary-cyan">X</span>ium
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center ml-auto mr-4 h-full relative">
              {/* Nav items container - slides out and shrinks opacity on scroll */}
              <nav className={`flex flex-nowrap whitespace-nowrap items-center h-full transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
                  ? "translate-x-12 opacity-0 pointer-events-none max-w-0 gap-0 overflow-hidden"
                  : "translate-x-0 opacity-100 max-w-[800px] gap-10"
                }`}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = radialOpen && radialCategory === item.name;
                  return (
                    <div
                      key={item.name}
                      className="py-4 cursor-pointer flex-shrink-0"
                      onClick={() => {
                        if (item.name === "Tools") {
                          window.location.href = "/tools";
                          return;
                        }
                        if (radialOpen && radialCategory === item.name) {
                          setRadialOpen(false);
                        } else {
                          setRadialCategory(item.name);
                          setRadialOpen(true);
                        }
                      }}
                    >
                      <button className={`flex items-center gap-1.5 transition-all duration-300 text-[17px] font-bold select-none cursor-pointer [font-variant:small-caps] tracking-widest hover:scale-[1.03] ${isActive ? "text-primary-cyan" : "text-text-muted hover:text-text-light"}`}>
                        <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-primary-cyan" : "text-primary-cyan/40"}`} />
                        <span>{item.name.toLowerCase()}</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isActive ? "rotate-180 text-primary-cyan" : "text-text-muted/60"}`} />
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Desktop Right Actions & Dynamic Scroll Menu */}
            <div className="hidden xl:flex items-center h-full flex-shrink-0 relative transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gap-4">
              {/* Preferences Button */}
              <button
                onClick={() => setPreferencesOpen(true)}
                className="flex items-center gap-1.5 bg-[#2C3140] hover:bg-[#363C4F] text-text-light text-xs font-bold px-2.5 py-1.5 rounded-lg transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                {mounted ? (
                  <>
                    <img src={LANGUAGES.find(l => l.code === language)?.flag || LANGUAGES[1].flag} alt="Language" className="w-4.5 rounded-[2px]" />
                    <span className="transition-all duration-700">
                      {scrolled
                        ? `${currency} ${currencyRates[currency].symbol}`
                        : `${LANGUAGES.find(l => l.code === language)?.name || "English"} (${currency} ${currencyRates[currency].symbol})`
                      }
                    </span>
                  </>
                ) : (
                  <>
                    <img src={LANGUAGES[1].flag} alt="Language" className="w-4.5 rounded-[2px]" />
                    <span className="transition-all duration-700">English (USD $)</span>
                  </>
                )}
              </button>

              {/* Command Center Link ("GO" + ArrowUpRight) */}
              <Link
                href="#"
                title="Command Center"
                className="flex items-center gap-1 bg-[#3388FF] hover:bg-[#6CF4FF] text-white hover:text-[#0B0F19] text-[12px] font-black px-4 py-2.5 rounded-lg transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(108,244,255,0.3)] uppercase tracking-widest group/btn btn-hover-lift"
              >
                <span>go</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white group-hover/btn:text-[#0B0F19] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
              </Link>

              {/* Scroll Hamburger Menu Trigger (Slides in seamlessly) */}
              <div className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ${scrolled
                  ? "max-w-[100px] opacity-100 scale-100 pointer-events-auto"
                  : "max-w-0 opacity-0 scale-75 overflow-hidden pointer-events-none"
                }`}>
                <button
                  onClick={() => {
                    if (radialOpen) {
                      setRadialOpen(false);
                    } else {
                      setRadialCategory("Services");
                      setRadialOpen(true);
                    }
                  }}
                  className={`p-2 focus:outline-none cursor-pointer border rounded-lg transition-all ${radialOpen
                      ? "text-primary-cyan border-primary-cyan bg-primary-cyan/10"
                      : "text-text-muted hover:text-text-light border-[#2A3650]/55 hover:border-primary-cyan/40 bg-[#0B0F19]/50"
                    }`}
                >
                  {radialOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle (Small screen view only) */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-muted hover:text-text-light p-1.5 focus:outline-none cursor-pointer"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`xl:hidden absolute left-0 w-full bg-[#0B0F19]/98 backdrop-blur-2xl transition-all duration-300 overflow-y-auto max-h-[85vh] ${scrolled ? "top-[calc(100%+12px)] rounded-2xl border border-primary-cyan/30 shadow-2xl" : "top-full border-b border-[#2A3650]/55"
            } ${isOpen ? "opacity-100 py-6 visible" : "opacity-0 invisible h-0"}`}
        >
          <div className="px-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isMenuExpanded = mobileActiveMenu === item.name;
              return (
                <div key={item.name} className="border-b border-[#2A3650]/20 pb-2">
                  <button
                    onClick={() => handleMobileMenuToggle(item.name)}
                    className="flex justify-between items-center w-full py-2.5 text-base font-semibold text-text-light text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary-cyan" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-text-muted transition-transform duration-300 ${isMenuExpanded ? "rotate-180 text-primary-cyan" : ""}`} />
                  </button>

                  {/* Collapsible content */}
                  <div className={`transition-all duration-300 overflow-hidden space-y-2 mt-1 ${isMenuExpanded ? "max-h-96 opacity-100 py-2 pl-8" : "max-h-0 opacity-0"}`}>
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-sm text-[#E2E8F0] hover:text-primary-cyan transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{subItem.name}</span>
                          {subItem.badge && (
                            <span className="text-[8px] bg-primary-cyan/20 text-primary-cyan px-1 rounded uppercase font-bold">
                              {subItem.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-text-muted block mt-0.5">{subItem.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Mobile Actions */}
            <div className="pt-4 flex flex-col gap-3">
              {/* Preferences / Currency Trigger */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setPreferencesOpen(true);
                }}
                className="flex items-center justify-center gap-2.5 w-full bg-[#161C2C]/50 border border-[#2A3650] hover:border-primary-cyan/40 text-text-light text-center font-bold py-3 rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                {mounted ? (
                  <>
                    <img src={LANGUAGES.find(l => l.code === language)?.flag || LANGUAGES[1].flag} alt="Language" className="w-5 rounded-[2px]" />
                    <span>{LANGUAGES.find(l => l.code === language)?.name || "English"} ({currency} {currencyRates[currency].symbol})</span>
                  </>
                ) : (
                  <>
                    <img src={LANGUAGES[1].flag} alt="Language" className="w-5 rounded-[2px]" />
                    <span>English (USD $)</span>
                  </>
                )}
              </button>

              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#1C2640] border border-[#2A3650] hover:border-primary-cyan/40 hover:glow-cyan text-white text-center font-bold py-3 rounded-lg shadow-md transition-all active:scale-[0.98]"
              >
                <Terminal className="h-4 w-4 text-primary-cyan" />
                <span>Command Center</span>
              </Link>
            </div>
          </div>
        </div>
        <PreferencesModal isOpen={preferencesOpen} onClose={() => setPreferencesOpen(false)} />
      </header>

      {/* Radial / Orbital Command Menu (Option 4) */}
      {(() => {
        if (!radialOpen) return null;

        const radialCoords = [
          { name: "Services", x: 200, y: 75 },   // Services (Top)
          { name: "Tools", x: 318, y: 161 },   // Tools (Top-Right)
          { name: "Support", x: 273, y: 301 }, // Support (Bottom-Right)
          { name: "Company", x: 126, y: 301 }, // Company (Bottom-Left)
          { name: "Legal", x: 81, y: 161 },    // Legal (Top-Left)
        ];

        const activeItem = navItems.find(n => n.name === radialCategory);

        return (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 transition-opacity duration-300"
              onClick={() => setRadialOpen(false)}
            />

            {/* HUD Central Wrapper */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col md:flex-row items-center justify-center gap-12 select-none">

              {/* Radial Dial Wheel (400px x 400px) */}
              <div className="relative w-[400px] h-[400px] flex-shrink-0">
                {/* Subtle concentric rings (static) */}
                <div className="absolute inset-0 rounded-full border border-primary-cyan/10 pointer-events-none" />
                <div className="absolute inset-10 rounded-full border border-[#2A3650]/30 pointer-events-none" />
                <div className="absolute inset-20 rounded-full border border-primary-cyan/8 pointer-events-none" />

                {/* Center Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-[#070B14] border border-primary-cyan/50 rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(108,244,255,0.12)] z-10 p-3">
                  {(() => {
                    const matched = navItems.find(n => n.name === radialCategory);
                    const CatIcon = matched ? matched.icon : Cpu;
                    return <CatIcon className="h-6 w-6 text-primary-cyan mb-1" />;
                  })()}
                  <span className="text-[11px] font-norwester text-white uppercase tracking-wider leading-none">
                    {radialCategory}
                  </span>
                </div>

                {/* Category Node Buttons */}
                {radialCoords.map((coord) => {
                  const matched = navItems.find(n => n.name === coord.name);
                  const Icon = matched ? matched.icon : Cpu;
                  const isActive = radialCategory === coord.name;
                  return (
                    <button
                      key={coord.name}
                      onMouseEnter={() => setRadialCategory(coord.name)}
                      onClick={() => setRadialCategory(coord.name)}
                      style={{
                        position: "absolute",
                        left: `${coord.x}px`,
                        top: `${coord.y}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 border font-mono select-none cursor-pointer ${isActive
                          ? "bg-primary-cyan/10 border-primary-cyan text-primary-cyan shadow-[0_0_15px_rgba(108,244,255,0.35)] scale-110"
                          : "bg-[#070B14]/90 border-[#2A3650]/50 text-text-muted hover:border-primary-cyan/60 hover:text-white hover:scale-105"
                        }`}
                    >
                      <Icon className="h-5 w-5 mb-0.5" />
                      <span className="text-[7.5px] font-bold uppercase tracking-tighter">
                        {coord.name.slice(0, 4)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sub items display box */}
              {activeItem && (
                <div className="relative w-[340px] bg-[#070B14]/95 backdrop-blur-xl border border-[#2A3650]/60 rounded-2xl p-5 shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex flex-col gap-4">



                  <div className="flex justify-between items-center border-b border-[#2A3650]/40 pb-2">
                    <div className="flex items-center gap-1.5">
                      {(() => {
                        const Icon = activeItem.icon;
                        return <Icon className="h-4.5 w-4.5 text-primary-cyan" />;
                      })()}
                      <span className="text-sm font-sans font-black text-white uppercase tracking-wider">
                        {activeItem.name} MODULES
                      </span>
                    </div>
                    <button
                      onClick={() => setRadialOpen(false)}
                      className="text-text-muted hover:text-white p-1 rounded-md hover:bg-[#2A3650]/40 transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Links layout */}
                  <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                    {activeItem.items.map((subItem) => {
                      const isSubActive = pathname === subItem.path && (pathname !== "/web" || subItem.name === "Web Hosting");
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          onClick={() => setRadialOpen(false)}
                          className={`group/item relative flex flex-col py-2 px-3 rounded-xl transition-all text-left border overflow-hidden ${isSubActive
                              ? "bg-primary-cyan/10 border-primary-cyan/30 text-primary-cyan shadow-[0_0_12px_rgba(108,244,255,0.08)]"
                              : "bg-[#111827]/40 border-[#2A3650]/20 hover:bg-[#161C2C]/70 hover:border-primary-cyan/15 hover:shadow-[0_0_12px_rgba(108,244,255,0.05)]"
                            }`}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-cyan scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center rounded" />
                          <div className="flex justify-between items-center pl-1.5">
                            <span className="text-xs font-bold text-text-light group-hover/item:text-primary-cyan transition-colors uppercase tracking-wide">
                              {subItem.name}
                            </span>
                            {subItem.badge ? (
                              <span className="text-[7.5px] font-extrabold px-1.5 py-0.2 rounded bg-success-teal/20 text-success-teal border border-success-teal/30">
                                {subItem.badge}
                              </span>
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5 text-primary-cyan opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                            )}
                          </div>
                          <span className="text-[9.5px] text-text-muted mt-1 font-mono leading-normal pl-1.5 group-hover/item:text-text-muted/80">
                            {subItem.desc}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-text-muted/60 border-t border-[#2A3650]/35 pt-2 select-none">
                    <span>{activeItem.items.length} items</span>
                    <span className="text-primary-cyan/50">ESC to close</span>
                  </div>

                </div>
              )}

            </div>
          </>
        );
      })()}
    </>
  );
}

