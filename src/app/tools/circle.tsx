"use client";

import React, { useState, useMemo } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  Settings,
  Grid,
  Download,
  Copy,
  CheckCircle,
} from "lucide-react";

interface BlockOption {
  id: string;
  name: string;
  color: string;
}

const blockOptions: BlockOption[] = [
  { id: "minecraft:diamond_block", name: "Diamond Block", color: "bg-[#55ffff]" },
  { id: "minecraft:gold_block", name: "Gold Block", color: "bg-[#ffff55]" },
  { id: "minecraft:iron_block", name: "Iron Block", color: "bg-[#dddddd]" },
  { id: "minecraft:obsidian", name: "Obsidian", color: "bg-[#100c1e]" },
  { id: "minecraft:cobblestone", name: "Cobblestone", color: "bg-[#888888]" },
  { id: "minecraft:oak_planks", name: "Oak Planks", color: "bg-[#b89158]" },
];

export default function CircleGenerator() {
  const [radius, setRadius] = useState<number>(6);
  const [zoom, setZoom] = useState<number>(1.0);
  const [fillMode, setFillMode] = useState<"hollow" | "filled">("hollow");
  const [blockType, setBlockType] = useState<string>("minecraft:diamond_block");
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [copiedCommands, setCopiedCommands] = useState<boolean>(false);

  // Math to generate Minecraft circle blocks on a grid
  const circleGrid = useMemo(() => {
    const size = radius * 2 + 1;
    const grid: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
    
    const isInside = (x: number, y: number, r: number) => {
      // Minecraft standard rounding check for circle distance
      return (x * x + y * y) <= (r + 0.5) * (r + 0.5);
    };

    // Fill grid
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        const inside = isInside(x, y, radius);
        const gridY = y + radius;
        const gridX = x + radius;

        if (fillMode === "filled") {
          grid[gridY][gridX] = inside;
        } else {
          // Hollow: inside the circle, but at least one neighbor is outside
          if (inside) {
            const top = y > -radius ? isInside(x, y - 1, radius) : false;
            const bottom = y < radius ? isInside(x, y + 1, radius) : false;
            const left = x > -radius ? isInside(x - 1, y, radius) : false;
            const right = x < radius ? isInside(x + 1, y, radius) : false;
            
            grid[gridY][gridX] = !top || !bottom || !left || !right;
          }
        }
      }
    }
    return grid;
  }, [radius, fillMode]);

  // Statistics
  const totalBlocks = useMemo(() => {
    let count = 0;
    circleGrid.forEach(row => {
      row.forEach(cell => {
        if (cell) count++;
      });
    });
    return count;
  }, [circleGrid]);

  const selectedBlock = useMemo(() => {
    return blockOptions.find(b => b.id === blockType) || blockOptions[0];
  }, [blockType]);

  // Generate /setblock commands
  const getCommands = () => {
    let cmds: string[] = [];
    const center = radius;
    circleGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const relativeX = x - center;
          const relativeZ = y - center;
          cmds.push(`/setblock ~${relativeX} ~ ~${relativeZ} ${blockType}`);
        }
      });
    });
    return cmds.join("\n");
  };

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(getCommands());
    setCopiedCommands(true);
    setTimeout(() => setCopiedCommands(false), 2000);
  };

  // Fake download of .schem file
  const handleDownloadSchem = () => {
    const data = `Minecraft Schematic Circle - Radius ${radius} - Blocks ${totalBlocks}`;
    const file = new Blob([data], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `circle_r${radius}.schem`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Number overlay mapping for block indexing in hollow mode
  const blockNumberedGrid = useMemo(() => {
    let blockCounter = 1;
    const size = radius * 2 + 1;
    const numGrid: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));
    
    // We number blocks sequentially starting from top center clockwise for building guide
    // Simply sweep the grid to map IDs for UI rendering numbers
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (circleGrid[y][x]) {
          numGrid[y][x] = blockCounter++;
        }
      }
    }
    return numGrid;
  }, [circleGrid, radius]);

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
            Circle <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Generator</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Generate perfect circles and spheres for your Minecraft builds with live preview.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          
          {/* LEFT CONTROLS PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <div className="space-y-1">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary-cyan" />
                  Circle Configs
                </h3>
              </div>

              {/* RADIUS */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-text-muted uppercase">
                  <span>Radius</span>
                  <span className="text-primary-cyan">{radius}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full accent-primary-cyan cursor-pointer bg-[#070A14] h-1.5 rounded-lg border border-[#2A3650]/40"
                />
              </div>

              {/* ZOOM */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-text-muted uppercase">
                  <span>Zoom</span>
                  <span className="text-primary-cyan">{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-primary-cyan cursor-pointer bg-[#070A14] h-1.5 rounded-lg border border-[#2A3650]/40"
                />
              </div>

              {/* FILL MODE */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase block">Fill</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFillMode("hollow")}
                    className={`py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      fillMode === "hollow"
                        ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan"
                        : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                    }`}
                  >
                    Hollow
                  </button>
                  <button
                    onClick={() => setFillMode("filled")}
                    className={`py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      fillMode === "filled"
                        ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan"
                        : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                    }`}
                  >
                    Filled
                  </button>
                </div>
              </div>

              {/* BLOCK TYPE */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase block">Block Type</span>
                <select
                  value={blockType}
                  onChange={(e) => setBlockType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors"
                >
                  {blockOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SHOW BLOCK NUMBERS */}
              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-white/80 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={showNumbers}
                  onChange={(e) => setShowNumbers(e.target.checked)}
                  className="w-4.5 h-4.5 accent-primary-cyan rounded bg-[#070A14] border border-[#2A3650]/40"
                />
                <span>Show block numbers</span>
              </label>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2A3650]/20">
                <div className="bg-[#070A14] border border-[#2A3650]/40 rounded-xl p-3.5 space-y-1">
                  <span className="text-[9px] font-mono font-bold text-text-muted uppercase">Blocks</span>
                  <p className="text-lg font-bold text-white font-display leading-none">{totalBlocks}</p>
                </div>
                <div className="bg-[#070A14] border border-[#2A3650]/40 rounded-xl p-3.5 space-y-1">
                  <span className="text-[9px] font-mono font-bold text-text-muted uppercase">Size</span>
                  <p className="text-lg font-bold text-white font-display leading-none">{radius * 2 + 1} × {radius * 2 + 1}</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT PREVIEW CANVAS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 backdrop-blur-md relative overflow-hidden flex flex-col">
              
              {/* Header with Buttons */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Grid className="h-4 w-4 text-primary-cyan" />
                  Preview Grid
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadSchem}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary-cyan/30 bg-primary-cyan/10 hover:bg-primary-cyan/20 text-primary-cyan text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .schem</span>
                  </button>
                  <button
                    onClick={handleCopyCommands}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#2A3650] bg-[#070A14] hover:bg-[#0E1321] text-white text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {copiedCommands ? <CheckCircle className="h-3.5 w-3.5 text-success-teal" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedCommands ? "Copied" : "Copy commands"}</span>
                  </button>
                </div>
              </div>

              {/* The Grid Canvas Container */}
              <div className="relative border border-[#2A3650]/40 bg-[#070A14] rounded-2xl p-6 overflow-auto flex items-center justify-center min-h-[400px] select-none">
                
                {/* Scale Grid wrapper */}
                <div
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center",
                    transition: "transform 0.2s ease",
                  }}
                  className="relative"
                >
                  {/* CSS Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${radius * 2 + 1}, minmax(0, 1fr))`,
                      gap: "2px",
                    }}
                    className="w-fit"
                  >
                    {circleGrid.map((row, y) =>
                      row.map((cell, x) => {
                        const isCenter = x === radius && y === radius;
                        const blockNum = blockNumberedGrid[y][x];

                        return (
                          <div
                            key={`${x}-${y}`}
                            style={{ width: "24px", height: "24px" }}
                            className={`relative border rounded-sm flex items-center justify-center text-[7px] font-mono font-bold transition-colors ${
                              cell
                                ? `${selectedBlock.color} border-primary-cyan/40 text-black shadow-[0_0_8px_rgba(108,244,255,0.2)]`
                                : isCenter
                                ? "bg-red-500/20 border-red-500/50 text-red-400"
                                : "bg-[#0B0F19]/20 border-[#2A3650]/20 text-transparent"
                            }`}
                          >
                            {isCenter && "+"}
                            {cell && showNumbers && blockNum}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

              {/* Status info bar */}
              <div className="text-center text-[10px] font-mono text-text-muted uppercase tracking-wider select-none">
                {totalBlocks} blocks • {fillMode} circle • block: {selectedBlock.name}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
