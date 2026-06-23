"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  ArrowLeftRight,
  Copy,
  CheckCircle,
  AlertCircle,
  Share2,
} from "lucide-react";

export default function CoordinateCalculator() {
  const [overworld, setOverworld] = useState({ x: 0, y: 64, z: 0 });
  const [nether, setNether] = useState({ x: 0, y: 64, z: 0 });
  const [copiedOverworld, setCopiedOverworld] = useState(false);
  const [copiedNether, setCopiedNether] = useState(false);

  const handleOverworldChange = (field: "x" | "y" | "z", val: number) => {
    setOverworld((prev) => {
      const next = { ...prev, [field]: val };
      // Update Nether coordinates: X and Z / 8, Y remains unchanged
      setNether({
        x: Math.round(next.x / 8),
        y: next.y,
        z: Math.round(next.z / 8),
      });
      return next;
    });
  };

  const handleNetherChange = (field: "x" | "y" | "z", val: number) => {
    setNether((prev) => {
      const next = { ...prev, [field]: val };
      // Update Overworld coordinates: X and Z * 8, Y remains unchanged
      setOverworld({
        x: next.x * 8,
        y: next.y,
        z: next.z * 8,
      });
      return next;
    });
  };

  const handleSwap = () => {
    // Swap Overworld values to Nether, Nether values to Overworld
    const temp = { ...overworld };
    setOverworld({
      x: nether.x * 8,
      y: nether.y,
      z: nether.z * 8,
    });
    setNether({
      x: Math.round(temp.x / 8),
      y: temp.y,
      z: Math.round(temp.z / 8),
    });
  };

  const overworldDistance = useMemo(() => {
    return Math.sqrt(overworld.x * overworld.x + overworld.z * overworld.z).toFixed(2);
  }, [overworld]);

  const netherDistance = useMemo(() => {
    return Math.sqrt(nether.x * nether.x + nether.z * nether.z).toFixed(2);
  }, [nether]);

  const distanceSaved = useMemo(() => {
    const owDist = Math.sqrt(overworld.x * overworld.x + overworld.z * overworld.z);
    const neDist = Math.sqrt(nether.x * nether.x + nether.z * nether.z);
    return Math.max(0, owDist - neDist).toFixed(0);
  }, [overworld, nether]);

  const handleCopy = (type: "overworld" | "nether") => {
    const coords = type === "overworld" 
      ? `/tp @s ${overworld.x} ${overworld.y} ${overworld.z}`
      : `/tp @s ${nether.x} ${nether.y} ${nether.z}`;
    
    navigator.clipboard.writeText(coords);
    if (type === "overworld") {
      setCopiedOverworld(true);
      setTimeout(() => setCopiedOverworld(false), 2000);
    } else {
      setCopiedNether(true);
      setTimeout(() => setCopiedNether(false), 2000);
    }
  };

  // Helper hook simulation for useMemo
  function useMemo<T>(factory: () => T, deps: any[]): T {
    return React.useMemo(factory, deps);
  }

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto pt-44 pb-20 px-4 sm:px-6 relative z-10 space-y-12">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Tools</span>
        </Link>

        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="font-norwester text-4xl sm:text-7xl tracking-wide sm:tracking-widest text-white uppercase leading-none">
            Coordinate <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium">
            Convert coordinates between Overworld and Nether dimensions with precise calculations.
          </p>
        </div>

        {/* CALCULATOR BOARD */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* DUAL CALCULATOR COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
            
            {/* OVERWORLD COLUMN */}
            <div className="rounded-3xl border border-success-teal/20 bg-[#0E1321]/50 p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-success-teal/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-success-teal/20" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-success-teal/20 bg-success-teal/10 flex items-center justify-center text-success-teal shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider leading-none">
                    Overworld
                  </h3>
                  <span className="text-[9px] text-text-muted font-mono font-bold uppercase mt-1 inline-block">
                    Normal world dimensions
                  </span>
                </div>
              </div>

              {/* Overworld inputs */}
              <div className="grid grid-cols-3 gap-4">
                {["x", "y", "z"].map((coord) => (
                  <div key={coord} className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase">{coord}</span>
                    <input
                      type="number"
                      value={overworld[coord as "x" | "y" | "z"]}
                      onChange={(e) => handleOverworldChange(coord as "x" | "y" | "z", parseInt(e.target.value) || 0)}
                      className="w-full text-center py-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-success-teal/50 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Stats & Copy */}
              <div className="flex justify-between items-center pt-4 border-t border-[#2A3650]/20 font-mono text-[10px] uppercase">
                <span className="text-text-muted">Distance from spawn: {overworldDistance} blocks</span>
                <button
                  onClick={() => handleCopy("overworld")}
                  className="flex items-center gap-1.5 text-success-teal hover:text-success-teal/80 transition-colors cursor-pointer font-bold"
                >
                  {copiedOverworld ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy</span>
                </button>
              </div>

            </div>

            {/* NETHER COLUMN */}
            <div className="rounded-3xl border border-primary-cyan/20 bg-[#0E1321]/50 p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-primary-cyan/20 bg-primary-cyan/10 flex items-center justify-center text-primary-cyan shadow-[0_0_15px_rgba(108,244,255,0.1)]">
                  <Compass className="h-5 w-5 rotate-180" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider leading-none">
                    Nether
                  </h3>
                  <span className="text-[9px] text-text-muted font-mono font-bold uppercase mt-1 inline-block">
                    1:8 ratio dimension
                  </span>
                </div>
              </div>

              {/* Nether inputs */}
              <div className="grid grid-cols-3 gap-4">
                {["x", "y", "z"].map((coord) => (
                  <div key={coord} className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-primary-cyan uppercase">{coord}</span>
                    <input
                      type="number"
                      value={nether[coord as "x" | "y" | "z"]}
                      onChange={(e) => handleNetherChange(coord as "x" | "y" | "z", parseInt(e.target.value) || 0)}
                      className="w-full text-center py-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/50 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Stats & Copy */}
              <div className="flex justify-between items-center pt-4 border-t border-[#2A3650]/20 font-mono text-[10px] uppercase">
                <span className="text-text-muted">Distance from spawn: {netherDistance} blocks</span>
                <button
                  onClick={() => handleCopy("nether")}
                  className="flex items-center gap-1.5 text-primary-cyan hover:text-primary-cyan/80 transition-colors cursor-pointer font-bold"
                >
                  {copiedNether ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy</span>
                </button>
              </div>

            </div>

          </div>

          {/* MIDDLE: SWAP COORDINATES */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary-cyan/30 bg-primary-cyan/10 hover:bg-primary-cyan/20 text-primary-cyan text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(108,244,255,0.15)] active:scale-98"
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span>Swap Coordinates</span>
            </button>
          </div>

          {/* LOWER ANALYSIS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CONVERSION RULES */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#2A3650]/20">
                Conversion Rules
              </h4>
              <div className="space-y-3 font-mono text-[10px] uppercase">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Overworld → Nether</span>
                  <span className="font-bold text-white bg-[#070A14] px-2.5 py-1.5 rounded-lg border border-[#2A3650]/40">÷ 8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Nether → Overworld</span>
                  <span className="font-bold text-white bg-[#070A14] px-2.5 py-1.5 rounded-lg border border-[#2A3650]/40">× 8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Y Coordinate</span>
                  <span className="font-bold text-white bg-[#070A14] px-2.5 py-1.5 rounded-lg border border-[#2A3650]/40">No change</span>
                </div>
              </div>
            </div>

            {/* TRAVEL EFFICIENCY */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#2A3650]/20">
                Travel Efficiency
              </h4>
              <div className="space-y-3 flex-grow flex flex-col justify-center">
                <div className="rounded-xl border border-success-teal/20 bg-success-teal/5 p-3 text-center">
                  <p className="text-[10px] font-mono font-bold text-success-teal uppercase">Nether Travel</p>
                  <p className="text-xs font-medium text-white/90 mt-1">1 block = 8 blocks in Overworld</p>
                </div>
                <div className="rounded-xl border border-primary-cyan/20 bg-primary-cyan/5 p-3 text-center">
                  <p className="text-[10px] font-mono font-bold text-primary-cyan uppercase">Distance Saved</p>
                  <p className="text-xs font-medium text-white/90 mt-1">{distanceSaved} blocks</p>
                </div>
              </div>
            </div>

          </div>

          {/* USAGE TIPS */}
          <div className="rounded-3xl border border-primary-cyan/10 bg-primary-cyan/3 p-6 space-y-3 backdrop-blur-md">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-primary-cyan" />
              Usage Tips
            </h4>
            <ul className="text-xs text-[#8E8E93] space-y-1.5 list-disc list-inside font-medium leading-relaxed">
              <li>Enter coordinates in either dimension to see the conversion</li>
              <li>Y coordinates remain the same between dimensions</li>
              <li>Use Nether travel for long-distance transportation (8x faster)</li>
              <li>Build Nether portals at calculated coordinates for precise linking</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
