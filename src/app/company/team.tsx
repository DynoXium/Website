"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Shield,
  Activity,
  UserCheck,
  Star,
  Server,
  Crown,
  TrendingUp,
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  badgeColor: string;
  description: string;
  image: string;
  theme: "red" | "green" | "amber" | "cyan";
  icon: React.ComponentType<any>;
}

export default function TeamPage() {
  const [mounted, setMounted] = useState(false);

  // Carousel States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [dragDisplacement, setDragDisplacement] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const team: TeamMember[] = [
    {
      name: "Kr Arjan",
      role: "FOUNDER & CTO",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description: "Kr Arjan is responsible for shaping the company's vision, engineering, and infrastructure. With a strong passion for cloud technologies, virtualization, and scalable hosting solutions, he is committed to building a platform that combines performance, reliability, security, and outstanding customer support. His goal is to ensure DynoXium continues to provide trusted hosting services that empower individuals, developers, and businesses alike.",
      image: "/team/arjan.webp",
      theme: "amber",
      icon: Crown,
    },
    {
      name: "Randeep Royal",
      role: "Co-Founder & CEO",
      badgeColor: "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20",
      description: "Randeep Royal plays a key role in leading DynoXium's growth and daily operations. With a strong focus on customer experience, innovation, and service quality, he is committed to building a hosting platform that businesses, developers, and gamers can rely on.",
      image: "/team/randeep.webp",
      theme: "cyan",
      icon: TrendingUp,
    },
  ];

  // Drag & Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartX(e.pageX);
    setDragDisplacement(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsMouseDown(true);
    setStartX(e.touches[0].clientX);
    setDragDisplacement(0);
  };

  const handleMouseLeave = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);

    const threshold = 80;
    const maxSlide = Math.max(0, team.length - visibleSlides);
    if (dragDisplacement < -threshold) {
      setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
    } else if (dragDisplacement > threshold) {
      setCurrentSlide((prev) => Math.max(0, prev - 1));
    }
    setDragDisplacement(0);
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);

    const threshold = 80;
    const maxSlide = Math.max(0, team.length - visibleSlides);
    if (dragDisplacement < -threshold) {
      setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
    } else if (dragDisplacement > threshold) {
      setCurrentSlide((prev) => Math.max(0, prev - 1));
    }
    setDragDisplacement(0);
  };

  const handleTouchEnd = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);

    const threshold = 80;
    const maxSlide = Math.max(0, team.length - visibleSlides);
    if (dragDisplacement < -threshold) {
      setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
    } else if (dragDisplacement > threshold) {
      setCurrentSlide((prev) => Math.max(0, prev - 1));
    }
    setDragDisplacement(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    let diffX = e.pageX - startX;

    const maxSlide = Math.max(0, team.length - visibleSlides);

    // Dampen drag past first and last slides
    if (currentSlide === 0 && diffX > 0) {
      diffX = diffX * 0.45;
    } else if (currentSlide === maxSlide && diffX < 0) {
      diffX = diffX * 0.45;
    }

    setDragDisplacement(diffX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMouseDown) return;
    let diffX = e.touches[0].clientX - startX;

    const maxSlide = Math.max(0, team.length - visibleSlides);

    if (currentSlide === 0 && diffX > 0) {
      diffX = diffX * 0.45;
    } else if (currentSlide === maxSlide && diffX < 0) {
      diffX = diffX * 0.45;
    }

    setDragDisplacement(diffX);
  };

  // Viewport resize detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay logic
  useEffect(() => {
    const maxSlide = Math.max(0, team.length - visibleSlides);
    const interval = setInterval(() => {
      if (isMouseDown) return; // Pause autoplay when dragging
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [visibleSlides, isMouseDown, team.length]);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip flex flex-col justify-between" style={{ isolation: 'isolate' }}>
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
      <section className="relative pt-28 sm:pt-40 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto z-10 flex-shrink-0 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-6 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)] reveal-up delay-75">
          The People Behind DynoXium
        </div>
        <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest text-white mb-6 uppercase leading-none break-words reveal-up delay-100">
          THE <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Team</span>
        </h1>
        <p className="text-base sm:text-lg text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium reveal-up delay-150">
          Meet the Team Behind DynoXium
        </p>
      </section>

      {/* DRAGGABLE CAROUSEL VIEWPORT */}
      <section className="relative w-full py-8 px-4 sm:px-8 lg:px-16 z-20 flex-grow flex flex-col justify-center max-w-7xl mx-auto overflow-hidden reveal-scale delay-200">

        {/* Drag Container */}
        <div
          onMouseDown={team.length > visibleSlides ? handleMouseDown : undefined}
          onMouseLeave={team.length > visibleSlides ? handleMouseLeave : undefined}
          onMouseUp={team.length > visibleSlides ? handleMouseUp : undefined}
          onMouseMove={team.length > visibleSlides ? handleMouseMove : undefined}
          onTouchStart={team.length > visibleSlides ? handleTouchStart : undefined}
          onTouchEnd={team.length > visibleSlides ? handleTouchEnd : undefined}
          onTouchMove={team.length > visibleSlides ? handleTouchMove : undefined}
          className={`relative overflow-hidden w-full py-4 ${team.length > visibleSlides ? "cursor-ew-resize select-none active:cursor-grabbing" : ""
            }`}
        >
          <div
            className={`flex w-full ${team.length <= visibleSlides ? "justify-center" : ""}`}
            style={
              team.length <= visibleSlides
                ? {}
                : {
                  transform: `translateX(calc(${-currentSlide * (100 / visibleSlides)}% + ${dragDisplacement}px))`,
                  transition: isMouseDown ? "none" : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }
            }
          >
            {team.map((member) => {
              const Icon = member.icon;
              const theme = member.theme;

              let accentColor = "text-primary-cyan";
              let borderGlow = "group-hover:border-primary-cyan/40 group-hover:shadow-[0_0_30px_rgba(108,244,255,0.08)]";
              let iconBox = "bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan";
              if (theme === "red") {
                accentColor = "text-red-400";
                borderGlow = "group-hover:border-red-500/40 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.08)]";
                iconBox = "bg-red-500/10 border-red-500/20 text-red-400";
              } else if (theme === "green") {
                accentColor = "text-success-teal";
                borderGlow = "group-hover:border-success-teal/40 group-hover:shadow-[0_0_30px_rgba(0,229,163,0.08)]";
                iconBox = "bg-success-teal/10 border-success-teal/20 text-success-teal";
              } else if (theme === "amber") {
                accentColor = "text-amber-400";
                borderGlow = "group-hover:border-amber-500/40 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]";
                iconBox = "bg-amber-500/10 border-amber-500/20 text-amber-400";
              }

              return (
                <div
                  key={member.name}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 group flex flex-col items-center snap-center"
                >
                  <div
                    className={`relative w-full metallic-card rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/60 p-6 pb-12 flex flex-col justify-between space-y-6 transition-all duration-300 ${borderGlow}`}
                  >
                    {/* Tech bracket accents positioned directly on extreme edges without text overlap */}
                    <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                    <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />
                    <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80 group-hover:border-primary-cyan/40 transition-colors" />

                    <div className="space-y-4">
                      {/* Member Avatar */}
                      <div className="relative w-full aspect-[4/3] rounded-xl bg-[#131929] overflow-hidden border border-[#2A3650]/60 flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1321]/90 via-transparent to-transparent z-10" />

                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.parentElement?.querySelector(".member-fallback") as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />

                        {/* Fallback Graphic */}
                        <div className="member-fallback absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-[#12192c] to-[#0b0e17] text-text-muted/40 font-mono text-[10px] uppercase tracking-wider select-none z-0">
                          <Users className="h-10 w-10 text-primary-cyan/20 mb-2 group-hover:scale-110 transition-transform duration-500" />
                          <span>Image Placeholder</span>
                          <span className="text-[9px] text-[#A0AEC0]/30 mt-1 font-mono">{member.image.split("/").pop()}</span>
                        </div>
                      </div>

                      {/* Details Header */}
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8.5 h-8.5 rounded-lg border flex items-center justify-center transition-all duration-300 ${iconBox}`}>
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <h3 className="font-display text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                            {member.name}
                          </h3>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${member.badgeColor}`}>
                          {member.role}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide dots pagination */}
        {team.length > visibleSlides && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: team.length - visibleSlides + 1 }).map((_, i) => {
              const isActive = currentSlide === i;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-300 ${isActive
                    ? "w-3 h-3 rounded-sm rotate-45 bg-primary-cyan shadow-[0_0_10px_var(--color-primary-theme-glow)]"
                    : "w-2 h-2 rounded-sm bg-[#2A3650]/80 hover:bg-text-muted"
                    }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Footer spacer */}
      <div className="h-16 flex-shrink-0" />
    </div>
  );
}
