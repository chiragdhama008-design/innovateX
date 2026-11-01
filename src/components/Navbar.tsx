import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  LayoutDashboard, 
  Map, 
  Cpu, 
  TrendingUp, 
  Truck, 
  FileText, 
  Menu, 
  X, 
  AlertCircle, 
  Radio, 
  Info,
  Waves
} from 'lucide-react';

export type NavTab = 'home' | 'dashboard' | 'map' | 'ai-detection' | 'prediction' | 'action-centre' | 'reports';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAboutModal: () => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAboutModal,
  onOpenReportModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Waves className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'map', label: 'Live Map', icon: <Map className="w-4 h-4" /> },
    { id: 'ai-detection', label: 'AI Detection', icon: <Cpu className="w-4 h-4" /> },
    { id: 'prediction', label: 'Risk Prediction', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'action-centre', label: 'Action Centre', icon: <Truck className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white font-['Outfit']">
                Plastic<span className="text-cyan-400">Guard</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-700/60 font-mono">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block font-medium">
              Coastal Intelligence Platform • Mumbai
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2.5">
          {/* Live Telemetry Ping */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Mumbai Telemetry Live</span>
          </div>

          {/* Quick Hotspot Report Button */}
          <button
            onClick={onOpenReportModal}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900/90 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Report Debris</span>
          </button>

          {/* About / InnovateX Info */}
          <button
            onClick={onOpenAboutModal}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
            title="About Techfest IIT Bombay InnovateX"
          >
            <Info className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 glass-card rounded-2xl border border-cyan-500/30 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
