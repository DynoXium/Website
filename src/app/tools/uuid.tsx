"use client";

import React, { useState } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  Search,
  User,
  Clock,
  Copy,
  CheckCircle,
  HelpCircle,
  Eye,
  Layers,
  Download,
  Shield,
  Calendar,
  Activity,
} from "lucide-react";

interface NameHistoryItem {
  name: string;
  changedToAt?: number;
}

interface PlayerProfile {
  username: string;
  uuid: string;
  uuidFormatted: string;
  skinUrl?: string;
  nameHistory?: NameHistoryItem[];
}

export default function UuidLookup() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [copiedUuid, setCopiedUuid] = useState(false);
  const [copiedRawUuid, setCopiedRawUuid] = useState(false);
  const [copiedUsername, setCopiedUsername] = useState(false);
  const [activeTab, setActiveTab] = useState<"head" | "body" | "skin">("head");

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

  const exportJson = (data: any) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${data.username || "player"}_profile.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);
  };

  const fetchPlayer = async (searchQuery: string) => {
    const term = searchQuery.trim();
    if (!term) return;

    setLoading(true);
    setError("");
    setPlayer(null);

    try {
      // Fetch UUID and username from PlayerDB (reliable, free public API)
      const res = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(term)}`);
      if (!res.ok) {
        throw new Error("Minecraft player not found. Check username or UUID.");
      }
      const data = await res.json();
      if (!data.success || !data.data?.player) {
        throw new Error("Minecraft player not found.");
      }

      const p = data.data.player;
      
      // Parse name history if available (PlayerDB sometimes includes it)
      const rawHistory = p.meta?.name_history || [];
      const nameHistory: NameHistoryItem[] = rawHistory.map((h: any) => ({
        name: h.name,
        changedToAt: h.changedToAt || undefined,
      })).reverse();

      // Format UUID
      const rawUuid = p.raw_id;
      const formattedUuid = p.id;

      setPlayer({
        username: p.username,
        uuid: rawUuid,
        uuidFormatted: formattedUuid,
        skinUrl: `https://mc-heads.net/skin/${rawUuid}`,
        nameHistory: nameHistory.length > 0 ? nameHistory : [{ name: p.username }],
      });
    } catch (err: any) {
      setError(err.message || "Failed to lookup player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPlayer(query);
  };

  const handleQuickTest = (name: string) => {
    setQuery(name);
    fetchPlayer(name);
  };

  const handleCopyText = (text: string, type: "formatted" | "raw" | "username") => {
    navigator.clipboard.writeText(text);
    if (type === "formatted") {
      setCopiedUuid(true);
      setTimeout(() => setCopiedUuid(false), 2000);
    } else if (type === "raw") {
      setCopiedRawUuid(true);
      setTimeout(() => setCopiedRawUuid(false), 2000);
    } else {
      setCopiedUsername(true);
      setTimeout(() => setCopiedUsername(false), 2000);
    }
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
            UUID <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Lookup</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Convert Minecraft usernames to UUIDs, view name history, and check account status.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          
          {/* LEFT COLUMN: SEARCH & USER DETAILS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SEARCH CARD */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Player Lookup</span>
                  <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider">
                    Username <span className="text-primary-cyan">⇄</span> UUID
                  </h3>
                  <p className="text-xs text-text-muted font-sans font-medium">
                    Clean, reliable search with built-in fallbacks.
                  </p>
                </div>
                
                {/* Meta pills to match mockup */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#1C243B] text-[8px] font-mono font-bold text-text-muted uppercase tracking-wider">
                    Live APIs
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1C243B] text-[8px] font-mono font-bold text-text-muted uppercase tracking-wider">
                    Name history
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-primary-cyan/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative flex items-center bg-[#070A14] border border-[#2A3650]/60 rounded-xl p-1.5 focus-within:border-purple-500/60">
                  <span className="text-text-muted font-mono font-bold text-sm pl-3.5 select-none">#</span>
                  <input
                    type="text"
                    placeholder="Enter Minecraft username or UUID"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-white pl-2 pr-4 py-2 font-mono font-bold text-xs focus:outline-none placeholder-text-muted"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 hover:bg-transparent border border-purple-600 text-white hover:text-purple-400 font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all shadow-[0_0_12px_rgba(147,51,234,0.3)] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>Find Player</span>
                  </button>
                </div>
              </form>

              {/* Quick test buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Quick test:</span>
                {["technoblade", "gamerfleet", "YesSmartyPie"].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleQuickTest(name)}
                    className="px-2.5 py-1 rounded bg-[#070A14] hover:bg-purple-500/15 border border-[#2A3650]/60 hover:border-purple-500/30 text-white hover:text-purple-400 font-mono text-[10px] font-bold transition-all cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* PLAYER PROFILE DETAILS (Left Bottom) */}
            {player && !loading && (
              <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl border border-[#2A3650]/60 bg-[#070A14] p-1.5 flex items-center justify-center flex-shrink-0">
                    <img
                      src={`https://mc-heads.net/avatar/${player.uuid}/64`}
                      alt={player.username}
                      className="w-full h-full rounded-xl object-contain select-none"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-wider">
                      {player.username}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-text-muted uppercase"># UUID</span>
                      <span className="font-mono text-xs text-white break-all">{player.uuidFormatted}</span>
                    </div>
                    <button
                      onClick={() => handleCopyText(player.uuidFormatted, "formatted")}
                      className="text-text-muted hover:text-white transition-colors cursor-pointer"
                      title="Copy Formatted UUID"
                    >
                      {copiedUuid ? <CheckCircle className="h-4 w-4 text-purple-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-text-muted uppercase"># Compact</span>
                      <span className="font-mono text-xs text-white break-all">{player.uuid}</span>
                    </div>
                    <button
                      onClick={() => handleCopyText(player.uuid, "raw")}
                      className="text-text-muted hover:text-white transition-colors cursor-pointer"
                      title="Copy Compact UUID"
                    >
                      {copiedRawUuid ? <CheckCircle className="h-4 w-4 text-purple-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => handleCopyText(player.username, "username")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                    <span>{copiedUsername ? "Copied!" : "Copy Username"}</span>
                  </button>

                  <button
                    onClick={() => exportJson(player)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>
            )}

            {/* SEARCH TIPS */}
            <div className="rounded-3xl border border-primary-cyan/10 bg-primary-cyan/3 p-6 space-y-3 relative overflow-hidden backdrop-blur-md">
              <h4 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-display">
                <HelpCircle className="h-4 w-4 text-primary-cyan" />
                <span>Search Tips</span>
              </h4>
              <ul className="text-xs text-[#8E8E93] space-y-1.5 list-disc list-inside font-medium leading-relaxed font-sans">
                <li>Enter any Minecraft username or UUID</li>
                <li>UUIDs can be with or without dashes</li>
                <li>Case doesn't matter for usernames</li>
                <li>Works with both Java and Bedrock accounts</li>
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: PREVIEWS & STATISTICS */}
          <div className="lg:col-span-5 space-y-6">
            
            {loading ? (
              <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-12 text-center flex flex-col items-center justify-center space-y-4 backdrop-blur-md">
                <div className="w-10 h-10 border-4 border-primary-cyan/20 border-t-primary-cyan rounded-full animate-spin" />
                <span className="text-xs text-text-muted font-mono font-bold uppercase tracking-wider animate-pulse">Querying Mojang Database...</span>
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-400 font-medium text-sm space-y-2 backdrop-blur-md">
                <p>{error}</p>
              </div>
            ) : player ? (
              <div className="space-y-6">
                
                {/* 1. PLAYER AVATAR PREVIEW CARD */}
                <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
                  
                  <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
                    Player Avatar
                  </h4>

                  {/* Tabs */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("head")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === "head"
                          ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]"
                          : "bg-[#141B2D] text-text-muted hover:text-white"
                      }`}
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>Head</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("body")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === "body"
                          ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]"
                          : "bg-[#141B2D] text-text-muted hover:text-white"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Body</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("skin")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === "skin"
                          ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]"
                          : "bg-[#141B2D] text-text-muted hover:text-white"
                      }`}
                    >
                      <Layers className="h-3.5 w-3.5" />
                      <span>Skin</span>
                    </button>
                  </div>

                  {/* Active Preview Rendering Container */}
                  <div className="w-full h-56 rounded-2xl bg-[#070A14] border border-[#2A3650]/40 flex items-center justify-center p-4 relative">
                    {activeTab === "head" && (
                      <img
                        src={`https://mc-heads.net/head/${player.uuid}/160`}
                        alt="3D Minecraft Head Render"
                        className="h-full object-contain select-none transition-all duration-300"
                      />
                    )}
                    {activeTab === "body" && (
                      <img
                        src={`https://mc-heads.net/player/${player.uuid}/200`}
                        alt="3D Minecraft Full Body Render"
                        className="h-full object-contain select-none transition-all duration-300"
                      />
                    )}
                    {activeTab === "skin" && (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <img
                          src={`https://mc-heads.net/skin/${player.uuid}`}
                          alt="Raw Skin Sheet"
                          className="max-h-[75%] object-contain select-none transition-all duration-300 [image-rendering:pixelated]"
                        />
                        <span className="text-[9px] font-mono text-text-muted uppercase">Raw Texture Mapping</span>
                      </div>
                    )}
                  </div>

                  {/* Download Skin / Head Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => downloadImage(`https://mc-heads.net/download/${player.uuid}`, `${player.username}_skin.png`)}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 hover:bg-[#141B2D] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Download className="h-4 w-4 text-purple-400" />
                      <span>Download Skin</span>
                    </button>

                    <button
                      onClick={() => {
                        const url = activeTab === "head"
                          ? `https://mc-heads.net/head/${player.uuid}/256`
                          : activeTab === "body"
                          ? `https://mc-heads.net/player/${player.uuid}/400`
                          : `https://mc-heads.net/skin/${player.uuid}`;
                        const filename = `${player.username}_${activeTab}.png`;
                        downloadImage(url, filename);
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 hover:bg-[#141B2D] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Download className="h-4 w-4 text-purple-400" />
                      <span>Download {activeTab === "head" ? "Head" : activeTab === "body" ? "Body" : "Texture"}</span>
                    </button>
                  </div>
                </div>

                {/* 2. ACCOUNT INFO CARD */}
                <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />

                  <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
                    Account Info
                  </h4>

                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2 text-text-muted font-medium">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <span>Account Type</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0E201B] text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/10">
                        Premium
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1 border-t border-[#2A3650]/20">
                      <div className="flex items-center gap-2 text-text-muted font-medium">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span>Name Changes</span>
                      </div>
                      <span className="text-white font-bold font-mono">
                        {player.nameHistory ? player.nameHistory.length - 1 : 0} times
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1 border-t border-[#2A3650]/20">
                      <div className="flex items-center gap-2 text-text-muted font-medium">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <span>Account Age</span>
                      </div>
                      <span className="text-text-muted font-medium">
                        Original name
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. NAME HISTORY CARD */}
                <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />

                  <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
                    Name History
                  </h4>

                  <div className="space-y-2">
                    {player.nameHistory && player.nameHistory.length > 0 ? (
                      player.nameHistory.map((history, idx) => {
                        const isCurrent = idx === 0;
                        const isOriginal = idx === player.nameHistory!.length - 1;
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-[#070A14]/60 border border-[#2A3650]/30 hover:border-[#2A3650]/60 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span className="text-xs font-bold text-white font-mono">{history.name}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase tracking-wider">
                                  Current
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] text-text-muted font-mono uppercase font-bold">
                              {isOriginal ? "Original" : history.changedToAt ? new Date(history.changedToAt).toLocaleDateString() : ""}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-3 text-center text-xs text-text-muted font-medium">
                        No name changes found.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="rounded-3xl border border-[#2A3650]/40 bg-[#0E1321]/20 p-12 text-center flex flex-col items-center justify-center space-y-4 backdrop-blur-md">
                <div className="w-12 h-12 rounded-2xl border border-[#2A3650]/60 bg-[#070A14] flex items-center justify-center text-[#8E8E93]">
                  <User className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
                    No Player Selected
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                    Search for a player to view their profile and statistics.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
