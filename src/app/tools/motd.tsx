"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Copy,
  Download,
  Upload,
  ArrowLeft,
  RefreshCw,
  Sliders,
  CheckCircle,
} from "lucide-react";

interface ColorCode {
  code: string;
  hex: string;
  name: string;
}

interface FormatCode {
  code: string;
  name: string;
  styleClass: string;
  icon: string;
}

const colorCodes: ColorCode[] = [
  { code: "0", hex: "#000000", name: "Black" },
  { code: "1", hex: "#0000AA", name: "Dark Blue" },
  { code: "2", hex: "#00AA00", name: "Dark Green" },
  { code: "3", hex: "#00AAAA", name: "Dark Aqua" },
  { code: "4", hex: "#AA0000", name: "Dark Red" },
  { code: "5", hex: "#AA00AA", name: "Dark Purple" },
  { code: "6", hex: "#FFAA00", name: "Gold" },
  { code: "7", hex: "#AAAAAA", name: "Gray" },
  { code: "8", hex: "#555555", name: "Dark Gray" },
  { code: "9", hex: "#5555FF", name: "Blue" },
  { code: "a", hex: "#55FF55", name: "Green" },
  { code: "b", hex: "#55FFFF", name: "Aqua" },
  { code: "c", hex: "#FF5555", name: "Red" },
  { code: "d", hex: "#FF55FF", name: "Light Purple" },
  { code: "e", hex: "#FFFF55", name: "Yellow" },
  { code: "f", hex: "#FFFFFF", name: "White" },
];

const formatCodes: FormatCode[] = [
  { code: "l", name: "Bold", styleClass: "font-bold", icon: "B" },
  { code: "o", name: "Italic", styleClass: "italic", icon: "I" },
  { code: "n", name: "Underline", styleClass: "underline", icon: "U" },
  { code: "m", name: "Strikethrough", styleClass: "line-through", icon: "S" },
  { code: "k", name: "Obfuscated", styleClass: "obfuscated-text animate-pulse", icon: "k" },
  { code: "r", name: "Reset", styleClass: "", icon: "Reset" },
];

const symbols = ["★", "✦", "❤", "⚡", "»", "«", "▬", "●", "♦", "➔"];

const templates = [
  {
    name: "DynoXium Classic",
    text: "§d§lDynoXium §f· §eFree Node Tier\n§b» §fJoin §a3,000+ §factive servers §b«",
  },
  {
    name: "Clean Adventure",
    text: "§fWelcome to §6§lAdventureWorld §f[1.20.4]\n§e§l50% OUT-OF-BOX BOOST §a· §fActive Nodes",
  },
  {
    name: "Glowing PvP Network",
    text: "§5⚡ §d§lSpacePvP Network §5⚡ §7[1.8-1.21]\n§b§nplay.spacepvp.net §r§e· §fSurvival & Skyblock",
  },
];

