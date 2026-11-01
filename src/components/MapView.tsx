import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Hotspot, SeverityLevel, WaterwayType } from '../types';
import { 
  MapPin, 
  AlertTriangle, 
  Filter, 
  Search, 
  Eye, 
  Layers, 
  Radio, 
  ArrowRight, 
  Compass, 
  Clock, 
  Sparkles,
  Waves,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

interface MapViewProps {
  hotspots: Hotspot[];
  onSelectHotspotForDispatch?: (hotspot: Hotspot) => void;
  onNavigateToAIDetection?: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ 
  hotspots, 
  onSelectHotspotForDispatch,
  onNavigateToAIDetection
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(hotspots[0] || null);
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | 'all'>('all');
  const [selectedType, setSelectedType] = useState<WaterwayType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rescanNotification, setRescanNotification] = useState<string | null>(null);

  // Filtered hotspots
  const filteredHotspots = hotspots.filter((hs) => {
    const matchesSeverity = selectedSeverity === 'all' || hs.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || hs.type === selectedType;
    const matchesSearch = hs.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hs.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesType && matchesSearch;
  });

  // Helper for marker colors
  const getMarkerColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical': return '#ef4444'; // Red
      case 'high': return '#f97316';     // Orange
      case 'moderate': return '#eab308'; // Yellow
      case 'low': return '#10b981';      // Green
      default: return '#06b6d4';
    }
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Mumbai coordinates [19.0760, 72.8777]
      const map = L.map(mapContainerRef.current, {
        center: [19.0760, 72.8550],
        zoom: 11,
        zoomControl: false
      });

      // Dark Matter CartoDB tiles for high-tech environmental monitoring look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Zoom control on top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Create markers for filtered hotspots
    filteredHotspots.forEach((hs) => {
      const color = getMarkerColor(hs.severity);
      const isCritical = hs.severity === 'critical';
      const isHigh = hs.severity === 'high';

      // Custom pulsing HTML marker
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${(isCritical || isHigh) ? `
              <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: ${color};
                opacity: 0.6;
                animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></div>
            ` : ''}
            <div style="
              width: 22px;
              height: 22px;
              background-color: ${color};
              border: 3px solid #0f172a;
              box-shadow: 0 0 14px ${color};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 10px;
            ">
              ${hs.severity === 'critical' ? '!' : ''}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(hs.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedHotspot(hs);
        map.flyTo(hs.coordinates, 13, { duration: 1.2 });
      });

      markersRef.current[hs.id] = marker;
    });

    // Cleanup when unmounting
    return () => {
      // Don't necessarily destroy map every render, let it persist
    };
  }, [filteredHotspots]);

  // Handle focus on hotspot from list
  const handleSelectHotspot = (hs: Hotspot) => {
    setSelectedHotspot(hs);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(hs.coordinates, 13, { duration: 1.2 });
    }
  };

  const handleSimulateRescan = (hotspotName: string) => {
    setRescanNotification(`Autonomous Drone Rescan initiated for "${hotspotName}". Telemetry verified. Optical confidence: 96.4%.`);
    setTimeout(() => {
      setRescanNotification(null);
    }, 4500);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col p-4 lg:p-6 space-y-4">
      {/* Top Header & Telemetry Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Mumbai Coastal Pollution Sentinel Map
            </h1>
          </div>
          <p className="text-xs lg:text-sm text-slate-400 mt-1">
            Real-time geospatial monitoring of plastic waste choke points across Mumbai rivers, creeks, and coastal outfalls.
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-xs">
            <span className="text-red-400 font-semibold">Critical: </span>
            <span className="text-white font-mono font-bold">
              {hotspots.filter(h => h.severity === 'critical').length}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-orange-950/60 border border-orange-500/30 text-xs">
            <span className="text-orange-400 font-semibold">High: </span>
            <span className="text-white font-mono font-bold">
              {hotspots.filter(h => h.severity === 'high').length}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/30 text-xs">
            <span className="text-amber-400 font-semibold">Moderate: </span>
            <span className="text-white font-mono font-bold">
              {hotspots.filter(h => h.severity === 'moderate').length}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-xs">
            <span className="text-emerald-400 font-semibold">Low: </span>
            <span className="text-white font-mono font-bold">
              {hotspots.filter(h => h.severity === 'low').length}
            </span>
          </div>
        </div>
      </div>

      {/* Rescan Notification Banner */}
      {rescanNotification && (
        <div className="animate-fadeIn bg-cyan-950/90 border border-cyan-400 text-cyan-200 px-4 py-3 rounded-xl flex items-center justify-between text-sm shadow-lg shadow-cyan-950/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            <span>{rescanNotification}</span>
          </div>
          <button 
            onClick={() => setRescanNotification(null)}
            className="text-cyan-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Map & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Side: Filter and List Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Search & Filters Card */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search hotspot (e.g. Mithi, Mahim, Versova)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs lg:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Severity Filter Pills */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span className="flex items-center gap-1"><Filter className="w-3 h-3 text-cyan-400" /> Severity Filter:</span>
                <span className="text-[11px] text-slate-500">{filteredHotspots.length} matching</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-xs">
                {(['all', 'critical', 'high', 'moderate', 'low'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`py-1.5 px-2 rounded-lg capitalize font-medium text-center transition-all ${
                      selectedSeverity === sev 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-sm' 
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Waterway Type Filter */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span className="flex items-center gap-1"><Waves className="w-3 h-3 text-cyan-400" /> Waterway Type:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(['all', 'river', 'creek', 'beach', 'drain', 'harbor'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`py-1 px-2.5 rounded-lg capitalize transition-all ${
                      selectedType === t 
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-400/50' 
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hotspot List / Cards */}
          <div className="glass-panel p-3 rounded-2xl flex-1 flex flex-col space-y-2 max-h-[520px] overflow-y-auto">
            <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400 font-semibold">
              <span>DETECTED HOTSPOTS ({filteredHotspots.length})</span>
              <span>TAP TO FOCUS</span>
            </div>

            {filteredHotspots.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No hotspots match your current filters.
              </div>
            ) : (
              filteredHotspots.map((hs) => {
                const isSelected = selectedHotspot?.id === hs.id;
                return (
                  <div
                    key={hs.id}
                    onClick={() => handleSelectHotspot(hs)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected 
                        ? 'bg-slate-800/90 border-cyan-400 shadow-md shadow-cyan-950/30' 
                        : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <span 
                            className="inline-block w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: getMarkerColor(hs.severity) }} 
                          />
                          {hs.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">{hs.zone}</p>
                      </div>
                      <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded uppercase ${
                        hs.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                        hs.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                        hs.severity === 'moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {hs.severity}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800/80 pt-2">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="text-cyan-400 font-semibold">{hs.estimatedWasteTonnes} MT</span>
                        <span className="text-slate-500">waste</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{hs.lastReported}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Map Container & Selected Detail Panel */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Leaflet Map Box */}
          <div className="relative w-full h-[460px] lg:h-[500px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-[500] bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 shadow-lg text-xs space-y-1.5">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400" /> Severity Indicator
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                <span className="text-slate-300">Critical (&gt; 4.0 Tonnes / Acute)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-slate-300">High (2.5 - 4.0 Tonnes)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-300">Moderate (1.0 - 2.5 Tonnes)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Low (&lt; 1.0 Tonne / Monitored)</span>
              </div>
            </div>

            {/* Quick Reset Center Button */}
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([19.0760, 72.8550], 11, { duration: 1 });
                }
              }}
              className="absolute top-4 left-4 z-[500] bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700 px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-all"
            >
              <Compass className="w-4 h-4 text-cyan-400" /> Reset Mumbai View
            </button>
          </div>

          {/* Selected Hotspot Intelligence Drawer / Card */}
          {selectedHotspot && (
            <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getMarkerColor(selectedHotspot.severity) }} 
                    />
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {selectedHotspot.name}
                    </h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      selectedHotspot.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      selectedHotspot.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                      selectedHotspot.severity === 'moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {selectedHotspot.severity} Priority
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700 capitalize">
                      {selectedHotspot.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Coordinates: {selectedHotspot.coordinates[0].toFixed(4)}° N, {selectedHotspot.coordinates[1].toFixed(4)}° E | {selectedHotspot.zone}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSimulateRescan(selectedHotspot.name)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center gap-1.5 transition-all"
                  >
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    Drone Re-Scan
                  </button>
                  <button
                    onClick={() => onSelectHotspotForDispatch && onSelectHotspotForDispatch(selectedHotspot)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-500/20 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Dispatch Clean-up Task
                  </button>
                </div>
              </div>

              {/* Hotspot Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Estimated Waste</span>
                  <div className="text-base font-bold text-white font-mono flex items-baseline gap-1">
                    <span className="text-cyan-400 text-lg">{selectedHotspot.estimatedWasteTonnes}</span>
                    <span>Metric Tonnes</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Culvert Blockage Index</span>
                  <div className="flex items-center justify-between font-mono font-bold text-sm text-slate-200">
                    <span>{selectedHotspot.blockageIndex}%</span>
                    <span className={selectedHotspot.blockageIndex > 70 ? 'text-red-400' : 'text-amber-400'}>
                      {selectedHotspot.blockageIndex > 70 ? 'High Obstruction' : 'Moderate Flow'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${selectedHotspot.blockageIndex > 70 ? 'bg-red-500' : 'bg-cyan-500'}`}
                      style={{ width: `${selectedHotspot.blockageIndex}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Tidal Current / Velocity</span>
                  <div className="text-sm font-bold text-teal-300 font-mono">
                    {selectedHotspot.tidalVelocity}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">Arabian Sea Outflow Vector</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Barrier Protection</span>
                  <div className="flex items-center gap-1.5 font-bold text-xs mt-1">
                    {selectedHotspot.activeBarrierInstalled ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Floating Boom Active
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> No Barrier (Direct Ocean Inflow)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Photo & Polymer Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Hotspot Photo */}
                <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 h-44 bg-slate-900">
                  <img 
                    src={selectedHotspot.image} 
                    alt={selectedHotspot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur border border-slate-700">
                      Telemetry: {selectedHotspot.telemetrySource}
                    </span>
                    <button 
                      onClick={() => onNavigateToAIDetection && onNavigateToAIDetection()}
                      className="bg-cyan-500/80 hover:bg-cyan-500 text-slate-950 px-2 py-0.5 rounded font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Test in AI Vision
                    </button>
                  </div>
                </div>

                {/* Polymer Composition Breakdown */}
                <div className="md:col-span-7 p-3 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-300 block">
                    AI Detected Polymer Fingerprint
                  </span>
                  
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-0.5">
                        <span>PET Single-Use Bottles (Type 1)</span>
                        <span className="text-cyan-300 font-mono font-bold">{selectedHotspot.polymerBreakdown.petBottles}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${selectedHotspot.polymerBreakdown.petBottles}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-0.5">
                        <span>Multi-layer Packaging / Sachets</span>
                        <span className="text-blue-300 font-mono font-bold">{selectedHotspot.polymerBreakdown.multilayerSachets}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedHotspot.polymerBreakdown.multilayerSachets}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-0.5">
                        <span>HDPE Rigid Containers & Fishing Gear</span>
                        <span className="text-amber-300 font-mono font-bold">
                          {selectedHotspot.polymerBreakdown.hdpeContainers + selectedHotspot.polymerBreakdown.fishingGear}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${selectedHotspot.polymerBreakdown.hdpeContainers + selectedHotspot.polymerBreakdown.fishingGear}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400 font-medium">Recommended Mitigation Protocol: </span>
                    <span className="text-slate-200 font-semibold">{selectedHotspot.recommendedAction}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
