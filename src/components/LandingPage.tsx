import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  MapPin, 
  Activity, 
  Cpu, 
  TrendingUp, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Layers, 
  BarChart3, 
  Waves,
  Eye,
  Radio,
  FileCheck
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToMap: () => void;
  onNavigateToAIDetection: () => void;
  onNavigateToPrediction: () => void;
  onNavigateToAbout: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToDashboard,
  onNavigateToMap,
  onNavigateToAIDetection,
  onNavigateToPrediction,
  onNavigateToAbout
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative w-full pt-8 lg:pt-16 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Techfest InnovateX Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Techfest IIT Bombay – InnovateX | Theme 3: Coastal Plastic Pollution</span>
            </div>

            {/* Powerful Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Stop Plastic Pollution <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Before It Reaches Our Oceans.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              PlasticGuard is an intelligent environmental monitoring platform that monitors plastic debris in Mumbai’s drainage canals, rivers, and creeks—predicting accumulation hotspots and coordinating rapid municipal waste interception before marine discharge.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onNavigateToDashboard}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Live Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToMap}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-sm sm:text-base flex items-center gap-2 transition-all"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Open Mumbai Live Map</span>
              </button>
            </div>

            {/* Live Counter Badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-lg">
              <div>
                <span className="text-2xl font-extrabold font-mono text-cyan-400 block">148.5 MT</span>
                <span className="text-xs text-slate-400">Waste Monitored</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold font-mono text-teal-400 block">42</span>
                <span className="text-xs text-slate-400">Hotspots Tracked</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold font-mono text-emerald-400 block">128.2 MT</span>
                <span className="text-xs text-slate-400">Diverted to Recycling</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 group">
              <img 
                src="/images/hero-coastal.jpg" 
                alt="PlasticGuard Mumbai Coastal Interceptor Drone Shot"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Floating Live Telemetry Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl border border-cyan-400/40 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Mithi River - Mahim Bay Interceptor
                    </span>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold text-[11px]">Sensor #04 Active</span>
                </div>
                <div className="flex justify-between text-slate-300 font-mono text-[11px] pt-1 border-t border-slate-700/60">
                  <span>Flow: 1.8 m/s (Ebb Tide)</span>
                  <span className="text-teal-300 font-bold">Barrier Deployed (86% efficiency)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Crisis Breakdown */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="glass-panel p-6 lg:p-10 rounded-3xl border border-cyan-500/20 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Waves className="w-4 h-4" /> The Coastal Megacity Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Coastal Cities Need Upstream Intelligence
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mumbai generates over 1,200 metric tonnes of plastic waste each day. During monsoon downpours and high spring tides, urban drainage networks, culverts, and the Mithi River flush massive volumes of single-use plastics directly into Mahim Bay and the Arabian Sea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-red-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-lg font-bold text-white">The Conventional Approach: Too Late</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Cleaning beaches only after plastic has already fractured and contaminated marine fauna.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Blind spots in inland drains and mangrove creeks where debris suffocates root systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Reactive emergency dredging after severe monsoon urban flooding occurs.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-teal-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white">The PlasticGuard Advantage: Detect & Intercept</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>Autonomous drone & IoT sonar detection at upstream culverts and sluice choke points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>Hydrodynamic risk engine predicts wash-out 4 hours before high tide reaches open sea.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>Automated municipal task routing to deploy floating booms and skimmers in real time.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Pipeline: How PlasticGuard Works */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
            End-To-End Environmental Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How PlasticGuard Intercepts Pollution
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A synchronized four-stage workflow linking AI vision, predictive physics, and municipal operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold">
              01
            </div>
            <h4 className="text-base font-bold text-white">Multi-Modal Telemetry</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous patrol drones, creek sonar sensors, and municipal CCTV feeds continuously monitor water flow and surface blockage.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono font-bold">
              02
            </div>
            <h4 className="text-base font-bold text-white">Neural Polymer AI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fine-tuned computer vision classifies debris into PET, multi-layer films, HDPE, and ghost nets, calculating weight and blockage scores.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold">
              03
            </div>
            <h4 className="text-base font-bold text-white">Hydrodynamic Risk Model</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Couples monsoon rainfall forecasts with Arabian Sea tidal elevations to model high-risk accumulation choke points hours in advance.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold">
              04
            </div>
            <h4 className="text-base font-bold text-white">Rapid Municipal Dispatch</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dispatches cleanup task orders to BMC squads and NGO volunteer skimmers with equipment requirements and route priority.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Core Modules & Interactive Systems</h2>
            <p className="text-xs text-slate-400">Explore each component of the PlasticGuard environmental platform.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div 
            onClick={onNavigateToMap}
            className="glass-card p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 cursor-pointer transition-all space-y-3 text-left"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Geospatial Hotspot Map</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive high-precision Mumbai map plotting Mithi River, Mahim Creek, Versova, and Malad with colored severity indicators.
            </p>
            <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
              Launch Map View <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={onNavigateToAIDetection}
            className="glass-card p-6 rounded-2xl border border-teal-500/20 hover:border-teal-400/60 cursor-pointer transition-all space-y-3 text-left"
          >
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Computer Vision Lab</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test detection algorithms with real Mumbai canal and mangrove imagery, or upload custom photos for simulated inference.
            </p>
            <span className="text-xs font-semibold text-teal-400 flex items-center gap-1">
              Test AI Detection <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={onNavigateToPrediction}
            className="glass-card p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/60 cursor-pointer transition-all space-y-3 text-left"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Monsoon & Tide Simulator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulate heavy monsoon rain (up to 120 mm/hr) and 4.9m spring high tides to observe how accumulation risks escalate.
            </p>
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
              Open Simulator <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* Final Call To Action Banner */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 lg:p-12 bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-cyan-500/40 text-center space-y-5">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Techfest IIT Bombay – InnovateX 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              "Detect. Predict. Prevent. Protect our Oceans."
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Join us in deploying proactive AI monitoring infrastructure to safeguard Mumbai’s coastal waters and marine life.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToDashboard}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl transition-all"
            >
              Launch Platform Dashboard
            </button>
            <button
              onClick={onNavigateToAbout}
              className="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700 font-semibold text-sm transition-all"
            >
              InnovateX Project Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