export default function MotdEditor() {
  const [motdText, setMotdText] = useState(
    "§6✦ §lWelcome to §b§lMy Server §6✦\n§e» §aJoin the adventure today! §e«"
  );
  const [line1Len, setLine1Len] = useState(0);
  const [line2Len, setLine2Len] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedProps, setCopiedProps] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Parse lines and compute lengths (ignoring formatting codes)
  useEffect(() => {
    const lines = motdText.split("\n");
    const getCleanLength = (str: string) => {
      if (!str) return 0;
      return str.replace(/§[0-9a-fk-or]/gi, "").length;
    };
    setLine1Len(getCleanLength(lines[0] || ""));
    setLine2Len(getCleanLength(lines[1] || ""));
  }, [motdText]);

  // Insert code at cursor position
  const insertCode = (code: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    setMotdText(before + code + after);
    
    // Reset focus and cursor position after render
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + code.length, start + code.length);
    }, 10);
  };

  // Convert § to server.properties escape unicode format \u00A7
  const getPropertiesCode = () => {
    return `motd=${motdText.replace(/\n/g, "\\n").replace(/§/g, "\\u00A7")}`;
  };

  // Copy to clipboard helpers
  const handleCopyCode = () => {
    navigator.clipboard.writeText(motdText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyProps = () => {
    navigator.clipboard.writeText(getPropertiesCode());
    setCopiedProps(true);
    setTimeout(() => setCopiedProps(false), 2000);
  };

  const downloadPropertiesFile = () => {
    const element = document.createElement("a");
    const file = new Blob([getPropertiesCode()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "server.properties";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Render text helper to HTML spans
  const parseMotdToHtml = (text: string) => {
    if (!text) return { __html: "" };
    
    // Split text by formatting sections
    const regex = /(§[0-9a-fk-or])/gi;
    const parts = text.split(regex);
    
    let currentHtml = "";
    let activeStyles = {
      color: "#FFFFFF",
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      obfuscated: false,
    };

    const getStyleString = () => {
      let styles = `color: ${activeStyles.color};`;
      if (activeStyles.bold) styles += " font-weight: bold;";
      if (activeStyles.italic) styles += " font-style: italic;";
      let textDecoration = "";
      if (activeStyles.underline) textDecoration += " underline";
      if (activeStyles.strikethrough) textDecoration += " line-through";
      if (textDecoration) styles += ` text-decoration:${textDecoration};`;
      return styles;
    };

    parts.forEach((part) => {
      if (part.startsWith("§")) {
        const code = part.charAt(1).toLowerCase();
        
        // Find color
        const color = colorCodes.find((c) => c.code === code);
        if (color) {
          activeStyles.color = color.hex;
          activeStyles.bold = false;
          activeStyles.italic = false;
          activeStyles.underline = false;
          activeStyles.strikethrough = false;
          activeStyles.obfuscated = false;
          return;
        }

        // Handle formatting
        if (code === "l") activeStyles.bold = true;
        else if (code === "o") activeStyles.italic = true;
        else if (code === "n") activeStyles.underline = true;
        else if (code === "m") activeStyles.strikethrough = true;
        else if (code === "k") activeStyles.obfuscated = true;
        else if (code === "r") {
          activeStyles = {
            color: "#FFFFFF",
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            obfuscated: false,
          };
        }
      } else {
        // Text segment
        if (part) {
          let cleanText = part
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
          if (activeStyles.obfuscated) {
            cleanText = cleanText.split("").map(() => {
              const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
              return chars.charAt(Math.floor(Math.random() * chars.length));
            }).join("");
          }
          
          currentHtml += `<span style="${getStyleString()}">${cleanText}</span>`;
        }
      }
    });

    return { __html: currentHtml };
  };

  const lines = motdText.split("\n");
  const line1Html = parseMotdToHtml(lines[0] || "");
  const line2Html = parseMotdToHtml(lines[1] || "");

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
            MOTD <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Editor</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium">
            Create stunning, animated MOTDs for your Minecraft server with colors and formatting.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* LEFT EDITING PANEL (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Format & Style Controls */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              {/* Colors selection */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Colors</span>
                <div className="flex flex-wrap gap-2.5">
                  {colorCodes.map((color) => (
                    <button
                      key={color.code}
                      onClick={() => insertCode(`§${color.code}`)}
                      title={color.name}
                      style={{ backgroundColor: color.hex }}
                      className="w-6 h-6 rounded-full border border-white/20 cursor-pointer transition-transform hover:scale-115 active:scale-95 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    />
                  ))}
                </div>
              </div>

              {/* Formatting selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#2A3650]/40">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Formats</span>
                  <div className="flex flex-wrap gap-2">
                    {formatCodes.map((fmt) => (
                      <button
                        key={fmt.code}
                        onClick={() => insertCode(`§${fmt.code}`)}
                        title={fmt.name}
                        className="px-3 py-1.5 rounded-lg border border-[#2A3650]/60 bg-[#070A14] text-white font-mono text-xs font-bold transition-all hover:border-primary-cyan/40 hover:text-primary-cyan cursor-pointer active:scale-95"
                      >
                        {fmt.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symbols selection */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Symbols</span>
                  <div className="flex flex-wrap gap-1.5">
                    {symbols.map((sym) => (
                      <button
                        key={sym}
                        onClick={() => insertCode(sym)}
                        className="w-7 h-7 rounded-lg border border-[#2A3650]/60 bg-[#070A14] text-white flex items-center justify-center text-xs font-bold transition-all hover:border-primary-cyan/40 hover:text-primary-cyan cursor-pointer active:scale-95"
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Templates & Imports row */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#2A3650]/40 relative">
                <div className="relative">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary-cyan/30 bg-primary-cyan/10 text-primary-cyan text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary-cyan/20 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Templates</span>
                  </button>
                  {showTemplates && (
                    <div className="absolute left-0 bottom-full mb-2 w-56 rounded-2xl border border-[#2A3650] bg-[#0E1321] p-2 shadow-2xl z-30 space-y-1">
                      {templates.map((tpl) => (
                        <button
                          key={tpl.name}
                          onClick={() => {
                            setMotdText(tpl.text);
                            setShowTemplates(false);
                          }}
                          className="w-full text-left p-2.5 rounded-xl text-xs font-medium text-text-light hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          {tpl.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setMotdText("§6✦ §lWelcome to §b§lMy Server §6✦\n§e» §aJoin the adventure today! §e«")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted text-xs font-bold uppercase tracking-wider transition-all hover:border-primary-cyan/40 hover:text-white cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset Editor</span>
                </button>
              </div>
            </div>

            {/* MOTD Input Field */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary-cyan" />
                  MOTD Code
                </span>
                <div className="flex gap-3">
                  <span className={line1Len > 45 ? "text-red-400" : "text-text-muted"}>Line 1: {line1Len}/45</span>
                  <span className={line2Len > 45 ? "text-red-400" : "text-text-muted"}>Line 2: {line2Len}/45</span>
                </div>
              </div>

              <textarea
                ref={textareaRef}
                value={motdText}
                onChange={(e) => setMotdText(e.target.value)}
                placeholder="Line 1\nLine 2"
                rows={4}
                className="w-full p-4 rounded-2xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-sm font-semibold focus:border-primary-cyan/60 focus:outline-none transition-colors leading-relaxed"
              />

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold text-xs uppercase tracking-widest bg-primary-cyan border-primary-cyan text-[#0B0F19] hover:bg-transparent hover:text-primary-cyan transition-all shadow-[0_0_15px_rgba(108,244,255,0.15)] cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy MOTD Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT PREVIEW & CONFIG PANEL (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Client Preview */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md">
              <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Live Preview</span>
              
              {/* Simulated Server Entry */}
              <div className="rounded-2xl border border-[#2A3650]/40 bg-[#070A14] p-4 flex gap-3 relative select-none">
                {/* MC Icon */}
                <div className="w-14 h-14 rounded-lg bg-emerald-700/80 border border-emerald-500/30 flex items-center justify-center font-bold text-white text-lg tracking-wider flex-shrink-0 shadow-lg select-none">
                  MC
                </div>

                {/* Server Info */}
                <div className="flex-grow space-y-1.5 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-norwester text-sm text-white uppercase tracking-wider font-extrabold leading-none">
                      My Awesome Server
                    </span>
                    
                    {/* Latency & Ping bars */}
                    <div className="flex items-center gap-2 text-[9px] font-mono text-text-muted">
                      <span>127/200</span>
                      <div className="flex items-end gap-[1.5px] h-3.5 pb-0.5">
                        <div className="w-[2.5px] h-1.5 bg-success-teal rounded-sm" />
                        <div className="w-[2.5px] h-2 bg-success-teal rounded-sm" />
                        <div className="w-[2.5px] h-2.5 bg-success-teal rounded-sm" />
                        <div className="w-[2.5px] h-3 bg-success-teal rounded-sm" />
                        <div className="w-[2.5px] h-3.5 bg-success-teal rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* MOTD Rendered Lines */}
                  <div className="font-mono text-[10px] leading-relaxed break-all select-none space-y-0.5">
                    <div dangerouslySetInnerHTML={line1Html} className="min-h-4" />
                    <div dangerouslySetInnerHTML={line2Html} className="min-h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* server.properties Config */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">
                <span>server.properties</span>
                <button
                  onClick={handleCopyProps}
                  className="flex items-center gap-1.5 text-primary-cyan hover:text-primary-cyan/85 transition-colors cursor-pointer font-semibold"
                >
                  {copiedProps ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Output Box */}
              <div className="rounded-xl border border-[#2A3650]/40 bg-[#070A14] p-4 font-mono text-[10px] sm:text-xs text-text-muted break-all leading-normal select-all">
                {getPropertiesCode()}
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={downloadPropertiesFile}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary-cyan/30 bg-primary-cyan/5 text-primary-cyan text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary-cyan/10 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => textareaRef.current?.focus()}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted text-xs font-bold uppercase tracking-wider transition-all hover:border-[#2A3650]/80 hover:text-white cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                  <span>Load File</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
