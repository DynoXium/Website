"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Server,
  Zap,
  Shield,
  Cpu,
  Layers,
  Code,
  Terminal,
  Database,
  ArrowRight,
  Check,
  X,
  Users,
  Star,
  Activity,
  ChevronDown,
  Globe,
  Settings,
  ShieldAlert,
  Play,
  RefreshCw,
  ExternalLink,
  FileCode,
  Headphones,
  Gamepad2,
  GitBranch,
  HardDrive,
  Monitor,
  Palette,
} from "lucide-react";

// Helper for simulated syntax highlighting of files
const renderHighlightedLine = (line: string, index: number, fileType: string) => {
  if (!line) return <span className="inline-block h-4" />;

  if (fileType === "main.ts") {
    const tokens = line.split(/(\s+|,|\{|\}|\(|\)|:|"|'|\.|=)/);
    return (
      <span key={index}>
        {tokens.map((token, i) => {
          if (["import", "const", "new", "from"].includes(token)) {
            return <span key={i} className="text-[#3388FF] font-semibold">{token}</span>;
          }
          if (["CloudNode", "deploy", "app"].includes(token)) {
            return <span key={i} className="text-white font-semibold">{token}</span>;
          }
          if (token.startsWith('"') || token.startsWith("'")) {
            return <span key={i} className="text-[#6CF4FF]">{token}</span>;
          }
          if (/^\d+$/.test(token)) {
            return <span key={i} className="text-[#FF9E64]">{token}</span>;
          }
          return <span key={i} className="text-text-muted/80">{token}</span>;
        })}
      </span>
    );
  } else if (fileType === "Dockerfile") {
    const tokens = line.split(/(\s+)/);
    return (
      <span key={index}>
        {tokens.map((token, i) => {
          if (["FROM", "WORKDIR", "COPY", "RUN", "EXPOSE", "CMD"].includes(token)) {
            return <span key={i} className="text-[#3388FF] font-bold">{token}</span>;
          }
          if (token.startsWith('"') || token.startsWith("'") || token.includes(":") || token.includes("/") || token.includes("*")) {
            return <span key={i} className="text-[#6CF4FF]">{token}</span>;
          }
          return <span key={i} className="text-text-muted/80">{token}</span>;
        })}
      </span>
    );
  } else {
    // HTML
    const tokens = line.split(/(<[^>]+>)/);
    return (
      <span key={index}>
        {tokens.map((token, i) => {
          if (token.startsWith("<") && token.endsWith(">")) {
            return <span key={i} className="text-[#3388FF]">{token}</span>;
          }
          if (token.startsWith('"') || token.startsWith("'")) {
            return <span key={i} className="text-[#6CF4FF]">{token}</span>;
          }
          return <span key={i} className="text-white">{token}</span>;
        })}
      </span>
    );
  }
};

const Sparkle = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-3.5 h-3.5 text-[#00E5A3] animate-pulse absolute pointer-events-none select-none z-10 ${className}`}
  >
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

const testimonials = [
  {
    name: "Alex Mercer",
    role: "SaaS Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "DynoXium has simplified our staging builds. Deploying Next.js applications directly on git push has cut dev overhead in half.",
  },
  {
    name: "Rohit Sharma",
    role: "Discord Bot Creator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "The Free Tier is extremely robust. I run two discord.py bots always-online with zero downtime or memory crashes.",
  },
  {
    name: "Sarah Jenkins",
    role: "Server Administrator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "Minecraft server latency is incredibly low. Players connecting from Sydney and Singapore both get solid, stable green pings.",
  },
  {
    name: "Emily Chen",
    role: "SaaS Developer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    quote: "Low latency, fast deployment. We migrated our entire backend services to Dynoxium and saw immediate load time drops.",
  },
  {
    name: "Marcus Vance",
    role: "Systems Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "The support is lightning fast. I had a firewall configuration issue at 2 AM and the team resolved it within minutes.",
  },
];

export default function Home() {

  // Dashboard Categories & Menus Data matching "Experience Our Control Panel" mockup
  const panelCategories = [
    {
      id: "game",
      label: "Game Hosting",
      menus: [
        { id: "console", label: "Real-Time Console", desc: "Smooth and instant console with message highlighting and log sharing.", icon: Terminal, image: "/panel/game/console.png" },
        { id: "mods", label: "Mods Installer", desc: "Install modpacks and server engines with a single click.", icon: Settings, image: "/panel/game/mods.png" },
        { id: "plugins", label: "Plugin Installer", desc: "Add Bukkit, Spigot, or Paper plugins instantly.", icon: Cpu, image: "/panel/game/plugins.png" },
        { id: "players", label: "Player Manager", desc: "Monitor active players, whitelist, ban, or promote users.", icon: Users, image: "/panel/game/players.png" },
        { id: "config", label: "Config Editor", desc: "Edit server configuration files with validation and syntax highlights.", icon: FileCode, image: "/panel/game/config.png" },
        { id: "version", label: "Version Changer", desc: "Switch game versions and server cores effortlessly.", icon: RefreshCw, image: "/panel/game/version.png" },
        { id: "egg", label: "Egg Changer", desc: "Advanced startup modifications and startup variables editor.", icon: Layers, image: "/panel/game/egg.png" }
      ]
    },
    {
      id: "web",
      label: "Web Hosting",
      menus: [
        { id: "git", label: "Git Deployment", desc: "Push to deploy from GitHub, GitLab, or custom git remotes.", icon: GitBranch, image: "/panel/web/git.png" },
        { id: "domain", label: "Domain Settings", desc: "Map custom domains and auto-configure free SSL certificates.", icon: Globe, image: "/panel/web/domain.png" },
        { id: "ssl", label: "SSL Termination", desc: "Secure HTTP traffic with automated wildcard Let's Encrypt certificates.", icon: Shield, image: "/panel/web/ssl.png" },
        { id: "env", label: "Environment Vars", desc: "Configure secure production variables for backend runtimes.", icon: Settings, image: "/panel/web/env.png" }
      ]
    },
    {
      id: "vps",
      label: "VPS Hosting",
      menus: [
        { id: "os", label: "OS Reinstallation", desc: "Reinstall Linux distributions (Ubuntu, Debian, CentOS) in seconds.", icon: HardDrive, image: "/panel/vps/os.png" },
        { id: "vnc", label: "VNC Console", desc: "Secure out-of-band VNC access to manage your system remotely.", icon: Monitor, image: "/panel/vps/vnc.png" },
        { id: "firewall", label: "Network Firewall", desc: "Manage inbound and outbound port rules at the edge.", icon: ShieldAlert, image: "/panel/vps/firewall.png" },
        { id: "scaling", label: "Resource Scaling", desc: "Upgrade CPU threads, memory, and NVMe drives on-demand.", icon: Zap, image: "/panel/vps/scaling.png" }
      ]
    },
    {
      id: "reseller",
      label: "Reseller Hosting",
      menus: [
        { id: "users", label: "User Management", desc: "Create, suspend, or terminate client hosting accounts.", icon: Users, image: "/panel/reseller/users.png" },
        { id: "api", label: "API Integration", desc: "Automate provisioning with our full-featured REST API backend.", icon: Code, image: "/panel/reseller/api.png" },
        { id: "branding", label: "Custom Branding", desc: "White-label the panel with your own brand logo, domains, and styles.", icon: Palette, image: "/panel/reseller/branding.png" }
      ]
    }
  ];

  // Dashboard Category & Menu States
  const [activeCategory, setActiveCategory] = useState<string>("game");
  const [activeMenu, setActiveMenu] = useState<string>("console");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // States for live interactive mockup widgets
  const [installedMods, setInstalledMods] = useState<Record<string, boolean>>({});
  const [installedPlugins, setInstalledPlugins] = useState<Record<string, boolean>>({});
  const [activePlayers, setActivePlayers] = useState<Array<{ name: string; role: string; ping: number }>>([
    { name: "Steve", role: "Administrator", ping: 12 },
    { name: "Alex", role: "Player", ping: 25 },
    { name: "Notch", role: "Moderator", ping: 48 }
  ]);
  const [configValues, setConfigValues] = useState({ pvp: true, difficulty: "hard", maxPlayers: 20, viewDistance: 10 });
  const [selectedVersion, setSelectedVersion] = useState<string>("PaperMC");
  const [firewallRules, setFirewallRules] = useState({ ssh: false, http: true, https: true, mc: true });
  const [sliderCpu, setSliderCpu] = useState<number>(4);
  const [sliderRam, setSliderRam] = useState<number>(8);
  const [sliderSsd, setSliderSsd] = useState<number>(100);
  const [apiLanguage, setApiLanguage] = useState<"curl" | "node">("curl");
  const [brandingColor, setBrandingColor] = useState<string>("#6CF4FF");
  const [brandingBorderRadius, setBrandingBorderRadius] = useState<number>(8);

  const renderPanelPreview = () => {
    switch (activeCategory) {
      case "game":
        switch (activeMenu) {
          case "console":
            return (
              <div className="w-full h-full bg-[#070A13] p-4 font-mono text-[10px] text-text-muted flex flex-col gap-1 overflow-y-auto">
                <div className="text-success-teal">[INFO] Starting minecraft server version 1.21.1</div>
                <div className="text-white">[INFO] Loading properties</div>
                <div className="text-white">[INFO] Default game type: SURVIVAL</div>
                <div className="text-primary-cyan">[INFO] Generating keypair</div>
                <div className="text-[#3388FF]">[INFO] Preparing level "world"</div>
                <div className="text-white">[INFO] Preparing start region for dimension minecraft:overworld</div>
                <div className="text-[#FF9E64]">[INFO] Preparing spawn area: 85%</div>
                <div className="text-success-teal">[INFO] Time elapsed: 1420 ms</div>
                <div className="text-success-teal">✓ [INFO] Done! For help, type "help"</div>
                <div className="flex items-center gap-1.5 text-white border-t border-white/5 pt-2 mt-2">
                  <span className="text-primary-cyan animate-pulse">$</span>
                  <input
                    type="text"
                    placeholder="Enter console command (e.g. op steve)..."
                    className="bg-transparent border-none outline-none text-white text-[10px] flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const input = e.currentTarget;
                        if (!input.value) return;
                        input.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            );
          case "mods":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Modpacks Installer</span>
                  <span className="text-[10px] text-text-muted font-normal">One-Click Deploy</span>
                </div>
                {[
                  { name: "RLCraft", desc: "Realism & high difficulty survival pack.", version: "v2.9.3 (1.12.2)" },
                  { name: "Pixelmon Reforged", desc: "Brings Pokemon gameplay to Minecraft.", version: "v9.1.5 (1.16.5)" },
                  { name: "Better MC", desc: "The vanilla Minecraft experience, but upgraded.", version: "v18.5 (1.20.1)" },
                ].map((mod, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#161C2C]/50 border border-[#2A3650]/40 hover:border-[#3388FF]/30 transition-all">
                    <div>
                      <div className="font-bold text-white text-xs">{mod.name}</div>
                      <div className="text-[10px] text-text-muted">{mod.desc}</div>
                    </div>
                    <button
                      onClick={() => setInstalledMods(prev => ({ ...prev, [mod.name]: !prev[mod.name] }))}
                      className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${installedMods[mod.name]
                        ? "bg-success-teal/20 text-success-teal border border-success-teal/40"
                        : "bg-[#3388FF] text-white hover:bg-primary-cyan hover:text-black"
                        }`}
                    >
                      {installedMods[mod.name] ? "✓ Installed" : "Install"}
                    </button>
                  </div>
                ))}
              </div>
            );
          case "plugins":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Paper/Spigot Plugin Repository</span>
                  <span className="text-[10px] text-primary-cyan font-mono">15,420 available</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "EssentialsX", category: "Admin", downloads: "2.4M" },
                    { name: "WorldEdit", category: "Tools", downloads: "5.1M" },
                    { name: "Vault", category: "API / Economy", downloads: "4.8M" },
                    { name: "ViaVersion", category: "Compatibility", downloads: "1.9M" }
                  ].map((plugin, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#161C2C]/50 border border-[#2A3650]/40 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">{plugin.name}</span>
                          <span className="text-[8px] bg-[#3388FF]/15 text-[#3388FF] px-1 py-0.2 rounded font-semibold">{plugin.category}</span>
                        </div>
                        <div className="text-[9px] text-text-muted mt-1 font-mono">Downloads: {plugin.downloads}</div>
                      </div>
                      <button
                        onClick={() => setInstalledPlugins(prev => ({ ...prev, [plugin.name]: !prev[plugin.name] }))}
                        className={`mt-2.5 w-full py-1 text-[9px] font-bold rounded transition-all text-center border ${installedPlugins[plugin.name]
                          ? "bg-success-teal/20 text-success-teal border-success-teal/30"
                          : "bg-[#111625] text-white border-[#2A3650] hover:border-[#3388FF] hover:text-[#3388FF]"
                          }`}
                      >
                        {installedPlugins[plugin.name] ? "✓ Active" : "Install Plugin"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "players":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="flex justify-between items-center text-white font-bold mb-1">
                  <span>Player Manager</span>
                  <span className="text-[10px] text-success-teal bg-success-teal/10 px-2 py-0.5 rounded border border-success-teal/20">
                    Online: {activePlayers.length} / 20
                  </span>
                </div>
                <div className="border border-[#2A3650]/40 rounded-lg overflow-hidden bg-[#0D1321]/60">
                  <table className="w-full text-[10px] text-left">
                    <thead className="bg-[#161C2C]/60 text-white uppercase text-[8px] border-b border-[#2A3650]/40">
                      <tr>
                        <th className="p-2">Player</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Ping</th>
                        <th className="p-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A3650]/30">
                      {activePlayers.map((player) => (
                        <tr key={player.name} className="hover:bg-[#161C2C]/20 transition-all">
                          <td className="p-2 font-bold text-white flex items-center gap-1.5">
                            <span className="w-4 h-4 bg-primary-cyan/15 rounded flex items-center justify-center font-mono text-[8px] text-primary-cyan uppercase">
                              {player.name[0]}
                            </span>
                            {player.name}
                          </td>
                          <td className="p-2 text-text-muted">{player.role}</td>
                          <td className="p-2 text-success-teal font-mono">● {player.ping}ms</td>
                          <td className="p-2 text-right">
                            <button
                              onClick={() => setActivePlayers(prev => prev.filter(p => p.name !== player.name))}
                              className="text-red-400 hover:text-red-300 font-bold px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-[8px]"
                            >
                              Kick
                            </button>
                          </td>
                        </tr>
                      ))}
                      {activePlayers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-text-muted">
                            No players currently online.
                            <button
                              onClick={() => setActivePlayers([
                                { name: "Steve", role: "Administrator", ping: 12 },
                                { name: "Alex", role: "Player", ping: 25 },
                                { name: "Notch", role: "Moderator", ping: 48 }
                              ])}
                              className="mt-2 block mx-auto text-primary-cyan underline font-bold"
                            >
                              Reset Player List
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          case "config":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Server Configuration Editor</span>
                  <span className="text-[10px] text-success-teal font-mono">server.properties</span>
                </div>
                <div className="space-y-2 bg-[#0D1321] p-3 rounded-lg border border-[#2A3650]/40 font-mono text-[10px] text-text-muted">
                  {[
                    { key: "pvp", type: "boolean", val: configValues.pvp },
                    { key: "difficulty", type: "select", val: configValues.difficulty, options: ["peaceful", "easy", "normal", "hard"] },
                    { key: "max-players", type: "number", val: configValues.maxPlayers },
                    { key: "view-distance", type: "number", val: configValues.viewDistance },
                  ].map((cfg) => (
                    <div key={cfg.key} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                      <span className="text-primary-cyan">{cfg.key}</span>
                      {cfg.type === "boolean" ? (
                        <button
                          onClick={() => setConfigValues(prev => ({ ...prev, pvp: !prev.pvp }))}
                          className={`px-2 py-0.5 rounded font-bold text-[9px] ${cfg.val ? "bg-success-teal/20 text-success-teal" : "bg-red-500/10 text-red-400"
                            }`}
                        >
                          {cfg.val ? "true" : "false"}
                        </button>
                      ) : cfg.type === "select" ? (
                        <select
                          value={cfg.val as string}
                          onChange={(e) => setConfigValues(prev => ({ ...prev, difficulty: e.target.value }))}
                          className="bg-[#161C2C] border border-[#2A3650] rounded px-1 text-[9px] text-white focus:outline-none"
                        >
                          {cfg.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          value={cfg.val as number}
                          onChange={(e) => setConfigValues(prev => ({
                            ...prev,
                            [cfg.key === "max-players" ? "maxPlayers" : "viewDistance"]: Number(e.target.value)
                          }))}
                          className="bg-[#161C2C] border border-[#2A3650] rounded px-1.5 py-0.2 w-12 text-center text-white text-[9px] focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          case "version":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Server Core / Software</span>
                  <span className="text-[10px] text-text-muted font-normal">Instant Version Switch</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "PaperMC", type: "Java Optimized", version: "1.21.1" },
                    { name: "Fabric", type: "Modded Runtimes", version: "1.21.1" },
                    { name: "Purpur", type: "Highly Configurable", version: "1.21.1" },
                    { name: "Forge", type: "Heavy Modpacks", version: "1.20.1" }
                  ].map((ver) => (
                    <button
                      key={ver.name}
                      onClick={() => setSelectedVersion(ver.name)}
                      className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all ${selectedVersion === ver.name
                        ? "border-primary-cyan bg-primary-cyan/5 shadow-[0_0_15px_var(--color-primary-theme-glow)]"
                        : "border-[#2A3650]/60 bg-[#161C2C]/30 hover:border-[#3388FF]/30"
                        }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold text-white text-[11px]">{ver.name}</span>
                        {selectedVersion === ver.name && <span className="w-1.5 h-1.5 rounded-full bg-success-teal" />}
                      </div>
                      <div className="text-[8px] text-text-muted mt-0.5">{ver.type}</div>
                      <div className="text-[9px] font-mono text-primary-cyan mt-1.5">{ver.version}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          case "egg":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Startup egg Variable Modifiers</span>
                  <span className="text-[9px] text-[#FF9E64] font-bold">DANGER ZONE</span>
                </div>
                <div className="space-y-2 bg-[#0D1321] p-3 rounded-lg border border-[#2A3650]/40 font-mono text-[9px] text-text-muted">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary-cyan">STARTUP_CMD</span>
                    <input
                      type="text"
                      value="java -Xms128M -XX:MaxRAMPercentage=95.0 -jar server.jar nogui"
                      readOnly
                      className="bg-[#161C2C] border border-[#2A3650] rounded px-2 py-0.5 text-white text-[9px] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-primary-cyan">DOCKER_IMAGE</span>
                    <input
                      type="text"
                      value="ghcr.io/pterodactyl/yolks:java_21"
                      readOnly
                      className="bg-[#161C2C] border border-[#2A3650] rounded px-2 py-0.5 text-white text-[9px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
        }
        break;
      case "web":
        switch (activeMenu) {
          case "git":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Git Integration Blueprint</span>
                  <span className="text-[10px] text-success-teal bg-success-teal/10 px-2 py-0.5 rounded border border-success-teal/20">CONNECTED</span>
                </div>
                <div className="p-3 rounded-lg bg-[#161C2C]/50 border border-[#2A3650]/40 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-text-muted">Repository:</span>
                    <span className="text-white font-bold">github.com/dynoxium/staging-app</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-text-muted">Auto-Deploy:</span>
                    <span className="text-success-teal font-semibold">Enabled (on git push)</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 mt-1">
                    <div className="text-[9px] text-text-muted font-normal">LATEST DEPLOYMENT COMMIT:</div>
                    <div className="text-[10px] font-mono text-primary-cyan mt-1 flex items-center gap-1.5">
                      <span className="bg-[#3388FF]/15 text-[#3388FF] px-1 py-0.2 rounded text-[8px] font-bold">a8b9c1d</span>
                      <span>feat: add premium pricing tiers and checkout flows</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          case "domain":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Custom Domain Configurations</span>
                  <span className="text-[10px] text-primary-cyan">Edge Router Proxy</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="my-custom-domain.com"
                    defaultValue="app.dynoxium.host"
                    className="bg-[#161C2C] border border-[#2A3650] rounded px-3 py-1 text-white text-[10px] focus:outline-none flex-grow"
                  />
                  <button className="bg-[#3388FF] text-white hover:bg-primary-cyan hover:text-black font-bold px-3 py-1 rounded text-[10px]">
                    Add Map
                  </button>
                </div>
                <div className="mt-2 p-2.5 rounded-lg bg-[#161C2C]/30 border border-[#2A3650]/40 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white">app.dynoxium.host</span>
                    <span className="text-[8px] text-text-muted">CNAME router-sg.dynoxium.cloud</span>
                  </div>
                  <span className="text-[9px] bg-success-teal/20 text-success-teal px-2 py-0.5 rounded border border-success-teal/30">
                    Active
                  </span>
                </div>
              </div>
            );
          case "ssl":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Automated SSL Certificate Status</span>
                  <span className="text-[10px] text-success-teal">SECURED</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0D1321] border border-[#2A3650]/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success-teal/10 flex items-center justify-center text-success-teal border border-success-teal/20 flex-shrink-0">
                    <Shield className="h-5 w-5 fill-success-teal/10" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[11px]">Let&apos;s Encrypt Wildcard SSL</h4>
                    <p className="text-[9px] text-text-muted mt-0.5">Expires in 89 days (Auto-renews dynamically)</p>
                    <p className="text-[8px] font-mono text-primary-cyan mt-1">SHA256 Fingerprint: FA:3B:82:1D:9C...</p>
                  </div>
                </div>
              </div>
            );
          case "env":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Environment Variables</span>
                  <span className="text-[9px] text-[#FF9E64]">Hidden in Builds</span>
                </div>
                <div className="space-y-2 font-mono text-[9px] text-text-muted">
                  <div className="flex gap-2">
                    <input type="text" readOnly value="DATABASE_URL" className="bg-[#161C2C] border border-[#2A3650] rounded px-2 py-1 text-primary-cyan w-1/3" />
                    <input type="password" readOnly value="postgresql://postgres:********@sg-db.dynoxium" className="bg-[#161C2C] border border-[#2A3650] rounded px-2 py-1 text-white w-2/3" />
                  </div>
                  <div className="flex gap-2">
                    <input type="text" readOnly value="JWT_SECRET" className="bg-[#161C2C] border border-[#2A3650] rounded px-2 py-1 text-primary-cyan w-1/3" />
                    <input type="password" readOnly value="super_secret_token_123" className="bg-[#161C2C] border border-[#2A3650] rounded px-2 py-1 text-white w-2/3" />
                  </div>
                </div>
              </div>
            );
        }
        break;
      case "vps":
        switch (activeMenu) {
          case "os":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>OS Reinstallation Node</span>
                  <span className="text-[9px] text-[#EF4444] font-bold">WARNING: WIPES DISK</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Ubuntu 24.04 LTS", "Debian 12", "Alpine Linux", "Rocky Linux", "AlmaLinux", "CentOS Stream"].map((os) => (
                    <button key={os} className="p-2 rounded-lg bg-[#161C2C]/50 border border-[#2A3650]/40 text-center hover:border-primary-cyan hover:bg-[#161C2C] text-[9px] font-bold text-white">
                      {os}
                    </button>
                  ))}
                </div>
              </div>
            );
          case "vnc":
            return (
              <div className="w-full h-full bg-[#070A13] p-4 font-mono text-[9px] text-[#A0AEC0] flex flex-col gap-1 overflow-y-auto select-text">
                <div>[    0.000000] Linux version 6.8.0-31-generic (gcc version 13.2.0)</div>
                <div>[    1.240212] ACPI: Core revision 20230526</div>
                <div>[    3.150490] Serial: 8250/16550 driver, 4 ports, IRQ sharing enabled</div>
                <div>[    4.520109] sd 0:0:0:0: [sda] 500202240 512-byte logical sectors: (256 GB/238 GiB)</div>
                <div>[    5.890452] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null).</div>
                <div className="text-white mt-2">dynoxium-vps-client login: root</div>
                <div className="text-white">Password: **********</div>
                <div className="text-success-teal mt-1">Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)</div>
                <div className="flex items-center gap-1.5 text-white mt-1">
                  <span>root@dynoxium-vps:~#</span>
                  <span className="w-1.5 h-3 bg-white inline-block animate-pulse" />
                </div>
              </div>
            );
          case "firewall":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Edge Traffic Ports Firewall</span>
                  <span className="text-[10px] text-primary-cyan">10Gbps Edge Filter</span>
                </div>
                <div className="space-y-2">
                  {[
                    { port: "22 (SSH)", desc: "Remote administrative access", allowed: firewallRules.ssh },
                    { port: "80 (HTTP)", desc: "Web server traffic port", allowed: firewallRules.http },
                    { port: "443 (HTTPS)", desc: "Secure SSL web traffic", allowed: firewallRules.https },
                    { port: "25565 (Minecraft)", desc: "Game client connection port", allowed: firewallRules.mc }
                  ].map((rule) => (
                    <div key={rule.port} className="flex justify-between items-center p-2 rounded-lg bg-[#161C2C]/50 border border-[#2A3650]/40 font-sans">
                      <div>
                        <div className="font-bold text-white text-[10px]">{rule.port}</div>
                        <div className="text-[8.5px] text-text-muted">{rule.desc}</div>
                      </div>
                      <button
                        onClick={() => {
                          const key = rule.port.includes("SSH") ? "ssh" : rule.port.includes("HTTP ") ? "http" : rule.port.includes("HTTPS") ? "https" : "mc";
                          setFirewallRules(prev => ({ ...prev, [key]: !prev[key] }));
                        }}
                        className={`px-3 py-1 rounded text-[9px] font-bold transition-all border ${rule.allowed
                          ? "bg-success-teal/20 text-success-teal border-success-teal/30"
                          : "bg-red-500/10 text-red-400 border-red-500/25"
                          }`}
                      >
                        {rule.allowed ? "ALLOW" : "BLOCK"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "scaling":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Hardware Resource Scaling</span>
                  <span className="text-[9px] text-[#FF9E64]">Dynamic Billing Scale</span>
                </div>
                <div className="space-y-3 font-sans">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-text-muted">
                      <span>CPU Cores:</span>
                      <span className="font-bold text-white">{sliderCpu} Cores (7950X)</span>
                    </div>
                    <input
                      type="range" min="1" max="16" value={sliderCpu}
                      onChange={(e) => setSliderCpu(Number(e.target.value))}
                      className="w-full accent-primary-cyan cursor-pointer h-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-text-muted">
                      <span>Dedicated Memory:</span>
                      <span className="font-bold text-white">{sliderRam} GB DDR5 ECC</span>
                    </div>
                    <input
                      type="range" min="2" max="64" value={sliderRam}
                      onChange={(e) => setSliderRam(Number(e.target.value))}
                      className="w-full accent-primary-cyan cursor-pointer h-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-text-muted">
                      <span>Gen4 NVMe Disk Space:</span>
                      <span className="font-bold text-white">{sliderSsd} GB Storage</span>
                    </div>
                    <input
                      type="range" min="20" max="500" value={sliderSsd}
                      onChange={(e) => setSliderSsd(Number(e.target.value))}
                      className="w-full accent-primary-cyan cursor-pointer h-1"
                    />
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-2">
                    <span className="text-[10px] text-text-muted">Hourly Cost:</span>
                    <span className="text-xs font-bold text-success-teal font-mono">
                      ${(0.008 * sliderCpu + 0.003 * sliderRam + 0.0001 * sliderSsd).toFixed(4)}/hr
                    </span>
                  </div>
                </div>
              </div>
            );
        }
        break;
      case "reseller":
        switch (activeMenu) {
          case "users":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Sub-Client Account Provisions</span>
                  <span className="text-[10px] text-primary-cyan font-normal">Active Clients: 3</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "John Doe Hosting", servers: "3 Nodes active", status: "Active" },
                    { name: "Vapor Gaming LLC", servers: "8 Nodes active", status: "Active" },
                    { name: "Alpha Dev Studios", servers: "1 Node active", status: "Active" }
                  ].map((client) => (
                    <div key={client.name} className="flex justify-between items-center p-2 rounded-lg bg-[#161C2C]/50 border border-[#2A3650]/40">
                      <div>
                        <div className="font-bold text-white text-[10px]">{client.name}</div>
                        <div className="text-[9px] text-text-muted">{client.servers}</div>
                      </div>
                      <span className="text-[9px] bg-[#3388FF]/15 text-[#3388FF] px-2 py-0.5 rounded font-semibold">
                        {client.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "api":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-2.5 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>REST API Deploy Snippets</span>
                  <div className="flex gap-1.5 select-none text-[8px]">
                    <button onClick={() => setApiLanguage("curl")} className={`px-1.5 py-0.5 rounded ${apiLanguage === "curl" ? "bg-primary-cyan text-black font-bold" : "bg-[#161C2C] text-text-muted"}`}>cURL</button>
                    <button onClick={() => setApiLanguage("node")} className={`px-1.5 py-0.5 rounded ${apiLanguage === "node" ? "bg-primary-cyan text-black font-bold" : "bg-[#161C2C] text-text-muted"}`}>Node.js</button>
                  </div>
                </div>
                <div className="p-3 bg-[#0D1321] border border-[#2A3650]/40 rounded-lg font-mono text-[9px] text-text-muted overflow-x-auto select-all leading-normal">
                  {apiLanguage === "curl" ? (
                    <div>
                      <span className="text-[#3388FF]">curl</span> -X POST <span className="text-success-teal">&quot;https://api.dynoxium.cloud/v1/servers&quot;</span> \<br />
                      &nbsp;&nbsp;-H <span className="text-success-teal">&quot;Authorization: Bearer dx_live_token&quot;</span> \<br />
                      &nbsp;&nbsp;-d &apos;{"{"}&quot;egg&quot;:&quot;java_21&quot;,&quot;ram&quot;:2048,&quot;cores&quot;:2{"}"}&apos;
                    </div>
                  ) : (
                    <div>
                      <span className="text-[#3388FF]">const</span> res = <span className="text-[#3388FF]">await</span> fetch(<span className="text-success-teal">&quot;https://api.dynoxium.cloud/v1/servers&quot;</span>, {"{"}<br />
                      &nbsp;&nbsp;method: <span className="text-success-teal">&quot;POST&quot;</span>,<br />
                      &nbsp;&nbsp;headers: {"{"} Auth: <span className="text-success-teal">&quot;Bearer token&quot;</span> {"}"},<br />
                      &nbsp;&nbsp;body: JSON.stringify({"{"} egg: <span className="text-success-teal">&quot;java_21&quot;</span>, ram: <span className="text-white">2048</span> {"}"})<br />
                      {"}"});
                    </div>
                  )}
                </div>
              </div>
            );
          case "branding":
            return (
              <div className="w-full h-full bg-[#080B15] p-4 text-xs flex flex-col gap-3 overflow-y-auto font-sans">
                <div className="text-white font-bold mb-1 flex items-center justify-between">
                  <span>Custom White-Label Panel Branding</span>
                  <span className="text-[10px] text-primary-cyan font-normal">Style Override</span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1 font-sans">
                    <span className="text-[9px] text-text-muted">Primary Brand Accent:</span>
                    <div className="flex gap-2">
                      {["#6CF4FF", "#00E5A3", "#EF4444", "#A855F7"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setBrandingColor(color)}
                          className={`w-6 h-6 rounded-full border transition-all ${brandingColor === color ? "border-white scale-110 shadow-[0_0_10px_white]" : "border-transparent"
                            }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-3 border flex items-center justify-between font-sans" style={{ borderColor: brandingColor, borderRadius: `${brandingBorderRadius}px` }}>
                    <span className="font-bold" style={{ color: brandingColor }}>Custom Styled Client Card</span>
                    <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-white border border-white/10">White Label</span>
                  </div>
                </div>
              </div>
            );
        }
        break;
    }
    return null;
  };

  // Testimonials Carousel States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [dragDisplacement, setDragDisplacement] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);

  // Discord Widget Data State
  const [discordWidget, setDiscordWidget] = useState<{
    instant_invite: string;
    presence_count: number;
    members: Array<{
      id: string;
      username: string;
      avatar_url: string;
      status: string;
    }>;
  } | null>(null);

  // 3D Tilt effect for Hero mockup
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const factorX = 12 / (box.height / 2); // Max 12 deg tilt
    const factorY = 12 / (box.width / 2);
    setTilt({ x: -y * factorX, y: x * factorY });
  };
  const handleMouseLeaveTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1507859529625501906/widget.json")
      .then((res) => res.json())
      .then((data) => setDiscordWidget(data))
      .catch((err) => console.error("Error fetching Discord widget:", err));
  }, []);

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
    const maxSlide = Math.max(0, testimonials.length - visibleSlides);
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
    const maxSlide = Math.max(0, testimonials.length - visibleSlides);
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
    const maxSlide = Math.max(0, testimonials.length - visibleSlides);
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

    const maxSlide = Math.max(0, testimonials.length - visibleSlides);

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

    const maxSlide = Math.max(0, testimonials.length - visibleSlides);

    if (currentSlide === 0 && diffX > 0) {
      diffX = diffX * 0.45;
    } else if (currentSlide === maxSlide && diffX < 0) {
      diffX = diffX * 0.45;
    }

    setDragDisplacement(diffX);
  };

  const currentCategory = panelCategories.find((c) => c.id === activeCategory) || panelCategories[0];
  const currentMenu = currentCategory.menus.find((m) => m.id === activeMenu) || currentCategory.menus[0];

  // Reset or set error state on image loading
  const handleImageError = (catId: string, menuId: string) => {
    setImageErrors((prev) => ({ ...prev, [`${catId}-${menuId}`]: true }));
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const category = panelCategories.find((c) => c.id === catId);
    if (category && category.menus.length > 0) {
      setActiveMenu(category.menus[0].id);
    }
  };

  // Auto-switch dashboard tabs & menus on a timer (loops inside the currently active category only)
  useEffect(() => {
    const category = panelCategories.find((c) => c.id === activeCategory);
    if (!category || category.menus.length === 0) return;

    const interval = setInterval(() => {
      const currentMenuIndex = category.menus.findIndex((m) => m.id === activeMenu);
      const nextMenuIndex = (currentMenuIndex + 1) % category.menus.length;
      setActiveMenu(category.menus[nextMenuIndex].id);
    }, 3000); // switch every 5 seconds

    return () => clearInterval(interval);
  }, [activeCategory, activeMenu]);

  // Viewport resize detection for Testimonials Carousel
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

  // Testimonials Autoplay logic
  useEffect(() => {
    const maxSlide = Math.max(0, testimonials.length - visibleSlides);
    const interval = setInterval(() => {
      if (isMouseDown) return; // Pause autoplay when dragging
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [visibleSlides, isMouseDown]);


  // FAQ State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Templates for simulated IDE files
  const txtMain = `import { CloudNode } from "dynoxium";

const app = new CloudNode({
  port: 8080,
  runtime: "nodejs22"
});

app.deploy();`;

  const txtDocker = `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
CMD ["node", "main.js"]`;

  const txtHtml = `<!DOCTYPE html>
<html>
<head>
  <title>DynoXium App</title>
  <style>
    body { background: #0c0f1d; color: #45d6ff; }
  </style>
</head>
<body>
  <h1>Live DynoNode</h1>
  <p>Hello world!</p>
</body>
</html>`;

  // Interactive Code Server States
  const [isInteractive, setIsInteractive] = useState(false);
  const [activeFile, setActiveFile] = useState<"main.ts" | "Dockerfile" | "index.html" | "preview">("main.ts");
  const [typedMain, setTypedMain] = useState("");
  const [typedDocker, setTypedDocker] = useState("");
  const [typedHtml, setTypedHtml] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [terminalCmd, setTerminalCmd] = useState("");
  const [keysTyped, setKeysTyped] = useState(0);

  // App states for interactive Live Preview
  const [clickCount, setClickCount] = useState(0);
  const [cpuLoad, setCpuLoad] = useState(42);
  const [appName, setAppName] = useState("DynoNode");

  // Autopilot states
  const [demoStep, setDemoStep] = useState(0);

  // Refs for auto-scrolling
  const terminalRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Scroll terminal automatically (only the inner container scroll, preventing page scrolling)
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Scroll editor automatically when typing
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollTop = editorRef.current.scrollHeight;
    }
  }, [typedMain, typedDocker, typedHtml, activeFile]);

  // Autopilot typing simulation loop
  useEffect(() => {
    if (isInteractive) return;

    let active = true;

    const runAutoPilot = async () => {
      // Step 0: Type main.ts
      if (demoStep === 0) {
        if (!active) return;
        setActiveFile("main.ts");
        setTypedMain("");
        setTypedDocker("");
        setTypedHtml("");
        setIsDeployed(false);
        setIsDeploying(false);
        setDeployProgress(0);
        setTerminalCmd("");
        setTerminalLogs([]);
        setClickCount(0);
        setCpuLoad(42);

        await new Promise((resolve) => setTimeout(resolve, 800));

        let currentText = "";
        for (let i = 0; i < txtMain.length; i += 2) {
          if (!active) return;
          currentText += txtMain.slice(i, i + 2);
          setTypedMain(currentText);
          await new Promise((resolve) => setTimeout(resolve, 15));
        }

        if (active) setDemoStep(1);
      }

      // Step 1: Type npm run deploy
      else if (demoStep === 1) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (!active) return;
        setActiveFile("main.ts");

        let currentText = "";
        const cmd = "npm run deploy";
        for (let i = 0; i < cmd.length; i++) {
          if (!active) return;
          currentText += cmd[i];
          setTerminalCmd(currentText);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }

        if (active) setDemoStep(2);
      }

      // Step 2: Run deploy sequence
      else if (demoStep === 2) {
        if (!active) return;
        setIsDeploying(true);
        setTerminalCmd("");

        const logs = [
          "[SYSTEM] Allocating container nodes (Region: SG)...",
          "[SYSTEM] Extracting filesystem layers for node:22-alpine...",
          "[SYSTEM] Running build phase: npm ci --omit=dev...",
          "✓ Docker compiler generated layout build in 1.1s",
          "✓ Configured edge traffic routing for ports: 8080 -> public",
          "✓ Deploy success! Live at https://node-8.dynoxium.cloud"
        ];

        for (let step = 0; step < logs.length; step++) {
          if (!active) return;
          setDeployProgress((step + 1) * 16.6);
          setTerminalLogs((prev) => [...prev, logs[step]]);
          await new Promise((resolve) => setTimeout(resolve, 350));
        }

        if (active) {
          setIsDeploying(false);
          setIsDeployed(true);
          setActiveFile("preview");
          setDemoStep(3);
        }
      }

      // Step 3: Live App interactions loop
      else if (demoStep === 3) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!active) return;
        setClickCount((c) => c + 1);
        setTerminalLogs((prev) => [...prev, `[APP LOG] GET / - 200 OK (1.1ms)`]);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!active) return;
        setClickCount((c) => c + 1);
        setTerminalLogs((prev) => [...prev, `[APP LOG] GET /api/ping - 200 OK (0.6ms)`]);
        setCpuLoad(68);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!active) return;
        setCpuLoad(85);
        setTerminalLogs((prev) => [...prev, `[APP LOG] GET /metrics - 200 OK (1.4ms)`]);

        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (active) setDemoStep(0);
      }
    };

    runAutoPilot();

    return () => {
      active = false;
    };
  }, [isInteractive, demoStep]);

  // Triggered when switching to interactive
  const handleToggleInteractive = () => {
    setIsInteractive((prev) => {
      const next = !prev;
      if (next) {
        setTypedMain("");
        setTypedDocker("");
        setTypedHtml("");
        setIsDeployed(false);
        setIsDeploying(false);
        setDeployProgress(0);
        setTerminalCmd("");
        setTerminalLogs([
          "Interactive Mode Active.",
          "Select a file, click the editor, and type on your keyboard!",
          "Or click [Quick Paste] & [Deploy Code] in top right."
        ]);
        setClickCount(0);
        setCpuLoad(42);
        setKeysTyped(0);
        setActiveFile("main.ts");
      } else {
        setDemoStep(0);
      }
      return next;
    });
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive || isDeploying || isDeployed) return;

    if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      // Let standard movement keys pass
    } else {
      e.preventDefault();
    }

    const currentTemplate =
      activeFile === "main.ts" ? txtMain :
        activeFile === "Dockerfile" ? txtDocker : txtHtml;

    const currentText =
      activeFile === "main.ts" ? typedMain :
        activeFile === "Dockerfile" ? typedDocker : typedHtml;

    const setter =
      activeFile === "main.ts" ? setTypedMain :
        activeFile === "Dockerfile" ? setTypedDocker : setTypedHtml;

    if (currentText.length >= currentTemplate.length) {
      return;
    }

    const nextLen = Math.min(currentText.length + 3, currentTemplate.length);
    setter(currentTemplate.slice(0, nextLen));
    setKeysTyped((k) => k + 3);
  };

  const handleManualDeploy = async () => {
    if (isDeploying || isDeployed) return;

    setIsDeploying(true);
    setDeployProgress(0);
    setTerminalLogs(["[SYSTEM] Initiating manual deployment on Ryzen 9 7950X...", "[SYSTEM] Building container filesystem..."]);

    const logs = [
      "[SYSTEM] Resolving package.json dependencies...",
      "[SYSTEM] Compiling TypeScript resources...",
      "✓ Docker sandbox configured.",
      "✓ Ports exposed: 8080 (HTTP) -> public proxy",
      "✓ Manual deployment successful! Live at node-8.dynoxium.cloud"
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDeployProgress((i + 1) * 20);
      setTerminalLogs((prev) => [...prev, logs[i]]);
    }

    setIsDeploying(false);
    setIsDeployed(true);
    setActiveFile("preview");
    setTerminalLogs((prev) => [...prev, "[APP] App listening on port 8080... ready."]);
  };


  const categories = [
    {
      title: "Minecraft Server",
      desc: "Low-latency Java & Bedrock hosting with automated modpack installers and instant setup.",
      icon: Server,
      path: "/game/minecraft",
    },
    {
      title: "Discord Bot",
      desc: "Always-online hosting for JavaScript, Python, Java, or Go bots with live logs console.",
      icon: Terminal,
      path: "/bot",
    },
    {
      title: "Web Hosting",
      desc: "Next-gen edge-optimized static and dynamic web app hosting (Next.js, React, HTML).",
      icon: Code,
      path: "/web",
    },
    {
      title: "Database Cluster",
      desc: "Managed PostgreSQL, MySQL, MongoDB, and Redis with automatic backups and scaling.",
      icon: Database,
      path: "/vps",
    },
    {
      title: "VPS Servers",
      desc: "Root-access virtual private servers with dedicated resources and NVMe storage.",
      icon: Cpu,
      path: "/vps",
    },
    {
      title: "Code Server",
      desc: "Your personal cloud IDE. Code from any browser on any device with persistent storage.",
      icon: Layers,
      path: "/web",
    },
  ];

  const benefits = [
    {
      title: "Instant Deployment",
      desc: "Provision global resources in under 60 seconds with our proprietary automation engine.",
      icon: Zap,
    },
    {
      title: "Enterprise DDoS Protection",
      desc: "Multi-layered 12Tbps mitigation. Your services stay online during the toughest attacks.",
      icon: Shield,
    },
    {
      title: "NVMe Storage Architecture",
      desc: "Pure Gen4 NVMe arrays ensure zero I/O bottlenecks and ultra-fast data reads.",
      icon: Cpu,
    },
  ];



  const faqs = [
    {
      q: "How does the Freemium model work?",
      a: "Our Free Tier gives you 512MB RAM, 1 shared CPU core, and 5GB SSD storage forever. You can deploy Discord bots, static sites, or test databases at zero cost. If your resource usage grows, you can seamlessly scale up to paid tiers with dedicated CPUs and Gen4 NVMe storage.",
    },
    {
      q: "Do you offer DDoS protection on all servers?",
      a: "Yes! All instances, including the Free Tier, are protected by our multi-layered 12Tbps mitigation filters. Your services remain online during UDP floods, DNS amplifications, and TCP SYN flood attacks.",
    },
    {
      q: "Can I host custom Minecraft modpacks?",
      a: "Absolutely! Our panel supports one-click installs for all major modpacks (CurseForge, Modrinth, FTB) and server engines (Forge, Fabric, PaperMC). You also get full SFTP access to manage your files.",
    },
    {
      q: "Where are your server nodes located?",
      a: "We operate dedicated enterprise nodes in Singapore, New York, Frankfurt, Tokyo, and Sydney to ensure optimal latency and green ping times worldwide.",
    },
  ];

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        /* Features Section Styles */
        .features-section-container {
          min-height: 100vh !important;
          height: auto !important;
        }
        .features-card {
          min-height: 230px !important;
          padding: 1.75rem 1.5rem !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .features-card-icon {
          margin-bottom: 1.15rem !important;
          width: 2.25rem !important;
          height: 2.25rem !important;
        }
        .features-card-title {
          margin-bottom: 0.5rem !important;
          font-size: 1.15rem !important;
        }
        .features-card-desc {
          font-size: 0.825rem !important;
          line-height: 1.45 !important;
        }

        @media (max-width: 1023px) {
          .features-section-container {
            padding-top: 5rem !important;
            padding-bottom: 5rem !important;
          }
          .features-card {
            min-height: 210px !important;
            padding: 1.5rem 1.25rem !important;
          }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        @media (max-width: 767px) {
          .animate-marquee {
            animation: marquee 12s linear infinite;
          }
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Scroll & Load Reveal Animations */
        .reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale {
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        
        .reveal-up { transform: translateY(45px); }
        .reveal-left { transform: translateX(-45px); }
        .reveal-right { transform: translateX(45px); }
        .reveal-scale { transform: scale(0.96); }
        
        .reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-500 { transition-delay: 500ms; }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative lg:h-screen lg:min-h-[720px] min-h-screen flex items-center pt-24 pb-16 lg:py-0 overflow-hidden">
        {/* Minecraft Game Wallpaper Background with deep dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/minecraft-bg.webp"
            alt="Minecraft Wallpaper"
            fill
            sizes="100vw"
            className="object-cover opacity-35 grayscale contrast-110 brightness-75 transform-gpu"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/10 via-[#0B0F19]/80 to-[#0B0F19]" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-cyan/10 rounded-full blur-[60px] md:blur-[120px] transform-gpu pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-cyan/10 rounded-full blur-[60px] md:blur-[120px] transform-gpu pointer-events-none" />

        {/* Floating Game Spore Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-[25%] left-[8%] w-2 h-2 bg-primary-cyan/30 rounded-sm animate-bounce-slow transform-gpu" />
          <div className="absolute top-[65%] left-[40%] w-3 h-3 bg-secondary-cyan/20 rounded-sm animate-bounce-slow transform-gpu" style={{ animationDelay: "2s", animationDuration: "8s" }} />
          <div className="absolute top-[35%] right-[15%] w-2 h-2 bg-[#3388FF]/30 rounded-sm animate-bounce-slow transform-gpu" style={{ animationDelay: "4s", animationDuration: "5s" }} />
          <div className="absolute bottom-[20%] left-[20%] w-2 h-2 bg-primary-cyan/15 rounded-sm animate-bounce-slow transform-gpu" style={{ animationDelay: "1s", animationDuration: "7s" }} />
        </div>

        <div className="relative z-10 max-w-[96%] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

            {/* Left Content (Col span 7) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Rating Banner */}
              <div className="flex flex-wrap items-center gap-3 mb-6 bg-[#161C2C]/70 border border-[#2A3650]/40 px-4 py-2 rounded-lg backdrop-blur-md hero-reveal">
                {/* 5 Green Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-[#22c55e] p-1 rounded-sm flex items-center justify-center">
                      <Star className="h-3 w-3 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-text-light font-medium">
                  We&apos;re rated <strong className="text-white">4.7</strong> out of <strong className="text-white">5</strong> stars
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1 uppercase bg-black px-2 py-0.5 rounded border border-[#2A3650] tracking-tight">
                  <Star className="h-3.5 w-3.5 fill-green-500 text-green-500" /> REVIEWS.io
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 uppercase leading-[1.05] hero-stagger-1">
                CLOUD CODE SERVERS <br />
                & GAME HOSTING <br />
                ON DEMAND
              </h1>

              {/* Subheading Description */}
              <p className="text-base sm:text-lg text-text-muted max-w-xl mb-10 leading-relaxed hero-stagger-2">
                Deploy personal VS Code-Servers, Next.js runtimes, database nodes, or high-performance game servers instantly on high-frequency dedicated CPU cores.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto hero-stagger-3">
                <Link
                  href="/web"
                  className="w-full sm:w-auto bg-[#2563EB] text-white hover:bg-[#6CF4FF] hover:text-[#0B0F19] px-8 py-3.5 rounded font-bold hover:glow-cyan transition-all duration-300 text-center btn-hover-lift"
                >
                  Deploy Code Server
                </Link>
                <Link
                  href="/game"
                  className="w-full sm:w-auto border border-[#2A3650] bg-[#161C2C]/50 backdrop-blur-sm text-text-light hover:bg-[#2A3650]/50 px-8 py-3.5 rounded font-bold transition-all text-center btn-hover-lift"
                >
                  Explore Game Plans
                </Link>
              </div>

              {/* Trust Badges / Feature Tags */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-xs text-text-muted font-medium select-none hero-stagger-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-pulse" />
                  Free 512MB Core Tier
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-pulse" />
                  12Tbps DDoS Protection
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-pulse" />
                  Enterprise NVMe Storage
                </span>
              </div>
            </div>

            {/* Right Code Server Visual (Col span 5) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full relative">

              {/* Subtle Radial Glow Backdrop */}
              <div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[110%] h-[120%] pointer-events-none rounded-2xl z-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(108,244,255,0.06) 0%, rgba(51,136,255,0.03) 40%, transparent 70%)',
                }}
              />

              {/* Floating tech badge 1 (Top-Right, Cyan) */}
              <div className="hidden md:flex absolute -top-12 -right-6 z-0 pointer-events-none w-14 h-14 bg-[#0D1321]/90 backdrop-blur-md border border-primary-cyan/35 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-black/50 animate-bounce-slow">
                <Cpu className="h-5 w-5 text-primary-cyan mb-0.5" />
                <span className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter">7950x</span>
              </div>

              {/* Floating tech badge 2 (Bottom-Left, Blue) */}
              <div className="hidden md:flex absolute -bottom-8 -left-8 z-0 pointer-events-none w-12 h-12 bg-[#0D1321]/90 backdrop-blur-md border border-[#3388FF]/35 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-black/50 animate-bounce-slow" style={{ animationDelay: "2s" }}>
                <Server className="h-4.5 w-4.5 text-[#3388FF] mb-0.5" />
                <span className="text-[7.5px] font-mono font-bold text-white uppercase tracking-tighter">Node-8</span>
              </div>

              {/* Floating Code Symbol </ > */}
              <div
                className="hidden md:block absolute -top-2 -left-10 font-mono text-2xl font-bold text-primary-cyan/35 select-none animate-pulse z-0 pointer-events-none"
              >
                &lt;/&gt;
              </div>

              {/* Floating Code Symbol { } */}
              <div
                className="hidden md:block absolute bottom-12 -right-8 font-mono text-3xl font-bold text-[#3388FF]/35 select-none animate-pulse z-0 pointer-events-none"
              >
                {"{}"}
              </div>

              {/* Main VS Code Window Container (z-10 on top of 3D elements) */}
              <div
                className="relative w-full max-w-[460px] sm:max-w-[480px] filter drop-shadow-[0_0_30px_rgba(108,244,255,0.15)] z-10 animate-hero-mockup cursor-pointer"
                onMouseMove={handleMouseMoveTilt}
                onMouseLeave={handleMouseLeaveTilt}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
                }}
              >
                <div className={`w-full bg-[#0D1321]/95 backdrop-blur-xl border transition-colors duration-500 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px] ${isDeployed ? "border-[#1edfbd]/40 shadow-[0_0_30px_rgba(30,223,189,0.15)]" : "border-[#2A3650]"
                  }`}>

                  {/* Title Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F19] border-b border-[#2A3650]/40 select-none">
                    {/* Window Controls */}
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80" />
                      {/* Pulse Live Badge */}
                      {isDeployed && (
                        <span className="ml-3 px-2 py-0.5 text-[8px] font-bold text-success-teal bg-success-teal/10 border border-success-teal/30 rounded flex items-center gap-1 uppercase tracking-wider animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-success-teal" /> Live Node
                        </span>
                      )}
                    </div>
                    {/* Filename tab */}
                    <span className="text-[10px] font-mono text-text-muted font-medium flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isDeploying ? "bg-[#FFBD2E] animate-spin" : isDeployed ? "bg-success-teal animate-pulse" : "bg-primary-cyan animate-pulse"}`} />
                      <span>workspace (Code Server)</span>
                    </span>
                  </div>

                  {/* Editor Workspace Split */}
                  <div className="flex flex-grow h-0 font-mono text-[11px] leading-relaxed relative">

                    {/* Sidebar File Tree */}
                    <div className="w-24 sm:w-28 bg-[#0D1321] border-r border-[#2A3650]/40 p-3 select-none flex flex-col gap-2 font-sans text-[10px] text-text-muted">
                      <span className="font-bold text-[8px] uppercase tracking-wider text-text-light/75">WORKSPACE</span>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-[9px] font-semibold text-text-light/70 mb-1">
                          <span>📁 src</span>
                        </div>
                        <button
                          onClick={() => { if (!isDeploying) setActiveFile("main.ts"); }}
                          disabled={isDeploying}
                          className={`flex items-center justify-between pl-2 py-1 rounded text-left border-l-2 text-[9px] ${activeFile === "main.ts"
                            ? "text-primary-cyan bg-primary-cyan/5 border-primary-cyan font-semibold"
                            : "border-transparent hover:bg-[#161C2C]/30 text-text-muted"
                            }`}
                        >
                          <span>main.ts</span>
                        </button>
                        <button
                          onClick={() => { if (!isDeploying) setActiveFile("Dockerfile"); }}
                          disabled={isDeploying}
                          className={`flex items-center justify-between pl-2 py-1 rounded text-left border-l-2 text-[9px] ${activeFile === "Dockerfile"
                            ? "text-primary-cyan bg-primary-cyan/5 border-primary-cyan font-semibold"
                            : "border-transparent hover:bg-[#161C2C]/30 text-text-muted"
                            }`}
                        >
                          <span>Dockerfile</span>
                        </button>
                        <button
                          onClick={() => { if (!isDeploying) setActiveFile("index.html"); }}
                          disabled={isDeploying}
                          className={`flex items-center justify-between pl-2 py-1 rounded text-left border-l-2 text-[9px] ${activeFile === "index.html"
                            ? "text-primary-cyan bg-primary-cyan/5 border-primary-cyan font-semibold"
                            : "border-transparent hover:bg-[#161C2C]/30 text-text-muted"
                            }`}
                        >
                          <span>index.html</span>
                        </button>

                        {isDeployed && (
                          <button
                            onClick={() => setActiveFile("preview")}
                            className={`flex items-center gap-1 pl-2 py-1 rounded text-left border-l-2 text-[9px] mt-2 font-bold ${activeFile === "preview"
                              ? "text-success-teal bg-success-teal/5 border-success-teal"
                              : "border-transparent hover:bg-[#161C2C]/30 text-success-teal/80 animate-pulse"
                              }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-success-teal" />
                            <span>Live Preview</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Central Workspace Panel: Switches between Code Editor and Live Preview */}
                    <div className="flex-grow h-full bg-[#090E18] flex flex-col overflow-hidden relative">

                      {activeFile === "preview" && isDeployed ? (
                        /* Simulated Live Web Preview (Fills the workspace area) */
                        <div className="w-full h-full bg-[#080C16] flex flex-col animate-fade-in relative z-20 overflow-hidden">
                          {/* Browser Address Bar */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0B0F19] border-b border-[#2A3650]/40 select-none text-[8px] font-sans text-text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-success-teal" />
                            <div className="flex-grow bg-[#090E18] px-2 py-0.5 rounded border border-[#2A3650]/50 truncate flex items-center gap-1 text-[7px] text-[#A0AEC0]">
                              <span className="text-success-teal">https://</span>node-8.dynoxium.cloud
                            </div>
                            <button
                              onClick={async () => {
                                setIsDeployed(false);
                                await new Promise(r => setTimeout(r, 600));
                                setIsDeployed(true);
                              }}
                              className="hover:text-white"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Mini-App Container Rendering */}
                          <div className="flex-grow p-3.5 flex flex-col justify-between overflow-y-auto transition-all duration-500 font-sans bg-[#080B12] text-text-muted border border-[#2A3650]/40 shadow-inner">

                            {/* Mini-App Header */}
                            <div className="border-b border-white/5 pb-2">
                              <div className="flex justify-between items-center">
                                {isInteractive ? (
                                  <input
                                    type="text"
                                    value={appName}
                                    onChange={(e) => {
                                      const val = e.target.value.slice(0, 15);
                                      setAppName(val);
                                      setTerminalLogs((prev) => [...prev, `[APP LOG] Configuration appName updated to "${val}"`]);
                                    }}
                                    className="bg-black/40 border border-white/10 rounded px-2 py-0.5 text-[10px] font-bold text-white focus:outline-none focus:border-primary-cyan/50 w-28"
                                    placeholder="App Name"
                                    title="Click to rename application"
                                  />
                                ) : (
                                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{appName}</h4>
                                )}
                                <span className="text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-success-teal/10 text-success-teal border border-success-teal/20">
                                  ACTIVE
                                </span>
                              </div>
                              <p className="text-[8px] text-text-muted mt-0.5">DynoXium edge-container cluster SG-01</p>
                            </div>

                            {/* Mini-App Core Specs */}
                            <div className="space-y-1.5 my-2 text-[9px] text-text-muted">
                              <div className="flex justify-between">
                                <span>CPU Load:</span>
                                <span className="font-mono text-white">{cpuLoad}%</span>
                              </div>
                              <div className="w-full bg-black/50 rounded-full h-1.5 border border-white/5 overflow-hidden">
                                <div
                                  style={{ width: `${cpuLoad}%` }}
                                  className="h-full transition-all duration-500 bg-primary-cyan"
                                />
                              </div>
                              <div className="flex justify-between">
                                <span>Requests:</span>
                                <span className="font-mono text-white font-semibold">{clickCount} pings</span>
                              </div>
                            </div>

                            {/* Interactive Preview Buttons */}
                            <div className="flex flex-col gap-1.5 select-none">
                              <button
                                onClick={() => {
                                  setClickCount((c) => c + 1);
                                  setTerminalLogs((prev) => [
                                    ...prev,
                                    `[APP LOG] ${new Date().toLocaleTimeString()} GET /api/ping - 200 OK (${(Math.random() * 2 + 0.3).toFixed(1)}ms)`
                                  ]);
                                }}
                                className="w-full py-1.5 text-[9px] font-bold rounded uppercase tracking-wide transition-all border border-[#3388FF]/35 hover:border-primary-cyan/60 bg-[#161C2C]/90 hover:bg-primary-cyan/10 text-white hover:text-primary-cyan shadow-sm"
                              >
                                ⚡ Click to Ping Node
                              </button>

                              {isInteractive && (
                                <div className="mt-0.5">
                                  <div className="flex items-center bg-black/40 border border-white/10 rounded px-2 py-1 justify-between gap-2">
                                    <span className="text-[7.5px] font-bold text-text-muted uppercase tracking-wider">CPU Scaling</span>
                                    <input
                                      type="range"
                                      min="10"
                                      max="100"
                                      value={cpuLoad}
                                      onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setCpuLoad(val);
                                        if (val % 15 === 0 || val === 100 || val === 10) {
                                          setTerminalLogs(prev => [...prev, `[SYSTEM] Scaled CPU cores to ${val}% power limit.`]);
                                        }
                                      }}
                                      className="w-full max-w-[80px] accent-primary-cyan cursor-pointer h-1"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Mini footer */}
                            <div className="text-[7px] text-text-muted/60 text-center border-t border-white/5 pt-1 mt-1 font-mono">
                              Memory: 114MB / 512MB
                            </div>

                          </div>
                        </div>
                      ) : (
                        /* Code Editor Pane (Fills the workspace area) */
                        <div
                          onKeyDown={handleEditorKeyDown}
                          tabIndex={0}
                          className="w-full h-full p-3 flex flex-col focus:outline-none relative select-text overflow-hidden"
                        >
                          {/* Editor Tabs & Quick Actions */}
                          <div className="flex justify-between items-center border-b border-[#2A3650]/20 pb-2 mb-2 font-sans text-[9px] select-none">
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => { if (!isDeploying) setActiveFile("main.ts"); }}
                                className={`px-2 py-0.5 rounded border ${activeFile === "main.ts"
                                  ? "text-primary-cyan bg-[#0D1321] border-[#2A3650]/40 font-semibold"
                                  : "text-text-muted hover:text-white border-transparent"
                                  }`}
                              >
                                main.ts
                              </button>
                              <button
                                onClick={() => { if (!isDeploying) setActiveFile("Dockerfile"); }}
                                className={`px-2 py-0.5 rounded border ${activeFile === "Dockerfile"
                                  ? "text-primary-cyan bg-[#0D1321] border-[#2A3650]/40 font-semibold"
                                  : "text-text-muted hover:text-white border-transparent"
                                  }`}
                              >
                                Dockerfile
                              </button>
                              <button
                                onClick={() => { if (!isDeploying) setActiveFile("index.html"); }}
                                className={`px-2 py-0.5 rounded border ${activeFile === "index.html"
                                  ? "text-primary-cyan bg-[#0D1321] border-[#2A3650]/40 font-semibold"
                                  : "text-text-muted hover:text-white border-transparent"
                                  }`}
                              >
                                index.html
                              </button>

                              {isDeployed && (
                                <button
                                  onClick={() => setActiveFile("preview")}
                                  className="px-2 py-0.5 rounded border border-transparent text-success-teal/70 hover:text-success-teal flex items-center gap-1 font-semibold animate-pulse"
                                >
                                  <span className="w-1 h-1 rounded-full bg-success-teal" /> Live Preview
                                </button>
                              )}
                            </div>

                            {isInteractive && !isDeploying && !isDeployed && (
                              <div className="flex gap-1.5 items-center">
                                <button
                                  onClick={() => {
                                    setTypedMain(txtMain);
                                    setTypedDocker(txtDocker);
                                    setTypedHtml(txtHtml);
                                  }}
                                  className="text-text-muted hover:text-white bg-[#161C2C] px-1.5 py-0.5 rounded border border-[#2A3650] text-[8px]"
                                  title="Instantly paste the complete code templates"
                                >
                                  Quick Paste
                                </button>
                                <button
                                  onClick={handleManualDeploy}
                                  disabled={typedMain.length === 0}
                                  className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all duration-300 ${typedMain.length > 0
                                    ? "bg-primary-cyan text-[#0B0F19] hover:bg-[#6CF4FF] animate-pulse"
                                    : "bg-[#161C2C] text-text-muted border border-[#2A3650] cursor-not-allowed"
                                    }`}
                                >
                                  Deploy Code
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Code Block with dynamic keystroke listener overlay */}
                          <div
                            ref={editorRef}
                            className="font-mono text-[9px] sm:text-[10.5px] leading-relaxed space-y-0.5 overflow-x-auto overflow-y-auto relative flex-grow h-0"
                          >
                            {isInteractive && !isDeployed && !isDeploying && (activeFile === "main.ts" ? typedMain.length : activeFile === "Dockerfile" ? typedDocker.length : typedHtml.length) === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-black/40 rounded border border-[#3388FF]/10 backdrop-blur-[1px] pointer-events-none select-none z-10">
                                <p className="text-[10px] text-text-muted font-sans animate-pulse max-w-[180px]">
                                  ⌨️ Click here & <strong className="text-primary-cyan">type anything on your keyboard</strong> to write code!
                                </p>
                              </div>
                            )}
                            {(() => {
                              const currentText =
                                activeFile === "main.ts" ? typedMain :
                                  activeFile === "Dockerfile" ? typedDocker : typedHtml;
                              const lines = currentText.split("\n");

                              return lines.map((line, idx) => (
                                <div key={idx} className="flex gap-2.5">
                                  <span className="text-text-muted/30 w-3 text-right select-none">{idx + 1}</span>
                                  <span className="whitespace-pre">
                                    {renderHighlightedLine(line, idx, activeFile)}
                                    {idx === lines.length - 1 && <span className="inline-block w-1 h-3.5 bg-primary-cyan ml-0.5 animate-pulse" />}
                                  </span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Terminal Panel */}
                  <div className="h-[120px] bg-[#070B14] border-t border-[#2A3650]/40 p-3 flex flex-col font-mono text-[8.5px] select-none text-[#A0AEC0] overflow-hidden">
                    <div className="flex justify-between text-[9px] font-sans font-bold uppercase tracking-wider text-text-light/75 border-b border-[#2A3650]/20 pb-1.5 mb-1.5 flex-shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-primary-cyan" /> Console Logs Terminal
                      </span>
                      {isDeploying ? (
                        <span className="text-[#FFBD2E] animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E] animate-ping" /> Building Container ({Math.round(deployProgress)}%)
                        </span>
                      ) : isDeployed ? (
                        <span className="text-success-teal flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success-teal animate-pulse" /> Container Active
                        </span>
                      ) : (
                        <span className="text-text-muted">Idle</span>
                      )}
                    </div>

                    <div ref={terminalRef} className="flex-grow overflow-y-auto flex flex-col gap-1 pr-1">
                      {/* Compilation Loader Bar */}
                      {isDeploying && (
                        <div className="w-full bg-[#161C2C] h-1.5 rounded overflow-hidden border border-[#2A3650]/50 mb-1 flex-shrink-0">
                          <div
                            style={{ width: `${deployProgress}%` }}
                            className="h-full bg-gradient-to-r from-primary-cyan to-success-teal transition-all duration-300"
                          />
                        </div>
                      )}

                      {terminalCmd && (
                        <div className="truncate flex-shrink-0"><span className="text-primary-cyan mr-1.5">$</span>{terminalCmd}<span className="w-1 h-3 bg-white ml-0.5 inline-block animate-pulse" /></div>
                      )}

                      {terminalLogs.map((log, i) => (
                        <div
                          key={i}
                          className={`truncate flex-shrink-0 ${log.startsWith("✓")
                            ? "text-success-teal font-semibold"
                            : log.startsWith("[APP LOG]")
                              ? "text-primary-cyan"
                              : log.startsWith("[SYSTEM]")
                                ? "text-text-muted"
                                : "text-[#A0AEC0]"
                            }`}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-3 py-2 bg-[#0B0F19] text-[10px] text-text-muted border-t border-[#2A3650]/40 select-none font-sans">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success-teal" />git: main</span>
                      <span>problems: 0</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span>Ln {isDeployed ? "1" : Math.max(1, Math.floor(keysTyped / 8))}, Col {isDeployed ? "1" : Math.max(1, keysTyped % 40)}</span>
                      <span className="text-primary-cyan font-sans font-semibold">TypeScript</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SCROLLING TECH SPECS TRUST BAR */}
      <div className="w-full border-y border-[#2A3650]/40 bg-[#0D1321]/80 backdrop-blur-sm overflow-hidden py-4 select-none relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#0D1321] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#0D1321] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {/* Repeated twice for seamless loop */}
          {[
            { icon: "🔥", label: "AMD Ryzen 9 7950X", sub: "High-Frequency Cores" },
            { icon: "🛡️", label: "17Tbps+ DDoS Shield", sub: "Always-On Protection" },
            { icon: "⚡", label: "NVMe Gen4 Storage", sub: "Zero I/O Bottlenecks" },
            { icon: "🌐", label: "99.9% Uptime SLA", sub: "Guaranteed Reliability" },
            { icon: "🖥️", label: "AMD EPYC™ 9554", sub: "Enterprise Server Grade" },
            { icon: "📡", label: "5 Global Regions", sub: "SG · NY · FRA · TYO · SYD" },
            { icon: "🔒", label: "Free SSL Certs", sub: "Let's Encrypt Wildcard" },
            { icon: "💸", label: "Free Tier Forever", sub: "512MB RAM · No Credit Card" },
            { icon: "🚀", label: "60-Second Deploy", sub: "Instant Provisioning" },
            { icon: "🤝", label: "24/7 Expert Support", sub: "< 15 Min Response Time" },
          ].concat([
            { icon: "🔥", label: "AMD Ryzen 9 7950X", sub: "High-Frequency Cores" },
            { icon: "🛡️", label: "17Tbps+ DDoS Shield", sub: "Always-On Protection" },
            { icon: "⚡", label: "NVMe Gen4 Storage", sub: "Zero I/O Bottlenecks" },
            { icon: "🌐", label: "99.9% Uptime SLA", sub: "Guaranteed Reliability" },
            { icon: "🖥️", label: "AMD EPYC™ 9554", sub: "Enterprise Server Grade" },
            { icon: "📡", label: "5 Global Regions", sub: "SG · NY · FRA · TYO · SYD" },
            { icon: "🔒", label: "Free SSL Certs", sub: "Let's Encrypt Wildcard" },
            { icon: "💸", label: "Free Tier Forever", sub: "512MB RAM · No Credit Card" },
            { icon: "🚀", label: "60-Second Deploy", sub: "Instant Provisioning" },
            { icon: "🤝", label: "24/7 Expert Support", sub: "< 15 Min Response Time" },
          ]).map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-8 flex-shrink-0">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white font-display tracking-wide whitespace-nowrap">{item.label}</span>
                <span className="text-[10px] text-text-muted font-mono whitespace-nowrap">{item.sub}</span>
              </div>
              <div className="ml-6 h-6 w-[1px] bg-[#2A3650]/80" />
            </div>
          ))}
        </div>
      </div>

      <section
        style={{ isolation: 'isolate' }}
        className="relative min-h-screen flex items-center py-20 lg:py-24 bg-[#0B0F19] border-t border-[#2A3650]/30 overflow-hidden features-section-container"
      >
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20 pointer-events-none -z-10" />

        {/* Ambient top glow backdrop (Cyan) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Bold Filled Tech Accent Panels in background */}
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[20%] bg-gradient-to-r from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 -skew-y-6 pointer-events-none -z-10 hidden lg:block" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[20%] bg-gradient-to-l from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 skew-y-6 pointer-events-none -z-10 hidden lg:block" />

        {/* Bold Diagonal Gradient Stripes */}
        <div className="absolute top-[35%] right-[5%] w-72 h-12 bg-gradient-to-r from-primary-cyan/15 to-transparent rounded-full rotate-45 transform origin-right -z-10 blur-[1px] hidden xl:block" />
        <div className="absolute bottom-[35%] left-[5%] w-72 h-12 bg-gradient-to-l from-secondary-cyan/15 to-transparent rounded-full rotate-45 transform origin-left -z-10 blur-[1px] hidden xl:block" />

        {/* Decorative vector rings */}
        <div className="absolute -left-28 top-12 w-80 h-80 rounded-full border border-primary-cyan/5 animate-spin-slow pointer-events-none -z-10" />
        <div className="absolute -left-28 top-12 w-64 h-64 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-reverse pointer-events-none -z-10" />

        {/* Floating cross decorations */}
        <div className="absolute top-[20%] right-[10%] text-[#3388FF]/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>
        <div className="absolute bottom-[30%] left-[15%] text-primary-cyan/15 font-mono text-xl pointer-events-none select-none -z-10">+</div>
        <div className="absolute top-[60%] right-[18%] text-primary-cyan/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>

        {/* Stacked glowing decorative pills in the background */}
        {/* Left Side (Top) */}
        <div className="absolute left-0 top-36 flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10">
          <div className="h-2 w-80 bg-gradient-to-l from-transparent via-[#3388FF]/30 to-primary-cyan rounded-l-full -translate-x-10" />
          <div className="h-2 w-60 bg-gradient-to-l from-transparent via-[#3388FF]/40 to-primary-cyan rounded-l-full" />
        </div>

        {/* Right Side (Bottom) */}
        <div className="absolute right-0 bottom-6 flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10">
          <div className="h-2 w-60 bg-gradient-to-r from-transparent via-[#3388FF]/40 to-primary-cyan rounded-r-full" />
          <div className="h-2 w-80 bg-gradient-to-r from-transparent via-[#3388FF]/30 to-primary-cyan rounded-r-full translate-x-10" />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

          {/* Section Header with Side Dividers */}
          <div className="text-center mb-12 lg:mb-16 xl:mb-20 relative flex flex-col items-center w-full features-header reveal-up">
            <div className="flex items-center justify-center gap-6 w-full max-w-[1150px]">
              {/* Left Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-end max-w-[35%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-r from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-r from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase md:whitespace-nowrap">
                CUTTING-EDGE <span className="text-gradient">FEATURES</span>
              </h2>

              {/* Right Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-start max-w-[35%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-l from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-l from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>
            </div>
            <p className="text-text-muted max-w-2xl mx-auto text-sm sm:text-base font-sans mt-3">
              Discover unparalleled server performance and security.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 features-grid stagger-dim-grid">

            {/* Card 1: Instant Setup (Blue) */}
            <div className="group relative metallic-card p-6 lg:p-7 rounded-2xl border border-[#3388FF]/15 hover:border-[#3388FF]/50 bg-[#0E1321]/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(51,136,255,0.15)] flex flex-col features-card reveal-up">
              <div className="w-10 h-10 rounded-xl bg-[#3388FF]/10 border border-[#3388FF]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#3388FF]/15 transition-all features-card-icon">
                <Zap className="h-5 w-5 text-[#3388FF]" />
              </div>
              <h3 className="font-display text-base lg:text-lg font-bold text-text-light mb-2 features-card-title">
                Instant Setup
              </h3>
              <p className="text-xs lg:text-sm text-text-muted leading-relaxed features-card-desc">
                Deployment in under 60 seconds. Our automated systems provision your resources the moment your payment is confirmed.
              </p>
            </div>

            {/* Card 2: DDoS Protection (Green - with corner sparkles!) */}
            <div
              style={{ overflow: "visible" }}
              className="group relative metallic-card p-6 lg:p-7 rounded-2xl border border-[#00E5A3]/20 hover:border-[#00E5A3]/50 bg-[#0E1321]/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(0,229,163,0.18)] shadow-[0_0_20px_rgba(0,229,163,0.04)] flex flex-col features-card reveal-up delay-100"
            >

              {/* Green starburst sparkles on corners */}
              {/* Top-Left sparkles */}
              <Sparkle className="top-[-6px] left-[-6px] scale-100" />
              <Sparkle className="top-[-14px] left-[4px] scale-[0.6] opacity-80" />
              <Sparkle className="top-[4px] left-[-14px] scale-[0.5] opacity-60" />

              {/* Top-Right sparkles */}
              <Sparkle className="top-[-6px] right-[-6px] scale-100" />
              <Sparkle className="top-[-12px] right-[4px] scale-[0.6] opacity-80" />

              {/* Bottom-Left sparkles */}
              <Sparkle className="bottom-[-6px] left-[-6px] scale-100" />
              <Sparkle className="bottom-[-12px] left-[4px] scale-[0.6] opacity-80" />

              {/* Bottom-Right sparkles */}
              <Sparkle className="bottom-[-6px] right-[-6px] scale-100" />
              <Sparkle className="bottom-[-14px] right-[4px] scale-[0.6] opacity-80" />
              <Sparkle className="bottom-[4px] right-[-14px] scale-[0.5] opacity-60" />

              <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 border border-[#00E5A3]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#00E5A3]/15 transition-all features-card-icon">
                <Shield className="h-5 w-5 text-[#00E5A3]" />
              </div>
              <h3 className="font-display text-base lg:text-lg font-bold text-text-light mb-2 features-card-title">
                DDoS Protection
              </h3>
              <p className="text-xs lg:text-sm text-text-muted leading-relaxed features-card-desc">
                Enterprise-grade mitigation capable of filtering up to 17Tbps+. Stay online during the most intense volumetric attacks.
              </p>
            </div>

            {/* Card 3: 99.9% Uptime (Orange) */}
            <div className="group relative metallic-card p-6 lg:p-7 rounded-2xl border border-[#FF9E64]/15 hover:border-[#FF9E64]/50 bg-[#0E1321]/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,158,100,0.15)] flex flex-col features-card reveal-up delay-200">
              <div className="w-10 h-10 rounded-xl bg-[#FF9E64]/10 border border-[#FF9E64]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#FF9E64]/15 transition-all features-card-icon">
                <Activity className="h-5 w-5 text-[#FF9E64]" />
              </div>
              <h3 className="font-display text-base lg:text-lg font-bold text-text-light mb-2">
                99.9% Uptime
              </h3>
              <p className="text-xs lg:text-sm text-text-muted leading-relaxed features-card-desc">
                Tier 3+ certified data centers with redundant power, cooling, and network links to ensure your services never go offline.
              </p>
            </div>

            {/* Card 4: 24/7 Support (Purple) */}
            <div className="group relative metallic-card p-6 lg:p-7 rounded-2xl border border-[#A855F7]/15 hover:border-[#A855F7]/50 bg-[#0E1321]/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col features-card reveal-up delay-100">
              <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#A855F7]/15 transition-all features-card-icon">
                <Headphones className="h-5 w-5 text-[#A855F7]" />
              </div>
              <h3 className="font-display text-base lg:text-lg font-bold text-text-light mb-2 features-card-title">
                24/7 Support
              </h3>
              <p className="text-xs lg:text-sm text-text-muted leading-relaxed features-card-desc">
                Real-world experts at your service. Our average response time is under 15 minutes, day or night.
              </p>
            </div>

            {/* Card 5: Powerful Hardware (Red) */}
            <div className="group relative metallic-card p-6 lg:p-7 rounded-2xl border border-[#EF4444]/15 hover:border-[#EF4444]/50 bg-[#0E1321]/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-col features-card reveal-up delay-200">
              <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#EF4444]/15 transition-all features-card-icon">
                <Cpu className="h-5 w-5 text-[#EF4444]" />
              </div>
              <h3 className="font-display text-base lg:text-lg font-bold text-text-light mb-2 features-card-title">
                Powerful Hardware
              </h3>
              <p className="text-xs lg:text-sm text-text-muted leading-relaxed features-card-desc">
                Utilizing latest-gen AMD EPYC™ processors and enterprise NVMe Gen4 storage for maximum I/O performance.
              </p>
            </div>

            {/* Card 6: Global Locations (Teal/Cyan) */}
            <div className="group relative metallic-card p-6 lg:p-7 rounded-2xl border border-[#14B8A6]/15 hover:border-[#14B8A6]/50 bg-[#0E1321]/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] flex flex-col features-card reveal-up delay-300">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#14B8A6]/15 transition-all features-card-icon">
                <Globe className="h-5 w-5 text-[#14B8A6]" />
              </div>
              <h3 className="font-display text-base lg:text-lg font-bold text-text-light mb-2 features-card-title">
                Global Locations
              </h3>
              <p className="text-xs lg:text-sm text-text-muted leading-relaxed features-card-desc">
                A globally distributed network with premium peerage to ensure ultra-low latency specifically optimized for gaming traffic.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DASHBOARD FEATURE TAB SHOWCASE */}
      <section className="py-24 bg-[#161C2C]/10 border-t border-[#2A3650]/30 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none -z-10" />

        {/* Rotating technical circles */}
        <div className="absolute -right-24 top-24 w-96 h-96 rounded-full border border-[#3388FF]/5 animate-spin-slow pointer-events-none -z-10" />
        <div className="absolute -right-24 top-24 w-80 h-80 rounded-full border border-dashed border-primary-cyan/5 animate-spin-reverse pointer-events-none -z-10" />
        <div className="absolute -left-20 bottom-10 w-72 h-72 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-slow pointer-events-none -z-10" />

        {/* Bold Filled Tech Accent Panels in background */}
        <div className="absolute top-[15%] left-[-5%] w-[30%] h-[15%] bg-gradient-to-r from-primary-cyan/10 to-transparent border-y border-primary-cyan/20 -skew-y-6 pointer-events-none -z-10 hidden lg:block" />
        <div className="absolute bottom-[15%] right-[-5%] w-[30%] h-[15%] bg-gradient-to-l from-[#3388FF]/10 to-transparent border-y border-[#3388FF]/20 skew-y-6 pointer-events-none -z-10 hidden lg:block" />

        {/* Bold Diagonal Stripes */}
        <div className="absolute top-[20%] right-[8%] w-60 h-10 bg-gradient-to-r from-[#3388FF]/15 to-transparent rounded-full rotate-45 transform origin-right -z-10 blur-[1px] hidden xl:block" />
        <div className="absolute bottom-[20%] left-[8%] w-60 h-10 bg-gradient-to-l from-primary-cyan/15 to-transparent rounded-full rotate-45 transform origin-left -z-10 blur-[1px] hidden xl:block" />

        {/* Diagonal Tech lines */}
        <div className="absolute top-1/3 left-10 w-24 h-[1px] bg-gradient-to-r from-transparent to-primary-cyan/20 rotate-45 pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-12 w-32 h-[1px] bg-gradient-to-l from-transparent to-[#3388FF]/20 -rotate-45 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Divider with Gamepad Icon */}
          <div className="relative flex items-center justify-center mb-10 w-full reveal-up">
            {/* Left Lines */}
            <div className="flex-grow flex flex-col gap-1.5 items-end max-w-[42%]">
              <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-primary-cyan/20 to-primary-cyan/80" />
              <div className="h-[1.5px] w-[85%] bg-gradient-to-r from-transparent via-primary-cyan/15 to-primary-cyan/60" />
              <div className="h-[1.5px] w-[65%] bg-gradient-to-r from-transparent via-primary-cyan/10 to-primary-cyan/40" />
            </div>
            {/* Gamepad Icon */}
            <div className="mx-6 flex items-center justify-center text-primary-cyan filter drop-shadow-[0_0_8px_var(--color-primary-theme-glow)] transition-all duration-300">
              <Gamepad2 className="h-8 w-8" />
            </div>
            {/* Right Lines */}
            <div className="flex-grow flex flex-col gap-1.5 items-start max-w-[42%]">
              <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent via-primary-cyan/20 to-primary-cyan/80" />
              <div className="h-[1.5px] w-[85%] bg-gradient-to-l from-transparent via-primary-cyan/15 to-primary-cyan/60" />
              <div className="h-[1.5px] w-[65%] bg-gradient-to-l from-transparent via-primary-cyan/10 to-primary-cyan/40" />
            </div>
          </div>

          <div className="text-center mb-10 reveal-up delay-100">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Experience Our <span className="text-gradient">Control Panel</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
              Manage databases, terminal logs, and modpack deployments with our premium developer console.
            </p>
          </div>

          {/* Category Selector Capsule Tabs */}
          <div className="flex justify-center mb-16 reveal-up delay-200">
            <div className="flex flex-wrap md:inline-flex justify-center gap-2 md:gap-0 bg-[#0E1321]/80 p-1.5 rounded-2xl md:rounded-full border border-[#2A3650]/60 backdrop-blur-md">
              {panelCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm transition-all duration-300 ${activeCategory === cat.id
                    ? "bg-gradient-to-r from-primary-cyan to-secondary-cyan text-white shadow-[0_0_20px_var(--color-primary-theme-glow)]"
                    : "text-text-muted hover:text-white"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Menu Items (4 columns) */}
            <div className="lg:col-span-4 flex flex-col gap-3.5 reveal-left delay-300">
              {currentCategory.menus.map((menu) => {
                const MenuIcon = menu.icon;
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(menu.id)}
                    className={`metallic-card p-5 rounded-2xl text-left border flex items-center justify-between transition-all duration-500 hover:scale-[1.01] ${isActive
                      ? "border-primary-cyan/45 bg-primary-cyan/5 shadow-[0_0_25px_var(--color-primary-theme-glow)]"
                      : "border-[#2A3650]/60 hover:bg-[#161C2C]/30"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${isActive
                        ? "bg-primary-cyan/10 border-primary-cyan/30 text-primary-cyan"
                        : "bg-[#161C2C] border-[#2A3650] text-text-muted"
                        }`}>
                        <MenuIcon className="h-5 w-5" />
                      </div>
                      <span className={`font-display font-bold text-sm transition-colors duration-300 ${isActive ? "text-white" : "text-text-muted hover:text-text-light"
                        }`}>
                        {menu.label}
                      </span>
                    </div>

                    <span className={`text-xs font-bold transition-all duration-300 ${isActive ? "text-primary-cyan translate-x-0.5" : "text-text-muted/40"
                      }`}>
                      &gt;
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Browser Mockup Area (8 columns) */}
            <div className="lg:col-span-8 metallic-card rounded-2xl border border-[#2A3650]/80 overflow-hidden flex flex-col bg-[#090f11]/85 shadow-2xl filter drop-shadow-[0_0_40px_var(--color-primary-theme-glow)] reveal-right delay-400">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0B0F19]/90 border-b border-[#2A3650]/50 select-none">
                {/* Close/Min/Max Dots */}
                <div className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
                </div>
                {/* Mock address bar */}
                <div className="flex-grow max-w-md mx-6 bg-[#0E1321]/90 border border-[#2A3650]/40 rounded-lg px-4 py-1 text-center font-mono text-[10px] text-text-muted/70 tracking-wide truncate">
                  panel.dynoxium.host
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted/20" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted/20" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted/20" />
                </div>
              </div>

              {/* Panel body with Image + description area */}
              <div className="p-6 flex-grow flex flex-col justify-between min-h-[380px]">
                {/* Mockup Image Display */}
                <div className="relative w-full aspect-video rounded-xl border border-[#2A3650]/40 overflow-hidden bg-[#0c101a] flex items-center justify-center">
                  <Image
                    src={currentMenu.image}
                    alt={`${currentMenu.label} mockup`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Subtext explanation inside browser mockup container */}
                <div className="mt-6 pt-5 border-t border-[#2A3650]/40">
                  <h3 className="font-display text-lg font-bold text-text-light mb-2 flex items-center gap-2">
                    <currentMenu.icon className="h-4.5 w-4.5 text-primary-cyan" />
                    {currentMenu.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                    {currentMenu.desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOSTING CATEGORIES PLANS */}
      <section style={{ isolation: 'isolate' }} className="py-24 bg-[#0B0F19] relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-25 pointer-events-none -z-10" />

        {/* Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* Ambient top glow backdrop (Cyan) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Bold Filled Tech Accent Panels in background */}
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[20%] bg-gradient-to-r from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 -skew-y-6 pointer-events-none -z-10 hidden lg:block" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[20%] bg-gradient-to-l from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 skew-y-6 pointer-events-none -z-10 hidden lg:block" />

        {/* Bold Diagonal Stripes */}
        <div className="absolute top-[30%] right-[5%] w-72 h-12 bg-gradient-to-r from-[#3388FF]/15 to-transparent rounded-full rotate-45 transform origin-right -z-10 blur-[1px] hidden xl:block" />
        <div className="absolute bottom-[30%] left-[5%] w-72 h-12 bg-gradient-to-l from-primary-cyan/15 to-transparent rounded-full rotate-45 transform origin-left -z-10 blur-[1px] hidden xl:block" />

        {/* Rotating technical circles in Engineered section */}
        <div className="absolute -left-24 top-24 w-96 h-96 rounded-full border border-[#3388FF]/5 animate-spin-slow pointer-events-none -z-10" />
        <div className="absolute -left-24 top-24 w-80 h-80 rounded-full border border-dashed border-primary-cyan/5 animate-spin-reverse pointer-events-none -z-10" />
        <div className="absolute -right-20 bottom-10 w-72 h-72 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-slow pointer-events-none -z-10" />

        {/* Large, Bold, Double-Layered Filled Geometric Shapes in background */}
        <div className="absolute left-[3%] top-[15%] w-44 h-44 pointer-events-none select-none hidden xl:block opacity-35 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan via-[#3388FF] to-transparent rounded-2xl rotate-45 transform origin-center animate-spin-slow shadow-[inset_0_0_30px_rgba(108,244,255,0.4)]" style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 91%, 28% 91%, 0% 38%)" }} />
          <div className="absolute inset-3 bg-[#0B0F19]/90 rounded-2xl rotate-45 transform origin-center border border-primary-cyan/40" style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 91%, 28% 91%, 0% 38%)" }} />
        </div>
        <div className="absolute right-[3%] bottom-[15%] w-36 h-36 pointer-events-none select-none hidden xl:block opacity-30 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9E64] via-secondary-cyan to-transparent rounded-full animate-bounce-slow" style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }} />
          <div className="absolute inset-3 bg-[#0B0F19]/90 rounded-full border border-secondary-cyan/45" style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }} />
        </div>

        {/* Additional Bold Geometric Shapes (Hexagons, Diamonds, and Octagons) */}
        <div className="absolute right-[5%] top-[10%] w-32 h-32 pointer-events-none select-none hidden lg:block opacity-40 -z-10">
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 via-pink-600 to-transparent animate-pulse-slow" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
          <div className="absolute inset-1.5 bg-[#0B0F19]/95 border border-purple-500/40" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
        </div>
        <div className="absolute left-[4%] bottom-[8%] w-28 h-28 pointer-events-none select-none hidden lg:block opacity-45 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 via-teal-500 to-transparent animate-spin-slow" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)", animationDuration: '25s' }} />
          <div className="absolute inset-1.5 bg-[#0B0F19]/95 border border-emerald-500/40" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }} />
        </div>
        <div className="absolute right-[45%] top-[5%] w-16 h-16 pointer-events-none select-none opacity-20 -z-10 animate-bounce-slow">
          <div className="absolute inset-0 bg-[#3388FF] rotate-45" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div className="absolute inset-1 bg-[#0B0F19] rotate-45 border border-primary-cyan/35" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
        </div>

        {/* Floating cross decorations like in CUTTING-EDGE FEATURES */}
        <div className="absolute top-[20%] right-[10%] text-[#3388FF]/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>
        <div className="absolute bottom-[30%] left-[15%] text-primary-cyan/15 font-mono text-xl pointer-events-none select-none -z-10">+</div>
        <div className="absolute top-[60%] right-[18%] text-primary-cyan/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>

        {/* Stacked glowing decorative pills like in CUTTING-EDGE FEATURES */}
        {/* Left Side (Top) */}
        <div className="absolute left-0 top-36 flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10">
          <div className="h-2 w-80 bg-gradient-to-l from-transparent via-[#3388FF]/30 to-primary-cyan rounded-l-full -translate-x-10" />
          <div className="h-2 w-60 bg-gradient-to-l from-transparent via-[#3388FF]/40 to-primary-cyan rounded-l-full" />
        </div>

        {/* Right Side (Bottom) */}
        <div className="absolute right-0 bottom-6 flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10">
          <div className="h-2 w-60 bg-gradient-to-r from-transparent via-[#3388FF]/40 to-primary-cyan rounded-r-full" />
          <div className="h-2 w-80 bg-gradient-to-r from-transparent via-[#3388FF]/30 to-primary-cyan rounded-r-full translate-x-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative flex flex-col items-center w-full reveal-up">
            <div className="flex items-center justify-center gap-6 w-full max-w-[1150px]">
              {/* Left Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-end max-w-[25%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-r from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-r from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-light mb-0 uppercase md:whitespace-nowrap">
                Engineered for Every Project
              </h2>

              {/* Right Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-start max-w-[25%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-l from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-l from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>
            </div>
            <p className="text-text-muted max-w-2xl mx-auto text-base mt-4">
              High-performance hosting environments optimized for ultra-low latency, maximum stability, and easy management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-dim-grid">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              const delayClass = idx % 3 === 1 ? "delay-100" : idx % 3 === 2 ? "delay-200" : "";
              return (
                <Link
                  key={idx}
                  href={cat.path}
                  className={`metallic-card p-6 rounded-xl flex flex-col group cursor-pointer hover:border-primary-cyan/40 transition-all duration-300 hover:scale-[1.01] reveal-up ${delayClass}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-cyan/20 transition-all">
                    <IconComp className="h-6 w-6 text-primary-cyan" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-light mb-2 group-hover:text-primary-cyan transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-1 text-xs font-mono font-bold text-primary-cyan opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    CONFIGURE SERVER <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEVELOPER TESTIMONIALS */}
      <section style={{ isolation: 'isolate' }} className="py-24 bg-[#0B0F19] border-t border-[#2A3650]/30 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none -z-10" />

        {/* Ambient top glow backdrop (Cyan) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Bold Filled Tech Accent Panels in background */}
        <div className="absolute top-[10%] right-[-5%] w-[35%] h-[20%] bg-gradient-to-l from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 skew-y-6 pointer-events-none -z-10 hidden lg:block" />
        <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[20%] bg-gradient-to-r from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 -skew-y-6 pointer-events-none -z-10 hidden lg:block" />

        {/* Bold Diagonal Stripes */}
        <div className="absolute top-[25%] left-[5%] w-72 h-12 bg-gradient-to-l from-[#3388FF]/15 to-transparent rounded-full rotate-45 transform origin-left -z-10 blur-[1px] hidden xl:block" />
        <div className="absolute bottom-[25%] right-[5%] w-72 h-12 bg-gradient-to-r from-primary-cyan/15 to-transparent rounded-full rotate-45 transform origin-right -z-10 blur-[1px] hidden xl:block" />

        {/* Decorative vector rings */}
        <div className="absolute -left-28 top-12 w-80 h-80 rounded-full border border-primary-cyan/5 animate-spin-slow pointer-events-none -z-10" />
        <div className="absolute -left-28 top-12 w-64 h-64 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-reverse pointer-events-none -z-10" />

        {/* Floating cross decorations like in CUTTING-EDGE FEATURES */}
        <div className="absolute top-[20%] right-[10%] text-[#3388FF]/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>
        <div className="absolute bottom-[30%] left-[15%] text-primary-cyan/15 font-mono text-xl pointer-events-none select-none -z-10">+</div>
        <div className="absolute top-[60%] right-[18%] text-primary-cyan/10 font-mono text-xl pointer-events-none select-none -z-10">+</div>

        {/* Stacked glowing decorative pills like in CUTTING-EDGE FEATURES */}
        {/* Left Side (Top) */}
        <div className="absolute left-0 top-36 flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10">
          <div className="h-2 w-80 bg-gradient-to-l from-transparent via-[#3388FF]/30 to-primary-cyan rounded-l-full -translate-x-10" />
          <div className="h-2 w-60 bg-gradient-to-l from-transparent via-[#3388FF]/40 to-primary-cyan rounded-l-full" />
        </div>

        {/* Right Side (Bottom) */}
        <div className="absolute right-0 bottom-6 flex flex-col gap-2.5 pointer-events-none opacity-15 select-none -z-10">
          <div className="h-2 w-60 bg-gradient-to-r from-transparent via-[#3388FF]/40 to-primary-cyan rounded-r-full" />
          <div className="h-2 w-80 bg-gradient-to-r from-transparent via-[#3388FF]/30 to-primary-cyan rounded-r-full translate-x-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative flex flex-col items-center w-full reveal-up">
            <div className="flex items-center justify-center gap-6 w-full max-w-[1150px]">
              {/* Left Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-end max-w-[25%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-r from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-r from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-light mb-0 uppercase md:whitespace-nowrap">
                Trusted by Architects & Developers
              </h2>

              {/* Right Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-start max-w-[25%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-l from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-l from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>
            </div>
            <p className="text-text-muted max-w-2xl mx-auto text-sm mt-4">
              Read review feedback from independent server administrators and SaaS founders hosting on our infrastructure.
            </p>
          </div>

          <div
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className="relative overflow-hidden w-full py-4 cursor-ew-resize select-none active:cursor-grabbing reveal-scale delay-100"
          >
            <div
              className="flex w-full"
              style={{
                transform: `translateX(calc(${-currentSlide * (100 / visibleSlides)}% + ${dragDisplacement}px))`,
                transition: isMouseDown ? "none" : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              {testimonials.map((test, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 group flex flex-col items-center"
                >
                  {/* Speech Bubble Card */}
                  <div className="relative w-full metallic-card !overflow-visible p-8 rounded-2xl border border-[#2A3650]/60 group-hover:border-primary-cyan/35 group-hover:shadow-[0_0_30px_rgba(108,244,255,0.08)] transition-all duration-300 flex flex-col items-center text-center min-h-[220px] mb-8">
                    {/* Quote Icon */}
                    <svg className="w-8 h-8 text-primary-cyan opacity-80 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    {/* Review Text */}
                    <p className="text-sm text-text-muted italic leading-relaxed mb-6 flex-grow">
                      &ldquo;{test.quote}&rdquo;
                    </p>

                    {/* 5 Stars */}
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Speech Bubble Pointer (rotated square) */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 bg-[#1f283e] border-r border-b border-[#2A3650]/60 group-hover:border-primary-cyan/35 transition-colors duration-300 z-10" />
                  </div>

                  {/* User Info Block */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#2A3650]/80 group-hover:border-primary-cyan/50 transition-colors duration-300 mb-3">
                      <Image
                        src={test.avatar}
                        alt={test.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs font-bold text-text-light group-hover:text-white transition-colors">{test.name}</div>
                    <span className="text-[10px] font-mono text-primary-cyan mt-0.5">{test.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide dots pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: Math.max(1, testimonials.length - visibleSlides + 1) }).map((_, i) => {
              const isActive = currentSlide === i;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="w-6 h-6 flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
                  aria-label={`Go to page ${i + 1}`}
                >
                  <span
                    className={`transition-all duration-300 ${isActive
                      ? "w-3 h-3 rounded-sm rotate-45 bg-primary-cyan shadow-[0_0_10px_var(--color-primary-theme-glow)]"
                      : "w-2 h-2 rounded-sm bg-[#2A3650]/80 hover:bg-text-muted"
                      }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACCORDION FAQS */}
      <section className="py-24 bg-[#161C2C]/10 border-t border-[#2A3650]/30 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none -z-10" />

        {/* Bold Filled Tech Accent Panels in background */}
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[20%] bg-gradient-to-r from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 -skew-y-6 pointer-events-none -z-10 hidden lg:block" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[20%] bg-gradient-to-l from-[#161C2C]/65 to-transparent border-y border-[#2A3650]/40 skew-y-6 pointer-events-none -z-10 hidden lg:block" />

        {/* Bold Diagonal Stripes */}
        <div className="absolute top-[25%] right-[5%] w-72 h-12 bg-gradient-to-r from-primary-cyan/15 to-transparent rounded-full rotate-45 transform origin-right -z-10 blur-[1px] hidden xl:block" />
        <div className="absolute bottom-[25%] left-[5%] w-72 h-12 bg-gradient-to-l from-[#3388FF]/15 to-transparent rounded-full rotate-45 transform origin-left -z-10 blur-[1px] hidden xl:block" />

        {/* Radar concentric tech rings */}
        <div className="absolute -left-20 top-20 w-80 h-80 rounded-full border border-dashed border-primary-cyan/5 animate-spin-slow pointer-events-none -z-10" />
        <div className="absolute -left-20 top-20 w-64 h-64 rounded-full border border-primary-cyan/5 animate-spin-reverse pointer-events-none -z-10" />

        {/* Diagonal tech accents */}
        <div className="absolute bottom-12 right-12 w-28 h-[1px] bg-gradient-to-l from-transparent to-primary-cyan/15 rotate-12 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative flex flex-col items-center w-full reveal-up">
            <div className="flex items-center justify-center gap-6 w-full max-w-[1150px]">
              {/* Left Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-end max-w-[25%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-r from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-r from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-light mb-0 uppercase md:whitespace-nowrap">
                Frequently Asked Questions
              </h2>

              {/* Right Lines */}
              <div className="flex-grow flex flex-col gap-1.5 items-start max-w-[25%] hidden md:flex">
                <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent via-primary-cyan/20 to-primary-cyan/80" />
                <div className="h-[1.5px] w-[85%] bg-gradient-to-l from-transparent via-primary-cyan/15 to-primary-cyan/60" />
                <div className="h-[1.5px] w-[65%] bg-gradient-to-l from-transparent via-primary-cyan/10 to-primary-cyan/40" />
              </div>
            </div>
            <p className="text-text-muted text-sm mt-4">
              Have questions about DynoXium cloud blueprints or free tier structures? Find answers here.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up delay-100">
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="metallic-card rounded-xl border border-[#2A3650]/60 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-[#161C2C]/30 transition-all focus:outline-none"
                  >
                    <span className="font-display font-semibold text-sm sm:text-base text-text-light">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-text-muted transition-transform duration-300 ${isExpanded ? "transform rotate-180 text-primary-cyan" : ""
                        }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-60 border-t border-[#2A3650]/30" : "max-h-0"
                      }`}
                  >
                    <p className="px-6 py-5 text-sm text-text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
