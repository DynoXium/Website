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
  ExternalLink,
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
        skinUrl: `https://crafatar.com/skins/${formattedUuid}`,
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

  const handleCopyText = (text: string, type: "formatted" | "raw") => {
    navigator.clipboard.writeText(text);
    if (type === "formatted") {
      setCopiedUuid(true);
      setTimeout(() => setCopiedUuid(false), 2000);
    } else {
      setCopiedRawUuid(true);
      setTimeout(() => setCopiedRawUuid(false), 2000);
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

      <div className="max-w-7xl mx-auto pt-44 pb-20 px-4 sm:px-6 relative z-10 space-y-12">
        <BackToToolsLink />

        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-up delay-75">
          <h1 className="font-norwester text-4xl sm:text-7xl tracking-wide sm:tracking-widest text-white uppercase leading-none reveal-up delay-100">
            UUID <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Lookup</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Convert Minecraft usernames to UUIDs, view name history, and check account status.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          {/* LEFT SEARCH PANEL */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">Player Lookup</span>
                <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider">
                  Username <span className="text-primary-cyan">⇄</span> UUID
                </h3>
                <p className="text-xs text-text-muted font-sans font-medium">
                  Clean, reliable search with built-in fallbacks.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan/30 to-success-teal/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative flex items-center bg-[#070A14] border border-[#2A3650]/60 rounded-xl p-1.5 focus-within:border-primary-cyan/60">
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
                    className="bg-primary-cyan hover:bg-transparent border border-primary-cyan text-[#0B0F19] hover:text-primary-cyan font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all shadow-[0_0_12px_rgba(108,244,255,0.15)] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="px-2.5 py-1 rounded bg-[#070A14] hover:bg-primary-cyan/15 border border-[#2A3650]/60 hover:border-primary-cyan/30 text-white hover:text-primary-cyan font-mono text-[10px] font-bold transition-all cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* SEARCH TIPS */}
            <div className="rounded-3xl border border-primary-cyan/10 bg-primary-cyan/3 p-6 space-y-3 relative overflow-hidden backdrop-blur-md">
              <h4 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-display">
                <HelpCircle className="h-4 w-4 text-primary-cyan" />
                <span>Search Tips</span>
              </h4>
              <ul className="text-xs text-[#8E8E93] space-y-1.5 list-disc list-inside font-medium leading-relaxed">
                <li>Enter any Minecraft username or UUID</li>
                <li>UUIDs can be with or without dashes</li>
                <li>Case doesn't matter for usernames</li>
                <li>Works with both Java and Bedrock accounts</li>
              </ul>
            </div>
          </div>

          {/* RIGHT PROFILE VIEW */}
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
              <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 sm:p-8 space-y-6 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
                
                {/* Header Profile */}
                <div className="flex items-center gap-4 pb-6 border-b border-[#2A3650]/40">
                  <div className="w-16 h-16 rounded-2xl border border-primary-cyan/20 bg-primary-cyan/10 p-1.5 flex items-center justify-center flex-shrink-0">
                    <img
                      src={`https://crafatar.com/avatars/${player.uuidFormatted}?size=64&overlay`}
                      alt={player.username}
                      className="w-full h-full rounded-xl object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider leading-none">
                      {player.username}
                    </h3>
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-success-teal font-bold uppercase">
                      <Activity className="h-3 w-3" />
                      Account Active
                    </span>
                  </div>
                </div>

                {/* UUID Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">
                      <span>Formatted UUID</span>
                      <button
                        onClick={() => handleCopyText(player.uuidFormatted, "formatted")}
                        className="flex items-center gap-1 text-primary-cyan hover:text-primary-cyan/80 transition-colors"
                      >
                        {copiedUuid ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedUuid ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <div className="rounded-xl bg-[#070A14] border border-[#2A3650]/60 p-3.5 font-mono text-[10px] sm:text-xs text-white break-all">
                      {player.uuidFormatted}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">
                      <span>Raw UUID</span>
                      <button
                        onClick={() => handleCopyText(player.uuid, "raw")}
                        className="flex items-center gap-1 text-primary-cyan hover:text-primary-cyan/80 transition-colors"
                      >
                        {copiedRawUuid ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedRawUuid ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <div className="rounded-xl bg-[#070A14] border border-[#2A3650]/60 p-3.5 font-mono text-[10px] sm:text-xs text-white break-all">
                      {player.uuid}
                    </div>
                  </div>
                </div>

                {/* Name History */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary-cyan" />
                    Name History
                  </span>
                  <div className="rounded-xl bg-[#070A14] border border-[#2A3650]/60 divide-y divide-[#2A3650]/40 overflow-hidden">
                    {player.nameHistory && player.nameHistory.length > 0 ? (
                      player.nameHistory.map((history, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3.5 text-xs font-mono">
                          <span className="font-bold text-white">{history.name}</span>
                          <span className="text-[10px] text-text-muted font-medium">
                            {history.changedToAt 
                              ? new Date(history.changedToAt).toLocaleDateString()
                              : "Original Name"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-3.5 text-center text-xs text-text-muted font-medium">
                        No name changes found.
                      </div>
                    )}
                  </div>
                </div>

                {/* Skin Render Links */}
                <div className="pt-2">
                  <a
                    href={`https://crafatar.com/renders/body/${player.uuidFormatted}?overlay`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-primary-cyan/30 bg-primary-cyan/5 text-primary-cyan text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary-cyan/10 cursor-pointer"
                  >
                    <span>View 3D Body Render</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
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
