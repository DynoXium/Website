"use client";

import React, { useState } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  Clock,
  Copy,
  CheckCircle,
  AlertCircle,
  FileCode,
  Zap,
} from "lucide-react";

export default function TickCalculator() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [ticks, setTicks] = useState(2400);
  const [copied, setCopied] = useState(false);

  // Recalculates ticks based on days, hours, minutes, seconds
  const updateTicksFromTime = (d: number, h: number, m: number, s: number) => {
    const totalSeconds = d * 86400 + h * 3600 + m * 60 + s;
    const computedTicks = totalSeconds * 20;
    setTicks(computedTicks);
  };

  const handleTimeChange = (type: "days" | "hours" | "minutes" | "seconds", val: number) => {
    const safeVal = Math.max(0, val);
    let d = days, h = hours, m = minutes, s = seconds;

    if (type === "days") {
      setDays(safeVal);
      d = safeVal;
    } else if (type === "hours") {
      setHours(safeVal);
      h = safeVal;
    } else if (type === "minutes") {
      setMinutes(safeVal);
      m = safeVal;
    } else if (type === "seconds") {
      setSeconds(safeVal);
      s = safeVal;
    }

    updateTicksFromTime(d, h, m, s);
  };

  const handleTicksChange = (val: number) => {
    const safeTicks = Math.max(0, val);
    setTicks(safeTicks);

    // Convert back to D, H, M, S
    const totalSeconds = Math.floor(safeTicks / 20);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  const handleClear = () => {
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTicks(0);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(`/tick step ${ticks}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreset = (presetTicks: number) => {
    handleTicksChange(presetTicks);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto pt-44 pb-20 px-4 sm:px-6 relative z-10 space-y-12">
        <BackToToolsLink />

        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-up delay-75">
          <h1 className="font-norwester text-4xl sm:text-7xl tracking-wide sm:tracking-widest text-white uppercase leading-none reveal-up delay-100">
            Tick <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Convert between real time and Minecraft ticks for redstone timing and command delays.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          
          {/* LEFT: TIME INPUT */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-cyan" />
                Time Input
              </h3>

              {/* Time Inputs */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { key: "days", label: "Days", val: days },
                  { key: "hours", label: "Hours", val: hours },
                  { key: "minutes", label: "Minutes", val: minutes },
                  { key: "seconds", label: "Seconds", val: seconds },
                ].map((item) => (
                  <div key={item.key} className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-text-muted uppercase block">{item.label}</span>
                    <input
                      type="number"
                      min="0"
                      value={item.val}
                      onChange={(e) => handleTimeChange(item.key as any, parseInt(e.target.value) || 0)}
                      className="w-full text-center py-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/50 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Total Ticks Output Panel */}
              <div className="rounded-2xl border border-primary-cyan/30 bg-primary-cyan/5 p-6 flex flex-col items-center justify-center space-y-4">
                <span className="text-[10px] font-mono font-bold text-primary-cyan uppercase tracking-widest">
                  Total Ticks
                </span>
                <p className="text-3xl sm:text-4xl font-bold text-white font-display">
                  {ticks.toLocaleString()}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopyCommand}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-primary-cyan bg-[#0B0F19] text-primary-cyan hover:bg-primary-cyan hover:text-[#0B0F19] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(108,244,255,0.15)]"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>Copy Command</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-5 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Enter Ticks Directly */}
              <div className="space-y-2 pt-2 border-t border-[#2A3650]/20">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase block">
                  Or enter ticks directly:
                </span>
                <input
                  type="number"
                  min="0"
                  value={ticks}
                  onChange={(e) => handleTicksChange(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-xs focus:border-primary-cyan/50 focus:outline-none transition-colors placeholder-text-muted font-bold"
                />
              </div>

            </div>
          </div>

          {/* RIGHT: QUICK REFERENCE & PRESETS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Reference */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#2A3650]/20 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary-cyan" />
                Quick Reference
              </h4>
              <div className="space-y-2.5 font-mono text-[10px] uppercase">
                {[
                  { label: "1 second", val: "20 ticks" },
                  { label: "1 redstone tick", val: "2 ticks" },
                  { label: "Hopper transfer", val: "8 ticks" },
                  { label: "Repeater max", val: "8 ticks" },
                  { label: "Day cycle", val: "24,000" },
                  { label: "Observer pulse", val: "2 ticks" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-bold text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#2A3650]/20">
                Common Presets
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "1 minute", val: 1200 },
                  { label: "5 minutes", val: 6000 },
                  { label: "1 hour", val: 72000 },
                  { label: "1 day cycle", val: 24000 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePreset(preset.val)}
                    className="flex justify-between items-center px-3 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 hover:border-primary-cyan/40 text-text-muted hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <span className="font-sans text-[10px] font-semibold">{preset.label}</span>
                    <span className="font-mono text-[9px] font-bold text-primary-cyan">{preset.val.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* USAGE BOX */}
          <div className="lg:col-span-12 rounded-3xl border border-primary-cyan/10 bg-primary-cyan/3 p-6 space-y-3 backdrop-blur-md">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-primary-cyan" />
              Command Usage
            </h4>
            <p className="text-xs text-[#8E8E93] leading-relaxed font-medium">
              Use <code className="bg-[#070A14] px-1.5 py-0.5 rounded text-white font-mono text-[10px]">/tick freeze</code> to stop time, then <code className="bg-[#070A14] px-1.5 py-0.5 rounded text-white font-mono text-[10px]">/tick step {ticks}</code> to advance by the calculated ticks. The step command automatically unfreezes time after execution.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
