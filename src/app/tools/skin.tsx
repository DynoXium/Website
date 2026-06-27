"use client";

import React, { useState } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  Search,
  User,
  Download,
  Eye,
  Layers,
  ArrowUpRight,
} from "lucide-react";

interface SkinProfile {
  username: string;
  uuid: string;
}

export default function SkinDownloader() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<SkinProfile | null>(null);

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(url, "_blank");
    }
  };

  const fetchPlayer = async (searchQuery: string) => {
    const term = searchQuery.trim();
    if (!term) return;

    setLoading(true);
    setError("");
    setProfile(null);

    try {
      const res = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(term)}`);
      if (!res.ok) {
        throw new Error("Minecraft player not found. Check username or UUID.");
      }
      const data = await res.json();
      if (!data.success || !data.data?.player) {
        throw new Error("Minecraft player not found.");
      }

      const p = data.data.player;
      setProfile({
        username: p.username,
        uuid: p.id,
      });
    } catch (err: any) {
      setError(err.message || "Failed to lookup player skin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPlayer(query);
  };

  const handlePopularClick = (name: string) => {
    setQuery(name);
    fetchPlayer(name);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto pt-28 sm:pt-44 pb-20 px-4 sm:px-6 relative z-10 space-y-12">
        <BackToToolsLink />

        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-up delay-75">
          <h1 className="font-norwester text-2xl sm:text-4xl md:text-7xl tracking-wide md:tracking-widest text-white uppercase leading-none reveal-up delay-100">
            Skin <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Downloader</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            View and download Minecraft skins with multiple format options.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="max-w-4xl mx-auto space-y-8 reveal-up delay-200">
          
          {/* SEARCH BOX */}
          <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
            
            <div className="space-y-1">
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <User className="h-4 w-4 text-primary-cyan" />
                Player Lookup
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan/30 to-success-teal/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative flex items-center bg-[#070A14] border border-[#2A3650]/60 rounded-xl p-1.5 focus-within:border-primary-cyan/60">
                <input
                  type="text"
                  placeholder="Enter Minecraft username or UUID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white pl-4 pr-4 py-2 font-mono font-bold text-xs focus:outline-none placeholder-text-muted"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-cyan border border-primary-cyan hover:bg-transparent hover:text-primary-cyan text-[#0B0F19] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-lg transition-all shadow-[0_0_12px_rgba(108,244,255,0.15)] cursor-pointer flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Searching..." : "Find Player"}
                </button>
              </div>
            </form>

            {/* Popular lists */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#2A3650]/20">
              <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Try these popular players:</span>
              {["Notch", "technoblade", "Dream", "notgamerfleet", "MumboJumbo"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handlePopularClick(name)}
                  className="px-2.5 py-1 rounded bg-[#070A14] hover:bg-primary-cyan/10 border border-[#2A3650]/60 hover:border-primary-cyan/30 text-white/80 hover:text-primary-cyan font-mono text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* LOADER & ERROR */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-10 h-10 border-4 border-primary-cyan/20 border-t-primary-cyan rounded-full animate-spin" />
              <span className="text-xs text-text-muted font-mono font-bold uppercase tracking-wider animate-pulse">Downloading Skin Assets...</span>
            </div>
          )}

          {error && (
            <div className="max-w-xl mx-auto rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-center text-red-400 text-xs sm:text-sm font-medium">
              <span>{error}</span>
            </div>
          )}

          {/* PROFILE SKIN VIEW */}
          {profile && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Panel: Skins View Renders */}
              <div className="md:col-span-7 rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between">
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
                
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Visualizations</span>
                
                {/* Visualizations Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 flex-grow items-center justify-items-center">
                  
                  {/* Front Body Render */}
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-[9px] font-mono font-bold text-text-muted uppercase">Front</span>
                    <div className="w-28 sm:w-32 h-40 sm:h-44 rounded-xl border border-[#2A3650]/40 bg-[#070A14] flex items-center justify-center p-2">
                      <img
                        src={`https://mc-heads.net/body/${profile.uuid}/100`}
                        alt="Front skin render"
                        className="h-full object-contain select-none"
                      />
                    </div>
                  </div>

                  {/* Back Body Render */}
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-[9px] font-mono font-bold text-text-muted uppercase">Back</span>
                    <div className="w-28 sm:w-32 h-40 sm:h-44 rounded-xl border border-[#2A3650]/40 bg-[#070A14] flex items-center justify-center p-2">
                      <img
                        src={`https://mc-heads.net/player/${profile.uuid}/100`}
                        alt="Back skin render"
                        className="h-full object-contain select-none"
                      />
                    </div>
                  </div>

                  {/* Avatar Head Render */}
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-[9px] font-mono font-bold text-text-muted uppercase">2D Head</span>
                    <div className="w-28 sm:w-32 h-40 sm:h-44 rounded-xl border border-[#2A3650]/40 bg-[#070A14] flex items-center justify-center p-4">
                      <img
                        src={`https://mc-heads.net/avatar/${profile.uuid}/80`}
                        alt="Head avatar render"
                        className="w-16 h-16 object-contain rounded-xl select-none"
                      />
                    </div>
                  </div>

                  {/* 3D Head Render */}
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-[9px] font-mono font-bold text-text-muted uppercase">3D Head</span>
                    <div className="w-28 sm:w-32 h-40 sm:h-44 rounded-xl border border-[#2A3650]/40 bg-[#070A14] flex items-center justify-center p-4">
                      <img
                        src={`https://mc-heads.net/head/${profile.uuid}/80`}
                        alt="Head 3D render"
                        className="w-16 h-16 object-contain rounded-xl select-none"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Panel: Downloads Grid */}
              <div className="md:col-span-5 rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between">
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
                
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Downloads</span>
                  <h4 className="font-display text-base font-extrabold text-white uppercase tracking-wider">
                    {profile.username}
                  </h4>
                  <p className="text-[10px] text-text-muted font-mono font-bold uppercase truncate">
                    UUID: {profile.uuid}
                  </p>
                </div>

                <div className="space-y-3 py-4">
                  {/* Raw Texture Download */}
                  <button
                    onClick={() => downloadImage(`https://mc-heads.net/download/${profile.uuid}`, `${profile.username}_skin.png`)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-primary-cyan/30 bg-primary-cyan/5 text-primary-cyan text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary-cyan/10 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="h-4 w-4" />
                      <span>Download Raw Skin (.png)</span>
                    </div>
                    <Download className="h-4 w-4" />
                  </button>

                  {/* 2D Head Download */}
                  <button
                    onClick={() => downloadImage(`https://mc-heads.net/avatar/${profile.uuid}/256`, `${profile.username}_head_2d.png`)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white transition-all hover:border-[#2A3650]/80 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="h-4 w-4" />
                      <span>Download 2D Head (.png)</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  {/* 3D Head Download */}
                  <button
                    onClick={() => downloadImage(`https://mc-heads.net/head/${profile.uuid}/256`, `${profile.username}_head_3d.png`)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white transition-all hover:border-[#2A3650]/80 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="h-4 w-4" />
                      <span>Download 3D Head (.png)</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  {/* Body Render Download */}
                  <button
                    onClick={() => downloadImage(`https://mc-heads.net/body/${profile.uuid}/400`, `${profile.username}_body.png`)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white transition-all hover:border-[#2A3650]/80 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="h-4 w-4" />
                      <span>Download Full Body (.png)</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-[9px] font-mono text-text-muted text-center uppercase tracking-wider select-none leading-relaxed">
                  Skin texture is resolved from Minecraft's skin databases via Mojang APIs.
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
