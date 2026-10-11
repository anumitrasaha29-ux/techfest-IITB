import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  Download, 
  X, 
  Video, 
  FileCode, 
  Layers, 
  Sparkles 
} from 'lucide-react';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTaskId: 'task-1' | 'task-2' | 'task-3' | 'task-4';
}

export const TaskCodeViewerModal: React.FC<CodeViewerModalProps> = ({
  isOpen,
  onClose,
  activeTaskId
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'source' | 'script' | 'structure'>('source');

  if (!isOpen) return null;

  const taskMetadata = {
    'task-1': {
      title: 'Task 1: Cyborg Themed Landing Page Development',
      file: 'src/tasks/Task1CyborgLanding/Task1CyborgLanding.tsx',
      summary: 'Responsive Cyborg themed landing page featuring Top Bar Contract, editorial typography, generated cinematic photography, systems Bento grid, dynamic chassis finish customizer, live telemetry meters, and clinical inquiry workflow.',
      videoScript: [
        '00:00 - 00:10: Show header with brand wordmark and nav items. Highlight responsive layout and dark cybernetic color palette.',
        '00:10 - 00:25: Scroll to Hero Section. Point out the high-resolution cybernetic portrait, live telemetry metrics (0.18ms latency, 99.98% bio-integration).',
        '00:25 - 00:45: Scroll down to Modular Architecture Bento grid: show the Quantum Neural Core, Toray Carbon Exoskeleton, and Myofiber Actuators.',
        '00:45 - 01:10: Demonstrate the Interactive Configurator: switch between Titanium, Obsidian, Chromium, and Carbon finishes. Toggle optical spectrum sensors (Amber, Cyan, Crimson).',
        '01:10 - 01:30: Open "Configure Unit" modal, submit inquiry, and show the validated ticket confirmation state.'
      ],
      codeSnippet: `// ==========================================
// TASK 1: CYBORG THEMED LANDING PAGE
// File: src/tasks/Task1CyborgLanding/Task1CyborgLanding.tsx
// Technologies: HTML, React, TypeScript, Tailwind CSS
// ==========================================

import React, { useState } from 'react';
import { Cpu, ShieldCheck, Activity, Zap, Eye, ChevronRight } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

export const Task1CyborgLanding = () => {
  const [selectedFinish, setSelectedFinish] = useState('titanium');
  const [sensorColor, setSensorColor] = useState('amber');
  // ... full production component implementation
};`
    },
    'task-2': {
      title: 'Task 2: Build in 3D',
      file: 'src/tasks/Task2BuildIn3D/Task2BuildIn3D.tsx',
      summary: 'Interactive Three.js 3D Mech Constructor featuring WebGL rendering, 3-point studio lighting, multi-mesh cybernetic assembly, real-time exploded view slider, PBR metallurgy switchers, wireframe CAD toggle, orbit controls, camera presets, and snapshot capture.',
      videoScript: [
        '00:00 - 00:15: Demonstrate interactive 3D rotation with mouse drag and scroll zoom. Show smooth camera damping.',
        '00:15 - 00:30: Drag the "Explode" slider from 0% to 100% to show the internal sub-assemblies separating along spatial axes.',
        '00:30 - 00:45: Toggle between PBR Metallurgy presets (Titanium, Obsidian Ceramic, Electrum Gold, Quantum Cyan).',
        '00:45 - 01:05: Toggle the "Wireframe CAD" button to reveal holographic wireframes. Toggle individual sub-assemblies on/off in the right constructor panel.',
        '01:05 - 01:20: Switch camera presets (Isometric, Front Ortho, Top Plan, Reactor Zoom), then click "Snapshot" to export the 3D render.'
      ],
      codeSnippet: `// ==========================================
// TASK 2: BUILD IN 3D (THREE.JS / WEBGL)
// File: src/tasks/Task2BuildIn3D/Task2BuildIn3D.tsx
// Technologies: Three.js, WebGL, React, TypeScript, Tailwind CSS
// ==========================================

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';

export const Task2BuildIn3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [explodedPercent, setExplodedPercent] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  // Three.js scene, camera, lights, materials, and render loop
};`
    },
    'task-3': {
      title: 'Task 3: Interactive Parallax Scrolling Page',
      file: 'src/tasks/Task3ParallaxScroll/Task3ParallaxScroll.tsx',
      summary: 'Multi-layer optical parallax scrolling engine with velocity-differentiated background layers, interactive mouse gyroscope tilt, real-time depth HUD progress, elevation tracking, speed ratio selector, and a 5-chapter cybernetic evolution narrative.',
      videoScript: [
        '00:00 - 00:15: Move mouse across screen without scrolling to show interactive multi-layer gyroscope tilt in action.',
        '00:15 - 00:40: Slowly scroll down through the 5 evolutionary chapters. Point out how the background city, nebula starfield, and foreground struts move at distinct velocities.',
        '00:40 - 00:55: Highlight the Floating Depth HUD on the top right showing real-time elevation in meters and scroll percentage.',
        '00:55 - 01:10: Change the parallax ratio multiplier (0.5x, 1.0x, 1.8x) and click the left chapter navigation rail to jump smoothly between elevations.'
      ],
      codeSnippet: `// ==========================================
// TASK 3: INTERACTIVE PARALLAX SCROLLING PAGE
// File: src/tasks/Task3ParallaxScroll/Task3ParallaxScroll.tsx
// Technologies: HTML, React, TypeScript, Tailwind CSS
// ==========================================

import React, { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../../constants/assets';

export const Task3ParallaxScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [parallaxMultiplier, setParallaxMultiplier] = useState(1.0);
  // Multi-layer translate3d calculations and scroll depth tracking
};`
    },
    'task-4': {
      title: 'Task 4: Ideate Landing Page',
      file: 'src/tasks/Task4IdeateLanding/Task4IdeateLanding.tsx',
      summary: 'Cybernetic Innovation Laboratory featuring an interactive CAD Blueprint Workbench with clickable hotspot diagnostics, parametric concept ideator with real-time BOM calculations, architecture lifecycle matrix, and collaborative community idea registry.',
      videoScript: [
        '00:00 - 00:15: Introduce the Ideate Landing Page and its role in human-machine augmentation engineering.',
        '00:15 - 00:35: Demonstrate the Interactive Blueprint Workbench: click on the numbered pins on the technical CAD schematic to reveal neural interface, primary actuator, and sensory matrix specs.',
        '00:35 - 00:55: Use the Concept Ideator: select domain, adjust Power Efficiency, Peak Torque, and Latency sliders, then click "Generate Parametric Blueprint Brief" to show the synthesized feasibility output.',
        '00:55 - 01:15: Scroll through the Architecture Lifecycle Matrix table comparing Concept, Alpha, and Production tolerances.',
        '01:15 - 01:30: Upvote community proposals and click "Submit Proposal" to add a new cybernetic concept into the registry.'
      ],
      codeSnippet: `// ==========================================
// TASK 4: IDEATE LANDING PAGE
// File: src/tasks/Task4IdeateLanding/Task4IdeateLanding.tsx
// Technologies: HTML, React, TypeScript, Tailwind CSS
// ==========================================

import React, { useState } from 'react';
import { ASSETS } from '../../constants/assets';

export const Task4IdeateLanding = () => {
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [powerEff, setPowerEff] = useState(92);
  const [concepts, setConcepts] = useState([...]);
  // Hotspots, parametric calculator, and community proposal registry
};`
    }
  };

  const current = taskMetadata[activeTaskId];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-[#0c101d] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#080c16]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-sm">
              &lt;/&gt;
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
                {current.title}
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                {current.file}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-2 border-b border-slate-800/80 bg-[#090d18] flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('source')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'source' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Source Code File</span>
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'script' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Demo Video Recording Script</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-300 text-xs font-mono space-y-4">
          {activeTab === 'source' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-400 font-sans text-xs">
                {current.summary}
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 text-slate-200 overflow-x-auto leading-relaxed text-[11px] font-mono">
                <code>{current.codeSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === 'script' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200">
                <div className="font-bold flex items-center gap-2 mb-1">
                  <Video className="w-4 h-4" />
                  <span>Demo Video Presentation Guide for Submission</span>
                </div>
                <p className="text-[11px] text-amber-300/80">
                  Follow this structured timeline when recording your video submission for this task:
                </p>
              </div>

              <div className="space-y-3">
                {current.videoScript.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 font-mono text-[11px] flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-slate-300 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#080c16] flex items-center justify-between text-xs text-slate-500">
          <span>Target Architecture: React 19 + TypeScript + Tailwind CSS</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
