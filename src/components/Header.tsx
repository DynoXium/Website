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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body and html scroll when mobile nav menu is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

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
          ? "top-0 sm:top-3 max-w-full sm:max-w-[95%] xl:max-w-6xl py-2 sm:py-1.5 px-4 sm:px-6 xl:px-8 bg-[#0B0F19]/95 sm:bg-[#0B0F19]/75 backdrop-blur-xl border-b sm:border border-primary-cyan/25 sm:rounded-2xl shadow-[0_12px_40px_-12px_rgba(108,244,255,0.25)] glow-cyan"
          : "top-0 max-w-full pt-5 pb-2 bg-transparent border border-transparent shadow-none"
          }`}
        style={{ WebkitBackdropFilter: scrolled ? "blur(24px)" : "none" }}
      >
        <div className={`w-full mx-auto transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-nav-inner ${scrolled ? "max-w-full px-0" : "max-w-[96%] xl:max-w-[1440px] px-4 sm:px-6 xl:px-8"}`}>
          <div className={`flex justify-between items-center transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "h-11" : "h-16"}`}>

            {/* Logo / Brand */}
            <Link
              href="/"
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0 transition-all duration-300"
            >
              <img
                src="/logo.png?v=2"
                alt="DynoXium Logo"
                className={`object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 animate-logo-zoom ${
                  scrolled ? "w-8 h-8 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-14 sm:h-14"
                }`}
              />
              <span className={`font-norwester tracking-wide text-white whitespace-nowrap transition-all duration-300 ${
                scrolled ? "text-base sm:text-2xl" : "text-lg sm:text-[1.8rem]"
              }`}>
                Dyno<span className="text-primary-cyan">X</span>ium
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center ml-auto mr-6 h-full relative">
              <nav className="flex flex-nowrap whitespace-nowrap items-center h-full gap-6 xl:gap-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isTools = item.name === "Tools";
                  return (
                    <div
                      key={item.name}
                      className="relative group py-4 cursor-pointer flex-shrink-0"
                    >
                      <Link
                        href={isTools ? "/tools" : "#"}
                        className="flex items-center gap-1.5 transition-all duration-300 text-[15.5px] font-extrabold select-none cursor-pointer [font-variant:small-caps] tracking-widest text-text-muted hover:text-text-light hover:scale-[1.02]"
                      >
                        <Icon className="h-4 w-4 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                        <span>{item.name.toLowerCase()}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-text-muted/60 group-hover:rotate-180 group-hover:text-primary-cyan transition-transform duration-300" />
                      </Link>

                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[#0E1321]/95 border border-[#2A3650]/80 rounded-xl p-3 shadow-2xl backdrop-blur-md transition-all duration-200 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 ${
                        isTools ? "w-[480px]" : "w-72"
                      }`}>
                        <div className={isTools ? "grid grid-cols-2 gap-1.5" : "flex flex-col gap-1.5"}>
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.path}
                              className="group/item relative flex flex-col py-2 px-3 rounded-lg bg-transparent hover:bg-primary-cyan/10 border border-transparent hover:border-primary-cyan/15 transition-all duration-200 text-left"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-text-light group-hover/item:text-primary-cyan transition-colors uppercase tracking-wide">
                                  {subItem.name}
                                </span>
                                {subItem.badge && (
                                  <span className="text-[8px] bg-success-teal/20 text-success-teal px-1.5 py-0.5 rounded font-bold uppercase border border-success-teal/30">
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-text-muted mt-1 leading-normal group-hover/item:text-text-muted/80">
                                {subItem.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
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
                className="flex items-center justify-center bg-[#2C3140] hover:bg-[#363C4F] text-text-light text-xs font-mono font-bold px-3 py-1.5 rounded-lg transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                {mounted ? (
                  <span className="transition-all duration-700">
                    {currency} ({currencyRates[currency].symbol})
                  </span>
                ) : (
                  <span className="transition-all duration-700">USD ($)</span>
                )}
              </button>

              {/* Command Center Link ("GO" + ArrowUpRight) */}
              <Link
                href="#"
                title="Command Center"
                className={`flex items-center gap-1 bg-[#3388FF] hover:bg-[#6CF4FF] text-white hover:text-[#0B0F19] font-black rounded-lg transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(108,244,255,0.3)] uppercase tracking-widest group/btn btn-hover-lift ${
                  scrolled ? "py-2 px-4 text-xs" : "py-2.5 px-6 text-sm"
                }`}
              >
                <span>go</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white group-hover/btn:text-[#0B0F19] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Toggle (Small screen view only) */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-muted hover:text-text-light p-2 focus:outline-none cursor-pointer"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`xl:hidden absolute left-0 w-full bg-[#0B0F19]/98 backdrop-blur-2xl transition-all duration-300 overflow-y-auto max-h-[85vh] ${scrolled 
            ? "top-full sm:top-[calc(100%+12px)] sm:rounded-2xl sm:border border-primary-cyan/30 shadow-2xl" 
            : "top-full border-b border-[#2A3650]/55"
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
                className="flex items-center justify-center w-full bg-[#161C2C]/50 border border-[#2A3650] hover:border-primary-cyan/40 text-text-light text-center font-mono font-bold py-3 rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                {mounted ? (
                  <span>
                    {currency} ({currencyRates[currency].symbol})
                  </span>
                ) : (
                  <span>USD ($)</span>
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

    </>
  );
}
