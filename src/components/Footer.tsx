import React from 'react';
import { ShieldCheck, Waves, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-10 px-4 lg:px-8 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Motto */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white text-sm font-['Outfit']">PlasticGuard</span>
            <span className="text-[10px] text-cyan-400 font-mono">v1.0-InnovateX</span>
          </div>
          <p className="text-slate-400 max-w-sm">
            AI-Powered Coastal Plastic Pollution Monitoring & Prevention Platform. Built for Mumbai drainage waterways, rivers, and coastal creeks.
          </p>
          <p className="text-slate-500 text-[11px] font-mono">
            "Detect. Predict. Prevent. Protect our Oceans."
          </p>
        </div>

        {/* Techfest InnovateX Attribution */}
        <div className="text-center md:text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Techfest IIT Bombay – InnovateX</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Theme 3: Rising Plastic Pollution in Coastal Cities
          </p>
          <p className="text-slate-500 text-[10px]">
            Designed for municipal environmental coordination across Mumbai coastal wards.
          </p>
        </div>
      </div>
    </footer>
  );
};
