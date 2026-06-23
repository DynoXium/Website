"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sliders,
  Copy,
  Download,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  FileCode,
} from "lucide-react";

interface PropertyConfig {
  key: string;
  name: string;
  desc: string;
  type: "text" | "number" | "select" | "boolean";
  default: any;
  options?: string[];
}

const propertiesSchema: PropertyConfig[] = [
  { key: "server-port", name: "Server Port", desc: "Port for the server to listen on.", type: "number", default: 25565 },
  { key: "gamemode", name: "Gamemode", desc: "Default game mode for players.", type: "select", default: "survival", options: ["survival", "creative", "adventure", "spectator"] },
  { key: "difficulty", name: "Difficulty", desc: "World difficulty.", type: "select", default: "easy", options: ["peaceful", "easy", "normal", "hard"] },
  { key: "max-players", name: "Max Players", desc: "Maximum number of players.", type: "number", default: 20 },
  { key: "motd", name: "Motd", desc: "Message shown in server list.", type: "text", default: "A Minecraft Server" },
  { key: "level-name", name: "Level Name", desc: "Name of the world folder.", type: "text", default: "world" },
  { key: "level-seed", name: "Level Seed", desc: "Seed for world generation (leave empty for random).", type: "text", default: "" },
  { key: "level-type", name: "Level Type", desc: "World generation type.", type: "select", default: "minecraft:normal", options: ["minecraft:normal", "minecraft:flat", "minecraft:large_biomes", "minecraft:amplified"] },
  { key: "generator-settings", name: "Generator Settings", desc: "Generator settings for custom worlds.", type: "text", default: "" },
  { key: "pvp", name: "Pvp", desc: "Allow player-vs-player combat.", type: "boolean", default: true },
  { key: "hardcore", name: "Hardcore", desc: "Enable hardcore mode (permadeath).", type: "boolean", default: false },
  { key: "allow-flight", name: "Allow Flight", desc: "Allow players to fly.", type: "boolean", default: false },
  { key: "force-gamemode", name: "Force Gamemode", desc: "Force players to join in default gamemode.", type: "boolean", default: false },
  { key: "spawn-monsters", name: "Spawn Monsters", desc: "Monsters spawn in the world.", type: "boolean", default: true },
  { key: "spawn-animals", name: "Spawn Animals", desc: "Animals spawn in the world.", type: "boolean", default: true },
  { key: "spawn-npcs", name: "Spawn Npcs", desc: "Villagers spawn in the world.", type: "boolean", default: true },
  { key: "spawn-protection", name: "Spawn Protection", desc: "Spawn protection radius.", type: "number", default: 16 },
  { key: "online-mode", name: "Online Mode", desc: "Authenticate players with Mojang.", type: "boolean", default: true },
  { key: "white-list", name: "White List", desc: "Only allow whitelisted players.", type: "boolean", default: false },
  { key: "enforce-whitelist", name: "Enforce Whitelist", desc: "Kick non-whitelisted players.", type: "boolean", default: false },
  { key: "enable-command-block", name: "Enable Command Block", desc: "Enable command blocks.", type: "boolean", default: false },
  { key: "op-permission-level", name: "Op Permission Level", desc: "Operator permission level.", type: "number", default: 4 },
  { key: "function-permission-level", name: "Function Permission Level", desc: "Function permission level.", type: "number", default: 2 },
  { key: "view-distance", name: "View Distance", desc: "Chunks visible to players (3-32).", type: "number", default: 10 },
  { key: "simulation-distance", name: "Simulation Distance", desc: "Entity simulation range (3-32).", type: "number", default: 10 },
  { key: "max-tick-time", name: "Max Tick Time", desc: "Maximum tick time before watchdog crash.", type: "number", default: 60000 },
  { key: "max-world-size", name: "Max World Size", desc: "Maximum world border size.", type: "number", default: 29999984 },
  { key: "server-ip", name: "Server Ip", desc: "Server IP address (leave empty for all).", type: "text", default: "" },
  { key: "network-compression-threshold", name: "Network Compression Threshold", desc: "Network compression threshold.", type: "number", default: 256 },
  { key: "rate-limit", name: "Rate Limit", desc: "Rate limit for packets.", type: "number", default: 0 },
  { key: "enable-jmx-monitoring", name: "Enable Jmx Monitoring", desc: "Enable JMX monitoring.", type: "boolean", default: false },
  { key: "enable-rcon", name: "Enable Rcon", desc: "Enable remote console.", type: "boolean", default: false },
  { key: "rcon.port", name: "Rcon port", desc: "RCON port.", type: "number", default: 25575 },
  { key: "rcon.password", name: "Rcon password", desc: "RCON password.", type: "text", default: "" },
  { key: "broadcast-rcon-to-ops", name: "Broadcast Rcon To Ops", desc: "Broadcast RCON to operators.", type: "boolean", default: true },
  { key: "broadcast-console-to-ops", name: "Broadcast Console To Ops", desc: "Broadcast console to operators.", type: "boolean", default: true },
  { key: "enable-query", name: "Enable Query", desc: "Enable GameSpy4 protocol query.", type: "boolean", default: false },
  { key: "query.port", name: "Query port", desc: "Query port.", type: "number", default: 25565 },
  { key: "enable-status", name: "Enable Status", desc: "Enable server list ping.", type: "boolean", default: true },
  { key: "hide-online-players", name: "Hide Online Players", desc: "Hide players in server list.", type: "boolean", default: false },
  { key: "prevent-proxy-connections", name: "Prevent Proxy Connections", desc: "Prevent proxy connections.", type: "boolean", default: false },
  { key: "use-native-transport", name: "Use Native Transport", desc: "Use native transport for Linux.", type: "boolean", default: true },
  { key: "enable-flight", name: "Enable Flight (legacy)", desc: "Enable flight (legacy).", type: "boolean", default: false },
  { key: "resource-pack", name: "Resource Pack", desc: "Resource pack URL.", type: "text", default: "" },
  { key: "resource-pack-sha1", name: "Resource Pack Sha1", desc: "Resource pack SHA1 hash.", type: "text", default: "" },
  { key: "require-resource-pack", name: "Require Resource Pack", desc: "Require resource pack.", type: "boolean", default: false },
  { key: "resource-pack-prompt", name: "Resource Pack Prompt", desc: "Resource pack prompt message.", type: "text", default: "" },
];

