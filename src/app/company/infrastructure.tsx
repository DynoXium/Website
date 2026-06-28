"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Activity,
  Hourglass,
} from "lucide-react";
import WorldMap from "@/components/WorldMap";
import { regionsData } from "@/data/regions";

interface Region {
  id: string;
  name: string;
  code: string;
  subRegion: string;
  status: "Live" | "Coming Soon";
  locations: { name: string; status: "Live" | "Coming Soon" }[];
  coordinates: { x: number; y: number }; // Percentage coordinates on the SVG map
}

// Custom Inline SVG Flag Renderers for perfect cross-platform rendering (fixes Windows emoji flags rendering as text)
const IndiaFlag = () => (
  <svg viewBox="0 0 3 2" className="w-10 h-7 rounded-sm shadow-md border border-[#2A3650]/50 flex-shrink-0">
    <rect width="3" height="2" fill="#fff" />
    <rect width="3" height="0.67" fill="#FF9933" />
    <rect y="1.33" width="3" height="0.67" fill="#128807" />
    <circle cx="1.5" cy="1" r="0.18" fill="#000080" />
    <circle cx="1.5" cy="1" r="0.13" fill="none" stroke="#fff" strokeWidth="0.02" />
  </svg>
);

const SingaporeFlag = () => (
  <svg viewBox="0 0 3 2" className="w-10 h-7 rounded-sm shadow-md border border-[#2A3650]/50 flex-shrink-0">
    <rect width="3" height="2" fill="#fff" />
    <rect width="3" height="1" fill="#DF0812" />
    <path d="M 0.35 0.25 A 0.22 0.22 0 0 0 0.35 0.65 A 0.18 0.18 0 0 1 0.35 0.25 Z" fill="#fff" />
    <circle cx="0.48" cy="0.32" r="0.02" fill="#fff" />
    <circle cx="0.58" cy="0.37" r="0.02" fill="#fff" />
    <circle cx="0.53" cy="0.47" r="0.02" fill="#fff" />
    <circle cx="0.43" cy="0.42" r="0.02" fill="#fff" />
    <circle cx="0.61" cy="0.42" r="0.02" fill="#fff" />
  </svg>
);

const UsaFlag = () => (
  <svg viewBox="0 0 19 10" className="w-10 h-7 rounded-sm shadow-md border border-[#2A3650]/50 flex-shrink-0">
    <rect width="19" height="10" fill="#B22234" />
    <rect y="0.77" width="19" height="0.77" fill="#FFF" />
    <rect y="2.31" width="19" height="0.77" fill="#FFF" />
    <rect y="3.85" width="19" height="0.77" fill="#FFF" />
    <rect y="5.38" width="19" height="0.77" fill="#FFF" />
    <rect y="6.92" width="19" height="0.77" fill="#FFF" />
    <rect y="8.46" width="19" height="0.77" fill="#FFF" />
    <rect width="7.6" height="5.38" fill="#3C3B6E" />
    <circle cx="1.5" cy="1.2" r="0.15" fill="#fff" />
    <circle cx="3.0" cy="1.2" r="0.15" fill="#fff" />
    <circle cx="4.5" cy="1.2" r="0.15" fill="#fff" />
    <circle cx="6.0" cy="1.2" r="0.15" fill="#fff" />
    <circle cx="2.25" cy="2.4" r="0.15" fill="#fff" />
    <circle cx="3.75" cy="2.4" r="0.15" fill="#fff" />
    <circle cx="5.25" cy="2.4" r="0.15" fill="#fff" />
    <circle cx="1.5" cy="3.6" r="0.15" fill="#fff" />
    <circle cx="3.0" cy="3.6" r="0.15" fill="#fff" />
    <circle cx="4.5" cy="3.6" r="0.15" fill="#fff" />
    <circle cx="6.0" cy="3.6" r="0.15" fill="#fff" />
  </svg>
);

