"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  Grid,
  Download,
  Copy,
  CheckCircle,
  ChevronDown,
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
  const [radius, setRadius] = useState<number>(12);
  const [zoom, setZoom] = useState<number>(1.0);
  const [fillMode, setFillMode] = useState<"hollow" | "filled">("hollow");
  const [blockType, setBlockType] = useState<string>("minecraft:diamond_block");
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [copiedCommands, setCopiedCommands] = useState<boolean>(false);
  const [blockDropdownOpen, setBlockDropdownOpen] = useState<boolean>(false);

  // Pan offsets for drag-to-inspect perimeter
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reset pan offset when radius or fill mode changes to re-center
  useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
  }, [radius, fillMode]);

  // Mouse wheel scroll-to-zoom listener (non-passive to prevent page scrolling, zoom centered on cursor)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = mx * (canvas.width / rect.width);
      const cy = my * (canvas.height / rect.height);

      const zoomFactor = 0.05;
      const direction = e.deltaY < 0 ? 1 : -1;

      setZoom(prevZoom => {
        const nextZoom = prevZoom + direction * zoomFactor;
        const clampedZoom = Math.max(0.2, Math.min(10.0, nextZoom));

        if (clampedZoom === prevZoom) return prevZoom;

        const ratio = clampedZoom / prevZoom;

        // Dynamically adjust panOffset so the unscaled coordinate under the cursor remains under it
        setPanOffset(prevPan => {
          const newPanX = cx - 400 - (cx - 400 - prevPan.x) * ratio;
          const newPanY = cy - 400 - (cy - 400 - prevPan.y) * ratio;
          return { x: newPanX, y: newPanY };
        });

        return clampedZoom;
      });
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Math to generate Minecraft circle blocks on a grid
  const circleGrid = useMemo(() => {
    const size = radius * 2 + 1;
    const grid: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));

    const isInside = (x: number, y: number, r: number) => {
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

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (circleGrid[y][x]) {
          numGrid[y][x] = blockCounter++;
        }
      }
    }
    return numGrid;
  }, [circleGrid, radius]);

  // Dynamic canvas drawing effect for high-performance 120fps rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = "#070A14";
    ctx.fillRect(0, 0, 800, 800);

    const baseCellSize = 16;
    const gap = 2;
    const cellSizeWithGap = baseCellSize + gap;
    const size = radius * 2 + 1;
    const gridPx = size * cellSizeWithGap - gap;

    // Dynamic, smooth auto-zoom factor to keep the circle oriented and sized perfectly without jumps
    const fitScale = 720 / gridPx;
    const scale = fitScale * zoom;

    ctx.save();
    // Center canvas coordinate system + apply pan offsets
    ctx.translate(400 + panOffset.x, 400 + panOffset.y);
    ctx.scale(scale, scale);

    // Calculate visible boundaries in scaled coordinate space to render infinite grid background
    const leftScaled = -(400 + panOffset.x) / scale;
    const rightScaled = (800 - (400 + panOffset.x)) / scale;
    const topScaled = -(400 + panOffset.y) / scale;
    const bottomScaled = (800 - (400 + panOffset.y)) / scale;

    const minVisibleX = Math.floor(leftScaled / cellSizeWithGap) - 1;
    const maxVisibleX = Math.ceil(rightScaled / cellSizeWithGap) + 1;
    const minVisibleY = Math.floor(topScaled / cellSizeWithGap) - 1;
    const maxVisibleY = Math.ceil(bottomScaled / cellSizeWithGap) + 1;

    // Block color mapping
    const colorMap: Record<string, string> = {
      "minecraft:diamond_block": "#55ffff",
      "minecraft:gold_block": "#ffff55",
      "minecraft:iron_block": "#dddddd",
      "minecraft:obsidian": "#1A1135",
      "minecraft:cobblestone": "#7C7C7C",
      "minecraft:oak_planks": "#B89158",
    };
    const blockColor = colorMap[blockType] || "#55ffff";

    // Draw grid cells (covering the entire visible area with empty grids)
    for (let y = minVisibleY; y <= maxVisibleY; y++) {
      for (let x = minVisibleX; x <= maxVisibleX; x++) {
        const inCircleGrid = x >= -radius && x <= radius && y >= -radius && y <= radius;
        const gridY = y + radius;
        const gridX = x + radius;

        const isFilled = inCircleGrid && circleGrid[gridY][gridX];
        const isCenter = x === 0 && y === 0;

        const cellX = x * cellSizeWithGap - baseCellSize / 2;
        const cellY = y * cellSizeWithGap - baseCellSize / 2;

        if (isFilled) {
          ctx.fillStyle = blockColor;
          ctx.fillRect(cellX, cellY, baseCellSize, baseCellSize);

          // Lighter border for filled blocks
          ctx.strokeStyle = "rgba(108, 244, 255, 0.4)";
          ctx.lineWidth = 1;
          ctx.strokeRect(cellX, cellY, baseCellSize, baseCellSize);
        } else {
          // Empty background grid (infinitely aligned)
          ctx.strokeStyle = "rgba(42, 54, 80, 0.22)";
          ctx.lineWidth = 0.8;
          ctx.strokeRect(cellX, cellY, baseCellSize, baseCellSize);

          if (isCenter) {
            ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
            ctx.fillRect(cellX, cellY, baseCellSize, baseCellSize);
          }
        }

        // Numbers overlay
        if (isFilled && showNumbers) {
          const num = blockNumberedGrid[gridY][gridX];
          const visibleCellSize = baseCellSize * scale;
          // Hide numbers if cell size drops too low to avoid illegible overlap
          if (visibleCellSize > 14) {
            ctx.fillStyle = blockType === "minecraft:diamond_block" || blockType === "minecraft:gold_block" || blockType === "minecraft:iron_block" ? "#0B0F19" : "#FFFFFF";
            ctx.font = `bold ${baseCellSize * 0.45}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(num.toString(), cellX + baseCellSize / 2, cellY + baseCellSize / 2);
          }
        }
      }
    }

    // Red center cross '+'
    ctx.strokeStyle = "#EF4444";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 6);
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.stroke();

    // Yellow radius line
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius * cellSizeWithGap, 0);
    ctx.stroke();

    // Draw radius text label centered above the yellow line (scale-invariant to remain readable)
    ctx.fillStyle = "#FBBF24"; // Bright amber yellow
    const labelFontSize = Math.max(10, Math.min(24, 12 / scale));
    ctx.font = `bold ${labelFontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(`${radius}`, (radius * cellSizeWithGap) / 2, -5 / scale);

    // Radius line ending dot
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.arc(radius * cellSizeWithGap, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [radius, zoom, fillMode, blockType, showNumbers, circleGrid, blockNumberedGrid, panOffset]);

  // Handle drag pan logic
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = { x: clientX, y: clientY };
    panStartRef.current = { ...panOffset };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const dx = (clientX - dragStartRef.current.x) * scaleX;
    const dy = (clientY - dragStartRef.current.y) * scaleY;

    setPanOffset({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
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

        {/* HEADER SECTION (Page Title & Global Actions) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2A3650]/30 reveal-up delay-75">
          <div className="space-y-2">
            <h1 className="font-norwester text-2xl sm:text-4xl md:text-5xl tracking-wide text-white uppercase leading-none">
              Circle <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Generator</span>
            </h1>
            <p className="text-xs sm:text-sm text-text-muted/90 font-medium">
              Pixel-perfect rings and fills with export-ready output.
            </p>
          </div>

          {/* Action buttons next to header */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadSchem}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-cyan hover:bg-transparent border border-primary-cyan text-[#0B0F19] hover:text-primary-cyan text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(108,244,255,0.15)] cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download .schem</span>
            </button>

            <button
              onClick={handleCopyCommands}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14] hover:bg-[#0E1321]/50 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {copiedCommands ? <CheckCircle className="h-4 w-4 text-success-teal" /> : <Copy className="h-4 w-4" />}
              <span>{copiedCommands ? "Copied" : "Copy setblock commands"}</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">

          {/* LEFT: CONFIGURATIONS PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 relative backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />

              {/* RADIUS */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-text-muted uppercase">
                  <span>Radius</span>
                  <span className="text-primary-cyan">{radius}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
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
                  min="0.2"
                  max="10.0"
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
                    className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${fillMode === "hollow"
                        ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.1)]"
                        : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                      }`}
                  >
                    Hollow
                  </button>
                  <button
                    onClick={() => setFillMode("filled")}
                    className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${fillMode === "filled"
                        ? "border-primary-cyan/30 bg-primary-cyan/15 text-primary-cyan shadow-[0_0_10px_rgba(108,244,255,0.1)]"
                        : "border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white"
                      }`}
                  >
                    Filled
                  </button>
                </div>
              </div>

              {/* BLOCK TYPE (Custom Select Dropdown with colored indicators) */}
              <div className="space-y-2 relative">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase block">Block Type</span>

                <button
                  type="button"
                  onClick={() => setBlockDropdownOpen(!blockDropdownOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-sm ${selectedBlock.color} border border-white/10`} />
                    <span>{selectedBlock.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                </button>

                {blockDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setBlockDropdownOpen(false)}
                    />
                    <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#2A3650]/80 bg-[#0E1321] shadow-2xl max-h-60 overflow-y-auto divide-y divide-[#2A3650]/30 scrollbar-thin">
                      {blockOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setBlockType(opt.id);
                            setBlockDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 p-3 hover:bg-[#161D30] transition-colors focus:outline-none text-left cursor-pointer"
                        >
                          <div className={`w-3.5 h-3.5 rounded-sm ${opt.color} border border-white/10 flex-shrink-0`} />
                          <span className="text-xs text-white">{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
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

          {/* RIGHT: PREVIEW CANVAS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-6 backdrop-blur-md relative overflow-hidden flex flex-col">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />

              {/* Preview Header */}
              <div className="flex justify-between items-center">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  Preview
                </h3>
                <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">
                  drag to inspect
                </span>
              </div>

              {/* Square Canvas Container (aspect-square) */}
              <div className="relative border border-[#2A3650]/40 bg-[#070A14] rounded-2xl overflow-hidden flex items-center justify-center aspect-square w-full select-none">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={800}
                  onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
                  onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => {
                    if (e.touches.length === 1) {
                      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                    }
                  }}
                  onTouchMove={(e) => {
                    if (e.touches.length === 1) {
                      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
                    }
                  }}
                  onTouchEnd={handleDragEnd}
                  className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                />
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