export default function ServerPropertiesEditor() {
  const [config, setConfig] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    propertiesSchema.forEach((p) => {
      initial[p.key] = p.default;
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);

  const handleValueChange = (key: string, val: any) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    const initial: Record<string, any> = {};
    propertiesSchema.forEach((p) => {
      initial[p.key] = p.default;
    });
    setConfig(initial);
  };

  const generatedProperties = useMemo(() => {
    const lines = [
      "# Minecraft server properties",
      `# Generated by DynoXium Server Properties Editor on ${new Date().toLocaleDateString()}`,
    ];
    propertiesSchema.forEach((p) => {
      const val = config[p.key];
      if (val !== undefined && val !== null && val !== "") {
        lines.push(`${p.key}=${val}`);
      } else if (p.type === "text" && val === "") {
        lines.push(`${p.key}=`);
      }
    });
    return lines.join("\n");
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedProperties);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedProperties], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "server.properties";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            Server <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Properties</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium">
            Interactive server.properties editor with real-time preview and configuration management.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* LEFT: CONFIG GRID */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="flex justify-between items-center pb-4 border-b border-[#2A3650]/40">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary-cyan" />
                  Server Configuration
                </h3>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A3650] bg-[#070A14] hover:bg-[#0E1321] text-text-muted hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
                {propertiesSchema.map((p) => (
                  <div key={p.key} className="space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <label className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                        {p.name}
                      </label>
                    </div>
                    
                    {p.type === "boolean" ? (
                      <div className="flex items-center justify-between bg-[#070A14] border border-[#2A3650]/60 rounded-xl p-3">
                        <span className="text-[9px] font-mono font-bold text-text-muted uppercase">
                          {config[p.key] ? "ENABLED" : "DISABLED"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleValueChange(p.key, !config[p.key])}
                          className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                            config[p.key] ? "bg-success-teal" : "bg-red-500"
                          }`}
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                              config[p.key] ? "translate-x-4.5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ) : p.type === "select" ? (
                      <select
                        value={config[p.key]}
                        onChange={(e) => handleValueChange(p.key, e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors"
                      >
                        {p.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={p.type === "number" ? "number" : "text"}
                        value={config[p.key]}
                        placeholder={String(p.default)}
                        onChange={(e) =>
                          handleValueChange(
                            p.key,
                            p.type === "number" ? parseInt(e.target.value) || 0 : e.target.value
                          )
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors placeholder-text-muted"
                      />
                    )}
                    <p className="text-[8px] text-text-muted font-mono leading-relaxed uppercase">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT: LIVE FILE VIEW */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* server.properties live view */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md flex flex-col">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="h-4 w-4 text-primary-cyan" />
                server.properties
              </h3>

              <textarea
                readOnly
                value={generatedProperties}
                rows={12}
                className="w-full p-4 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-[9px] sm:text-[10px] focus:outline-none leading-relaxed resize-none overflow-y-auto"
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white text-xs font-bold uppercase tracking-wider transition-all hover:border-[#2A3650]/80 cursor-pointer"
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-success-teal" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary-cyan/30 bg-primary-cyan/5 text-primary-cyan hover:bg-primary-cyan/15 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Quick Summary list */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 backdrop-blur-md">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#2A3650]/20">
                Quick Summary
              </h4>
              <div className="space-y-2.5 font-mono text-[10px] uppercase">
                <div className="flex justify-between">
                  <span className="text-text-muted">Mode:</span>
                  <span className="font-bold text-white">{config["gamemode"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Difficulty:</span>
                  <span className="font-bold text-white">{config["difficulty"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Max Players:</span>
                  <span className="font-bold text-white">{config["max-players"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">PvP:</span>
                  <span className={config["pvp"] ? "text-success-teal font-bold" : "text-red-400 font-bold"}>
                    {String(config["pvp"]).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Whitelist:</span>
                  <span className={config["white-list"] ? "text-success-teal font-bold" : "text-red-400 font-bold"}>
                    {String(config["white-list"]).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Online Mode:</span>
                  <span className={config["online-mode"] ? "text-success-teal font-bold" : "text-red-400 font-bold"}>
                    {String(config["online-mode"]).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Setup instructions */}
            <div className="rounded-3xl border border-primary-cyan/10 bg-primary-cyan/3 p-6 space-y-3 backdrop-blur-md">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-primary-cyan" />
                Setup
              </h4>
              <ul className="text-xs text-[#8E8E93] space-y-1.5 list-disc list-inside font-medium leading-relaxed">
                <li>Upload to server root directory</li>
                <li>Restart server to apply changes</li>
                <li>Backup existing file first</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
