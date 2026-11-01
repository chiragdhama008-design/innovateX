import React, { useState } from 'react';
import { Hotspot, CleanupTask } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, Legend 
} from 'recharts';
import { 
  ACCUMULATION_TRENDS, 
  LOCATION_WASTE_DATA, 
  OVERALL_STATS 
} from '../data/mockData';
import { 
  Download, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Printer, 
  CheckCircle2, 
  TrendingUp, 
  Trees, 
  Fish, 
  Layers, 
  ArrowDownToLine,
  Filter,
  Check
} from 'lucide-react';

interface ReportsViewProps {
  hotspots: Hotspot[];
  tasks: CleanupTask[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ hotspots, tasks }) => {
  const [reportPeriod, setReportPeriod] = useState<'month' | 'quarter' | 'annual'>('annual');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Generate and download actual CSV
  const handleDownloadCSV = () => {
    const headers = [
      'Hotspot ID',
      'Waterway Name',
      'Zone',
      'Severity',
      'Estimated Waste (Tonnes)',
      'Blockage Index (%)',
      'Tidal Velocity',
      'Telemetry Source',
      'Recommended Action'
    ];

    const rows = hotspots.map(h => [
      h.id,
      `"${h.name}"`,
      `"${h.zone}"`,
      h.severity,
      h.estimatedWasteTonnes,
      h.blockageIndex,
      `"${h.tidalVelocity}"`,
      `"${h.telemetrySource}"`,
      `"${h.recommendedAction}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PlasticGuard_Mumbai_Environmental_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Environmental Audit & Impact Analytics
                </h1>
                <p className="text-xs lg:text-sm text-slate-400">
                  Comprehensive performance audit of marine plastic diversion, municipal response SLA, and mangrove habitat preservation.
                </p>
              </div>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintReport}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              Print / Save PDF
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" /> CSV Report Downloaded!
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-4 h-4" /> Export CSV Audit Dataset
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Environmental Impact Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-teal-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Ocean Waste Diverted</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-white">348.5</span>
            <span className="text-xs text-teal-300">Metric Tonnes</span>
          </div>
          <p className="text-[11px] text-teal-400 font-semibold">100% prevented from reaching Arabian Sea</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Marine Life Safeguarded</span>
            <Fish className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-cyan-300">18,400+</span>
          </div>
          <p className="text-[11px] text-slate-400">Est. marine animals & coastal birds</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Mangrove Canopy Protected</span>
            <Trees className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-emerald-400">14.8</span>
            <span className="text-xs text-slate-400">sq. km</span>
          </div>
          <p className="text-[11px] text-slate-400">Mahim, Gorai & Thane Creek reserves</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-blue-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Interception Efficiency</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-blue-300">86.3%</span>
          </div>
          <p className="text-[11px] text-slate-400">SLA: 4.2h dispatch from detection</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Cumulative Diversion & Inflow Comparison */}
        <div className="lg:col-span-7 glass-card p-5 rounded-2xl border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm lg:text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Monthly Plastic Inflow vs Ocean Diversion (MT)
            </h3>
            <span className="text-xs text-slate-400">Jan - Oct 2026 Audit</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACCUMULATION_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: 'rgba(56, 189, 248, 0.3)', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#f8fafc'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="detected" name="Gross Detected Inflow" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" name="Recovered by Municipal Booms" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="divertedToRecycling" name="Diverted to Certified Recyclers" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cleaning Efficiency & Location Distribution */}
        <div className="lg:col-span-5 glass-card p-5 rounded-2xl border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm lg:text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Cleaning Operations Performance Breakdown
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Response under 6 Hours (P1 Critical)</span>
                <span className="text-emerald-400 font-mono font-bold">68%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Response 6 to 12 Hours (P2 High)</span>
                <span className="text-cyan-400 font-mono font-bold">23%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '23%' }} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Routine Drainage Clearance (&gt; 12 Hours)</span>
                <span className="text-slate-400 font-mono font-bold">9%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full" style={{ width: '9%' }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-1">
              <span className="text-cyan-400 font-bold block">AUDIT COMPLIANCE NOTE</span>
              <p className="text-slate-300 leading-relaxed">
                All collected waste weights are verified via certified municipal weighbridges in accordance with Maharashtra Pollution Control Board (MPCB) environmental monitoring standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabular Audit Dataset Preview */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            Coastal Waterway Audit Records Preview
          </h3>
          <span className="text-xs text-slate-400">Total {hotspots.length} audited monitoring stations</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Waterway Location</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Est. Waste</th>
                <th className="py-3 px-4">Blockage</th>
                <th className="py-3 px-4">Tidal Current</th>
                <th className="py-3 px-4">Telemetry Stream</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono">
              {hotspots.map((h) => (
                <tr key={h.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">{h.name}</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">{h.zone}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      h.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      h.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      h.severity === 'moderate' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {h.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">{h.estimatedWasteTonnes} MT</td>
                  <td className="py-3 px-4 text-slate-300">{h.blockageIndex}%</td>
                  <td className="py-3 px-4 text-teal-400">{h.tidalVelocity}</td>
                  <td className="py-3 px-4 text-slate-400 font-sans text-[11px] truncate max-w-xs">{h.telemetrySource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
