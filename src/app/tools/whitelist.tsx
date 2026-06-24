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
} from "lucide-react";

interface WhitelistPlayer {
  username: string;
  uuid: string;
}

export default function WhitelistEditor() {
  const [usernameInput, setUsernameInput] = useState("");
  const [players, setPlayers] = useState<WhitelistPlayer[]>([]);
  const [outputFormat, setOutputFormat] = useState<"commands" | "json">("commands");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = usernameInput.trim();
    if (!name) return;

    // Check duplicate
    if (players.some(p => p.username.toLowerCase() === name.toLowerCase())) {
      setError("Player already in whitelist list.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Lookup player to get valid UUID
      const res = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(name)}`);
      if (!res.ok) {
        throw new Error(`Could not find Minecraft player: ${name}`);
      }
      const data = await res.json();
      if (!data.success || !data.data?.player) {
        throw new Error(`Minecraft player not found: ${name}`);
      }

      const p = data.data.player;
      setPlayers(prev => [...prev, { username: p.username, uuid: p.id }]);
      setUsernameInput("");
    } catch (err: any) {
      // Fallback to generating a local fake/offline UUID if lookup fails
      setError(err.message || "Failed to resolve player UUID. Adding as offline player.");
      // Add offline-mode fallback uuid
      setPlayers(prev => [...prev, { username: name, uuid: "00000000-0000-0000-0000-000000000000" }]);
      setUsernameInput("");
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePlayer = (idx: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== idx));
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
    let data = "";
    let filename = "";

    if (outputFormat === "commands") {
      data = codePreview;
      filename = "whitelist_commands.txt";
    } else {
      data = codePreview;
      filename = "whitelist.json";
    }

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

      <div className="max-w-7xl mx-auto pt-44 pb-20 px-4 sm:px-6 relative z-10 space-y-12">
        <BackToToolsLink />

        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-up delay-75">
          <h1 className="font-norwester text-4xl sm:text-7xl tracking-wide sm:tracking-widest text-white uppercase leading-none reveal-up delay-100">
            Whitelist <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Editor</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Professional whitelist management with UUID lookup and JSON export.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          
          {/* LEFT: ADD & LIST */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Add Player Box */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary-cyan" />
                Add Player
              </h3>

              <form onSubmit={handleAddPlayer} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter username..."
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors placeholder-text-muted"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-cyan border border-primary-cyan hover:bg-transparent hover:text-primary-cyan text-[#0B0F19] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-[0_0_12px_rgba(108,244,255,0.15)] cursor-pointer flex-shrink-0 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "+ Add"}
                </button>
              </form>

              {error && (
                <p className="text-[10px] text-red-400 font-mono font-bold uppercase">{error}</p>
              )}
            </div>

            {/* Whitelisted Players list */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="h-4 w-4 text-primary-cyan" />
                Players ({players.length})
              </h3>

              {players.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center space-y-3 py-12 text-[#8E8E93]">
                  <Users className="h-8 w-8 opacity-40" />
                  <p className="text-xs font-medium">No players added yet</p>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto max-h-[350px] space-y-2.5 pr-1">
                  {players.map((p, idx) => (
                    <div
                      key={p.uuid + idx}
                      className="flex justify-between items-center bg-[#070A14] border border-[#2A3650]/40 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={`https://crafatar.com/avatars/${p.uuid}?size=32&overlay`}
                          alt={p.username}
                          className="w-8 h-8 rounded-lg border border-[#2A3650]/60 bg-black/40 flex-shrink-0"
                          onError={(e) => {
                            // Fallback to default block avatar if API fails
                            e.currentTarget.src = "https://minotar.net/avatar/char/32";
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
                      ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan"
                      : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                  }`}
                >
                  Commands
                </button>
                <button
                  onClick={() => setOutputFormat("json")}
                  className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    outputFormat === "json"
                      ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan"
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
                className="w-full p-4 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-xs focus:outline-none leading-relaxed resize-none"
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
