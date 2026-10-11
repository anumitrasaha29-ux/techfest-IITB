import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  FileText, 
  Layers, 
  Sparkles, 
  Plus, 
  Check, 
  Sliders, 
  Cpu, 
  CheckCircle, 
  Code, 
  Share2, 
  ThumbsUp, 
  ArrowRight,
  Target,
  Wrench,
  Search
} from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { CyborgApi } from '../../services/api';


interface Task4Props {
  onOpenCodeView?: () => void;
}

interface IdeatedConcept {
  id: string;
  title: string;
  domain: string;
  description: string;
  torque: number;
  latency: number;
  compatibility: number;
  upvotes: number;
  status: 'Proposed' | 'Under Review' | 'Prototyped';
}

export const Task4IdeateLanding: React.FC<Task4Props> = ({ onOpenCodeView }) => {
  // Hotspot interaction state on the blueprint
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  // Concept generator state
  const [selectedDomain, setSelectedDomain] = useState('Bionic Prosthetics');
  const [powerEff, setPowerEff] = useState(92);
  const [torqueVal, setTorqueVal] = useState(380);
  const [latencyVal, setLatencyVal] = useState(0.24);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpec, setGeneratedSpec] = useState<{
    title: string;
    description: string;
    bomEstimate: string;
    thermalOutput: string;
    feasibility: string;
  } | null>({
    title: 'Adaptive Bio-Mimetic Forearm Mk.VI',
    description: 'High-torque articulated cybernetic limb with direct neuro-myoelectric feedback and solid-state power cell.',
    bomEstimate: '$14,200 / Unit',
    thermalOutput: '18W Nominal',
    feasibility: '94% Ready for Clinical Trials'
  });

  // Community ideation board
  const [concepts, setConcepts] = useState<IdeatedConcept[]>([
    {
      id: 'c1',
      title: 'Kinetic Footfall Energy Harvester',
      domain: 'Exoskeleton Mobility',
      description: 'Piezoelectric crystalline plates embedded inside ankle shock-absorbers that recharge auxiliary battery cells with every stride.',
      torque: 420,
      latency: 0.18,
      compatibility: 99,
      upvotes: 42,
      status: 'Prototyped'
    },
    {
      id: 'c2',
      title: 'Retinal Micro-OLED HUD Matrix',
      domain: 'Sensory Augmentation',
      description: 'Ultra-thin transparent cornea contact lens projecting real-time LiDAR distance vectors and thermal heat gradients directly to the retina.',
      torque: 0,
      latency: 0.05,
      compatibility: 96,
      upvotes: 38,
      status: 'Under Review'
    },
    {
      id: 'c3',
      title: 'Sub-Dermal Titanium Rib Protector',
      domain: 'Structural Reinforcement',
      description: 'Honeycomb titanium lattice interlaced between biological ribs to deflect ballistic and high-g acceleration shocks.',
      torque: 600,
      latency: 0.10,
      compatibility: 98,
      upvotes: 29,
      status: 'Proposed'
    }
  ]);

  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Hotspots definitions
  const hotspots = [
    {
      id: 0,
      title: 'Neural Interface System',
      coords: { top: '15%', left: '38%' },
      code: 'NIS-88',
      desc: '128-electrode micro-needle array tapping motor cortex impulses. Direct bio-electric signal transduction with zero surgical rejection.',
      spec: 'Sub-millisecond latency · 99.8% bio-tolerance'
    },
    {
      id: 1,
      title: 'Primary Myofiber Actuators',
      coords: { top: '38%', left: '55%' },
      code: 'PMA-04',
      desc: 'High-density electro-active polymer bundles generating linear contracting force equivalent to 4x natural human muscle tissue.',
      spec: '380 Nm peak torque · 1.4 m/s contraction'
    },
    {
      id: 2,
      title: 'Articulated Wrist Ball Joint',
      coords: { top: '54%', left: '42%' },
      code: 'WBJ-12',
      desc: 'Dual-axis titanium spherical bearing permitting 270° multi-planar rotation with anti-shear magnetic locks.',
      spec: '±0.002mm tolerance · Sintered ceramic'
    },
    {
      id: 3,
      title: 'Tactile Sensory Matrix',
      coords: { top: '72%', left: '32%' },
      code: 'TSM-90',
      desc: 'Capacitive skin sensors located at each fingertip providing micro-texture, thermal, and grip-pressure sensory feedback.',
      spec: '0.01 N resolution · 500 Hz polling'
    },
    {
      id: 4,
      title: 'Internal Solid-State Battery Pack',
      coords: { top: '48%', left: '68%' },
      code: 'BATT-SS7',
      desc: 'Hermetically encapsulated lithium-metal cell delivering high surge amperage for sudden kinetic acceleration bursts.',
      spec: '72h nominal duration · Inductive rapid charge'
    }
  ];

  // Load registered concepts from backend on mount
  useEffect(() => {
    CyborgApi.getConcepts().then((backendConcepts) => {
      if (backendConcepts && Array.isArray(backendConcepts) && backendConcepts.length > 0) {
        setConcepts(backendConcepts);
      }
    });
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await CyborgApi.generateAiConcept({
        domain: selectedDomain,
        powerEfficiency: powerEff,
        torque: torqueVal,
        latency: latencyVal,
      });

      if (generated) {
        setGeneratedSpec({
          title: generated.title,
          description: generated.description,
          bomEstimate: generated.bomEstimate,
          thermalOutput: generated.thermalOutput,
          feasibility: generated.feasibility,
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVote = (id: string) => {
    setConcepts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
    CyborgApi.voteConcept(id);
  };

  const handleAddIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle.trim()) return;

    const tempId = `c-${Date.now()}`;
    const newConcept: IdeatedConcept = {
      id: tempId,
      title: newIdeaTitle,
      domain: selectedDomain,
      description: newIdeaDesc || 'Community submitted cybernetic augmentation proposal.',
      torque: torqueVal,
      latency: latencyVal,
      compatibility: powerEff,
      upvotes: 1,
      status: 'Proposed'
    };

    setConcepts([newConcept, ...concepts]);
    setNewIdeaTitle('');
    setNewIdeaDesc('');
    setShowSubmitModal(false);

    const saved = await CyborgApi.addConcept({
      title: newConcept.title,
      domain: newConcept.domain,
      description: newConcept.description,
      torque: newConcept.torque,
      latency: newConcept.latency,
      compatibility: newConcept.compatibility,
    });

    if (saved && saved.id) {
      setConcepts((prev) => prev.map((c) => (c.id === tempId ? { ...c, id: saved.id } : c)));
    }
  };

  return (
    <div className="min-h-screen bg-[#070910] text-slate-100 antialiased selection:bg-purple-500/20 selection:text-purple-200">
      {/* Task Demonstration Header Bar */}
      <div className="bg-[#0c0f1c] border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-purple-400 uppercase tracking-wider font-mono">Task 4</span>
          <span className="hidden sm:inline text-slate-600">/</span>
          <span className="text-slate-300 font-medium">Ideate Landing Page: Cybernetic Innovation Laboratory</span>
        </div>
        <div className="flex items-center gap-3">
          {onOpenCodeView && (
            <button
              onClick={onOpenCodeView}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span>View Task 4 Code</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#070910]/90 backdrop-blur-md border-b border-slate-800/60 px-6 lg:px-12 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
            λ
          </div>
          <a href="#workbench" className="text-lg font-bold tracking-tight text-white font-display uppercase whitespace-nowrap">
            Cyber Ideate Lab
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#workbench" className="hover:text-white transition-colors whitespace-nowrap">Blueprint Workbench</a>
          <a href="#generator" className="hover:text-white transition-colors whitespace-nowrap">Concept Generator</a>
          <a href="#matrix" className="hover:text-white transition-colors whitespace-nowrap">Feature Matrix</a>
          <a href="#tokens" className="hover:text-white transition-colors whitespace-nowrap">Design Tokens</a>
          <a href="#proposals" className="hover:text-white transition-colors whitespace-nowrap">Open Proposals</a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded transition-colors whitespace-nowrap uppercase tracking-wider cursor-pointer"
          >
            Submit Concept
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 lg:px-12 border-b border-slate-800/60 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-purple-400">RESEARCH & IDEATION SPRINT 2026</span>
            <span aria-hidden="true">·</span>
            <span>Open Cybernetics Consortium</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Ideate The Next Century of Human Augmentation
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From preliminary vector schematics to clinical tolerance matrices. 
            Test parameter trade-offs, inspect interactive blueprints, and co-design next-generation biomechanical devices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#workbench"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Inspect Blueprint Schematics
            </a>
            <a
              href="#generator"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Launch Concept Ideator
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Blueprint Workbench Section */}
      <section id="workbench" className="py-20 px-6 lg:px-12 border-b border-slate-800/60 bg-[#090c17]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Wrench className="w-4 h-4 text-purple-400" />
              <span>Interactive CAD Workbench</span>
              <span aria-hidden="true">·</span>
              <span>Click Hotspots To Inspect</span>
            </div>
            <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
              Schematic Architectural Breakdown
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Select key sub-assembly nodes on the blueprint to reveal internal signal routing, joint physics, and electrical wiring.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Blueprint Image with Interactive Hotspots (8 cols) */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              <img
                src={ASSETS.blueprintSchematic}
                alt="Technical CAD Cybernetic Arm Schematic"
                className="w-full h-auto object-cover block"
                referrerPolicy="no-referrer"
              />

              {/* Interactive Hotspot Buttons */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot.id)}
                  style={{ top: spot.coords.top, left: spot.coords.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform cursor-pointer ${
                    activeHotspot === spot.id
                      ? 'bg-purple-500 text-white ring-4 ring-purple-400/30 scale-125 z-20'
                      : 'bg-slate-950/80 text-purple-300 border border-purple-400/60 hover:scale-110 z-10'
                  }`}
                  title={spot.title}
                >
                  {spot.id + 1}
                </button>
              ))}
            </div>

            {/* Hotspot Inspector Panel (4 cols) */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <div className="text-xs font-mono text-purple-400 uppercase">
                  ACTIVE NODE: {hotspots[activeHotspot].code}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {hotspots[activeHotspot].title}
                </h3>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {hotspots[activeHotspot].desc}
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <div className="text-slate-500 text-[11px] font-mono">SPECIFICATION BENCHMARK</div>
                  <div className="text-white font-medium mt-0.5">{hotspots[activeHotspot].spec}</div>
                </div>

                <div>
                  <div className="text-slate-500 text-[11px] font-mono">TOLERANCE CLASSIFICATION</div>
                  <div className="text-slate-300 font-mono mt-0.5">ISO 2768-mK Precision</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] text-slate-400 mb-2 font-mono">SWITCH SUBSYSTEM NODE:</div>
                <div className="flex flex-wrap gap-1.5">
                  {hotspots.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h.id)}
                      className={`px-2.5 py-1 text-xs rounded font-mono transition-colors cursor-pointer ${
                        activeHotspot === h.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {h.id + 1}. {h.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Generator Section */}
      <section id="generator" className="py-20 px-6 lg:px-12 border-b border-slate-800/60 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Parametric Synthesis</span>
              <span aria-hidden="true">·</span>
              <span>Engineering Calculator</span>
            </div>
            <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
              Cyborg Parameter Ideation Engine
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-1">
              Adjust biomechanical target parameters to synthesize feasibility metrics and technical bills of materials.
            </p>
          </div>

          <div className="bg-[#0c0f1c] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Domain selection */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Augmentation Architecture Domain
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Bionic Prosthetics', 'Neural Telepathy', 'Exoskeleton Mobility', 'Sensory Augmentation'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDomain(d)}
                    className={`py-2 px-3 rounded text-xs text-center border transition-colors cursor-pointer ${
                      selectedDomain === d
                        ? 'border-purple-500 bg-purple-950/40 text-purple-200 font-semibold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Power Efficiency:</span>
                  <span className="text-purple-400 font-bold tabular-nums">{powerEff}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="99"
                  value={powerEff}
                  onChange={(e) => setPowerEff(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Peak Torque:</span>
                  <span className="text-cyan-400 font-bold tabular-nums">{torqueVal} Nm</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="600"
                  value={torqueVal}
                  onChange={(e) => setTorqueVal(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Synaptic Latency:</span>
                  <span className="text-amber-400 font-bold tabular-nums">{latencyVal.toFixed(2)} ms</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.80"
                  step="0.01"
                  value={latencyVal}
                  onChange={(e) => setLatencyVal(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <span>Synthesizing Engineering Blueprint...</span>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" />
                    <span>Generate Parametric Blueprint Brief</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Result Output */}
            {generatedSpec && (
              <div className="p-6 bg-slate-950 rounded-xl border border-purple-900/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400 uppercase">SYNTHESIZED SPECIFICATION</span>
                  <span className="text-xs font-mono text-emerald-400">{generatedSpec.feasibility}</span>
                </div>
                <h4 className="text-xl font-bold text-white font-display uppercase">{generatedSpec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{generatedSpec.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[11px]">BOM Est.</span>
                    <span className="text-white">{generatedSpec.bomEstimate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Heat Vent</span>
                    <span className="text-white">{generatedSpec.thermalOutput}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Torque Rating</span>
                    <span className="text-white">{torqueVal} Nm</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Signal Lag</span>
                    <span className="text-white">{latencyVal.toFixed(2)} ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modular Feature Matrix Section */}
      <section id="matrix" className="py-20 px-6 lg:px-12 border-b border-slate-800/60 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Rigorous Benchmarks</span>
            <span aria-hidden="true">·</span>
            <span>Lifecycle Stages</span>
          </div>
          <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
            Architecture Lifecycle Matrix
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Comparing development parameters across Concept Ideation, Alpha Lab Testing, and Production Release.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono">
              <tr>
                <th className="py-3 px-4">Subsystem Parameter</th>
                <th className="py-3 px-4">Concept Stage</th>
                <th className="py-3 px-4">Alpha Prototype</th>
                <th className="py-3 px-4">Production Release</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Actuator Contraction Speed</td>
                <td className="py-3 px-4 text-slate-400">0.8 m/s</td>
                <td className="py-3 px-4 text-slate-300">1.2 m/s</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">1.8 m/s</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Neural Synapse Polling Frequency</td>
                <td className="py-3 px-4 text-slate-400">1,000 Hz</td>
                <td className="py-3 px-4 text-slate-300">5,000 Hz</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">12,000 Hz</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Hermetic Enclosure Seal</td>
                <td className="py-3 px-4 text-slate-400">IP65 (Dust Only)</td>
                <td className="py-3 px-4 text-slate-300">IP68 (Water Immersion)</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">IP69K & Space Vacuum</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Continuous Operational Duty Cycle</td>
                <td className="py-3 px-4 text-slate-400">18 Hours</td>
                <td className="py-3 px-4 text-slate-300">48 Hours</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">96+ Hours Continuous</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Community Proposals Board */}
      <section id="proposals" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Collaborative Registry</span>
              <span aria-hidden="true">·</span>
              <span>Open Ideation</span>
            </div>
            <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
              Community Cybernetic Proposals
            </h2>
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Proposal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="p-6 bg-[#0c0f1c] border border-slate-800 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-purple-400">{concept.domain}</span>
                  <span className="text-[11px] font-mono text-slate-500">{concept.status}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{concept.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{concept.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Score: {concept.compatibility}% Fit</span>
                <button
                  onClick={() => handleVote(concept.id)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-purple-300 rounded border border-slate-800 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="font-mono tabular-nums">{concept.upvotes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Idea Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0c0f1c] border border-slate-800 rounded-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono"
            >
              ✕
            </button>
            <div className="mb-4">
              <div className="text-xs font-mono text-purple-400 uppercase">Open Ideation Registry</div>
              <h3 className="text-xl font-bold font-display uppercase text-white mt-1">Submit Cybernetic Proposal</h3>
            </div>

            <form onSubmit={handleAddIdea} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subdermal Dermal Armor"
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Technical Summary</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the biomechanical mechanism and expected clinical advantage..."
                  value={newIdeaDesc}
                  onChange={(e) => setNewIdeaDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Register Proposal on Registry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
