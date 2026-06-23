"use client";

import React from "react";
import Link from "next/link";
import {
  Wifi,
  Globe,
  Sparkles,
  KeyRound,
  Download,
  Circle,
  Shield,
  Database,
  Sliders,
  Compass,
  Clock,
  ArrowRight,
} from "lucide-react";

interface ToolItem {
  name: string;
  desc: string;
  path: string;
  icon: any;
  badge?: string;
}

const toolsList: ToolItem[] = [
  {
    name: "Minecraft Status Checker",
    desc: "Advanced server status checker. View MOTD, player count, hidden IPs, SRV records, and more.",
    path: "/tools/mc-status",
    icon: Wifi,
  },
  {
    name: "Subdomain Creator",
    desc: "Create custom subdomains for your server instantly. Supports multiple domain options.",
    path: "#",
    icon: Globe,
    badge: "Soon",
  },
  {
    name: "MOTD Editor",
    desc: "Create beautiful, animated, and colored MOTDs for your Minecraft server with our live editor.",
    path: "/tools/motd",
    icon: Sparkles,
  },
  {
    name: "UUID Lookup",
    desc: "Quickly convert usernames to UUIDs and view name history for any Minecraft account.",
    path: "/tools/uuid",
    icon: KeyRound,
  },
  {
    name: "Skin Downloader",
    desc: "View skins in 3D and download them directly. Supports layers and cape visualization.",
    path: "/tools/skin",
    icon: Download,
  },
  {
    name: "Circle Generator",
    desc: "Generate perfect circles and spheres for your Minecraft builds with block-by-block guides.",
    path: "/tools/circle",
    icon: Circle,
  },
  {
    name: "Whitelist Editor",
    desc: "Professional whitelist management with UUID lookup and JSON export for server access control.",
    path: "/tools/whitelist",
    icon: Shield,
  },
  {
    name: "NBT Editor",
    desc: "Advanced NBT data editor supporting player data, world files, structures, and schematics.",
    path: "/tools/nbt",
    icon: Database,
  },
  {
    name: "Server Properties",
    desc: "Interactive server.properties editor with real-time preview and configuration management.",
    path: "/tools/server-properties",
    icon: Sliders,
    badge: "New",
  },
  {
    name: "Coordinate Calculator",
    desc: "Convert coordinates between Overworld and Nether dimensions with precise calculations.",
    path: "/tools/coordinate-calculator",
    icon: Compass,
  },
  {
    name: "Tick Calculator",
    desc: "Convert between real time and Minecraft ticks for redstone timing and command delays.",
    path: "/tools/tick-calculator",
    icon: Clock,
  },
];

export default function ToolsCatalog() {
  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>

      <div className="max-w-7xl mx-auto pt-44 pb-24 px-4 sm:px-6 relative z-10 space-y-12">
        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/30 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)]">
            Minecraft Utilities
          </div>
          <h1 className="font-norwester text-4xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white uppercase leading-none">
            Minecraft <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Tools</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-muted/90 max-w-xl mx-auto font-medium">
            Professional utilities for server owners and players. All tools are free and production-ready.
          </p>
        </div>

        {/* TOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto pt-6">
          {toolsList.map((tool, idx) => {
            const Icon = tool.icon;
            const isClickable = tool.path !== "#";

            const CardContent = (
              <>
                {/* Tech corner accent brackets */}
                <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />

                <div className="space-y-4">
                  {/* Header info */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="w-10 h-10 rounded-xl border border-primary-cyan/20 bg-primary-cyan/10 flex items-center justify-center text-primary-cyan shadow-[0_0_15px_rgba(108,244,255,0.1)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    {tool.badge && (
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest font-mono ${
                        tool.badge === "New" 
                          ? "bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30" 
                          : "bg-white/5 text-text-muted border border-white/10"
                      }`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  {/* Body details */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-wider group-hover:text-primary-cyan transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                {isClickable && (
                  <div className="pt-2 flex items-center justify-end text-primary-cyan group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </>
            );

            if (isClickable) {
              return (
                <Link
                  key={idx}
                  href={tool.path}
                  className="group relative rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/45 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-primary-cyan/45 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(108,244,255,0.06)] cursor-pointer"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-[#2A3650]/40 bg-[#0E1321]/20 p-6 flex flex-col justify-between space-y-6 opacity-70"
              >
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* FOOTER NOTICE */}
        <div className="text-center py-6 text-xs text-text-muted font-mono uppercase tracking-wider select-none animate-pulse">
          All tools are available. More features coming soon.
        </div>
      </div>
    </div>
  );
}
