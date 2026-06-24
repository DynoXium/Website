"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative w-full min-h-[110vh] flex flex-col items-center justify-center px-4 pt-36 pb-16 overflow-hidden">
      
      {/* Dynamic Style injection to remove main layout padding for a clean full-screen look and define animations */}
      <style>{`
        main {
          padding-bottom: 0 !important;
        }
        @keyframes eyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(47, 130, 253, 0.3), 0 0 0 rgba(47, 130, 253, 0);
          }
          50% {
            box-shadow: 0 4px 25px rgba(47, 130, 253, 0.55), 0 0 15px rgba(47, 130, 253, 0.35);
          }
        }
        .floating-monster {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .pulsing-btn {
          animation: pulseGlow 2.5s infinite ease-in-out;
        }
        .robot-eye {
          animation: eyeBlink 4s infinite;
          transform-origin: 43px;
        }
        .robot-eye-left {
          transform-origin: 108px 43px;
        }
        .robot-eye-right {
          transform-origin: 142px 43px;
        }
      `}</style>

      {/* Decorative Corner Pixel Blocks */}
      {/* Top-Right Cluster */}
      <div className="absolute top-24 right-6 sm:right-16 opacity-30 pointer-events-none select-none z-0">
        <div className="grid grid-cols-3 gap-1.5">
          <div className="w-5 h-5 bg-primary-cyan/10" />
          <div className="w-5 h-5 bg-primary-cyan/20" />
          <div className="w-5 h-5 bg-primary-cyan/40 animate-pulse [animation-delay:0.2s]" />
          <div className="w-5 h-5 bg-transparent" />
          <div className="w-5 h-5 bg-primary-cyan/10" />
          <div className="w-5 h-5 bg-primary-cyan/30 animate-pulse [animation-delay:0.4s]" />
          <div className="w-5 h-5 bg-transparent" />
          <div className="w-5 h-5 bg-transparent" />
          <div className="w-5 h-5 bg-primary-cyan/20" />
        </div>
      </div>

      {/* Bottom-Left Cluster */}
      <div className="absolute bottom-20 left-6 sm:left-16 opacity-30 pointer-events-none select-none z-0">
        <div className="grid grid-cols-3 gap-1.5">
          <div className="w-5 h-5 bg-primary-cyan/20" />
          <div className="w-5 h-5 bg-transparent" />
          <div className="w-5 h-5 bg-transparent" />
          <div className="w-5 h-5 bg-primary-cyan/30 animate-pulse [animation-delay:0.3s]" />
          <div className="w-5 h-5 bg-primary-cyan/10" />
          <div className="w-5 h-5 bg-transparent" />
          <div className="w-5 h-5 bg-primary-cyan/40 animate-pulse [animation-delay:0.1s]" />
          <div className="w-5 h-5 bg-primary-cyan/20" />
          <div className="w-5 h-5 bg-primary-cyan/10" />
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-cyan/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto -mt-16 sm:-mt-24 space-y-8 page-open-rise">
        
        {/* "PAGE UNREACHABLE" Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/25 bg-[#0E1321]/90 text-[10px] sm:text-xs font-mono font-bold text-red-400 uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.08)] select-none">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Page Unreachable</span>
        </div>

        {/* Increased Size Custom SVG Blocky 404 Monster */}
        <div className="w-[340px] sm:w-[520px] md:w-[640px] lg:w-[720px] aspect-[25/11] flex items-center justify-center floating-monster">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#2F82FD] drop-shadow-[0_0_20px_rgba(47,130,253,0.25)]"
          >
            {/* LEFT "4" */}
            <g fill="currentColor">
              <rect x="5" y="10" width="16" height="50" rx="3" />
              <rect x="5" y="50" width="60" height="16" rx="3" />
              <rect x="49" y="10" width="16" height="90" rx="3" />
            </g>

            {/* CENTER "0" - ROBOT FACE */}
            <g>
              {/* Outer Face Box */}
              <rect x="80" y="10" width="90" height="90" rx="16" fill="currentColor" />
              
              {/* Eyes */}
              <style>{`
                @keyframes eyeBlink {
                  0%, 90%, 100% { transform: scaleY(1); }
                  95% { transform: scaleY(0.1); }
                }
                @keyframes floatSlow {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-12px); }
                }
                .floating-monster {
                  animation: floatSlow 4s ease-in-out infinite;
                }
                .robot-eye {
                  animation: eyeBlink 4s infinite;
                  transform-origin: 43px;
                }
                .robot-eye-left {
                  transform-origin: 108px 43px;
                }
                .robot-eye-right {
                  transform-origin: 142px 43px;
                }
              `}</style>
              <rect className="robot-eye robot-eye-left" x="101" y="35" width="14" height="14" rx="2.5" fill="#0B0F19" />
              <rect className="robot-eye robot-eye-right" x="135" y="35" width="14" height="14" rx="2.5" fill="#0B0F19" />
              
              {/* Mouth container */}
              <rect x="111" y="64" width="28" height="16" rx="2" fill="#0B0F19" />
              
              {/* Teeth */}
              <rect x="113" y="72" width="5" height="8" rx="0.7" fill="currentColor" />
              <rect x="122" y="72" width="5" height="8" rx="0.7" fill="currentColor" />
              <rect x="131" y="72" width="5" height="8" rx="0.7" fill="currentColor" />
            </g>

            {/* RIGHT "4" */}
            <g fill="currentColor">
              <rect x="185" y="10" width="16" height="50" rx="3" />
              <rect x="185" y="50" width="60" height="16" rx="3" />
              <rect x="229" y="10" width="16" height="90" rx="3" />
            </g>
          </svg>
        </div>

        {/* Message */}
        <p className="text-sm sm:text-base text-text-muted font-mono font-medium max-w-md tracking-wide leading-relaxed">
          We can&apos;t seem to find the page you are looking for!
        </p>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#2F82FD] hover:bg-white border border-[#2F82FD] text-white hover:text-[#0B0F19] font-norwester text-sm uppercase tracking-wider py-3.5 px-8 rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(47,130,253,0.3)] hover:shadow-[0_0_25px_rgba(47,130,253,0.5)] hover:-translate-y-0.5 pulsing-btn"
          >
            Back to Home Page
          </Link>
        </div>

      </div>
    </div>
  );
}
