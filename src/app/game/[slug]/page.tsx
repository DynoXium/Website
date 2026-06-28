"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Check,
  Shield,
  Cpu,
  Layers,
  ArrowUpRight,
  Server,
  Zap,
  Globe,
  LifeBuoy,
  MessageSquare,
  HelpCircle,
  Ticket,
  ChevronDown,
  RefreshCw,
  Terminal,
  Activity,
  Headphones,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import GlobalPresence from "@/components/GlobalPresence";

interface PresetPlan {
  name: string;
  priceMonthly: number;
  ram: string;
  vcpu: string;
  storage: string;
  backup: string;
  ports?: string;
}

interface GameConfig {
  name: string;
  heroSubtitle: string;
  faqName: string;
  plans: PresetPlan[];
}

const gameConfigs: Record<string, GameConfig> = {
  minecraft: {
    name: "Minecraft",
    heroSubtitle: "High-Frequency Minecraft Server Hosting. Powered by high-speed CPU clock rates.",
    faqName: "Minecraft",
    plans: [
      { name: "Starter", priceMonthly: 1.70, ram: "4 GB", vcpu: "100% CPU", storage: "10 GB NVMe", backup: "2 Backup Slot", ports: "2 Ports" },
      { name: "Basic", priceMonthly: 2.20, ram: "5 GB", vcpu: "200% CPU", storage: "20 GB NVMe", backup: "3 Backup Slot", ports: "3 Ports" },
      { name: "SMP", priceMonthly: 3.40, ram: "8 GB", vcpu: "300% CPU", storage: "35 GB NVMe", backup: "5 Backup Slot", ports: "4 Ports" },
      { name: "Advanced", priceMonthly: 4.30, ram: "10 GB", vcpu: "350% CPU", storage: "50 GB NVMe", backup: "6 Backup Slot", ports: "5 Ports" },
      { name: "DynoX Pro", priceMonthly: 5.10, ram: "12 GB", vcpu: "400% CPU", storage: "70 GB NVMe", backup: "7 Backup Slot", ports: "6 Ports" },
      { name: "Premium", priceMonthly: 6.80, ram: "16 GB", vcpu: "500% CPU", storage: "100 GB NVMe", backup: "8 Backup Slot", ports: "8 Ports" },
      { name: "Enterprise", priceMonthly: 8.50, ram: "20 GB", vcpu: "600% CPU", storage: "200 GB NVMe", backup: "10 Backup Slot", ports: "12 Ports" },
      { name: "Ultimate", priceMonthly: 10.20, ram: "24 GB", vcpu: "800% CPU", storage: "250 GB NVMe", backup: "12 Backup Slot", ports: "16 Ports" },
    ],
  },
  rust: {
    name: "Rust",
    heroSubtitle: "Extreme Performance Rust Server Hosting. Handle massive entity configurations without lag.",
    faqName: "Rust",
    plans: [
      { name: "Starter", priceMonthly: 381.16, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "50 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 571.74, ram: "12 GB", vcpu: "4 vCPU Threads", storage: "80 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 762.32, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "100 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 952.90, ram: "20 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 1334.06, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 1715.22, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2382.25, ram: "48 GB", vcpu: "10 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 2858.70, ram: "64 GB", vcpu: "12 vCPU Threads", storage: "300 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  fivem: {
    name: "FiveM",
    heroSubtitle: "Deploy customized FiveM roleplay servers instantly. Built for TxAdmin configurations.",
    faqName: "FiveM",
    plans: [
      { name: "Starter", priceMonthly: 476.45, ram: "6 GB", vcpu: "4 vCPU Threads", storage: "40 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 667.03, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "60 GB NVMe", backup: "1 Backup Slot" },
      { name: "SMP", priceMonthly: 952.90, ram: "12 GB", vcpu: "6 vCPU Threads", storage: "90 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 1334.06, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 1715.22, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 2096.38, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2668.12, ram: "48 GB", vcpu: "10 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 3239.86, ram: "64 GB", vcpu: "12 vCPU Threads", storage: "300 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  ark: {
    name: "ARK: Survival Evolved",
    heroSubtitle: "Scale up your ARK server dynamically. Perfect performance for massive multiplayer maps.",
    faqName: "ARK",
    plans: [
      { name: "Starter", priceMonthly: 571.74, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "40 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 762.32, ram: "12 GB", vcpu: "4 vCPU Threads", storage: "60 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 952.90, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "95 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 1334.06, ram: "20 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 1715.22, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 2096.38, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2668.12, ram: "48 GB", vcpu: "10 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 3239.86, ram: "64 GB", vcpu: "12 vCPU Threads", storage: "300 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  terraria: {
    name: "Terraria",
    heroSubtitle: "Lightning-fast Terraria servers. Explore, build, and fight with zero lag.",
    faqName: "Terraria",
    plans: [
      { name: "Starter", priceMonthly: 190.58, ram: "4 GB", vcpu: "2 vCPU Threads", storage: "10 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 381.16, ram: "6 GB", vcpu: "3 vCPU Threads", storage: "20 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 571.74, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "35 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 762.32, ram: "10 GB", vcpu: "4 vCPU Threads", storage: "50 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 952.90, ram: "12 GB", vcpu: "6 vCPU Threads", storage: "70 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 1334.06, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "100 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2096.38, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 2382.25, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  valheim: {
    name: "Valheim",
    heroSubtitle: "Host your custom Valheim servers. High-frequency compute cores for massive bases.",
    faqName: "Valheim",
    plans: [
      { name: "Starter", priceMonthly: 381.16, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "50 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 571.74, ram: "12 GB", vcpu: "4 vCPU Threads", storage: "80 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 762.32, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "100 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 952.90, ram: "20 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 1334.06, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 1715.22, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2382.25, ram: "48 GB", vcpu: "10 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 2858.70, ram: "64 GB", vcpu: "12 vCPU Threads", storage: "300 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  palworld: {
    name: "Palworld",
    heroSubtitle: "Premium Palworld servers with automated setups. Run your server 24/7 with zero lag.",
    faqName: "Palworld",
    plans: [
      { name: "Starter", priceMonthly: 476.45, ram: "6 GB", vcpu: "4 vCPU Threads", storage: "40 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 667.03, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "60 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 952.90, ram: "12 GB", vcpu: "6 vCPU Threads", storage: "90 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 1334.06, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 1715.22, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 2096.38, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2668.12, ram: "48 GB", vcpu: "10 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 3239.86, ram: "64 GB", vcpu: "12 vCPU Threads", storage: "300 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  cs2: {
    name: "Counter-Strike 2",
    heroSubtitle: "Lag-free CS2 server hosting. Low tickrate jitter, optimal network routes, instant configuration.",
    faqName: "Counter-Strike 2",
    plans: [
      { name: "Starter", priceMonthly: 381.16, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "50 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 571.74, ram: "12 GB", vcpu: "4 vCPU Threads", storage: "80 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 762.32, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "100 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 952.90, ram: "20 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 1334.06, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 1715.22, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2382.25, ram: "48 GB", vcpu: "10 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 2858.70, ram: "64 GB", vcpu: "12 vCPU Threads", storage: "300 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
  hytale: {
    name: "Hytale",
    heroSubtitle: "Next-gen Hytale hosting services. Custom game controls and low-latency servers.",
    faqName: "Hytale",
    plans: [
      { name: "Starter", priceMonthly: 190.58, ram: "4 GB", vcpu: "2 vCPU Threads", storage: "10 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 381.16, ram: "6 GB", vcpu: "3 vCPU Threads", storage: "20 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 571.74, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "35 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 762.32, ram: "10 GB", vcpu: "4 vCPU Threads", storage: "50 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 952.90, ram: "12 GB", vcpu: "6 vCPU Threads", storage: "70 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 1334.06, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "100 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2096.38, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 2382.25, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
    ],
  },
};

const renderMinecraftBlock = (planName: string) => {
  const name = planName.toLowerCase();
  let top = "#55b848";
  let left = "#866043";
  let right = "#5c3e29";
  let shadow = "rgba(85, 184, 72, 0.4)";

  if (name === "starter") {
    // Grass/Dirt
    top = "#55b848";
    left = "#866043";
    right = "#5c3e29";
    shadow = "rgba(85, 184, 72, 0.4)";
  } else if (name === "basic") {
    // Stone / Coal
    top = "#a0a0a0";
    left = "#808080";
    right = "#606060";
    shadow = "rgba(128, 128, 128, 0.4)";
  } else if (name === "standard") {
    // Iron
    top = "#e6e6e6";
    left = "#d1d1d1";
    right = "#b0b0b0";
    shadow = "rgba(230, 230, 230, 0.4)";
  } else if (name === "smp") {
    // Copper
    top = "#d86f45";
    left = "#bc5a32";
    right = "#9a4421";
    shadow = "rgba(216, 111, 69, 0.4)";
  } else if (name === "advanced") {
    // Gold
    top = "#fcee4b";
    left = "#f6c323";
    right = "#d49b0d";
    shadow = "rgba(252, 238, 75, 0.4)";
  } else if (name === "professional" || name.includes("pro")) {
    // Diamond
    top = "#9cf8f0";
    left = "#5ce7db";
    right = "#2cbab0";
    shadow = "rgba(92, 231, 219, 0.4)";
  } else if (name === "premium") {
    // Emerald
    top = "#5df089";
    left = "#17cc53";
    right = "#0ca13d";
    shadow = "rgba(23, 204, 83, 0.4)";
  } else if (name === "enterprise") {
    // Obsidian
    top = "#3c3056";
    left = "#261d3b";
    right = "#151024";
    shadow = "rgba(60, 48, 86, 0.4)";
  } else if (name === "ultimate") {
    // Netherite
    top = "#4c4748";
    left = "#3c3738";
    right = "#2c2728";
    shadow = "rgba(76, 71, 72, 0.4)";
  }

  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 transition-all duration-300 group-hover:scale-110" style={{ filter: `drop-shadow(0 0 4px ${shadow})` }}>
      {/* Top face */}
      <path d="M 12 4 L 20 8 L 12 12 L 4 8 Z" fill={top} />
      {/* Left face */}
      <path d="M 4 8 L 12 12 L 12 20 L 4 16 Z" fill={left} />
      {/* Right face */}
      <path d="M 12 12 L 20 8 L 20 16 L 12 20 Z" fill={right} />
    </svg>
  );
};

export default function GameDetails() {
  const { slug } = useParams() as { slug: string };
  const { formatPrice } = useCurrency();
  const lowerSlug = (slug || "").toLowerCase();

  // Load configuration with fallback
  const config = gameConfigs[lowerSlug] || {
    name: slug ? slug.toUpperCase() : "GAME",
    heroSubtitle: `Premium ${slug || "Game"} Server Hosting. Low latency network routing, NVMe SSD storage, and DDoS protection.`,
    faqName: slug ? slug.toUpperCase() : "Game",
    plans: [
      { name: "Starter", priceMonthly: 190.58, ram: "4 GB", vcpu: "2 vCPU Threads", storage: "30 GB NVMe", backup: "1 Backup Slot" },
      { name: "Basic", priceMonthly: 381.16, ram: "6 GB", vcpu: "3 vCPU Threads", storage: "50 GB NVMe", backup: "1 Backup Slot" },
      { name: "Standard", priceMonthly: 571.74, ram: "8 GB", vcpu: "4 vCPU Threads", storage: "80 GB NVMe", backup: "1 Backup Slot" },
      { name: "Advanced", priceMonthly: 762.32, ram: "10 GB", vcpu: "4 vCPU Threads", storage: "100 GB NVMe", backup: "1 Backup Slot" },
      { name: "Professional", priceMonthly: 952.90, ram: "12 GB", vcpu: "6 vCPU Threads", storage: "120 GB NVMe", backup: "1 Backup Slot" },
      { name: "Premium", priceMonthly: 1334.06, ram: "16 GB", vcpu: "6 vCPU Threads", storage: "150 GB NVMe", backup: "1 Backup Slot" },
      { name: "Enterprise", priceMonthly: 2096.38, ram: "24 GB", vcpu: "8 vCPU Threads", storage: "200 GB NVMe", backup: "1 Backup Slot" },
      { name: "Ultimate", priceMonthly: 2382.25, ram: "32 GB", vcpu: "8 vCPU Threads", storage: "250 GB NVMe", backup: "1 Backup Slot" },
    ],
  };

  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});
  const [ramCalculatorVal, setRamCalculatorVal] = useState<number>(4);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Game specific styling configurations
  const getGameTheme = (gameSlug: string) => {
    const defaultTheme = {
      accentColorHex: "#6cf4ff",
      accentText: "text-primary-cyan",
      accentBg: "bg-primary-cyan/10",
      accentBorder: "border-primary-cyan/20",
      accentGlow: "shadow-[0_0_20px_rgba(108,244,255,0.15)]",
      cardHover: "hover:border-primary-cyan/45 hover:shadow-[0_0_25px_rgba(108,244,255,0.06)]",
      cornerBorderHover: "group-hover:border-primary-cyan/40",
      buttonClass: "bg-primary-cyan text-black border-primary-cyan hover:text-primary-cyan shadow-[0_0_15px_rgba(108,244,255,0.1)]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
    };

    const themes: Record<string, typeof defaultTheme> = {
      minecraft: {
        accentColorHex: "#34d399",
        accentText: "text-emerald-400",
        accentBg: "bg-emerald-500/10",
        accentBorder: "border-emerald-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
        cardHover: "hover:border-emerald-500/45 hover:shadow-[0_0_25px_rgba(52,211,153,0.06)]",
        cornerBorderHover: "group-hover:border-emerald-500/40",
        buttonClass: "bg-emerald-500 text-black border-emerald-500 hover:text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" fillOpacity="0.2" />
            <path d="M2 7v10l10 5V12L2 7z" fill="currentColor" fillOpacity="0.1" />
            <path d="M22 7v10l-10 5V12l10-5z" fill="currentColor" fillOpacity="0.15" />
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 7v10l10 5v-10L2 7zm20 0v10l-10 5v-10l10-5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      rust: {
        accentColorHex: "#ef4444",
        accentText: "text-red-500",
        accentBg: "bg-red-500/10",
        accentBorder: "border-red-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
        cardHover: "hover:border-red-500/45 hover:shadow-[0_0_25px_rgba(239,68,68,0.06)]",
        cornerBorderHover: "group-hover:border-red-500/40",
        buttonClass: "bg-red-600 text-white border-red-600 hover:text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 13v1h2v-3H8.21c.8-1.78 2.51-3 4.54-3.21V6h2v1.79c2.03.21 3.74 1.43 4.54 3.21H15v3h2v-1l2.79-2.79c.13.58.21 1.17.21 1.79 0 4.08-3.05 7.44-7 7.93z" />
          </svg>
        ),
      },
      fivem: {
        accentColorHex: "#f97316",
        accentText: "text-orange-500",
        accentBg: "bg-orange-500/10",
        accentBorder: "border-orange-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
        cardHover: "hover:border-orange-500/45 hover:shadow-[0_0_25px_rgba(249,115,22,0.06)]",
        cornerBorderHover: "group-hover:border-orange-500/40",
        buttonClass: "bg-orange-500 text-black border-orange-500 hover:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.16 3H15.6l-3.6 8.4-3.6-8.4H4.84l5.4 12.6V21h3.6v-5.4z" />
          </svg>
        ),
      },
      ark: {
        accentColorHex: "#06b6d4",
        accentText: "text-cyan-400",
        accentBg: "bg-cyan-500/10",
        accentBorder: "border-cyan-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
        cardHover: "hover:border-cyan-500/45 hover:shadow-[0_0_25px_rgba(6,182,212,0.06)]",
        cornerBorderHover: "group-hover:border-cyan-500/40",
        buttonClass: "bg-cyan-500 text-black border-cyan-500 hover:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 19h4.5l2-3.5h7l2 3.5H22L12 2zm0 5.25L17.25 14H6.75L12 7.25zM12 9.5L9.5 13.5h5L12 9.5z" />
          </svg>
        ),
      },
      terraria: {
        accentColorHex: "#22c55e",
        accentText: "text-green-500",
        accentBg: "bg-green-500/10",
        accentBorder: "border-green-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
        cardHover: "hover:border-green-500/45 hover:shadow-[0_0_25px_rgba(34,197,94,0.06)]",
        cornerBorderHover: "group-hover:border-green-500/40",
        buttonClass: "bg-green-600 text-white border-green-600 hover:text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22V10M12 10C10.5 7.5 9 7 9 5c0-1.5 1.5-3 3-3s3 1.5 3 3c0 2-1.5 2.5-3 5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 13.5h8M10 16.5h4" strokeLinecap="round" />
          </svg>
        ),
      },
      valheim: {
        accentColorHex: "#0ea5e9",
        accentText: "text-sky-500",
        accentBg: "bg-sky-500/10",
        accentBorder: "border-sky-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(14,165,233,0.15)]",
        cardHover: "hover:border-sky-500/45 hover:shadow-[0_0_25px_rgba(14,165,233,0.06)]",
        cornerBorderHover: "group-hover:border-sky-500/40",
        buttonClass: "bg-sky-500 text-black border-sky-500 hover:text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v18M3 12h18" strokeLinecap="round" />
          </svg>
        ),
      },
      palworld: {
        accentColorHex: "#eab308",
        accentText: "text-yellow-400",
        accentBg: "bg-yellow-500/10",
        accentBorder: "border-yellow-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
        cardHover: "hover:border-yellow-500/45 hover:shadow-[0_0_25px_rgba(234,179,8,0.06)]",
        cornerBorderHover: "group-hover:border-yellow-500/40",
        buttonClass: "bg-yellow-500 text-black border-yellow-500 hover:text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 010 18" />
            <path d="M3 12h18" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        ),
      },
      cs2: {
        accentColorHex: "#f97316",
        accentText: "text-orange-500",
        accentBg: "bg-orange-500/10",
        accentBorder: "border-orange-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
        cardHover: "hover:border-orange-500/45 hover:shadow-[0_0_25px_rgba(249,115,22,0.06)]",
        cornerBorderHover: "group-hover:border-orange-500/40",
        buttonClass: "bg-orange-500 text-black border-orange-500 hover:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
          </svg>
        ),
      },
      hytale: {
        accentColorHex: "#a855f7",
        accentText: "text-purple-400",
        accentBg: "bg-purple-500/10",
        accentBorder: "border-purple-500/20",
        accentGlow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
        cardHover: "hover:border-purple-500/45 hover:shadow-[0_0_25px_rgba(168,85,247,0.06)]",
        cornerBorderHover: "group-hover:border-purple-500/40",
        buttonClass: "bg-purple-500 text-black border-purple-500 hover:text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 4v16M18 4v16M6 12h12M12 4l6 4M12 20l-6-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    };

    return themes[gameSlug] || defaultTheme;
  };

  const theme = getGameTheme(lowerSlug);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[100px]" style={{ backgroundColor: theme.accentColorHex, opacity: 0.05 }} />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: theme.accentColorHex, opacity: 0.03 }} />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto z-10 reveal-up">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold uppercase mb-8 tracking-widest ${theme.accentText} ${theme.accentBorder} reveal-up delay-75`} style={{ boxShadow: `0 0 15px ${theme.accentColorHex}20` }}>
          {config.name} Hosting Nodes
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          {config.name} <span className={theme.accentText} style={{ filter: `drop-shadow(0 0 30px ${theme.accentColorHex}40)` }}>Server Hosting</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          {config.heroSubtitle}
        </p>
      </section>

      {/* PLANS SELECTION SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <span className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest ${theme.accentText}`}>
            PLANS FOR SERVERS OF ALL SHAPES AND SIZES
          </span>
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Choose the perfect plan for your community
          </h2>
        </div>

        {/* DYNAMIC PRICE CALCULATOR (Only for Minecraft) */}
        {config.name === "Minecraft" && (
          <div className="max-w-3xl mx-auto reveal-up delay-100">
            <div className="bg-[#0E1321]/50 border border-primary-cyan/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(108,244,255,0.05)]">
              {/* Tech corner accent brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary-cyan/40" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary-cyan/40" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary-cyan/40" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary-cyan/40" />

              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="font-norwester text-lg sm:text-2xl text-white uppercase tracking-wider">
                    Minecraft Server <span className="text-primary-cyan drop-shadow-[0_0_15px_rgba(108,244,255,0.2)]">Price Calculator</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-text-muted">
                    Configure custom RAM to calculate pricing instantly (Rate: ₹40 per GB of RAM)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
                  {/* Input Control */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-text-light">
                      <span>RAM AMOUNT:</span>
                      <span className="text-primary-cyan">{ramCalculatorVal} GB</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="64"
                      step="1"
                      value={ramCalculatorVal}
                      onChange={(e) => setRamCalculatorVal(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-[#1E2638] rounded-lg appearance-none cursor-pointer accent-primary-cyan"
                    />
                    <div className="flex justify-between text-[10px] text-text-muted font-mono">
                      <span>2 GB</span>
                      <span>16 GB</span>
                      <span>32 GB</span>
                      <span>48 GB</span>
                      <span>64 GB</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-[10px] text-text-muted font-mono uppercase">Or Enter RAM:</span>
                      <input
                        type="number"
                        min="2"
                        max="128"
                        value={ramCalculatorVal}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setRamCalculatorVal(isNaN(val) ? 2 : Math.max(2, val));
                        }}
                        className="w-20 px-2 py-1 bg-[#0E1321]/80 border border-[#2A3650] rounded text-white text-xs font-mono font-bold focus:outline-none focus:border-primary-cyan/50"
                      />
                      <span className="text-xs text-text-muted font-mono font-bold">GB</span>
                    </div>
                  </div>

                  {/* Pricing result */}
                  <div className="bg-[#070A13] border border-[#2A3650]/40 rounded-2xl p-6 text-center space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        Estimated Cost
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-success-teal font-display">
                        {formatPrice((ramCalculatorVal * 40) / 94.4)}
                      </div>
                      <span className="text-[9px] text-text-muted uppercase font-mono tracking-wider block">
                        / month
                      </span>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-primary-cyan text-black hover:bg-transparent hover:text-primary-cyan border border-primary-cyan font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(108,244,255,0.1)]">
                      Order Custom Server
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4 reveal-up delay-150">
          {config.plans.map((plan, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl border bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 ${theme.cardHover}`}
            >
              {/* Tech corner accent brackets */}
              <div className={`absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />
              <div className={`absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />
              <div className={`absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />
              <div className={`absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 transition-colors ${theme.cornerBorderHover}`} />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
                      {config.name} Server
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all ${config.name === "Minecraft"
                    ? "bg-transparent border-[#2A3650]/60"
                    : `${theme.accentBg} ${theme.accentBorder} ${theme.accentText} ${theme.accentGlow}`
                    }`}>
                    {config.name === "Minecraft" ? renderMinecraftBlock(plan.name) : theme.icon}
                  </div>
                </div>

                {/* Price Display */}
                <div className="py-2 border-y border-[#2A3650]/40 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-success-teal font-display">
                    {formatPrice(plan.priceMonthly)}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase font-mono">/ month</span>
                </div>

                {/* Specs List */}
                <ul className="space-y-2.5 text-xs text-text-light font-sans font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>CPU: <span className="text-white font-bold">{plan.vcpu}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>RAM: <span className="text-white font-bold">{plan.ram}{config.name !== "Minecraft" && " Dedicated"}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Storage: <span className="text-white font-bold">{plan.storage}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Backup Limit: <span className="text-white font-bold">{plan.backup}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Port Settings: <span className="text-white font-bold">{plan.ports || (config.name === "Minecraft" ? "1 Port" : "1 Dedicated Port")}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span>Panel: <span className="text-white font-bold">Premium Game Panel</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success-teal flex-shrink-0" />
                    <span className="text-white font-bold">Advanced DDoS Protection</span>
                  </li>
                </ul>
              </div>

              {/* Order button */}
              <button className={`w-full py-2.5 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer ${theme.buttonClass}`}>
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
          <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
            Cutting-Edge <span className={theme.accentText} style={{ filter: `drop-shadow(0 0 20px ${theme.accentColorHex}30)` }}>Features</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
            Discover unparalleled server performance and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-up delay-150">
          {[
            { title: "Quick Deployment", desc: "Our automated provisioning system deploys your server shortly after payment confirmation, getting you online as quickly as possible.", icon: Zap, color: "blue" },
            { title: "DDoS Protection", desc: "Powered by trusted infrastructure with advanced DDoS mitigation to help protect your services from network attacks and unexpected traffic spikes.", icon: Shield, color: "green" },
            { title: "Reliable Uptime", desc: "Built on trusted infrastructure designed for stability and dependable performance, helping keep your services available whenever you need them.", icon: Activity, color: "amber" },
            { title: "Responsive Support", desc: "Our support team is here to help whenever you need assistance, providing friendly and reliable support for your hosting services.", icon: Headphones, color: "purple" },
            { title: "Powerful Hardware", desc: "Powered by modern AMD EPYC™ processors and high-speed NVMe SSD storage, delivering fast performance for games, websites, and applications.", icon: Cpu, color: "red" },
            { title: "Global Locations", desc: "Launch your infrastructure from premium locations worldwide. Experience low latency, reliable connectivity, and enterprise-grade performance wherever your users are.", icon: Globe, color: "teal" },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            const col = feat.color;
            let borderStyle = `hover:border-${theme.accentColorHex}/40 hover:shadow-[0_0_20px_rgba(108,244,255,0.05)]`;
            let iconStyle = `${theme.accentBg} ${theme.accentBorder} ${theme.accentText}`;

            if (col === "green") {
              borderStyle = "hover:border-success-teal/40 hover:shadow-[0_0_20px_rgba(0,229,163,0.05)]";
              iconStyle = "bg-success-teal/10 border-success-teal/20 text-success-teal";
            } else if (col === "purple") {
              borderStyle = "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]";
              iconStyle = "bg-purple-500/10 border-purple-500/20 text-purple-400";
            } else if (col === "amber") {
              borderStyle = "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)]";
              iconStyle = "bg-amber-500/10 border-amber-500/20 text-amber-400";
            } else if (col === "red") {
              borderStyle = "hover:border-[#EF4444]/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.05)]";
              iconStyle = "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]";
            } else if (col === "teal") {
              borderStyle = "hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.05)]";
              iconStyle = "bg-teal-500/10 border-teal-500/20 text-teal-400";
            } else if (col === "blue") {
              borderStyle = "hover:border-[#3388FF]/40 hover:shadow-[0_0_20px_rgba(51,136,255,0.05)]";
              iconStyle = "bg-[#3388FF]/10 border-[#3388FF]/20 text-[#3388FF]";
            }

            return (
              <div
                key={idx}
                className={`group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 ${borderStyle} hover:scale-[1.01]`}
              >
                <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#2A3650]/50 ${theme.cornerBorderHover}`} />
                <div className={`absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#2A3650]/50 ${theme.cornerBorderHover}`} />
                <div className={`absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#2A3650]/50 ${theme.cornerBorderHover}`} />
                <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#2A3650]/50 ${theme.cornerBorderHover}`} />

                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors ${iconStyle}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <GlobalPresence />

      {/* FAQs SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-up delay-75">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
              Frequently Asked <span className={theme.accentText}>Questions</span>
            </h2>

            <div className="space-y-4">
              {[
                { id: "faq-1", q: `Is DynoXium suitable for hosting ${config.faqName} servers?`, a: `Yes, DynoXium specializes in ${config.faqName} server hosting, providing high-speed CPU performance, lag-free operations and automated setups.` },
                { id: "faq-2", q: `What makes DynoXium the best choice for ${config.faqName} hosting?`, a: "Our enterprise network, ultra-fast NVMe storage, 24/7 technical support, and user-friendly control panel ensure your hosting is reliable and optimized." },
                { id: "faq-3", q: `Do you provide DDoS protection for ${config.faqName} servers?`, a: "Yes, every game server is guarded by our advanced DDoS filtering algorithms, keeping you online during volumetric flood attacks." },
              ].map((faq) => {
                const isExpanded = !!expandedFaqs[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/50 transition-all duration-300 h-fit overflow-hidden ${theme.accentBorder} hover:border-current`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left text-white focus:outline-none cursor-pointer"
                    >
                      <span className={`font-display text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors hover:${theme.accentText}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${isExpanded ? `transform rotate-180 ${theme.accentText}` : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[300px] border-t border-[#2A3650]/40" : "max-h-0"
                        }`}
                    >
                      <div className="p-5 text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium bg-[#0B0F19]/25">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
