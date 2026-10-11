import React from 'react';
import { 
  Layers, 
  Box, 
  Compass, 
  Lightbulb, 
  ArrowRight, 
  Code, 
  Video, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Play
} from 'lucide-react';
import { ASSETS } from '../constants/assets';

interface ShowcaseHubProps {
  onSelectTask: (taskId: 'task-1' | 'task-2' | 'task-3' | 'task-4') => void;
  onOpenCodeView: (taskId: 'task-1' | 'task-2' | 'task-3' | 'task-4') => void;
}

export const ShowcaseHub: React.FC<ShowcaseHubProps> = ({
  onSelectTask,
  onOpenCodeView
}) => {
  const taskCards = [
    {
      id: 'task-1' as const,
      badge: 'Task 1',
      title: 'Cyborg Themed Landing Page',
      subtitle: 'Complete Responsive Frontend Architecture',
      description: 'Production-ready Cyborg themed landing page built with custom typography, responsive Tailwind CSS layouts, systems Bento grid, interactive chassis finish selector, real-time telemetry gauges, and clinical inquiry reservation modal.',
      image: ASSETS.cyborgHero,
      accent: 'border-amber-500/40 text-amber-400 group-hover:border-amber-500',
      tagColor: 'text-amber-400',
      features: [
        'Responsive Top Bar & Editorial Typography',
        'High-Resolution Biomechanical Visual Asset',
        'Interactive Chassis Customizer (4 Alloys + 3 Sensors)',
        'Clinical Validation Proof & Inquiry Modal'
      ]
    },
    {
      id: 'task-2' as const,
      badge: 'Task 2',
      title: 'Build in 3D: Sub-Assembly Constructor',
      subtitle: 'Real-Time Three.js & WebGL 3D Engine',
      description: 'Interactive 3D cybernetic core visualizer featuring multi-ring gyroscope gimbals, quantum core reactor, hydraulic pistons, continuous mouse orbit damping, animated exploded view slider, PBR metallurgy switchers, and CAD snapshot exporter.',
      image: ASSETS.neuralCore,
      accent: 'border-cyan-500/40 text-cyan-400 group-hover:border-cyan-500',
      tagColor: 'text-cyan-400',
      features: [
        'Full 3D WebGL Canvas with Orbit & Zoom Controls',
        'Interactive Exploded View Separation Slider (0-100%)',
        '4 PBR Metallurgy Finishes (Titanium, Obsidian, Gold, Cyan)',
        'Wireframe CAD Mode & 3D Render Snapshot Capture'
      ]
    },
    {
      id: 'task-3' as const,
      badge: 'Task 3',
      title: 'Interactive Parallax Scrolling Page',
      subtitle: 'Multi-Depth Optical Velocity Engine',
      description: 'Scroll-driven cybernetic odyssey spanning five evolutionary strata. Features multi-layered visual depth, mouse gyroscope tilt tracking, real-time elevation HUD progress, speed multiplier ratio controls, and narrative chapters.',
      image: ASSETS.parallaxCityscape,
      accent: 'border-emerald-500/40 text-emerald-400 group-hover:border-emerald-500',
      tagColor: 'text-emerald-400',
      features: [
        'Multi-Layered Optical Parallax Depth System',
        'Interactive Mouse Tilt / Gyroscopic 3D Parallax',
        'Live Elevation in Meters & Depth HUD Indicator',
        '5-Chapter Narrative Progression with Jump Rail'
      ]
    },
    {
      id: 'task-4' as const,
      badge: 'Task 4',
      title: 'Ideate Landing Page',
      subtitle: 'Cybernetic Concept & Blueprint Laboratory',
      description: 'Collaborative engineering ideation workbench with an interactive CAD schematic blueprint featuring clickable hotspot pins, parametric concept generator, architecture lifecycle comparison matrix, and open community proposal registry.',
      image: ASSETS.blueprintSchematic,
      accent: 'border-purple-500/40 text-purple-400 group-hover:border-purple-500',
      tagColor: 'text-purple-400',
      features: [
        'Interactive CAD Schematic with 5 Clickable Hotspots',
        'Parametric Concept Ideator & BOM Estimator',
        'Lifecycle Architecture Comparison Matrix',
        'Open Proposal Registry with Real-Time Upvoting'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 antialiased py-12 px-6 lg:px-12 selection:bg-cyan-500/20 selection:text-cyan-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hub Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-cyan-400 uppercase tracking-wider">PROJECT SHOWCASE</span>
            <span aria-hidden="true">·</span>
            <span>4-in-1 Task Deliverables</span>
            <span aria-hidden="true">·</span>
            <span>Demo Video Ready</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-tight">
            Cyborg Engineering Suite
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            All four mandatory tasks are developed as separate modular codebases. 
            You can launch each task independently, record demo video walkthroughs, or inspect and copy the code division for each submission.
          </p>
        </div>

        {/* Video Submission Recording Tips Box */}
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Demo Video Submission Assistant
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Click <span className="text-white font-semibold">"Launch Fullscreen View"</span> on any task card to hide top headers for clean video recording. Click <span className="text-white font-semibold">"View Task Code"</span> to view the dedicated source code and video recording script for that task.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded border border-emerald-800/60 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>4 / 4 Tasks Complete</span>
          </div>
        </div>

        {/* 4 Task Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {taskCards.map((task) => (
            <div
              key={task.id}
              className="group bg-[#0b0e18] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-900/50"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-slate-950 border-b border-slate-800">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e18] via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-700 font-mono text-xs font-bold ${task.tagColor}`}>
                      {task.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {task.subtitle}
                    </div>
                    <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white mt-1">
                      {task.title}
                    </h2>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {task.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-500 uppercase">Key Deliverables:</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {task.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectTask(task.id)}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-slate-200 text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Task App</span>
                </button>
                <button
                  onClick={() => onOpenCodeView(task.id)}
                  className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>View Code & Script</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Methodology Footer */}
        <div className="pt-12 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span>Stack: HTML5 · Tailwind CSS · Three.js · React 19 · TypeScript</span>
          </div>
          <div>Cyborg Engineering Assessment Suite · 2026</div>
        </div>
      </div>
    </div>
  );
};
