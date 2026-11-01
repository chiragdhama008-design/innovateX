import React, { useState } from 'react';
import { MOCK_DETECTIONS } from '../data/mockData';
import { DetectionResult, SeverityLevel } from '../types';
import { 
  Upload, 
  Scan, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Layers, 
  Cpu, 
  ShieldAlert, 
  ArrowRight,
  Maximize2,
  RefreshCw,
  FileText
} from 'lucide-react';

interface AIDetectionViewProps {
  onDispatchTaskFromDetection?: (detection: DetectionResult) => void;
}

export const AIDetectionView: React.FC<AIDetectionViewProps> = ({ 
  onDispatchTaskFromDetection 
}) => {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('mithi');
  const [currentDetection, setCurrentDetection] = useState<DetectionResult>(MOCK_DETECTIONS.mithi);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [customImageUploaded, setCustomImageUploaded] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('');

  // Handle Preset Selection
  const handleSelectPreset = (key: string) => {
    setSelectedPresetKey(key);
    setCustomImageUploaded(null);
    setIsScanning(true);
    setTimeout(() => {
      setCurrentDetection(MOCK_DETECTIONS[key]);
      setIsScanning(false);
    }, 900);
  };

  // Handle User Custom Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImageUploaded(imageUrl);
      setCustomFileName(file.name);
      setSelectedPresetKey('custom');
      setIsScanning(true);

      // Simulate AI inference on uploaded image
      setTimeout(() => {
        setIsScanning(false);
        setCurrentDetection({
          fileName: file.name,
          imageUrl: imageUrl,
          analyzedAt: 'Just now (Client-side Inference Demo)',
          severity: 'high',
          overallScore: 78,
          estimatedTonnes: 2.3,
          confidence: 0.92,
          detectedItems: [
            { label: 'PET Bottles (Water / Soda containers)', count: 96, percentage: 42 },
            { label: 'Multi-layer Foil & Polymer Pouches', count: 68, percentage: 30 },
            { label: 'Rigid High-Density Polyethylene Fragments', count: 38, percentage: 17 },
            { label: 'Discarded Synthetic Cordage / Straps', count: 25, percentage: 11 }
          ],
          primaryPolymer: 'Polyethylene Terephthalate (PET) & Low-Density Film',
          recommendedAction: 'CLEANING REQUIRED: Debris accumulation threatens coastal drainage throughput. Schedule crew extraction.',
          requiresUrgentIntervention: true,
          cleanlinessScore: 22
        });
      }, 1400);
    }
  };

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'critical':
        return <span className="glass-badge-critical text-xs px-2.5 py-1 rounded-full font-bold uppercase flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Critical Severity (P1)</span>;
      case 'high':
        return <span className="glass-badge-high text-xs px-2.5 py-1 rounded-full font-bold uppercase flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> High Severity (P2)</span>;
      case 'moderate':
        return <span className="glass-badge-medium text-xs px-2.5 py-1 rounded-full font-bold uppercase flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Moderate Accumulation</span>;
      case 'low':
        return <span className="glass-badge-low text-xs px-2.5 py-1 rounded-full font-bold uppercase flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Low / Baseline Normal</span>;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-4 lg:p-6 space-y-5">
      {/* Page Header */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  AI Computer Vision: Plastic Debris Detection
                </h1>
                <p className="text-xs lg:text-sm text-slate-400">
                  Automated visual detection, polymer categorization, and accumulation severity modeling for coastal waters & culverts.
                </p>
              </div>
            </div>
          </div>

          {/* Honest Simulation Disclaimer Badge */}
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2 max-w-md">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="leading-snug">
              <strong className="text-amber-300">Simulated Demonstration:</strong> Inference runs on simulated weights modeled after YOLOv8 + ResNet-50 marine plastic benchmarks for Techfest IIT Bombay InnovateX.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload & Controls / Image Canvas / AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Upload Zone & Preset Selectors */}
        <div className="lg:col-span-5 space-y-4">
          {/* Preset Samples Selector */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Test With Sample Hotspots
              </span>
              <span className="text-[11px] text-slate-500">1-Click Demonstration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleSelectPreset('mithi')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedPresetKey === 'mithi'
                    ? 'bg-red-950/40 border-red-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Mithi River Culvert</span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Dense PET bottles & clogged weir gate</p>
              </button>

              <button
                onClick={() => handleSelectPreset('mangrove')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedPresetKey === 'mangrove'
                    ? 'bg-red-950/40 border-red-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Mahim Creek Roots</span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">LDPE bags choking mangrove roots</p>
              </button>

              <button
                onClick={() => handleSelectPreset('beach')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedPresetKey === 'beach'
                    ? 'bg-orange-950/40 border-orange-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Versova Barrier</span>
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Interception boom & ocean debris</p>
              </button>

              <button
                onClick={() => handleSelectPreset('clean')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedPresetKey === 'clean'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Marine Drive Baseline</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Clean shoreline reference sample</p>
              </button>
            </div>
          </div>

          {/* User File Upload Dropzone */}
          <div className="glass-card p-5 rounded-2xl border-dashed border-2 border-slate-700 hover:border-cyan-400/80 transition-all text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Upload Coastal Or Drainage Photo</h4>
              <p className="text-xs text-slate-400 mt-1">
                Drag and drop your local river, drain, or beach picture (JPG, PNG, WebP)
              </p>
            </div>

            <label className="inline-block cursor-pointer px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 text-xs font-semibold transition-all">
              <span>Choose Image File</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </label>

            {customFileName && (
              <p className="text-[11px] text-cyan-400 font-mono">
                Loaded file: {customFileName}
              </p>
            )}
          </div>

          {/* Vision Model Specifications Card */}
          <div className="glass-panel p-4 rounded-2xl space-y-2.5 text-xs">
            <div className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Neural Architecture Architecture
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Object Detection</span>
                <span className="text-slate-200 font-mono font-bold">YOLOv8-Marine v2</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Polymer Classifier</span>
                <span className="text-slate-200 font-mono font-bold">ResNet-50 Fine-tuned</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Input Resolution</span>
                <span className="text-slate-200 font-mono font-bold">1280x720 RGB</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Inference Latency</span>
                <span className="text-slate-200 font-mono font-bold">42 ms (Edge Jetson)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image View Canvas & Analytical Results */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Inspection Canvas */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[340px] flex items-center justify-center">
            {/* Image Preview */}
            <img 
              src={currentDetection.imageUrl} 
              alt={currentDetection.fileName}
              className={`w-full max-h-[380px] object-cover transition-opacity duration-300 ${isScanning ? 'opacity-50' : 'opacity-100'}`}
            />

            {/* Radar Scan Laser Line */}
            {isScanning && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm">
                <div className="relative w-full h-full">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-radar-sweep" />
                </div>
                <div className="absolute flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-semibold">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  Running Neural Feature Extractor...
                </div>
              </div>
            )}

            {/* Simulated Bounding Boxes Overlay (when not scanning & enabled) */}
            {!isScanning && showBoundingBoxes && currentDetection.severity !== 'low' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Bounding Box 1 */}
                <div className="absolute top-[35%] left-[28%] w-[24%] h-[28%] border-2 border-cyan-400 bg-cyan-400/10 rounded">
                  <span className="absolute -top-5 left-0 bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded">
                    PET Bottle 94%
                  </span>
                </div>
                {/* Bounding Box 2 */}
                <div className="absolute top-[48%] left-[54%] w-[22%] h-[26%] border-2 border-blue-400 bg-blue-400/10 rounded">
                  <span className="absolute -top-5 left-0 bg-blue-500 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded">
                    Multi-layer Film 89%
                  </span>
                </div>
                {/* Bounding Box 3 */}
                <div className="absolute top-[22%] left-[58%] w-[18%] h-[20%] border-2 border-amber-400 bg-amber-400/10 rounded">
                  <span className="absolute -top-5 left-0 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded">
                    HDPE Crate 91%
                  </span>
                </div>
              </div>
            )}

            {/* Canvas Header Bar */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs z-20">
              <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 font-mono text-[11px]">
                {currentDetection.fileName}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border backdrop-blur-md transition-all ${
                    showBoundingBoxes 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60' 
                      : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
                >
                  {showBoundingBoxes ? 'Bounding Boxes: ON' : 'Bounding Boxes: OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* AI Inference Analysis Report Card */}
          <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-4">
            {/* Top Analysis Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  INSPECTION DIAGNOSTIC
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-lg font-bold text-white">Detection Assessment</h3>
                  {getSeverityBadge(currentDetection.severity)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">AI Optical Confidence</span>
                  <span className="text-base font-bold font-mono text-cyan-400">
                    {(currentDetection.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Key AI Diagnostic Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Debris Severity Index</span>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className={`text-xl font-bold ${
                    currentDetection.overallScore > 75 ? 'text-red-400' :
                    currentDetection.overallScore > 40 ? 'text-orange-400' : 'text-emerald-400'
                  }`}>
                    {currentDetection.overallScore}
                  </span>
                  <span className="text-slate-500 text-xs">/ 100</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${
                      currentDetection.overallScore > 75 ? 'bg-red-500' :
                      currentDetection.overallScore > 40 ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${currentDetection.overallScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Estimated Accumulation</span>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-xl font-bold text-white">{currentDetection.estimatedTonnes}</span>
                  <span className="text-slate-400 text-xs">Metric Tonnes</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">Surface & Sub-surface estimate</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Cleanliness Rating</span>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-xl font-bold text-teal-400">{currentDetection.cleanlinessScore}%</span>
                  <span className="text-slate-500 text-xs">Purity</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  {currentDetection.cleanlinessScore > 50 ? 'Acceptable State' : 'Severe Contamination'}
                </span>
              </div>
            </div>

            {/* Detected Polymer Classification List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Classified Plastic Categories & Polymer Composition:
              </span>
              <div className="space-y-2">
                {currentDetection.detectedItems.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-300 mb-1">
                      <span className="font-semibold text-white">{item.label}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-400">{item.count} items</span>
                        <span className="text-cyan-400 font-bold">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action Callout */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-cyan-400 font-bold block mb-0.5">DECISION RECOMMENDATION</span>
                <p className="text-slate-200">{currentDetection.recommendedAction}</p>
              </div>

              {currentDetection.requiresUrgentIntervention && (
                <button
                  onClick={() => onDispatchTaskFromDetection && onDispatchTaskFromDetection(currentDetection)}
                  className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-500/20 transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Dispatch Clean-up Task
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
