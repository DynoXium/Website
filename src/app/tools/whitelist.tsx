"use client";

import React, { useState, useMemo } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  UserPlus,
  Users,
  Copy,
  Download,
  Trash2,
  CheckCircle,
  FileCode,
  Sparkles,
  Zap,
} from "lucide-react";

interface WhitelistPlayer {
  username: string;
  uuid: string;
}

// MD5 implementation to generate exact Java NameUUID (Offline-mode Minecraft UUIDs)
function md5(str: string): string {
  const k: number[] = [];
  for (let i = 0; i < 64; i++) {
    k[i] = 0 | (Math.sin(i + 1) * 4294967296);
  }
  const r = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  const h = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476];
  const b: number[] = [];
  for (let i = 0; i < str.length; i++) {
    b[i] = str.charCodeAt(i);
  }
  b.push(0x80);
  while (b.length % 64 !== 56) {
    b.push(0);
  }
  const len = str.length * 8;
  b.push(len & 0xFF, (len >> 8) & 0xFF, (len >> 16) & 0xFF, (len >> 24) & 0xFF, 0, 0, 0, 0);
  
  for (let offset = 0; offset < b.length; offset += 64) {
    let a = h[0], c = h[1], d = h[2], e = h[3];
    const w: number[] = [];
    for (let i = 0; i < 16; i++) {
      w[i] = b[offset + i * 4] | (b[offset + i * 4 + 1] << 8) | (b[offset + i * 4 + 2] << 16) | (b[offset + i * 4 + 3] << 24);
    }
    for (let i = 0; i < 64; i++) {
      let f = 0, g = 0;
      if (i < 16) {
        f = (c & d) | (~c & e);
        g = i;
      } else if (i < 32) {
        f = (e & c) | (~e & d);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = c ^ d ^ e;
        g = (3 * i + 5) % 16;
      } else {
        f = d ^ (c | ~e);
        g = (7 * i) % 16;
      }
      const temp = e;
      e = d;
      d = c;
      const s = r[(0 | (i / 16)) * 4 + (i % 4)];
      const sum = (a + f + k[i] + w[g]) | 0;
      c = (c + ((sum << s) | (sum >>> (32 - s)))) | 0;
      a = temp;
    }
    h[0] = (h[0] + a) | 0;
    h[1] = (h[1] + c) | 0;
    h[2] = (h[2] + d) | 0;
    h[3] = (h[3] + e) | 0;
  }
  
  let hex = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const val = (h[i] >> (j * 8)) & 0xFF;
      hex += val.toString(16).padStart(2, "0");
    }
  }
  return hex;
}

