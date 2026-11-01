import React, { useState } from 'react';
import { RISK_LOCATIONS } from '../data/mockData';
import { RiskPrediction } from '../types';
import { 
  CloudRain, 
  Waves, 
  Sliders, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Info, 
  Zap, 
  TrendingUp,
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

interface RiskPredictionViewProps {
  onDispatchActionPlan?: (risk: RiskPrediction) => void;
}

export const RiskPredictionView: React.FC<RiskPredictionViewProps> = ({ 
  onDispatchActionPlan 
}) => {
  // Simulator interactive states
  const [rainfallMm, setRainfallMm] = useState<number>(65); // 0 to 120 mm/hr
  const [tidalHeightM, setTidalHeightM] = useState<number>(3.8); // 1.0 to 5.0 meters
  const [isSluiceBlocked, setIsSluiceBlocked] = useState<boolean>(true);
  const [alertBroadcastSuccess, setAlertBroadcastSuccess] = useState<string | null>(null);

  // Dynamic risk calculation function
  const calculateDynamicRisk = (baseRisk: number) => {
    const rainFactor = (rainfallMm / 120) * 22; // up to +22%
    const tideFactor = ((tidalHeightM - 1.0) / 4.0) * 18; // up to +18%
    const sluiceFactor = isSluiceBlocked ? 14 : -6;
    const computed = Math.min(99, Math.max(15, Math.round(baseRisk + rainFactor + tideFactor + sluiceFactor - 18)));
    return computed;
  };

  // Dynamic hours to ocean inflow
  const calculateDynamicTimeToInflow = (baseHours: number, risk: number) => {
    const speedup = (risk / 100) * 1.8;
    const hours = Math.max(0.6, parseFloat((baseHours / (1 + speedup * 0.7)).toFixed(1)));
    return hours;
  };

  const handleBroadcastAlert = () => {
    setAlertBroadcastSuccess(
      `Monsoon & Spring Tide Preemptive Alert successfully broadcasted to BMC Disaster Management Cell, Ward H-East, Ward G-North, and Ward K-West emergency response squads.`
    );
    setTimeout(() => {
      setAlertBroadcastSuccess(null);
    }, 5500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-4 lg:p-6 space-y-5">
      {/* Page Header */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  AI Hydrodynamic Plastic Accumulation Risk Predictor
                </h1>
                <p className="text-xs lg:text-sm text-slate-400">
                  Forecasting plastic congestion choke points and ocean wash-out windows using tidal patterns, monsoon rainfall, and urban drainage telemetry.
                </p>
              </div>
            </div>
          </div>

          {/* Honest Prototype Label */}
          <div className="px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs flex items-center gap-2 max-w-md">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <p className="leading-snug">
              <strong className="text-blue-300">Illustrative Risk Simulator:</strong> Mathematical model coupling historical BMC culvert clogging data with Arabian Sea tidal surge predictions for Techfest IIT Bombay InnovateX.
            </p>
          </div>
        </div>
      </div>

      {/* Broadcast Success Message */}
      {alertBroadcastSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs lg:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/50 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{alertBroadcastSuccess}</span>
        </div>
      )}

      {/* Interactive Environmental Simulation Cockpit */}
      <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm lg:text-base font-bold text-white uppercase tracking-wider">
              Hydrodynamic Environmental Simulator Controls
            </h3>
          </div>
          <button
            onClick={() => {
              setRainfallMm(65);
              setTidalHeightM(3.8);
              setIsSluiceBlocked(true);
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Reset to Mumbai Monsoon Baseline
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Rainfall Intensity */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" /> Monsoon Rainfall Intensity
              </span>
              <span className="font-mono text-cyan-300 font-bold text-sm">{rainfallMm} mm/hr</span>
            </div>
            <input 
              type="range"
              min="0"
              max="120"
              step="5"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 mm (Dry/Drizzle)</span>
              <span>60 mm (Heavy)</span>
              <span>120 mm (Torrential Flood)</span>
            </div>
          </div>

          {/* Slider 2: Tidal Surge Height */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-blue-400" /> Arabian Sea Tidal Height
              </span>
              <span className="font-mono text-blue-300 font-bold text-sm">{tidalHeightM} meters</span>
            </div>
            <input 
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={tidalHeightM}
              onChange={(e) => setTidalHeightM(Number(e.target.value))}
              className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1.0m (Neap Low)</span>
              <span>3.5m (Mean High)</span>
              <span>5.0m (Spring King Tide)</span>
            </div>
          </div>

          {/* Toggle: Sluice Gate Obstruction */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Creek Weir / Sluice Gate Status
              </span>
              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                isSluiceBlocked ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isSluiceBlocked ? 'Debris Clogged' : 'Clear / Operable'}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsSluiceBlocked(true)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  isSluiceBlocked 
                    ? 'bg-red-950/60 text-red-300 border-red-500' 
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                Clogged Weir Grate
              </button>
              <button
                onClick={() => setIsSluiceBlocked(false)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  !isSluiceBlocked 
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500' 
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                Clean Grate Flow
              </button>
            </div>
          </div>
        </div>

        {/* Global Risk Impact Bar */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-xs text-slate-400">Current Computed Coastal Vulnerability</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono text-red-400">
                  {rainfallMm > 80 || tidalHeightM > 4.2 ? 'CRITICAL OCEAN WASHOUT RISK' : 'HIGH ACCUMULATION SURGE'}
                </span>
                <span className="text-xs bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded-full font-mono">
                  {calculateDynamicRisk(85)}% Average Choke Probability
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBroadcastAlert}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
            Broadcast Early Warning to BMC Wards
          </button>
        </div>
      </div>

      {/* High-Risk Locations Cards & Preventive Protocols */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            High-Risk Locations & Ocean Inflow Timers
          </h3>
          <span className="text-xs text-slate-400">Dynamically updated from simulator parameters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RISK_LOCATIONS.map((loc) => {
            const dynamicRisk = calculateDynamicRisk(loc.baseRisk);
            const dynamicHours = calculateDynamicTimeToInflow(loc.timeToOceanInflowHours, dynamicRisk);
            
            const isSevere = dynamicRisk >= 85;
            const isHigh = dynamicRisk >= 70 && dynamicRisk < 85;

            return (
              <div 
                key={loc.locationId}
                className="glass-card p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4"
                style={{
                  borderColor: isSevere ? 'rgba(239, 68, 68, 0.4)' : isHigh ? 'rgba(249, 115, 22, 0.3)' : 'rgba(14, 165, 233, 0.2)'
                }}
              >
                <div>
                  {/* Top Location Info */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">{loc.locationName}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {loc.zone}
                      </p>
                    </div>

                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      isSevere ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      isHigh ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {isSevere ? 'EXTREME' : isHigh ? 'HIGH' : 'ELEVATED'}
                    </span>
                  </div>

                  {/* Dynamic Metrics */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <span className="text-slate-400 block text-[11px] mb-0.5">Calculated Risk</span>
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className={`text-lg font-bold ${
                          isSevere ? 'text-red-400' : isHigh ? 'text-orange-400' : 'text-amber-400'
                        }`}>
                          {dynamicRisk}%
                        </span>
                        <span className="text-slate-500 text-[10px]">Accumulation</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${isSevere ? 'bg-red-500' : isHigh ? 'bg-orange-500' : 'bg-amber-500'}`}
                          style={{ width: `${dynamicRisk}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <span className="text-slate-400 block text-[11px] mb-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> Time to Ocean Inflow
                      </span>
                      <div className="font-mono text-base font-bold text-white mt-0.5">
                        <span className="text-cyan-400 text-lg">{dynamicHours}</span> hrs
                      </div>
                      <span className="text-[10px] text-slate-500 block">Until Arabian Sea spill</span>
                    </div>
                  </div>

                  {/* Key Vulnerability */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300">
                    <span className="text-slate-400 font-semibold text-[11px] block mb-0.5">Critical Vulnerability:</span>
                    <p className="text-[11px] leading-relaxed">{loc.keyVulnerability}</p>
                  </div>

                  {/* Recommended Preventive Actions */}
                  <div className="mt-3 space-y-1.5 text-xs">
                    <span className="text-slate-300 font-semibold text-[11px] block">
                      Recommended Preventive Actions:
                    </span>
                    {loc.preventiveProtocols.map((protocol, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                        <span>{protocol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dispatch Button */}
                <button
                  onClick={() => onDispatchActionPlan && onDispatchActionPlan(loc)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all mt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Initiate Preemptive Protocol
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
