import React, { useState } from 'react';
import { CleanupTask, Hotspot } from '../types';
import { 
  ClipboardList, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CheckCheck, 
  Truck, 
  Filter, 
  Search, 
  Calendar, 
  Trash2, 
  Users, 
  ChevronRight,
  ShieldAlert,
  X
} from 'lucide-react';

interface ActionCentreViewProps {
  tasks: CleanupTask[];
  hotspots: Hotspot[];
  onUpdateTaskStatus: (taskId: string, newStatus: 'pending' | 'in_progress' | 'completed', collectedWeight?: number) => void;
  onAddNewTask: (newTask: Omit<CleanupTask, 'id' | 'updatedAt'>) => void;
}

export const ActionCentreView: React.FC<ActionCentreViewProps> = ({
  tasks,
  hotspots,
  onUpdateTaskStatus,
  onAddNewTask
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for new task creation
  const [formLocation, setFormLocation] = useState(hotspots[0]?.name || 'Mithi River - BKC Sluice Confluence');
  const [formTitle, setFormTitle] = useState('');
  const [formCrew, setFormCrew] = useState('BMC Rapid Clean Squad');
  const [formPriority, setFormPriority] = useState<'P1 - Critical' | 'P2 - High' | 'P3 - Medium'>('P1 - Critical');
  const [formTargetDate, setFormTargetDate] = useState('Today, 18:00 IST');
  const [formEstimatedTonnes, setFormEstimatedTonnes] = useState<number>(3.5);
  const [formEquipment, setFormEquipment] = useState('Floating Trash Boom, Catamaran Skimmer, Dump Truck');
  const [formNotes, setFormNotes] = useState('Pre-monsoon blockage removal to prevent tidal backflow.');

  // Selected task to complete and enter collected weight
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [collectedWeightInput, setCollectedWeightInput] = useState<number>(3.5);

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch = t.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.assignedCrew.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate quick operational stats
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalDivertedTonnes = tasks
    .filter(t => t.status === 'completed' && t.divertedTonnes)
    .reduce((acc, curr) => acc + (curr.divertedTonnes || 0), 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedHotspot = hotspots.find(h => h.name === formLocation);
    onAddNewTask({
      title: formTitle || `Emergency Plastic Extraction - ${formLocation}`,
      hotspotId: matchedHotspot?.id || 'hs-gen',
      locationName: formLocation,
      assignedCrew: formCrew,
      priority: formPriority,
      status: 'pending',
      targetDate: formTargetDate,
      estimatedTonnes: Number(formEstimatedTonnes),
      divertedTonnes: 0,
      equipment: formEquipment.split(',').map(s => s.trim()),
      notes: formNotes
    });

    setIsModalOpen(false);
    setFormTitle('');
  };

  const handleConfirmCompletion = () => {
    if (completingTaskId) {
      onUpdateTaskStatus(completingTaskId, 'completed', Number(collectedWeightInput));
      setCompletingTaskId(null);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-4 lg:p-6 space-y-5">
      {/* Page Header */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Municipal Waste Action & Task Dispatch Centre
                </h1>
                <p className="text-xs lg:text-sm text-slate-400">
                  Orchestrating municipal cleanup crews, NGO volunteer networks, and specialized heavy machinery across Mumbai waterways.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
          >
            <Plus className="w-4 h-4" /> Dispatch New Clean-up Operation
          </button>
        </div>
      </div>

      {/* Operational Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="glass-card p-4 rounded-2xl border border-amber-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Missions</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-bold text-white">{pendingCount}</span>
            <span className="text-xs text-amber-400">Queued for crew</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Operations In Progress</span>
            <Truck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-bold text-cyan-300">{inProgressCount}</span>
            <span className="text-xs text-cyan-400">Active on-site</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-emerald-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Operations Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-bold text-emerald-400">{completedCount}</span>
            <span className="text-xs text-emerald-500">Waterway cleared</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-teal-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Plastic Diverted by Missions</span>
            <Trash2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-bold text-white">{totalDivertedTonnes.toFixed(1)}</span>
            <span className="text-xs text-teal-400">Tonnes Intercepted</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Status:
          </span>
          {(['all', 'pending', 'in_progress', 'completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterStatus === st 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm' 
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search tasks, locations, crews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs lg:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Task List / Management Cards */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl text-slate-500 text-sm">
            No clean-up tasks match your search or status filter.
          </div>
        ) : (
          filteredTasks.map((task) => {
            return (
              <div 
                key={task.id}
                className="glass-card p-4 lg:p-5 rounded-2xl border transition-all space-y-3"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        task.priority.includes('Critical') ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                        task.priority.includes('High') ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}>
                        {task.priority}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-wide">{task.title}</h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                        task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        task.status === 'in_progress' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        Status: {task.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-cyan-400">{task.locationName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {task.assignedCrew}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {task.targetDate}
                      </span>
                    </p>
                  </div>

                  {/* Interactive Status Transition Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => onUpdateTaskStatus(task.id, 'in_progress')}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Start Operation
                      </button>
                    )}

                    {task.status === 'in_progress' && (
                      <button
                        onClick={() => {
                          setCompletingTaskId(task.id);
                          setCollectedWeightInput(task.estimatedTonnes);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Complete & Log Weight
                      </button>
                    )}

                    {task.status === 'completed' && (
                      <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Diverted: {task.divertedTonnes} MT
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="md:col-span-8 flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-500 text-[11px] font-semibold">Equipment Deployed:</span>
                    {task.equipment.map((eq, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                        {eq}
                      </span>
                    ))}
                  </div>

                  <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3 text-slate-400 font-mono text-[11px]">
                    <span>Est: {task.estimatedTonnes} MT</span>
                    <span>Updated {task.updatedAt}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Dispatch New Operation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card w-full max-w-lg p-6 rounded-2xl border border-cyan-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-cyan-400" />
                Dispatch New Coastal Clean-up Operation
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Hotspot / Location</label>
                <select
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  {hotspots.map(h => (
                    <option key={h.id} value={h.name}>{h.name} ({h.severity.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Operation Title</label>
                <input
                  type="text"
                  placeholder="e.g. High-Tide Emergency Sluice Barrier Clearance"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Clean Squad</label>
                  <input
                    type="text"
                    value={formCrew}
                    onChange={(e) => setFormCrew(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority Level</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="P1 - Critical">P1 - Critical</option>
                    <option value="P2 - High">P2 - High</option>
                    <option value="P3 - Medium">P3 - Medium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Debris (Tonnes)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formEstimatedTonnes}
                    onChange={(e) => setFormEstimatedTonnes(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Window</label>
                  <input
                    type="text"
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Equipment Required</label>
                <input
                  type="text"
                  value={formEquipment}
                  onChange={(e) => setFormEquipment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Special Directives & Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Complete & Log Collected Weight */}
      {completingTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card w-full max-w-sm p-6 rounded-2xl border border-emerald-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Log Diverted Waste Weight
              </h3>
              <button onClick={() => setCompletingTaskId(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Record the actual tonnage extracted from the waterway and diverted into the municipal recycling chain.
            </p>

            <div className="space-y-2">
              <label className="block text-xs text-slate-400 font-semibold">Collected Plastic (Metric Tonnes):</label>
              <input
                type="number"
                step="0.1"
                value={collectedWeightInput}
                onChange={(e) => setCollectedWeightInput(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-lg font-bold font-mono text-cyan-300 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCompletingTaskId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCompletion}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg"
              >
                Verify & Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