// Generate exact Offline UUID v3 format
function getOfflineUUID(username: string): string {
  const hex = md5("OfflinePlayer:" + username);
  const part1 = hex.substring(0, 8);
  const part2 = hex.substring(8, 12);
  const part3 = (parseInt(hex.substring(12, 16), 16) & 0x0FFF | 0x3000).toString(16).padStart(4, "0");
  const part4 = (parseInt(hex.substring(16, 20), 16) & 0x3FFF | 0x8000).toString(16).padStart(4, "0");
  const part5 = hex.substring(20, 32);
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

export default function WhitelistEditor() {
  const [usernameInput, setUsernameInput] = useState("");
  const [players, setPlayers] = useState<WhitelistPlayer[]>([]);
  const [outputFormat, setOutputFormat] = useState<"commands" | "json">("commands");
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleAddPlayers = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawNames = usernameInput.trim();
    if (!rawNames) return;

    // Split names by commas, spaces, or newlines
    const names = rawNames
      .split(/[\n, ]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) return;

    setLoading(true);
    setError("");

    const newPlayers: WhitelistPlayer[] = [];

    if (mode === "offline") {
      // Offline mode: generate locally & instantly!
      names.forEach(name => {
        if (!players.some(p => p.username.toLowerCase() === name.toLowerCase())) {
          newPlayers.push({
            username: name,
            uuid: getOfflineUUID(name),
          });
        }
      });
      setPlayers(prev => [...prev, ...newPlayers]);
      setUsernameInput("");
      setLoading(false);
    } else {
      // Online mode: lookup asynchronously
      try {
        const promises = names.map(async (name) => {
          if (players.some(p => p.username.toLowerCase() === name.toLowerCase())) {
            return null;
          }
          try {
            const res = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(name)}`);
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.data?.player) {
                return { username: data.data.player.username, uuid: data.data.player.id };
              }
            }
          } catch (e) {}
          // Fallback to offline UUID if online lookup fails
          return { username: name, uuid: getOfflineUUID(name) };
        });

        const results = await Promise.all(promises);
        results.forEach(p => {
          if (p) newPlayers.push(p);
        });

        setPlayers(prev => [...prev, ...newPlayers]);
        setUsernameInput("");
      } catch (err: any) {
        setError("Failed during lookup. Added remainder as offline profiles.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemovePlayer = (idx: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== idx));
  };

  const handleClearAll = () => {
    setPlayers([]);
    setError("");
  };

  const codePreview = useMemo(() => {
    if (players.length === 0) {
      return outputFormat === "commands"
        ? "# Run in server console\nwhitelist on"
        : "[]";
    }

    if (outputFormat === "commands") {
      let cmds = ["# Run in server console", "whitelist on"];
      players.forEach(p => {
        cmds.push(`whitelist add ${p.username}`);
      });
      return cmds.join("\n");
    } else {
      const jsonArr = players.map(p => ({
        uuid: p.uuid,
        name: p.username,
      }));
      return JSON.stringify(jsonArr, null, 2);
    }
  }, [players, outputFormat]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codePreview);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = () => {
    let data = codePreview;
    let filename = outputFormat === "commands" ? "whitelist_commands.txt" : "whitelist.json";

    const file = new Blob([data], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            Whitelist <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Editor</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Professional whitelist management with instant bulk input and offline support.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          
          {/* LEFT: ADD & LIST */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Add Players Box */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="flex justify-between items-center">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-primary-cyan" />
                  Add Players (Bulk Support)
                </h3>

                {/* Mode Selector */}
                <div className="flex gap-1 bg-[#070A14] border border-[#2A3650]/40 rounded-lg p-0.5">
                  <button
                    onClick={() => setMode("online")}
                    className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase transition-all cursor-pointer ${
                      mode === "online"
                        ? "bg-primary-cyan text-[#0B0F19]"
                        : "text-text-muted hover:text-white"
                    }`}
                  >
                    Online UUID
                  </button>
                  <button
                    onClick={() => setMode("offline")}
                    className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase transition-all cursor-pointer ${
                      mode === "offline"
                        ? "bg-primary-cyan text-[#0B0F19]"
                        : "text-text-muted hover:text-white"
                    }`}
                  >
                    Offline UUID
                  </button>
                </div>
              </div>

              <form onSubmit={handleAddPlayers} className="space-y-3">
                <textarea
                  placeholder="Enter usernames ( Notch, Dinnerbone, Grumm ... separated by commas, spaces, or newlines )"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors placeholder-text-muted/60 resize-none leading-relaxed"
                />
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-grow bg-primary-cyan border border-primary-cyan hover:bg-transparent hover:text-primary-cyan text-[#0B0F19] font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-[0_0_12px_rgba(108,244,255,0.15)] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>{loading ? "Adding..." : "+ Add Players"}</span>
                  </button>
                </div>
              </form>

              {error && (
                <p className="text-[10px] text-red-400 font-mono font-bold uppercase">{error}</p>
              )}
            </div>

            {/* Whitelisted Players list */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="flex justify-between items-center">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-cyan" />
                  Players ({players.length})
                </h3>

                {players.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-[9px] font-mono font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {players.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center space-y-3 py-12 text-[#8E8E93]">
                  <Users className="h-8 w-8 opacity-40" />
                  <p className="text-xs font-medium">No players added yet</p>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto max-h-[350px] space-y-2.5 pr-1 scrollbar-thin">
                  {players.map((p, idx) => (
                    <div
                      key={p.uuid + idx}
                      className="flex justify-between items-center bg-[#070A14] border border-[#2A3650]/40 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={`https://mc-heads.net/avatar/${p.username}/32`}
                          alt={p.username}
                          className="w-8 h-8 rounded-lg border border-[#2A3650]/60 bg-black/40 flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = `https://minotar.net/avatar/${p.username}/32`;
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-sans text-xs font-bold text-white truncate">{p.username}</p>
                          <p className="font-mono text-[9px] text-text-muted truncate">{p.uuid}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemovePlayer(idx)}
                        className="p-2 text-[#8E8E93] hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove Player"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: FORMAT & COMMANDS */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Output format picker */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider block">
                Output Format
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOutputFormat("commands")}
                  className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    outputFormat === "commands"
                      ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.1)]"
                      : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                  }`}
                >
                  Commands
                </button>
                <button
                  onClick={() => setOutputFormat("json")}
                  className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    outputFormat === "json"
                      ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.1)]"
                      : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                  }`}
                >
                  JSON File
                </button>
              </div>
            </div>

            {/* Generated output editor */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md flex flex-col">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="h-4 w-4 text-primary-cyan" />
                {outputFormat === "commands" ? "Server Commands" : "whitelist.json"}
              </h3>

              <textarea
                readOnly
                value={codePreview}
                rows={10}
                className="w-full p-4 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-xs focus:outline-none leading-relaxed resize-none scrollbar-thin"
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white text-xs font-bold uppercase tracking-wider transition-all hover:border-[#2A3650]/80 cursor-pointer"
                >
                  {copiedCode ? <CheckCircle className="h-4 w-4 text-success-teal" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedCode ? "Copied" : outputFormat === "commands" ? "Copy Commands" : "Copy JSON"}</span>
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-primary-cyan/30 bg-primary-cyan/5 text-primary-cyan hover:bg-primary-cyan/15 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download File</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
