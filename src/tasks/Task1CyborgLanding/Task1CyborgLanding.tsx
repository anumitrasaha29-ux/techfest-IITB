import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Activity, 
  ChevronRight, 
  Check, 
  Sparkles,
  Sliders, 
  RotateCw,
  Eye,
  Layers,
  ArrowUpRight,
  Code
} from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { CyborgApi } from '../../services/api';


interface Task1Props {
  onOpenCodeView?: () => void;
}

export const Task1CyborgLanding: React.FC<Task1Props> = ({ onOpenCodeView }) => {
  // Interactive chassis customization state
  const [selectedFinish, setSelectedFinish] = useState<'obsidian' | 'titanium' | 'chromium' | 'carbon'>('titanium');
  const [sensorColor, setSensorColor] = useState<'amber' | 'cyan' | 'crimson'>('amber');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', organization: '', tier: 'Clinical Research' });

  // Specs map based on finish
  const finishDetails = {
    titanium: {
      name: 'Aero-Grade Titanium Alloy',
      weight: '68.4 kg',
      tensile: '1,450 MPa',
      thermalDissipation: '98.2%',
      accentClass: 'border-slate-400 bg-slate-800/40 text-slate-200'
    },
    obsidian: {
      name: 'Matte Obsidian Ceramic',
      weight: '62.1 kg',
      tensile: '1,320 MPa',
      thermalDissipation: '99.4%',
      accentClass: 'border-zinc-500 bg-zinc-900/60 text-zinc-100'
    },
    chromium: {
      name: 'Mirror Polished Chromium',
      weight: '72.0 kg',
      tensile: '1,510 MPa',
      thermalDissipation: '97.6%',
      accentClass: 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
    },
    carbon: {
      name: 'Toray 12K Carbon Monocoque',
      weight: '54.8 kg',
      tensile: '1,890 MPa',
      thermalDissipation: '96.5%',
      accentClass: 'border-amber-400 bg-amber-950/40 text-amber-200'
    }
  };

  const currentFinish = finishDetails[selectedFinish];

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);

    try {
      await CyborgApi.submitInquiry({
        name: inquiryForm.name,
        email: inquiryForm.email,
        organization: inquiryForm.organization,
        tier: inquiryForm.tier,
        selectedFinish,
        sensorColor,
      });
    } catch (err) {
      console.warn('Inquiry submission fallback:', err);
    }

    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalOpen(false);
      setInquiryForm({ name: '', email: '', organization: '', tier: 'Clinical Research' });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-200">
      {/* Task Demonstration Header Bar */}
      <div className="bg-[#0c101a] border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-amber-400 uppercase tracking-wider font-mono">Task 1</span>
          <span className="hidden sm:inline text-slate-600">/</span>
          <span className="text-slate-300 font-medium">Cyborg Themed Landing Page Development</span>
        </div>
        <div className="flex items-center gap-3">
          {onOpenCodeView && (
            <button
              onClick={onOpenCodeView}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>View Task 1 Code</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/60 px-6 lg:px-12 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
            Æ
          </div>
          <a href="#hero" className="text-lg font-bold tracking-tight text-white font-display uppercase whitespace-nowrap">
            Aether Synthetics
          </a>
        </div>

        {/* Zone 2: Navigation Links (4-5 single-line clean links) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#chassis" className="hover:text-white transition-colors whitespace-nowrap">Chassis System</a>
          <a href="#neural" className="hover:text-white transition-colors whitespace-nowrap">Neural Core</a>
          <a href="#configurator" className="hover:text-white transition-colors whitespace-nowrap">Customizer</a>
          <a href="#specs" className="hover:text-white transition-colors whitespace-nowrap">Clinical Specs</a>
          <a href="#validation" className="hover:text-white transition-colors whitespace-nowrap">Validation</a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setInquiryModalOpen(true)}
            className="px-5 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap uppercase tracking-wider cursor-pointer"
          >
            Configure Unit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 px-6 lg:px-12 border-b border-slate-800/60 overflow-hidden">
        {/* Atmospheric subtle gradient glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-amber-400 tracking-wider">PROJECT GENESIS-VII</span>
              <span aria-hidden="true">·</span>
              <span>Class-IV Biomechanical Augmentation</span>
              <span aria-hidden="true">·</span>
              <span>ISO 13485 Certified</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tight text-white text-balance leading-[1.08]">
              Synthetic Precision Meets Human Intuition
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Engineered with forged aerospace titanium, sub-millisecond quantum synapse pathways, and 
              adaptive myofiber hydraulics. The world's first hermetically sealed biomechanical chassis 
              designed for limitless physical endurance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#configurator"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold rounded uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Interactive Configurator</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#neural"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-medium rounded transition-colors"
              >
                Inspect Neural Synapse
              </a>
            </div>

            <div className="pt-6 border-t border-slate-800/80">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-3">
                Live Deployment Telemetry
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">0.18ms</div>
                  <div className="text-xs text-slate-400 mt-1">Synapse Latency</div>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">99.98%</div>
                  <div className="text-xs text-slate-400 mt-1">Bio-Integration</div>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">420 Nm</div>
                  <div className="text-xs text-slate-400 mt-1">Peak Joint Torque</div>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tabular-nums">96.0 h</div>
                  <div className="text-xs text-slate-400 mt-1">Solid-State Reserve</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Anchor (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
              <img 
                src={ASSETS.cyborgHero} 
                alt="Aether Biomechanical Chassis in Titanium finish" 
                className="w-full h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/80 backdrop-blur-md rounded border border-slate-800/90 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase">Unit Specimen: Genesis Mk.IV</div>
                  <div className="text-sm font-semibold text-white">Full-Body Cybernetic Monocoque</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Sensor Status:</span>
                  <div className="text-xs font-mono text-emerald-400 flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Calibrated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Bento Grid Section */}
      <section id="chassis" className="py-20 px-6 lg:px-12 border-b border-slate-800/60 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Modular Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Assembly Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight text-white">
            Engineered For Radical Resilience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2">
            Every subsystem is isolated into field-swappable titanium capsules with dual redundant power busses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Quantum Neural Core with real image */}
          <div className="md:col-span-2 bg-[#0c101a] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Subsystem: QNP-88</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Quantum Neural Processor Core</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Operates at liquid-helium micro-temperatures inside a double-walled sapphire casing. Converts continuous motor cortex bio-signals into direct joint servo vectors with zero perceptible latency.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 border-t border-slate-800 overflow-hidden bg-slate-950">
              <img 
                src={ASSETS.neuralCore} 
                alt="Quantum Neural Core Macro Details" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300 bg-slate-950/70 px-2 py-1 rounded border border-cyan-900/50">
                128-Channel Optic Fiber Bus
              </div>
            </div>
          </div>

          {/* Card 2: Titanium Monocoque Exoskeleton */}
          <div className="bg-[#0c101a] border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Toray Carbon Exoskeleton</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Reinforced with carbon nano-lattice weave over an articulated grade-5 titanium rib cage, resisting point pressures exceeding 1,800 atmospheres.
              </p>
              <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Ballistic Rating</span>
                  <span className="font-mono text-white">STANAG Level 3</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Operating Temp</span>
                  <span className="font-mono text-white">-60°C to +130°C</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Structural Flex</span>
                  <span className="font-mono text-white">&lt; 0.04 mm/kN</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-amber-400">Stress-Tested: 10M Cycles</div>
            </div>
          </div>

          {/* Card 3: Synthetic Myofibers */}
          <div className="bg-[#0c101a] border border-slate-800 rounded-xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-6">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Myofiber Actuation Array</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Electroactive polymer bundles deliver human-like micro-articulation with 10x the contractile speed of biological muscle fibers.
            </p>
            <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Contraction Speed</span>
                <span className="text-white font-mono">1.2 m/s</span>
              </div>
              <div className="flex justify-between">
                <span>Power Efficiency</span>
                <span className="text-white font-mono">94.7%</span>
              </div>
            </div>
          </div>

          {/* Card 4: Subdermal Cooling */}
          <div className="bg-[#0c101a] border border-slate-800 rounded-xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-6">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Microfluidic Thermals</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Dual-phase fluorocarbon coolant circulates through laser-sintered micro-capillaries to siphon core heat to peripheral radiators.
            </p>
            <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Delta-T Gradient</span>
                <span className="text-white font-mono">&lt; 3.2°C Peak</span>
              </div>
              <div className="flex justify-between">
                <span>Pump Noise Floor</span>
                <span className="text-white font-mono">&lt; 14 dBA</span>
              </div>
            </div>
          </div>

          {/* Card 5: Multi-Spectrum Optical */}
          <div className="bg-[#0c101a] border border-slate-800 rounded-xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-6">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Multi-Spectrum Sensors</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Fused thermal, ultraviolet, and LiDAR sensory arrays feed spatial coordinates directly into synthetic visual cortex overlays.
            </p>
            <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Spatial Refresh</span>
                <span className="text-white font-mono">240 Hz</span>
              </div>
              <div className="flex justify-between">
                <span>LiDAR Precision</span>
                <span className="text-white font-mono">0.2 mm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Configurator Section */}
      <section id="configurator" className="py-20 px-6 lg:px-12 border-b border-slate-800/60 bg-[#090d16]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Customizer Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>Interactive Studio</span>
                  <span aria-hidden="true">·</span>
                  <span>Hardware Selector</span>
                </div>
                <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
                  Chassis Finishes & Calibrations
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Select surface plating and sensory spectrum to inspect real-time mechanical characteristics.
                </p>
              </div>

              {/* Finish Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Surface Monocoque Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['titanium', 'obsidian', 'chromium', 'carbon'] as const).map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 text-left rounded border transition-all text-xs cursor-pointer ${
                        selectedFinish === finish
                          ? 'border-amber-400 bg-amber-500/10 text-white font-semibold'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="capitalize font-medium text-slate-200">{finish}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {finish === 'titanium' && 'Grade 5 Aero'}
                        {finish === 'obsidian' && 'Sintered Ceramic'}
                        {finish === 'chromium' && 'Specular Mirror'}
                        {finish === 'carbon' && '12K Monocoque'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optical Spectrum Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Sensor Optical Spectrum
                </label>
                <div className="flex gap-3">
                  {[
                    { id: 'amber', label: '580nm Amber', dot: 'bg-amber-400' },
                    { id: 'cyan', label: '480nm Cyan', dot: 'bg-cyan-400' },
                    { id: 'crimson', label: '650nm Crimson', dot: 'bg-rose-500' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSensorColor(s.id as any)}
                      className={`flex-1 py-2 px-3 rounded border text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                        sensorColor === s.id
                          ? 'border-slate-300 bg-slate-800 text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Telemetry Box */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg space-y-3">
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>CHASSIS TELEMETRY</span>
                  <span className="text-amber-400">{currentFinish.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                  <div>
                    <div className="text-xs text-slate-500">Gross Mass</div>
                    <div className="text-sm font-mono text-white font-semibold tabular-nums">{currentFinish.weight}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Tensile Yield</div>
                    <div className="text-sm font-mono text-white font-semibold tabular-nums">{currentFinish.tensile}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Heat Venting</div>
                    <div className="text-sm font-mono text-white font-semibold tabular-nums">{currentFinish.thermalDissipation}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer"
              >
                Save Configuration & Request Allocation
              </button>
            </div>

            {/* Visualizer Display (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-6 overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-400 font-mono">
                    <span className="text-amber-400">CONFIG:</span>
                    <span>{selectedFinish.toUpperCase()} // SENSOR_{sensorColor.toUpperCase()}</span>
                  </div>
                  <div className="text-slate-500">1:1 Clinical Specimen</div>
                </div>

                <div className="relative my-6 aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
                  <img 
                    src={ASSETS.cyborgHero} 
                    alt="Configured Cyborg Specimen" 
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      selectedFinish === 'obsidian' ? 'brightness-75 contrast-125 saturate-50' :
                      selectedFinish === 'chromium' ? 'brightness-125 contrast-110 saturate-75' :
                      selectedFinish === 'carbon' ? 'brightness-90 contrast-125 sepia-[0.2]' :
                      'brightness-100 contrast-100'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Optical sensor light simulation overlay */}
                  <div className={`absolute top-[16%] left-[53%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full blur-md opacity-80 pointer-events-none transition-colors duration-500 ${
                    sensorColor === 'amber' ? 'bg-amber-400' :
                    sensorColor === 'cyan' ? 'bg-cyan-400' :
                    'bg-rose-500'
                  }`} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="text-slate-500 text-[11px]">Material Alloy</div>
                    <div className="font-semibold text-slate-200 mt-0.5 capitalize">{selectedFinish}</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="text-slate-500 text-[11px]">Sensor Band</div>
                    <div className="font-semibold text-slate-200 mt-0.5 capitalize">{sensorColor} Spectrum</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="text-slate-500 text-[11px]">Synapse Latency</div>
                    <div className="font-semibold text-amber-400 mt-0.5 font-mono">0.18 ms</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="text-slate-500 text-[11px]">Verification</div>
                    <div className="font-semibold text-emerald-400 mt-0.5 font-mono">Calibrated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Validation & Institutional Proof */}
      <section id="validation" className="py-20 px-6 lg:px-12 border-b border-slate-800/60 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
            <span>Peer-Reviewed Trials</span>
            <span aria-hidden="true">·</span>
            <span>Clinical Data 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight text-white">
            Validated by Clinical Cybernetics Centers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Proven over 4,200 hours of continuous human-machine synchronization trials across leading neurological institutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#0c101a] border border-slate-800 rounded-xl space-y-4">
            <div className="text-amber-400 font-mono text-xs">CLINICAL TRIAL 2025-C8</div>
            <p className="text-slate-300 text-base leading-relaxed italic">
              "The latency reduction achieved with the quantum neural processor creates an almost imperceptible delay between motor intention and physical actuation. The somatic feedback loop feels entirely native."
            </p>
            <div className="pt-4 border-t border-slate-800 text-xs">
              <div className="font-semibold text-white">Dr. Elena Vance, Ph.D.</div>
              <div className="text-slate-400">Director of Neuro-Mechanical Synthesis, Zurich Institute of Robotics</div>
            </div>
          </div>

          <div className="p-8 bg-[#0c101a] border border-slate-800 rounded-xl space-y-4">
            <div className="text-cyan-400 font-mono text-xs">EXTREME LOAD REPORT #194</div>
            <p className="text-slate-300 text-base leading-relaxed italic">
              "Subjected to repeated sub-zero arctic decompression and thermal cycling from -40°C to +85°C. The titanium monocoque retained 100% structural alignment with zero microfluidic leakage."
            </p>
            <div className="pt-4 border-t border-slate-800 text-xs">
              <div className="font-semibold text-white">Marcus Vance-Holt</div>
              <div className="text-slate-400">Chief Test Engineer, Aether Aerospace & Defense</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Drawer / Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0c101a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-mono p-1"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="text-xs font-mono text-amber-400 uppercase">Aether Synthesis Protocol</div>
              <h3 className="text-2xl font-bold font-display uppercase text-white mt-1">Configure Unit Allocation</h3>
              <p className="text-xs text-slate-400 mt-1">
                Selected: {currentFinish.name} ({sensorColor.toUpperCase()} sensor spectrum).
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Specification Reserved</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Your allocation ticket has been registered. A biological integration specialist will contact your organization.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Lead Researcher / Officer</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Katherine Chen"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Institutional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="k.chen@neuro-lab.org"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Deployment Tier</label>
                  <select
                    value={inquiryForm.tier}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, tier: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Clinical Research">Clinical Research Facility</option>
                    <option value="Aerospace Extreme">Aerospace & Deep Environment</option>
                    <option value="Bionic Rehabilitation">Bionic Rehabilitation Program</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Transmit Allocation Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-[#05070d] border-t border-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 uppercase font-display">Aether Synthetics</span>
            <span>·</span>
            <span>Biomechanical Engineering Initiative</span>
          </div>
          <div>© 2026 Aether Systems Corp. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
