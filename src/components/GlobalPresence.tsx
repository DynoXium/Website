"use client";

import React from "react";
import { Check, Shield, Activity, Globe, Wifi } from "lucide-react";
import { regionsData, Region } from "@/data/regions";

// Custom Inline SVG Flag Renderers for cross-platform rendering
const IndiaFlag = () => (
  <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm flex-shrink-0">
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#138808" d="M0 320h640v160H0z" />
    <circle cx="320" cy="240" r="40" fill="#000080" />
  </svg>
);

const SingaporeFlag = () => (
  <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm flex-shrink-0">
    <path fill="#fff" d="M0 240h640v240H0z" />
    <path fill="#DF151A" d="M0 0h640v240H0z" />
    <circle cx="100" cy="100" r="40" fill="#fff" />
    <circle cx="120" cy="100" r="40" fill="#DF151A" />
  </svg>
);

const UsaFlag = () => (
  <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm flex-shrink-0">
    <rect width="640" height="480" fill="#3c3b6e" />
    <path fill="#b22234" d="M0 0h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z" />
    <path fill="#fff" d="M0 37h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z" />
    <rect width="256" height="258" fill="#3c3b6e" />
    <circle cx="30" cy="30" r="8" fill="#fff" />
    <circle cx="90" cy="30" r="8" fill="#fff" />
    <circle cx="150" cy="30" r="8" fill="#fff" />
    <circle cx="210" cy="30" r="8" fill="#fff" />
  </svg>
);

const GermanyFlag = () => (
  <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm flex-shrink-0">
    <path fill="#FFCE00" d="M0 320h640v160H0z" />
    <path fill="#D00" d="M0 160h640v160H0z" />
    <path fill="#000" d="M0 0h640v160H0z" />
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

export default function GlobalPresence() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20 space-y-12 border-t border-[#2A3650]/30 mt-12 reveal-up">
      <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up delay-75">
        <h2 className="font-norwester text-2xl sm:text-5xl text-white uppercase tracking-wider">
          Global <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(108,244,255,0.2)]">Server Locations</span>
        </h2>
        <p className="text-xs sm:text-sm text-text-muted max-w-2xl mx-auto">
          Powered by trusted infrastructure partners, DynoXium provides hosting across multiple locations with dependable performance and low-latency connections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-up delay-100">
        {/* Map Display (7 cols) */}
        <div className="lg:col-span-7 bg-[#0E1321]/50 border border-[#2A3650]/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
          <div className="relative min-h-[280px] w-full bg-[url('/world-map.svg')] bg-center bg-no-repeat bg-contain opacity-80 flex items-center justify-center">
            {/* Location Pins mapped dynamically from regionsData config */}
            {regionsData.map((node) => {
              const isLive = node.status === "Live";

              if (!isLive) {
                // Render greyed out pin for unavailable locations
                return (
                  <div key={`pin-${node.id}`} className="absolute group select-none opacity-50 transition-transform duration-300" style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="w-3.5 h-3.5 bg-[#4B5563] rounded-full flex items-center justify-center relative border border-[#374151]" />
                  </div>
                );
              }

              // Render active pulsing pin for live locations
              return (
                <div key={`pin-${node.id}`} className="absolute group transition-transform duration-300 hover:scale-110" style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%`, transform: 'translate(-50%, -50%)' }}>
                  <div className="w-3.5 h-3.5 bg-primary-cyan rounded-full flex items-center justify-center relative shadow-[0_0_15px_#6cf4ff]">
                    <div className="absolute inset-0 bg-primary-cyan rounded-full animate-ping opacity-60" />
                  </div>
                </div>
              );
            })}

            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest absolute bottom-2 left-2 select-none">
              Dynamic Nodes Latency Routing Enabled
            </span>
          </div>
        </div>

        {/* Locations Status Cards Grid (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {regionsData.map((node) => {
            const isLive = node.status === "Live";

            let tagColor = "text-[#EF4444] border-[#EF4444]/20 bg-[#EF4444]/10";
            let statusText = "bg-[#EF4444]";
            let displayStatus = "Unavailable";
            let displayPing = "N/A";

            if (isLive) {
              displayStatus = "Optimal";
              displayPing = node.latency;

              if (node.optimalColor === "green") {
                tagColor = "text-success-teal border-success-teal/20 bg-success-teal/10";
                statusText = "bg-success-teal";
              } else {
                tagColor = "text-primary-cyan border-primary-cyan/20 bg-primary-cyan/10";
                statusText = "bg-primary-cyan";
              }
            }

            return (
              <div
                key={node.id}
                className="group relative rounded-xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-4 flex justify-between items-center transition-all duration-300 hover:border-primary-cyan/45 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  {renderFlag(node.id)}
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide font-display">
                      {node.name}
                    </h4>
                    <p className="text-[10px] text-text-muted font-sans font-medium">
                      {node.datacenterName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {displayPing}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${tagColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusText}`} />
                    {displayStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
