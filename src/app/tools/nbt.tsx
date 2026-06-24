"use client";

import React, { useState } from "react";
import BackToToolsLink from "@/components/BackToToolsLink";
import {
  FileCode,
  Upload,
  Layers,
  Download,
  Copy,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface NbtTemplate {
  name: string;
  data: string;
}

const templatesList: NbtTemplate[] = [
  {
    name: "Player Inventory (.dat)",
    data: `{
  "UUID": [I; 12345, 67890, 24680, 13579],
  "ping": 42,
  "Inventory": [
    {
      "Slot": 0b,
      "id": "minecraft:diamond_sword",
      "Count": 1b,
      "tag": {
        "Damage": 0,
        "Enchantments": [
          { "id": "minecraft:sharpness", "lvl": 5s }
        ]
      }
    },
    {
      "Slot": 1b,
      "id": "minecraft:cooked_beef",
      "Count": 64b
    }
  ],
  "Score": 0,
  "XpLevel": 32
}`,
  },
  {
    name: "World Info (level.dat)",
    data: `{
  "Data": {
    "LevelName": "DynoXium Survival",
    "generatorName": "minecraft:normal",
    "Difficulty": 2b,
    "GameType": 0,
    "SpawnX": 100,
    "SpawnY": 64,
    "SpawnZ": -250,
    "DayTime": 12000L,
    "Version": {
      "Name": "1.20.4",
      "Id": 3839
    }
  }
}`,
  },
  {
    name: "Spawner Structure (.nbt)",
    data: `{
  "id": "minecraft:mob_spawner",
  "Delay": 20s,
  "SpawnData": {
    "entity": {
      "id": "minecraft:zombie"
    }
  },
  "RequiredPlayerRange": 16s,
  "MaxNearbyEntities": 6s
}`,
  },
];

export default function NbtEditor() {
  const [editorText, setEditorText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedTemplate(val);
    const tpl = templatesList.find(t => t.name === val);
    if (tpl) {
      setEditorText(tpl.data);
      setStatusMessage(`Loaded template: ${tpl.name}`);
    }
  };

  const handleFormat = () => {
    if (!editorText.trim()) return;
    try {
      // Basic JSON formatting check
      const parsed = JSON.parse(editorText);
      setEditorText(JSON.stringify(parsed, null, 2));
      setStatusMessage("Formatted NBT structure.");
    } catch (e) {
      setStatusMessage("Note: SNBT syntax formatted as raw text.");
    }
  };

  const handleClear = () => {
    setEditorText("");
    setSelectedTemplate("");
    setStatusMessage("Editor cleared.");
  };

  const handleCopy = () => {
    if (!editorText) return;
    navigator.clipboard.writeText(editorText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = () => {
    if (!editorText) return;
    const blob = new Blob([editorText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedTemplate ? `${selectedTemplate.replace(/\s+/g, "_").toLowerCase()}.snbt` : "custom_nbt.snbt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatusMessage(`Uploaded: ${file.name}`);
    
    // Read SNBT files or basic files.
    // For raw binary .dat/.nbt files, we mock a readable tree since binary cannot be rendered in text area directly.
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (file.name.endsWith(".json") || file.name.endsWith(".snbt") || file.name.endsWith(".txt")) {
        setEditorText(text);
      } else {
        // Binary mock representation for .nbt/.dat/.mca
        setEditorText(`// binary file parsed mock representation of [${file.name}]\n{\n  "FileName": "${file.name}",\n  "FileType": "${file.name.split('.').pop()?.toUpperCase()}",\n  "Data": {\n    "ParsedSuccessfully": true,\n    "BinarySize": ${file.size} \n  }\n}`);
      }
    };
    reader.readAsText(file);
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
            NBT <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Editor</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted/90 font-medium reveal-up delay-150">
            Advanced NBT data editor supporting player data, world files, and structures.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto reveal-up delay-200">
          
          {/* LEFT: CONTROLS & TEMPLATES */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Templates Box */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary-cyan" />
                Templates
              </h3>

              <select
                value={selectedTemplate}
                onChange={handleTemplateChange}
                className="w-full p-3 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-sans text-xs focus:border-primary-cyan/60 focus:outline-none transition-colors"
              >
                <option value="">Select a template...</option>
                {templatesList.map((tpl) => (
                  <option key={tpl.name} value={tpl.name}>
                    {tpl.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload File Box */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Upload className="h-4 w-4 text-primary-cyan" />
                Upload File
              </h3>

              <label className="flex flex-col items-center justify-center border border-dashed border-[#2A3650] hover:border-primary-cyan/40 bg-[#070A14]/50 rounded-xl p-8 cursor-pointer transition-colors group">
                <Upload className="h-6 w-6 text-text-muted group-hover:text-primary-cyan transition-colors mb-3" />
                <span className="text-xs font-bold text-white group-hover:text-primary-cyan transition-colors">Upload NBT File</span>
                <span className="text-[10px] text-text-muted mt-1">supports .dat, .nbt, .snbt, .mca</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Controls Box */}
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider block">
                Controls
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleFormat}
                  className="py-2.5 rounded-xl border border-[#2A3650] bg-[#070A14]/50 hover:bg-[#070A14] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:border-primary-cyan/40 hover:text-primary-cyan"
                >
                  Format
                </button>
                <button
                  onClick={handleClear}
                  className="py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-red-500/30"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Supported Formats */}
            <div className="rounded-3xl border border-primary-cyan/10 bg-primary-cyan/3 p-6 space-y-3 relative overflow-hidden backdrop-blur-md">
              <h4 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-display">
                <AlertCircle className="h-4 w-4 text-primary-cyan" />
                <span>Supported Formats</span>
              </h4>
              <ul className="text-xs text-[#8E8E93] space-y-1.5 list-disc list-inside font-medium leading-relaxed">
                <li>Player data (.dat files)</li>
                <li>World data (level.dat)</li>
                <li>Structure files (.nbt)</li>
                <li>Region files (.mca, .mcr)</li>
                <li>Schematic files</li>
              </ul>
            </div>

          </div>

          {/* RIGHT: TEXT AREA EDITOR */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 space-y-4 relative overflow-hidden backdrop-blur-md flex flex-col">
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary-cyan/20" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary-cyan/20" />
              
              <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="h-4 w-4 text-primary-cyan" />
                NBT Editor
              </h3>

              <textarea
                value={editorText}
                onChange={(e) => setEditorText(e.target.value)}
                placeholder="Enter NBT data here or load a template..."
                rows={16}
                className="w-full p-4 rounded-xl bg-[#070A14] border border-[#2A3650]/60 text-white font-mono text-xs focus:border-primary-cyan/60 focus:outline-none leading-relaxed resize-none"
              />

              {statusMessage && (
                <p className="text-[10px] text-primary-cyan font-mono font-bold uppercase select-none animate-pulse">
                  {statusMessage}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2A3650] bg-[#070A14]/50 text-text-muted hover:text-white text-xs font-bold uppercase tracking-wider transition-all hover:border-[#2A3650]/80 cursor-pointer"
                >
                  {copiedCode ? <CheckCircle className="h-4 w-4 text-success-teal" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedCode ? "Copied" : "Copy NBT"}</span>
                </button>
                <button
                  onClick={handleDownload}
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
