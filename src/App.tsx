import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { MapView } from './components/MapView';
import { AIDetectionView } from './components/AIDetectionView';
import { RiskPredictionView } from './components/RiskPredictionView';
import { ActionCentreView } from './components/ActionCentreView';
import { ReportsView } from './components/ReportsView';
import { AboutModal } from './components/AboutModal';
import { ReportHotspotModal } from './components/ReportHotspotModal';

import { INITIAL_HOTSPOTS, INITIAL_TASKS } from './data/mockData';
import { Hotspot, CleanupTask, DetectionResult, RiskPrediction } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [hotspots, setHotspots] = useState<Hotspot[]>(INITIAL_HOTSPOTS);
  const [tasks, setTasks] = useState<CleanupTask[]>(INITIAL_TASKS);

  // Modals
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Cross-page navigation handlers
  const handleSelectHotspotForDispatch = (hotspot: Hotspot) => {
    // Check if task already exists or create new pending task
    const existingTask = tasks.find(t => t.hotspotId === hotspot.id);
    if (!existingTask) {
      const newTask: CleanupTask = {
        id: `task-${Date.now()}`,
        title: `Rapid Debris Recovery - ${hotspot.name}`,
        hotspotId: hotspot.id,
        locationName: hotspot.name,
        assignedCrew: hotspot.nearestWard || 'BMC Rapid Clean Team',
        priority: hotspot.severity === 'critical' ? 'P1 - Critical' : hotspot.severity === 'high' ? 'P2 - High' : 'P3 - Medium',
        status: 'pending',
        targetDate: 'Immediate Dispatch',
        estimatedTonnes: hotspot.estimatedWasteTonnes,
        divertedTonnes: 0,
        equipment: ['Hydraulic Barrier', 'Floating Boom', 'Trash Skimmer'],
        notes: hotspot.recommendedAction,
        updatedAt: 'Just now'
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setCurrentTab('action-centre');
  };

  const handleDispatchTaskFromDetection = (detection: DetectionResult) => {
    const newTask: CleanupTask = {
      id: `task-ai-${Date.now()}`,
      title: `AI Vision Interception Order - ${detection.fileName}`,
      hotspotId: 'hs-ai-detected',
      locationName: detection.fileName.replace('.jpg', '').replace(/_/g, ' '),
      assignedCrew: 'BMC Special Marine Waste Squadron',
      priority: detection.requiresUrgentIntervention ? 'P1 - Critical' : 'P2 - High',
      status: 'pending',
      targetDate: 'Within 4 Hours',
      estimatedTonnes: detection.estimatedTonnes,
      divertedTonnes: 0,
      equipment: ['High-Volume Skimmer', 'Sorting Mesh Booms'],
      notes: detection.recommendedAction,
      updatedAt: 'Just now (AI Flagged)'
    };
    setTasks(prev => [newTask, ...prev]);
    setCurrentTab('action-centre');
  };

  const handleDispatchActionPlanFromRisk = (risk: RiskPrediction) => {
    const newTask: CleanupTask = {
      id: `task-pred-${Date.now()}`,
      title: `Preemptive Monsoon Defense - ${risk.locationName}`,
      hotspotId: risk.locationId,
      locationName: risk.locationName,
      assignedCrew: 'Coastal Sluice Management Unit',
      priority: risk.riskLevel === 'Extreme' ? 'P1 - Critical' : 'P2 - High',
      status: 'in_progress',
      targetDate: `Before Inflow (${risk.timeToOceanInflowHours} hrs window)`,
      estimatedTonnes: 4.5,
      divertedTonnes: 0,
      equipment: ['Preemptive Debris Boom', 'Sluice Grate Cleanser'],
      notes: risk.preventiveProtocols.join('; '),
      updatedAt: 'Just now (Predictive Auto-Trigger)'
    };
    setTasks(prev => [newTask, ...prev]);
    setCurrentTab('action-centre');
  };

  const handleUpdateTaskStatus = (
    taskId: string, 
    newStatus: 'pending' | 'in_progress' | 'completed',
    collectedWeight?: number
  ) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: newStatus,
          divertedTonnes: collectedWeight !== undefined ? collectedWeight : t.divertedTonnes,
          updatedAt: 'Just now'
        };
      }
      return t;
    }));
  };

  const handleAddNewTask = (newTaskData: Omit<CleanupTask, 'id' | 'updatedAt'>) => {
    const newTask: CleanupTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      updatedAt: 'Just now'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleAddHotspot = (newHotspot: Hotspot) => {
    setHotspots(prev => [newHotspot, ...prev]);
    setCurrentTab('map');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
        {currentTab === 'home' && (
          <LandingPage
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
            onNavigateToMap={() => setCurrentTab('map')}
            onNavigateToAIDetection={() => setCurrentTab('ai-detection')}
            onNavigateToPrediction={() => setCurrentTab('prediction')}
            onNavigateToAbout={() => setIsAboutModalOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            hotspots={hotspots}
            tasks={tasks}
            onNavigateToMap={() => setCurrentTab('map')}
            onNavigateToActionCentre={() => setCurrentTab('action-centre')}
            onNavigateToAIDetection={() => setCurrentTab('ai-detection')}
          />
        )}

        {currentTab === 'map' && (
          <MapView
            hotspots={hotspots}
            onSelectHotspotForDispatch={handleSelectHotspotForDispatch}
            onNavigateToAIDetection={() => setCurrentTab('ai-detection')}
          />
        )}

        {currentTab === 'ai-detection' && (
          <AIDetectionView
            onDispatchTaskFromDetection={handleDispatchTaskFromDetection}
          />
        )}

        {currentTab === 'prediction' && (
          <RiskPredictionView
            onDispatchActionPlan={handleDispatchActionPlanFromRisk}
          />
        )}

        {currentTab === 'action-centre' && (
          <ActionCentreView
            tasks={tasks}
            hotspots={hotspots}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onAddNewTask={handleAddNewTask}
          />
        )}

        {currentTab === 'reports' && (
          <ReportsView
            hotspots={hotspots}
            tasks={tasks}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* About & InnovateX Architecture Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Report Debris Modal */}
      <ReportHotspotModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onAddHotspot={handleAddHotspot}
      />
    </div>
  );
}

export default App;
