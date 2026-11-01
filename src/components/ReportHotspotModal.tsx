import React, { useState } from 'react';
import { Hotspot, SeverityLevel, WaterwayType } from '../types';
import { AlertTriangle, MapPin, Upload, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportHotspotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHotspot: (hotspot: Hotspot) => void;
}

export const ReportHotspotModal: React.FC<ReportHotspotModalProps> = ({
  isOpen,
  onClose,
  onAddHotspot
}) => {
  const [name, setName] = useState('');
  const [zone, setZone] = useState('Central Suburbs (Ward L)');
  const [type, setType] = useState<WaterwayType>('creek');
  const [severity, setSeverity] = useState<SeverityLevel>('high');
  const [wasteTonnes, setWasteTonnes] = useState<number>(2.8);
  const [blockage, setBlockage] = useState<number>(65);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHotspot: Hotspot = {
      id: `hs-user-${Date.now()}`,
      name: name || 'Reported Coastal Drain Outfall',
      zone: zone,
      type: type,
      // Default around Mumbai coords with small jitter
      coordinates: [19.06 + (Math.random() - 0.5) * 0.12, 72.84 + (Math.random() - 0.5) * 0.08],
      severity: severity,
      estimatedWasteTonnes: Number(wasteTonnes),
      lastReported: 'Just now (Field Report)',
      telemetrySource: 'Citizen / Field Inspector Mobile Upload',
      image: '/images/mithi-debris.jpg',
      polymerBreakdown: {
        petBottles: 40,
        multilayerSachets: 35,
        hdpeContainers: 15,
        fishingGear: 5,
        thermocolFoam: 5
      },
      tidalVelocity: '1.4 m/s',
      blockageIndex: Number(blockage),
      recommendedAction: notes || 'Inspect culvert gate and deploy rapid recovery crew before high tide.',
      nearestWard: zone,
      activeBarrierInstalled: false
    };

    onAddHotspot(newHotspot);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-card w-full max-w-lg p-6 rounded-3xl border border-red-500/40 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Report New Plastic Accumulation Hotspot</h3>
              <p className="text-xs text-slate-400">Add an unmonitored waterway choke point directly to PlasticGuard</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">Hotspot Registered Successfully!</h4>
            <p className="text-xs text-slate-300">Added to Mumbai Sentinel Map and flagged for municipal review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Waterway / Drain Name</label>
              <input
                type="text"
                placeholder="e.g. Bandra Talao Overflow Drain"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mumbai Zone / Ward</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-400"
                >
                  <option value="Central Suburbs (Ward L/H-East)">Central Suburbs (Ward L/H-East)</option>
                  <option value="Western Suburbs (Ward K-West)">Western Suburbs (Ward K-West)</option>
                  <option value="Island City (Ward G-North)">Island City (Ward G-North)</option>
                  <option value="South Mumbai (Ward A/D)">South Mumbai (Ward A/D)</option>
                  <option value="Eastern Waterfront (Ward T)">Eastern Waterfront (Ward T)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Waterway Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-400"
                >
                  <option value="river">River</option>
                  <option value="creek">Creek</option>
                  <option value="drain">Storm Drain / Culvert</option>
                  <option value="beach">Coastal Beach</option>
                  <option value="harbor">Harbor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-red-400 font-bold"
                >
                  <option value="critical">Critical (P1)</option>
                  <option value="high">High (P2)</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Est. Waste (MT)</label>
                <input
                  type="number"
                  step="0.1"
                  value={wasteTonnes}
                  onChange={(e) => setWasteTonnes(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-400 font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Blockage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={blockage}
                  onChange={(e) => setBlockage(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-400 font-mono font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Recommended Action / Field Notes</label>
              <textarea
                rows={2}
                placeholder="e.g. Debris accumulated around weir pilings. High tide inflow expected in 3 hours."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-400"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold shadow-lg"
              >
                Submit Hotspot Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
