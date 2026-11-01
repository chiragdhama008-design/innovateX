import React from 'react';
import { X, Sparkles, ShieldCheck, Cpu, Waves, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Techfest IIT Bombay – InnovateX</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              PlasticGuard Project Architecture & Blueprint
            </h2>
            <p className="text-xs text-slate-400">
              Theme 3: Rising Plastic Pollution in Coastal Cities • Mumbai Focus
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vision & Mission */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Project Mission</h3>
          <p>
            PlasticGuard is conceived to solve the critical gap in coastal plastic pollution management: <strong>preventing plastic debris from reaching the ocean by intercepting it at upstream drainage, river, and creek choke points.</strong>
          </p>
          <p>
            Rather than relying on reactive and expensive open-ocean or post-beachfall cleanups, PlasticGuard deploys a synchronized pipeline of AI optical detection, hydrodynamic flood & tide risk forecasting, and automated municipal task routing.
          </p>
        </div>

        {/* Key Architectural Pillars */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Architecture</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Cpu className="w-4 h-4" /> AI Computer Vision
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                YOLOv8 object detector coupled with ResNet-50 fine-tuned on marine plastic debris (PET bottles, LDPE thin films, fishing nets, HDPE containers).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                <TrendingUp className="w-4 h-4" /> Hydrodynamic Risk Engine
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Correlates real-time tidal gauge telemetry (Arabian Sea spring/neap cycles) with IMD monsoon rainfall forecasts to calculate time-to-ocean wash-out.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Waves className="w-4 h-4" /> IoT In-Situ Sentinel Nodes
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ultrasonic drainage level sensors and debris weight load cells mounted directly on creek sluice gates (Mithi BKC, Mahim, Versova outfall).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Municipal SLA Dispatch
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Automated ticketing system routing priority work orders to Brihanmumbai Municipal Corporation (BMC) Storm Water Drain (SWD) teams & NGO skimmers.
              </p>
            </div>
          </div>
        </div>

        {/* Central Motto Banner */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
          <p className="text-cyan-300 font-bold font-mono text-sm">
            "Detect. Predict. Prevent. Protect our Oceans."
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md"
          >
            Back to Platform
          </button>
        </div>
      </div>
    </div>
  );
};