const GermanyFlag = () => (
  <svg viewBox="0 0 5 3" className="w-10 h-7 rounded-sm shadow-md border border-[#2A3650]/50 flex-shrink-0">
    <rect width="5" height="3" fill="#FFCC00" />
    <rect width="5" height="2" fill="#DD0000" />
    <rect width="5" height="1" fill="#000000" />
  </svg>
);

const renderFlag = (id: string) => {
  switch (id) {
    case "india":
      return <IndiaFlag />;
    case "singapore":
      return <SingaporeFlag />;
    case "usa":
      return <UsaFlag />;
    case "germany":
      return <GermanyFlag />;
    default:
      return null;
  }
};

export default function InfrastructurePage() {
  const [mounted, setMounted] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const regions: Region[] = regionsData;

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
      <section className="relative pt-28 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto z-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-8 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          <Globe className="h-4 w-4 text-primary-cyan animate-pulse" />
          Global Node Network
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          Global <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Server Locations</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Powered by trusted infrastructure partners, DynoXium provides hosting across multiple locations with dependable performance and low-latency connections.
        </p>
      </section>

      {/* MAP & REGIONS INTERACTIVE CONTAINER */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch items-start">

          {/* MAP COLUMN (Stretches vertically to cover all 4 stacked location cards on desktop) */}
          <div className="lg:col-span-8 bg-[#0E1321]/45 border border-[#2A3650]/60 rounded-2xl p-6 relative shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden lg:h-full min-h-[500px] flex flex-col justify-between reveal-up delay-75">
            {/* Tech bracket accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#2A3650]/80" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#2A3650]/80" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#2A3650]/80" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#2A3650]/80" />

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono font-bold text-primary-cyan uppercase tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-cyan animate-ping" />
                Live Map Status
              </span>
              <span className="text-[10px] font-mono text-text-muted uppercase">
                Interactive Grid View
              </span>
            </div>

            {/* Dotted World Map Container */}
            <div className="relative w-full flex-grow min-h-[300px] bg-[#070A13] border border-[#2A3650]/40 rounded-xl p-4 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern-sm opacity-10 pointer-events-none" />

              {/* Dotted World Map Component */}
              <WorldMap activeRegion={activeRegion} onHoverRegion={setActiveRegion} />

              {/* Connection Lines (High-tech server nodes linked to India) */}
              {mounted && regions.map((region) => {
                if (region.id === "india") return null;
                const isHovered = activeRegion === region.id;
                return (
                  <svg
                    key={`line-${region.id}`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 5 }}
                  >
                    <path
                      d={`M ${regions[0].coordinates.x}% ${regions[0].coordinates.y}% Q ${(regions[0].coordinates.x + region.coordinates.x) / 2}% ${(regions[0].coordinates.y + region.coordinates.y) / 2 - 8}% ${region.coordinates.x}% ${region.coordinates.y}%`}
                      fill="none"
                      stroke={isHovered ? "#6CF4FF" : "#2A3650"}
                      strokeWidth={isHovered ? "0.8" : "0.45"}
                      strokeDasharray={isHovered ? "2,2" : "2,4"}
                      className="transition-all duration-300 animate-pulse"
                    />
                  </svg>
                );
              })}

              {/* Pulsing Locator Pins */}
              {mounted && regions.map((region) => {
                const isIndia = region.id === "india";
                const isHovered = activeRegion === region.id;

                return (
                  <button
                    key={region.id}
                    className="absolute group/pin -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-transform duration-300 hover:scale-125 cursor-pointer"
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                      zIndex: isHovered ? 20 : 10,
                    }}
                    onMouseEnter={() => setActiveRegion(region.id)}
                    onMouseLeave={() => setActiveRegion(null)}
                  >
                    {/* Ring Pulse for active or hovered nodes */}
                    {(isIndia || isHovered) && (
                      <span className={`absolute -inset-2.5 rounded-full animate-ping opacity-35 ${isIndia ? "bg-primary-cyan" : "bg-[#3388FF]"
                        }`} />
                    )}

                    {/* Pin Core */}
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${isIndia
                      ? "bg-primary-cyan border-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.6)]"
                      : isHovered
                        ? "bg-[#3388FF] border-[#6CF4FF] shadow-[0_0_10px_rgba(51,136,255,0.6)]"
                        : "bg-[#1E2638] border-[#2A3650]/80"
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isIndia ? "bg-black" : isHovered ? "bg-white" : "bg-[#A0AEC0]/40"
                        }`} />
                    </div>

                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#0E1321] border border-[#2A3650] shadow-xl text-[9px] font-mono font-bold whitespace-nowrap uppercase tracking-wider transition-all duration-300 pointer-events-none ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-1"
                      }`}>
                      <span className="text-white">{region.name}</span>
                      <span className={`ml-1.5 ${isIndia ? "text-primary-cyan" : "text-amber-400"
                        }`}>
                        ({region.status})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* REGIONS LIST COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-5 w-full reveal-up delay-150">
            {regions.map((region) => {
              const isIndia = region.id === "india";
              const isHovered = activeRegion === region.id;

              let borderGlow = "border-[#2A3650]/60 hover:border-[#2A3650] hover:shadow-[0_0_20px_rgba(42,54,80,0.15)]";
              if (isIndia) {
                borderGlow = "border-primary-cyan/20 shadow-[0_0_25px_rgba(108,244,255,0.02)] hover:border-primary-cyan/45 hover:shadow-[0_0_35px_rgba(108,244,255,0.06)]";
              } else if (isHovered) {
                borderGlow = "border-[#3388FF]/35 shadow-[0_0_25px_rgba(51,136,255,0.02)] hover:border-[#3388FF]/60 hover:shadow-[0_0_35px_rgba(51,136,255,0.06)]";
              }

              return (
                <div
                  key={region.id}
                  className={`group relative rounded-xl border bg-[#0E1321]/60 p-5 flex flex-col gap-4 transition-all duration-300 cursor-pointer ${borderGlow} ${isHovered ? "scale-[1.01]" : ""
                    }`}
                  onMouseEnter={() => setActiveRegion(region.id)}
                  onMouseLeave={() => setActiveRegion(null)}
                >
                  {/* Tech corner accent brackets */}
                  <div className={`absolute top-2 left-2 w-2 h-2 border-t border-l border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors`} />
                  <div className={`absolute top-2 right-2 w-2 h-2 border-t border-r border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors`} />
                  <div className={`absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors`} />
                  <div className={`absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#2A3650]/60 group-hover:border-primary-cyan/40 transition-colors`} />

                  {/* Header Row: Flag SVG & Name / Code */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {renderFlag(region.id)}
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                          {region.name}
                        </h3>
                        <span className="text-[9px] font-mono text-text-muted/75 font-bold tracking-widest">
                          {region.code}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold border ${isIndia
                      ? "bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.05)]"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.05)]"
                      }`}>
                      {isIndia ? (
                        <>
                          <Activity className="h-3 w-3 text-primary-cyan animate-pulse" />
                          LIVE
                        </>
                      ) : (
                        <>
                          <Hourglass className="h-3 w-3 text-amber-400 animate-spin-slow" style={{ animationDuration: '6s' }} />
                          SOON
                        </>
                      )}
                    </div>
                  </div>

                  {/* Locations Detail */}
                  <div className="space-y-2 pt-2 border-t border-[#2A3650]/30 font-sans">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                      Datacenter Nodes
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {region.locations.map((loc, idx) => {
                        const isLocLive = loc.status === "Live";
                        return (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-xs font-medium"
                          >
                            <span className={isLocLive ? "text-white font-semibold" : "text-text-muted/80"}>
                              • {loc.name}
                            </span>
                            <span className={`text-[9px] font-bold ${isLocLive ? "text-primary-cyan" : "text-amber-400/80"
                              }`}>
                              {loc.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER SPACER */}
      <div className="h-16 flex-shrink-0" />
    </div>
  );
}
