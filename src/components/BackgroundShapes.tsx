"use client";

import React from "react";

interface BackgroundShapesProps {
  pageId: string;
}

export default function BackgroundShapes({ pageId }: BackgroundShapesProps) {
  // Shared helper elements to keep the code clean while generating rich homepage-inspired backgrounds
  const AmbientGlows = ({ color1 = "bg-primary-cyan/8", color2 = "bg-[#3388FF]/6" }) => (
    <>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] ${color1} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[400px] ${color2} rounded-full blur-[150px] pointer-events-none`} />
    </>
  );

  const VectorRings = ({ left = "-left-28", top = "top-12" }) => (
    <>
      <div className={`absolute ${left} ${top} w-96 h-96 rounded-full border border-primary-cyan/5 animate-spin-slow pointer-events-none -z-10`} />
      <div className={`absolute ${left} ${top} w-80 h-80 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-reverse pointer-events-none -z-10`} />
    </>
  );

  const GlowingPills = ({ align = "left", top = "top-36" }) => {
    if (align === "left") {
      return (
        <div className={`absolute left-0 ${top} flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10`}>
          <div className="h-2 w-80 bg-gradient-to-l from-transparent via-[#3388FF]/30 to-primary-cyan rounded-l-full -translate-x-10" />
          <div className="h-2 w-60 bg-gradient-to-l from-transparent via-[#3388FF]/40 to-primary-cyan rounded-l-full" />
        </div>
      );
    } else {
      return (
        <div className={`absolute right-0 ${top} flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10`}>
          <div className="h-2 w-60 bg-gradient-to-r from-transparent via-[#3388FF]/40 to-primary-cyan rounded-r-full" />
          <div className="h-2 w-80 bg-gradient-to-r from-transparent via-[#3388FF]/30 to-primary-cyan rounded-r-full translate-x-10" />
        </div>
      );
    }
  };

  const TechAccentPanels = ({ skew = "-skew-y-6", top = "top-[10%]" }) => (
    <>
      <div className={`absolute ${top} left-[-5%] w-[35%] h-[20%] bg-gradient-to-r from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 ${skew} pointer-events-none -z-10 hidden lg:block`} />
      <div className={`absolute bottom-[10%] right-[-5%] w-[35%] h-[20%] bg-gradient-to-l from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 ${skew.startsWith("-") ? skew.substring(1) : `-${skew}`} pointer-events-none -z-10 hidden lg:block`} />
    </>
  );

  const DiagonalStripes = () => (
    <>
      <div className="absolute top-[35%] right-[5%] w-72 h-12 bg-gradient-to-r from-primary-cyan/10 to-transparent rounded-full rotate-45 transform origin-right -z-10 blur-[2px] hidden xl:block" />
      <div className="absolute bottom-[35%] left-[5%] w-72 h-12 bg-gradient-to-l from-[#3388FF]/10 to-transparent rounded-full rotate-45 transform origin-left -z-10 blur-[2px] hidden xl:block" />
    </>
  );

  const SporeParticles = () => (
    <>
      <div className="absolute top-[25%] left-[8%] w-2 h-2 bg-primary-cyan/25 rounded-sm animate-bounce-slow" />
      <div className="absolute top-[65%] left-[40%] w-3 h-3 bg-secondary-cyan/15 rounded-sm animate-bounce-slow" style={{ animationDelay: "2s", animationDuration: "8s" }} />
      <div className="absolute top-[35%] right-[15%] w-2 h-2 bg-[#3388FF]/20 rounded-sm animate-bounce-slow" style={{ animationDelay: "4s", animationDuration: "5s" }} />
      <div className="absolute bottom-[20%] left-[20%] w-2 h-2 bg-primary-cyan/10 rounded-sm animate-bounce-slow" style={{ animationDelay: "1s", animationDuration: "7s" }} />
    </>
  );

  const FloatingCrosses = () => (
    <>
      <div className="absolute top-[20%] right-[10%] text-[#3388FF]/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>
      <div className="absolute bottom-[30%] left-[15%] text-primary-cyan/15 font-mono text-xl pointer-events-none select-none -z-10">+</div>
      <div className="absolute top-[60%] right-[18%] text-primary-cyan/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>
    </>
  );

  const getShapes = () => {
    switch (pageId) {
      /* ─────────────────────── VPS ─────────────────────── */
      case "vps":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-24" top="top-32" />
            <TechAccentPanels skew="skew-y-3" top="top-[14%]" />
            <GlowingPills align="left" top="top-[18%]" />
            <GlowingPills align="right" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[28%] left-[14%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">+</div>
            <div className="absolute top-[55%] right-[12%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">+</div>
            <div className="absolute bottom-[28%] left-[22%] text-primary-cyan/[0.08] font-mono text-xl select-none pointer-events-none">⚙</div>
          </>
        );

      /* ─────────────────────── RDP ─────────────────────── */
      case "rdp":
        return (
          <>
            <AmbientGlows color1="bg-[#3388FF]/8" color2="bg-primary-cyan/6" />
            <VectorRings left="-right-28" top="top-24" />
            <TechAccentPanels skew="-skew-y-6" top="top-[18%]" />
            <GlowingPills align="right" top="top-[25%]" />
            <GlowingPills align="left" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[30%] right-[14%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">⌨</div>
            <div className="absolute bottom-[32%] left-[10%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">⌨</div>
          </>
        );

      /* ─────────────────────── WEB ─────────────────────── */
      case "web":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-20" top="bottom-[20%]" />
            <TechAccentPanels skew="skew-y-6" top="top-[22%]" />
            <GlowingPills align="left" top="top-[30%]" />
            <GlowingPills align="right" top="top-[55%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[35%] right-[10%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">&lt;/&gt;</div>
            <div className="absolute bottom-[30%] left-[14%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">&#123;&#125;</div>
          </>
        );

      /* ─────────────────────── BOT ─────────────────────── */
      case "bot":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-36" top="top-8" />
            <TechAccentPanels skew="skew-y-12" top="top-[12%]" />
            <GlowingPills align="left" top="top-[20%]" />
            <GlowingPills align="right" top="top-[70%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[25%] left-[22%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">🤖</div>
            <div className="absolute bottom-[38%] right-[14%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">🤖</div>
          </>
        );

      /* ─────────────────────── FREE ─────────────────────── */
      case "free":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-16" top="top-32" />
            <TechAccentPanels skew="-skew-y-3" top="top-[16%]" />
            <GlowingPills align="right" top="top-[28%]" />
            <GlowingPills align="left" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[32%] right-[16%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">🎁</div>
            <div className="absolute bottom-[34%] left-[10%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">🎁</div>
          </>
        );

      /* ─────────────────────── ABOUT ─────────────────────── */
      case "about":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-24" top="top-20" />
            <TechAccentPanels skew="skew-y-6" top="top-[22%]" />
            <GlowingPills align="left" top="top-[15%]" />
            <GlowingPills align="right" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[18%] right-[18%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">ℹ</div>
            <div className="absolute bottom-[22%] left-[12%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">ℹ</div>
          </>
        );

      /* ─────────────────────── TEAM ─────────────────────── */
      case "team":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-24" top="top-40" />
            <TechAccentPanels skew="-skew-y-3" top="top-[14%]" />
            <GlowingPills align="right" top="top-[30%]" />
            <GlowingPills align="left" top="top-[70%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[28%] right-[22%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">👥</div>
            <div className="absolute bottom-[30%] left-[14%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">👥</div>
          </>
        );

      /* ─────────────────────── PARTNERSHIP ─────────────────────── */
      case "partnership":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="left-[40%]" top="bottom-[-5%]" />
            <TechAccentPanels skew="-skew-y-6" top="top-[30%]" />
            <GlowingPills align="left" top="top-[25%]" />
            <GlowingPills align="right" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[22%] left-[16%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">🤝</div>
            <div className="absolute top-[22%] right-[16%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">🤝</div>
          </>
        );

      /* ─────────────────────── INFRASTRUCTURE ─────────────────────── */
      case "infrastructure":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-28" top="top-28" />
            <TechAccentPanels skew="skew-y-3" top="top-[8%]" />
            <GlowingPills align="left" top="top-[20%]" />
            <GlowingPills align="right" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[35%] right-[20%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">🌐</div>
            <div className="absolute bottom-[35%] left-[12%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">🌐</div>
          </>
        );

      /* ─────────────────────── KNOWLEDGEBASE / FAQ / CONTACT ─────────────────────── */
      case "knowledgebase":
      case "faq":
      case "contact":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-36" top="top-16" />
            <TechAccentPanels skew="-skew-y-6" top="top-[22%]" />
            <GlowingPills align="right" top="top-[25%]" />
            <GlowingPills align="left" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[30%] right-[18%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">❓</div>
            <div className="absolute bottom-[32%] left-[12%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">❓</div>
          </>
        );

      /* ─────────────────────── LEGAL ─────────────────────── */
      case "terms":
      case "privacy":
      case "refund":
      case "aup":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-24" top="top-36" />
            <TechAccentPanels skew="skew-y-3" top="top-[14%]" />
            <GlowingPills align="left" top="top-[20%]" />
            <GlowingPills align="right" top="top-[70%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[28%] right-[14%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">§</div>
            <div className="absolute bottom-[28%] left-[16%] text-[#3388FF]/[0.08] font-mono text-2xl select-none pointer-events-none">§</div>
          </>
        );

      /* ─────────────────────── TOOLS ─────────────────────── */
      case "tools":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-24" top="top-16" />
            <TechAccentPanels skew="-skew-y-6" top="top-[10%]" />
            <GlowingPills align="right" top="top-[20%]" />
            <GlowingPills align="left" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[28%] right-[16%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">⚡</div>
            <div className="absolute bottom-[30%] left-[12%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">⚡</div>
          </>
        );

      /* ─────────────────────── MC STATUS ─────────────────────── */
      case "mc-status":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-20" top="top-28" />
            <TechAccentPanels skew="skew-y-6" top="top-[18%]" />
            <GlowingPills align="left" top="top-[22%]" />
            <GlowingPills align="right" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[26%] left-[14%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">📶</div>
            <div className="absolute bottom-[32%] right-[14%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">📶</div>
          </>
        );

      /* ─────────────────────── MOTD ─────────────────────── */
      case "motd":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-28" top="top-36" />
            <TechAccentPanels skew="-skew-y-3" top="top-[25%]" />
            <GlowingPills align="right" top="top-[15%]" />
            <GlowingPills align="left" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[30%] left-[16%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">📝</div>
            <div className="absolute bottom-[35%] right-[20%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">📝</div>
          </>
        );

      /* ─────────────────────── UUID ─────────────────────── */
      case "uuid":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-16" top="top-20" />
            <TechAccentPanels skew="-skew-y-6" top="top-[12%]" />
            <GlowingPills align="right" top="top-[25%]" />
            <GlowingPills align="left" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[20%] right-[12%] text-[#3388FF]/[0.12] font-mono text-2xl select-none pointer-events-none">#</div>
            <div className="absolute bottom-[36%] left-[10%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">#</div>
          </>
        );

      /* ─────────────────────── SKIN ─────────────────────── */
      case "skin":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-24" top="top-28" />
            <TechAccentPanels skew="skew-y-3" top="top-[22%]" />
            <GlowingPills align="left" top="top-[18%]" />
            <GlowingPills align="right" top="top-[70%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[18%] right-[18%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">👤</div>
            <div className="absolute bottom-[28%] left-[14%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">👤</div>
          </>
        );

      /* ─────────────────────── CIRCLE ─────────────────────── */
      case "circle":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-16" top="top-12" />
            <TechAccentPanels skew="-skew-y-3" top="top-[16%]" />
            <GlowingPills align="right" top="top-[30%]" />
            <GlowingPills align="left" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute bottom-[33%] left-[10%] text-primary-cyan/[0.12] font-mono text-2xl select-none pointer-events-none">○</div>
            <div className="absolute top-[38%] right-[32%] text-[#3388FF]/[0.10] font-mono text-2xl select-none pointer-events-none">○</div>
          </>
        );

      /* ─────────────────────── WHITELIST ─────────────────────── */
      case "whitelist":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-20" top="top-24" />
            <TechAccentPanels skew="skew-y-6" top="top-[20%]" />
            <GlowingPills align="left" top="top-[15%]" />
            <GlowingPills align="right" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[50%] right-[24%] text-primary-cyan/[0.08] font-mono text-xl select-none pointer-events-none">✓</div>
            <div className="absolute bottom-[48%] left-[22%] text-[#3388FF]/[0.08] font-mono text-xl select-none pointer-events-none">✓</div>
          </>
        );

      /* ─────────────────────── NBT ─────────────────────── */
      case "nbt":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-20" top="top-28" />
            <TechAccentPanels skew="-skew-y-6" top="top-[15%]" />
            <GlowingPills align="right" top="top-[25%]" />
            <GlowingPills align="left" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[26%] right-[14%] text-primary-cyan/[0.10] font-mono text-xl select-none pointer-events-none">&#123; &#125;</div>
            <div className="absolute bottom-[30%] left-[12%] text-[#3388FF]/[0.08] font-mono text-xl select-none pointer-events-none">[ ]</div>
          </>
        );

      /* ─────────────────────── SERVER PROPERTIES ─────────────────────── */
      case "server-properties":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-16" top="top-24" />
            <TechAccentPanels skew="skew-y-3" top="top-[18%]" />
            <GlowingPills align="left" top="top-[30%]" />
            <GlowingPills align="right" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[30%] right-[16%] text-primary-cyan/[0.10] font-mono text-2xl select-none pointer-events-none">⚙</div>
            <div className="absolute bottom-[36%] left-[14%] text-[#3388FF]/[0.08] font-mono text-2xl select-none pointer-events-none">⚙</div>
          </>
        );

      /* ─────────────────────── COORDINATE CALCULATOR ─────────────────────── */
      case "coordinate-calculator":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-right-20" top="top-24" />
            <TechAccentPanels skew="-skew-y-6" top="top-[20%]" />
            <GlowingPills align="right" top="top-[25%]" />
            <GlowingPills align="left" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[54%] right-[22%] text-primary-cyan/[0.08] font-mono text-xl select-none pointer-events-none">⊕</div>
            <div className="absolute bottom-[52%] left-[22%] text-[#3388FF]/[0.08] font-mono text-xl select-none pointer-events-none">⊕</div>
          </>
        );

      /* ─────────────────────── TICK CALCULATOR ─────────────────────── */
      case "tick-calculator":
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-24" top="top-20" />
            <TechAccentPanels skew="skew-y-3" top="top-[18%]" />
            <GlowingPills align="left" top="top-[30%]" />
            <GlowingPills align="right" top="top-[60%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
            <div className="absolute top-[50%] right-[22%] text-primary-cyan/[0.08] font-mono text-xl select-none pointer-events-none">⏱</div>
            <div className="absolute bottom-[50%] left-[22%] text-[#3388FF]/[0.07] font-mono text-xl select-none pointer-events-none">⏱</div>
          </>
        );

      /* ─────────────────────── DEFAULT ─────────────────────── */
      default:
        return (
          <>
            <AmbientGlows />
            <VectorRings left="-left-24" top="top-20" />
            <TechAccentPanels skew="skew-y-3" top="top-[18%]" />
            <GlowingPills align="left" top="top-[35%]" />
            <GlowingPills align="right" top="top-[65%]" />
            <DiagonalStripes />
            <SporeParticles />
            <FloatingCrosses />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -5 }}>
      {/* Global subtle grid with same visual intensity as homepage grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      {getShapes()}
    </div>
  );
}
