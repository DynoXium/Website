"use client";

import React, { useState } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  Search,
  Zap,
  Shield,
  Users,
  Compass,
  Sparkles,
  Info,
  Server,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ServerStatusResult {
  online: boolean;
  ip: string;
  port: number;
  players?: {
    online: number;
    max: number;
    list?: string[];
  };
  version?: string;
  motd?: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  debug?: {
    ping: boolean;
    query: boolean;
    srv: boolean;
    querymismatch: boolean;
    ipinsrv: boolean;
    cnameinsrv: boolean;
    animatedmotd: boolean;
    cachetime: number;
  };
  icon?: string;
}

export default function MinecraftStatus() {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<ServerStatusResult | null>(null);

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    const queryIp = ipAddress.trim() || "play.Ateex.cloud";
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const res = await fetch(`https://api.mcsrvstat.us/2/${encodeURIComponent(queryIp)}`);
      if (!res.ok) {
        throw new Error("Unable to fetch server status. Please verify the IP address.");
      }
      const data = await res.json();
      
      setStatus({
        online: data.online,
        ip: data.ip || queryIp,
        port: data.port || 25565,
        players: data.players,
        version: data.version,
        motd: data.motd,
        debug: data.debug,
        icon: data.icon,
      });
    } catch (err: any) {
      setError(err.message || "Failed to resolve server. Please try again.");
    } finally {
      setLoading(false);
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

      {/* MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto pt-44 pb-20 px-4 sm:px-6 relative z-10 space-y-12">
        <BackToToolsLink />
        
        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-up delay-75">
          <h1 className="font-norwester text-4xl sm:text-7xl tracking-wide sm:tracking-widest text-white uppercase leading-none reveal-up delay-100">
            Minecraft <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Server Status</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Check server status, player counts, and version information in real-time.
          </p>
        </div>

        {/* INPUT FORM */}
        <form onSubmit={checkStatus} className="max-w-xl mx-auto relative group reveal-up delay-200">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan/30 to-success-teal/30 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
          <div className="relative flex items-center bg-[#0E1321]/80 border border-[#2A3650]/80 rounded-2xl p-2.5 backdrop-blur-md transition-all duration-300 focus-within:border-primary-cyan/60 focus-within:shadow-[0_0_20px_rgba(108,244,255,0.1)]">
            <Search className="h-5 w-5 text-text-muted ml-3.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="play.Ateex.cloud"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full bg-transparent border-none text-white pl-3.5 pr-4 py-2 font-mono font-bold text-sm focus:outline-none placeholder-text-muted"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-cyan border border-primary-cyan hover:bg-transparent hover:text-primary-cyan text-[#0B0F19] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(108,244,255,0.2)] flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Search"}
            </button>
          </div>
        </form>

        {/* LOADER & ERROR */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-4 border-primary-cyan/20 border-t-primary-cyan rounded-full animate-spin" />
            <span className="text-xs text-text-muted font-mono font-bold uppercase tracking-wider animate-pulse">Resolving DNS Records...</span>
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto rounded-2xl border border-red-500/20 bg-red-500/5 p-4 flex items-center gap-3 text-red-400 text-xs sm:text-sm font-medium">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* RESULTS PANEL */}
        {status && (
          <div className="max-w-2xl mx-auto rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 sm:p-8 space-y-6 backdrop-blur-md relative overflow-hidden">
            {/* Tech corner accent brackets */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#2A3650]/80" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#2A3650]/80" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#2A3650]/80" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#2A3650]/80" />

            {/* Status Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#2A3650]/40">
              <div className="flex items-center gap-4">
                {status.icon ? (
                  <img
                    src={status.icon}
                    alt="Server icon"
                    className="w-14 h-14 rounded-xl border border-[#2A3650]/60 bg-black/35 object-contain"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl border border-[#2A3650]/60 bg-primary-cyan/10 flex items-center justify-center text-primary-cyan">
                    <Server className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <h3 className="font-display text-base sm:text-lg font-extrabold text-white uppercase tracking-wider leading-none">
                    {status.ip}
                  </h3>
                  <span className="text-[10px] text-text-muted font-mono font-bold uppercase mt-1 inline-block">
                    Port: {status.port}
                  </span>
                </div>
              </div>

              {status.online ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-success-teal/20 bg-success-teal/10 text-success-teal text-xs font-bold uppercase tracking-wider">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Online
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <XCircle className="h-3.5 w-3.5" />
                  Offline
                </span>
              )}
            </div>

            {status.online ? (
              <div className="space-y-6">
                {/* MOTD Display */}
                {status.motd && status.motd.html && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">MOTD</span>
                    <div className="rounded-xl border border-[#2A3650]/40 bg-[#070A14] p-4 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed select-none">
                      {status.motd.html.map((line, idx) => (
                        <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#2A3650]/40 bg-[#070A14]/30 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-bold uppercase">
                      <Users className="h-3.5 w-3.5 text-primary-cyan" />
                      <span>Players</span>
                    </div>
                    <p className="text-xl font-bold text-white font-display">
                      {status.players?.online || 0} <span className="text-xs text-text-muted font-sans font-medium">/ {status.players?.max || 0} Max</span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#2A3650]/40 bg-[#070A14]/30 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-bold uppercase">
                      <Info className="h-3.5 w-3.5 text-primary-cyan" />
                      <span>Version</span>
                    </div>
                    <p className="text-base font-bold text-white font-mono">
                      {status.version || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Player List */}
                {status.players?.list && status.players.list.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Online Players</span>
                    <div className="flex flex-wrap gap-2">
                      {status.players.list.map((player, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#2A3650]/60 bg-[#070A14]/50 text-xs font-mono font-bold text-white">
                          <img
                            src={`https://minotar.net/avatar/${encodeURIComponent(player)}/16`}
                            alt={`${player} skin`}
                            className="w-4 h-4 rounded-sm flex-shrink-0"
                          />
                          <span>{player}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
                Could not connect to the Minecraft server. Make sure the server is online and the IP address/port is correct.
              </div>
            )}
          </div>
        )}

        {/* FEATURES GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6">
          {[
            { title: "DNS Resolution", desc: "Full SRV & CNAME tracing", icon: Compass },
            { title: "Player Lists", desc: "View online players & skins", icon: Users },
            { title: "Debug Info", desc: "Protocol version & Software", icon: Info },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/40 p-5 flex flex-col items-center text-center justify-between space-y-3 transition-all duration-300 hover:border-primary-cyan/40 hover:scale-[1.01]"
              >
                <div className="w-9 h-9 rounded-xl border border-primary-cyan/20 bg-primary-cyan/10 flex items-center justify-center text-primary-cyan shadow-[0_0_12px_rgba(108,244,255,0.1)]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-text-muted leading-relaxed font-sans font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
