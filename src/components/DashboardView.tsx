import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, ComposedChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Hotspot, CleanupTask } from '../types';
import { 
  ACCUMULATION_TRENDS, 
  LOCATION_WASTE_DATA, 
  POLYMER_DISTRIBUTION, 
  CLEANUP_SLA_STATS, 
  OVERALL_STATS 
} from '../data/mockData';
import { 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Trash2, 
  MapPin, 
  Clock, 
  Filter, 
  ArrowUpRight, 
  Radio, 
  Layers, 
  Compass,
  Calendar,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface DashboardViewProps {
  hotspots: Hotspot[];
  tasks: CleanupTask[];
  onNavigateToMap: (hotspotId?: string) => void;
  onNavigateToActionCentre: () => void;
  onNavigateToAIDetection: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  hotspots,
  tasks,
  onNavigateToMap,
  onNavigateToActionCentre,
  onNavigateToAIDetection
}) => {
  const [timeFilter, setTimeFilter] = useState<'30d' | 'monsoon' | 'ytd'>('30d');
  const [zoneFilter, setZoneFilter] = useState<string>('all');

  // Compute live card values based on active hotspots state
  const criticalCount = hotspots.filter(h => h.severity === 'critical').length;
  const totalHotspotsCount = hotspots.length;
  const totalWasteTonnes = hotspots.reduce((sum, h) => sum + h.estimatedWasteTonnes, 0).toFixed(1);
  const completedOps = tasks.filter(t => t.status === 'completed').length + 214; // baseline + active

  // Filter trends for chart based on selected time filter
  const chartData = timeFilter === 'monsoon' 
    ? ACCUMULATION_TRENDS.filter(d => ['Jun', 'Jul', 'Aug', 'Sep'].includes(d.month))
    : ACCUMULATION_TRENDS;

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-4 lg:p-6 space-y-6">
      {/* Top Header & Ticker */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Mumbai Coastal Plastic Intelligence Overview
              </h1>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">
              Active hydrodynamic tracking across 8 drainage basins, 4 river mouths, and 7 coastal wards.
            </p>
          </div>

          {/* Time & Zone Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setTimeFilter('30d')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  timeFilter === '30d' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setTimeFilter('monsoon')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  timeFilter === 'monsoon' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monsoon Peak
              </button>
              <button
                onClick={() => setTimeFilter('ytd')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  timeFilter === 'ytd' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Year-To-Date
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        {/* Card 1: Total Hotspots */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Monitored Hotspots</span>
            <MapPin className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-3xl font-extrabold text-white">{totalHotspotsCount}</span>
            <span className="text-xs text-cyan-400 flex items-center font-medium">
              +4 this week
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Mithi, Mahim, Malad & Versova</p>
        </div>

        {/* Card 2: Critical Hotspots */}
        <div className="glass-card p-4 rounded-2xl border border-red-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-red-400">Critical Hotspots</span>
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-3xl font-extrabold text-red-400">{criticalCount}</span>
            <span className="text-[11px] text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
              Immediate Action
            </span>
          </div>
          <p className="text-[11px] text-slate-500">P1 hydraulic extraction required</p>
        </div>

        {/* Card 3: Estimated Waste Detected */}
        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Est. Waste Detected</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-amber-300">{totalWasteTonnes}</span>
            <span className="text-xs text-slate-400">MT</span>
          </div>
          <p className="text-[11px] text-slate-500">Surface + Sub-surface accumulation</p>
        </div>

        {/* Card 4: Total Waste Collected */}
        <div className="glass-card p-4 rounded-2xl border border-teal-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Total Waste Diverted</span>
            <Trash2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-teal-300">{OVERALL_STATS.totalWasteCollectedTonnes}</span>
            <span className="text-xs text-slate-400">MT</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">86.3% intercepted before sea</p>
        </div>

        {/* Card 5: Cleaning Operations Completed */}
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Clean Operations</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-3xl font-extrabold text-emerald-400">{completedOps}</span>
            <span className="text-xs text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">
              Completed
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Avg crew response: 4.2 hours</p>
        </div>
      </div>

      {/* Main Charts Row: Accumulation Over Time & Waste Collected by Location */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chart 1: Area Chart - Accumulation over Time */}
        <div className="lg:col-span-7 glass-card p-5 rounded-2xl border border-cyan-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm lg:text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Plastic Waste Inflow vs Ocean Interception (Metric Tonnes)
              </h3>
              <p className="text-xs text-slate-400">
                Monthly trend showing the critical role of floating barriers and creek boom interceptions during high runoff.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800">
              Peak: 114.7 MT (July Monsoon)
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: 'rgba(56, 189, 248, 0.3)', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="detected" 
                  name="Detected Waste" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDetected)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="collected" 
                  name="Waste Intercepted & Diverted" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCollected)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500" />
              <span>Potential Inflow to Ocean</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-cyan-500" />
              <span>Successfully Diverted by PlasticGuard</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Bar Chart - Waste by Location */}
        <div className="lg:col-span-5 glass-card p-5 rounded-2xl border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm lg:text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                Interceptions by Mumbai Hotspot
              </h3>
              <p className="text-xs text-slate-400">Total volume recovered per key waterway (MT)</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LOCATION_WASTE_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis dataKey="location" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={85} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: 'rgba(20, 184, 166, 0.4)', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }} 
                />
                <Bar dataKey="collected" name="Recovered (MT)" fill="#14b8a6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-500 text-center border-t border-slate-800/80 pt-2">
            Mithi River & Mahim Creek account for over 58% of all intercepted urban plastic.
          </div>
        </div>
      </div>

      {/* Secondary Row: Monthly Trends + Polymer Pie + Live Hotspots Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chart 3: Monthly Trends with Monsoon Factor */}
        <div className="lg:col-span-4 glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Monsoon Rainfall Correlation
          </h3>
          <p className="text-xs text-slate-400">
            Plastic runoff volume scales proportionally with high rainfall intensity (mm/hr).
          </p>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ACCUMULATION_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: 'rgba(56, 189, 248, 0.3)', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#f8fafc'
                  }} 
                />
                <Bar dataKey="detected" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="monsoonFactor" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Bars: Debris Volume (MT)</span>
            <span className="text-amber-400">Line: Monsoon Severity Index</span>
          </div>
        </div>

        {/* Chart 4: Polymer Distribution Donut */}
        <div className="lg:col-span-4 glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Polymer Fingerprint Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            Material composition of plastics intercepted along coastal watercourses.
          </p>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={POLYMER_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {POLYMER_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: 'rgba(56, 189, 248, 0.3)', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#f8fafc'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
            {POLYMER_DISTRIBUTION.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.fill }} />
                <span className="truncate">{p.name}: {p.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Alerts & Hotspot Quick Dispatch */}
        <div className="lg:col-span-4 glass-card p-5 rounded-2xl border border-red-500/20 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                Live Critical Sensor Feed
              </h3>
              <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800 font-mono">
                LIVE TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated alarms triggered by sonar blockage & aerial drone feeds.
            </p>

            <div className="mt-3 space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {hotspots.filter(h => h.severity === 'critical' || h.severity === 'high').slice(0, 3).map((hs) => (
                <div 
                  key={hs.id} 
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-400/50 transition-all text-xs"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-white tracking-tight">{hs.name}</span>
                    <span className="text-[10px] font-mono font-bold text-red-400">{hs.estimatedWasteTonnes} MT</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{hs.recommendedAction}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/60 pt-1.5">
                    <span>{hs.lastReported}</span>
                    <button 
                      onClick={() => onNavigateToMap(hs.id)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      Inspect <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onNavigateToActionCentre}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            Open Municipal Action Centre <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
