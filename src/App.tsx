import React, { useState } from 'react';
import { 
  Layers, 
  Box, 
  Compass, 
  Lightbulb, 
  Code, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Home, 
  Menu, 
  X,
  Video
} from 'lucide-react';

import { ShowcaseHub } from './components/ShowcaseHub';
import { Task1CyborgLanding } from './tasks/Task1CyborgLanding/Task1CyborgLanding';
import { Task2BuildIn3D } from './tasks/Task2BuildIn3D/Task2BuildIn3D';
import { Task3ParallaxScroll } from './tasks/Task3ParallaxScroll/Task3ParallaxScroll';
import { Task4IdeateLanding } from './tasks/Task4IdeateLanding/Task4IdeateLanding';
import { TaskCodeViewerModal } from './components/TaskCodeViewerModal';

type ActiveView = 'hub' | 'task-1' | 'task-2' | 'task-3' | 'task-4';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('hub');
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [codeModalTask, setCodeModalTask] = useState<'task-1' | 'task-2' | 'task-3' | 'task-4' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'hub', label: 'Overview Hub', icon: <Home className="w-4 h-4" /> },
    { id: 'task-1', label: 'Task 1: Cyborg Landing', icon: <Layers className="w-4 h-4" />, badge: 'Landing' },
    { id: 'task-2', label: 'Task 2: Build in 3D', icon: <Box className="w-4 h-4" />, badge: 'Three.js' },
    { id: 'task-3', label: 'Task 3: Parallax Scroll', icon: <Compass className="w-4 h-4" />, badge: 'Parallax' },
    { id: 'task-4', label: 'Task 4: Ideate Landing', icon: <Lightbulb className="w-4 h-4" />, badge: 'Ideate' },
  ];

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col font-sans">
      {/* Master Task Switcher Bar (Hidden in Presentation Mode for clean demo video recording) */}
      {!isPresentationMode && (
        <nav className="sticky top-0 z-50 bg-[#080b14]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Brand & Task Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('hub')}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                CF
              </div>
              <span className="font-bold text-sm text-white font-display uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                Cyborg Frontier
              </span>
            </button>
            <span className="hidden md:inline text-xs text-slate-600">|</span>
            <span className="hidden md:inline text-xs text-slate-400 font-mono">
              Submission Suite
            </span>
          </div>

          {/* Desktop Task Navigation Tabs */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  currentView === item.id
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Action Tools: Presentation Mode & Code Inspector */}
          <div className="flex items-center gap-2">
            {currentView !== 'hub' && (
              <button
                onClick={() => setCodeModalTask(currentView as any)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs transition-colors cursor-pointer"
                title="View clean code & demo recording script"
              >
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Task Code</span>
              </button>
            )}

            <button
              onClick={() => setIsPresentationMode(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              title="Hide top navigation for distraction-free demo video recording"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Presentation Mode</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && !isPresentationMode && (
        <div className="lg:hidden bg-[#0c101c] border-b border-slate-800 p-4 space-y-2 z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2.5 rounded-lg text-xs text-left transition-colors flex items-center justify-between ${
                currentView === item.id
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Exit Button for Presentation Mode */}
      {isPresentationMode && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsPresentationMode(false)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-950/90 hover:bg-slate-900 text-slate-300 hover:text-white rounded-lg border border-slate-700 shadow-2xl text-xs backdrop-blur-md transition-all cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exit Presentation Mode</span>
          </button>
        </div>
      )}

      {/* Active Task View Renderer */}
      <main className="flex-1">
        {currentView === 'hub' && (
          <ShowcaseHub
            onSelectTask={(taskId) => setCurrentView(taskId)}
            onOpenCodeView={(taskId) => setCodeModalTask(taskId)}
          />
        )}

        {currentView === 'task-1' && (
          <Task1CyborgLanding
            onOpenCodeView={() => setCodeModalTask('task-1')}
          />
        )}

        {currentView === 'task-2' && (
          <Task2BuildIn3D
            onOpenCodeView={() => setCodeModalTask('task-2')}
          />
        )}

        {currentView === 'task-3' && (
          <Task3ParallaxScroll
            onOpenCodeView={() => setCodeModalTask('task-3')}
          />
        )}

        {currentView === 'task-4' && (
          <Task4IdeateLanding
            onOpenCodeView={() => setCodeModalTask('task-4')}
          />
        )}
      </main>

      {/* Standalone Code Viewer & Video Demo Script Modal */}
      {codeModalTask && (
        <TaskCodeViewerModal
          isOpen={!!codeModalTask}
          onClose={() => setCodeModalTask(null)}
          activeTaskId={codeModalTask}
        />
      )}
    </div>
  );
}
