"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Gamepad2,
  Globe,
  Terminal,
  Activity,
  BookOpen,
  Library,
  Info,
  Scale,
  Zap,
  Cpu,
  Layers,
  Wrench,
  HelpCircle,
  FileText,
  User,
  Heart,
  Handshake,
  ShieldAlert,
  ShieldCheck,
  Coins,
  AlertTriangle,
  FolderKey,
  Clock,
  Briefcase,
  Users,
  Database,
  ArrowUpRight,
  Sparkles,
  Play,
  Monitor,
  Flame,
  Hammer,
  Trees,
  Search,
  KeyRound,
  Layout,
  MousePointerClick,
  UserCheck,
  Gpu,
} from "lucide-react";

export default function Footer() {
  const [discordWidget, setDiscordWidget] = useState<{
    instant_invite: string;
    presence_count: number;
    members: Array<{
      id: string;
      username: string;
      avatar_url: string;
      status: string;
    }>;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("https://discord.com/api/guilds/1507859529625501906/widget.json")
        .then((res) => res.json())
        .then((data) => setDiscordWidget(data))
        .catch((err) => console.error("Error fetching Discord widget:", err));
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative z-30 w-full bg-[#070B14] border-t border-[#2A3650]/40 text-text-light font-sans pt-40 pb-16">
      {/* DISCORD COMMUNITY SECTION FLOATING HALF-UP */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-40">
        <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl border border-[#5865F2]/25 bg-gradient-to-r from-[#161c2c] to-[#0F1424] shadow-[0_0_40px_rgba(88,101,242,0.12)] overflow-hidden group hover:border-[#5865F2]/50 hover:shadow-[0_0_50px_rgba(88,101,242,0.22)] transition-all duration-500">

          {/* Watermark Discord Logos */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]">
            <svg className="absolute -left-6 -top-6 w-24 h-24 text-white rotate-12" fill="currentColor" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C3.58,31.21-1.92,53.72,1,76A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.31,2.53-2a68.88,68.88,0,0,0,81.42,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-20.35C129.84,48.16,123.63,25.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
            </svg>
            <svg className="absolute left-[35%] -bottom-10 w-20 h-20 text-white -rotate-12" fill="currentColor" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C3.58,31.21-1.92,53.72,1,76A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.31,2.53-2a68.88,68.88,0,0,0,81.42,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-20.35C129.84,48.16,123.63,25.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
            </svg>
            <svg className="absolute right-[25%] -top-6 w-20 h-20 text-white rotate-45" fill="currentColor" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C3.58,31.21-1.92,53.72,1,76A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.31,2.53-2a68.88,68.88,0,0,0,81.42,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-20.35C129.84,48.16,123.63,25.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
            </svg>
            <svg className="absolute -right-6 -bottom-6 w-28 h-28 text-white -rotate-12" fill="currentColor" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C3.58,31.21-1.92,53.72,1,76A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.31,2.53-2a68.88,68.88,0,0,0,81.42,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-20.35C129.84,48.16,123.63,25.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
            </svg>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 z-10 text-center lg:text-left">
            <div className="flex-grow">
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 uppercase">
                Join Our Discord
              </h2>
              <p className="text-text-muted max-w-2xl text-sm sm:text-base leading-relaxed mb-4">
                {discordWidget ? (
                  <span className="font-bold text-[#5865F2]">{discordWidget.presence_count.toLocaleString()}+ online</span>
                ) : (
                  <span className="font-bold text-text-muted font-mono">Live community</span>
                )}{" "}
                — get support, share feedback, and catch exclusive news first.
              </p>

              {discordWidget && (
                <div className="flex items-center justify-center lg:justify-start gap-3 mt-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {discordWidget.members.slice(0, 5).map((member) => (
                      <img
                        key={member.id}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-[#161c2c] object-cover bg-[#101114]"
                        src={member.avatar_url}
                        alt={member.username}
                        title={`${member.username} (${member.status})`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded uppercase tracking-wider">
                    Active Guild
                  </span>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <a
                href={discordWidget?.instant_invite || "https://discord.gg"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(88,101,242,0.25)] hover:shadow-[0_4px_25px_rgba(88,101,242,0.45)] hover:scale-[1.03] active:scale-[0.97]"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C3.58,31.21-1.92,53.72,1,76A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.31,2.53-2a68.88,68.88,0,0,0,81.42,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-20.35C129.84,48.16,123.63,25.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
                </svg>
                Join us on Discord
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16">
          {/* Brand & Left Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <Image
                src="/logo.webp"
                alt="DynoXium Logo"
                width={68}
                height={68}
                className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <span className="font-norwester text-[1.95rem] tracking-widest text-white transition-colors">
                Dyno<span className="text-primary-cyan">X</span>ium
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Founded in <span className="font-bold text-white">India</span> by <span className="font-bold text-white">Kr Arjan</span>, with <span className="font-bold text-white">Randeep Royal</span> serving as <span className="font-bold text-white">Co-Founder</span>, <span className="font-bold text-white">Dynoxium</span> was built with a simple goal—to make high-quality hosting reliable, accessible, and easy to manage. From game servers to cloud infrastructure, we focus on delivering dependable performance, modern technology, and support you can count on.
            </p>

            {/* Social Icons Rounded Squares */}
            <div className="flex items-center gap-2">
              {[
                { label: "Discord", path: "#", svg: <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" /></svg> },
                { label: "Twitter", path: "#", svg: <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                { label: "Instagram", path: "#", svg: <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                { label: "WhatsApp", path: "#", svg: <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
                { label: "LinkedIn", path: "#", svg: <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
                { label: "YouTube", path: "#", svg: <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg> },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.path}
                  aria-label={soc.label}
                  className="w-9 h-9 rounded bg-[#0D1321] border border-[#2A3650]/50 hover:border-primary-cyan/50 hover:bg-primary-cyan/10 text-text-muted hover:text-primary-cyan flex items-center justify-center transition-all duration-300"
                >
                  {soc.svg}
                </a>
              ))}
            </div>
            {/* Support Emails */}
            <div className="flex flex-col gap-1.5 text-sm text-text-muted font-mono mt-2">
              <div>
                <span className="text-text-muted/85">Support:</span>{" "}
                <a href="mailto:support@dynoxium.com" className="hover:text-primary-cyan transition-colors">
                  support@dynoxium.com
                </a>
              </div>
              <div>
                <span className="text-text-muted/85">Business:</span>{" "}
                <a href="mailto:business@dynoxium.com" className="hover:text-primary-cyan transition-colors">
                  business@dynoxium.com
                </a>
              </div>
              <div>
                <span className="text-text-muted/85">Contact:</span>{" "}
                <a href="mailto:contact@dynoxium.com" className="hover:text-primary-cyan transition-colors">
                  contact@dynoxium.com
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 1: GAME SERVER */}
          <div className="flex flex-col gap-4">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Game Server
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Minecraft", icon: Gamepad2, path: "/game/minecraft" },
                { name: "FiveM", icon: Play, path: "#" },
                { name: "Palworld", icon: Flame, path: "#" },
                { name: "Rust", icon: Hammer, path: "#" },
                { name: "Counter Strike", icon: Trees, path: "#" },
                { name: "Hytale", icon: Sparkles, path: "#" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 text-[#8E8E93] hover:text-white transition-all group"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/game"
                  className="flex items-center gap-1.5 text-primary-cyan hover:text-secondary-cyan font-semibold transition-all group"
                >
                  View All
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: SERVICES */}
          <div className="flex flex-col gap-4">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Services
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "VPS Hosting", icon: Cpu, path: "/vps" },
                { name: "RDP Hosting", icon: Monitor, path: "/rdp" },
                { name: "Web Hosting", icon: Globe, path: "/web" },
                { name: "GameServer", icon: Gpu, path: "/game" },
                { name: "Discord Bot", icon: MessageSquare, path: "/bot" },
                { name: "Free Hosting", icon: Zap, path: "/free" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 text-[#8E8E93] hover:text-white transition-all group"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/game"
                  className="flex items-center gap-1.5 text-primary-cyan hover:text-secondary-cyan font-semibold transition-all group"
                >
                  View All
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: TOOLS */}
          <div className="flex flex-col gap-4">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Tools
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "MC Status", icon: Activity, path: "/tools/mc-status" },
                { name: "MOTD Maker", icon: Layout, path: "/tools/motd" },
                { name: "Subdomain", icon: Globe, path: "#" },
                { name: "MC Skin", icon: User, path: "/tools/skin" },
                { name: "UUID", icon: KeyRound, path: "/tools/uuid" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 text-[#8E8E93] hover:text-white transition-all group"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/tools"
                  className="flex items-center gap-1.5 text-primary-cyan hover:text-secondary-cyan font-semibold transition-all group"
                >
                  View All
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT */}
          <div className="flex flex-col gap-4">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Support
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Knowledgebase", icon: Library, path: "/knowledgebase" },
                { name: "FAQs", icon: HelpCircle, path: "/faq" },
                { name: "Status", icon: Activity, path: "#" },
                { name: "Create Ticket", icon: FileText, path: "#" },
                { name: "Contact Us", icon: MessageSquare, path: "/contact" },
                { name: "Discord", icon: Users, path: "#" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 text-[#8E8E93] hover:text-white transition-all group"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 5: COMPANY */}
          <div className="flex flex-col gap-4">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Company
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "About Us", icon: Info, path: "/about" },
                { name: "The Team", icon: Users, path: "/team" },
                { name: "Blogs", icon: FileText, path: "/blog" },
                { name: "Partnership", icon: Handshake, path: "/partnership" },
                { name: "Infrastructure", icon: Cpu, path: "/infrastructure" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 text-[#8E8E93] hover:text-white transition-all group"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 6: LEGAL */}
          <div className="flex flex-col gap-4">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Legal
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Terms of Service", icon: Scale, path: "/terms" },
                { name: "Privacy Policy", icon: ShieldCheck, path: "/privacy" },
                { name: "Refund Policy", icon: Coins, path: "/refund" },
                { name: "Acceptable Use Policy", icon: AlertTriangle, path: "/aup" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 text-[#8E8E93] hover:text-white transition-all group"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-cyan/40 group-hover:text-primary-cyan transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="pt-8 border-t border-[#2A3650]/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted/85">
            © 2026 DynoXium. All Rights Reserved.
          </p>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted/75 text-center sm:text-right">
            BUILT FOR RELIABILITY <br />
            AND PERFORMANCE
          </span>
        </div>
      </div>
    </footer>
  );
}
