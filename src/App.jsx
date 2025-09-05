// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StationDetail from './components/StationDetail';
import FarmerAdvisory from './components/FarmerAdvisory';
import PlanningTools from './components/PlanningTools';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStation, setSelectedStation] = useState(null);

  const renderActiveComponent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard onSelectStation={setSelectedStation} />;
      case 'station':
        return <StationDetail station={selectedStation} onBack={() => setActiveTab('dashboard')} />;
      case 'farmer':
        return <FarmerAdvisory />;
      case 'planning':
        return <PlanningTools />;
      default:
        return <Dashboard onSelectStation={setSelectedStation} />;
    }
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setActiveTab('station');
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 sticky top-0 z-10">
          <h1 className="text-lg font-bold">Groundwater Monitor</h1>
          <p className="text-blue-100 text-sm">Real-time DWLR Network</p>
        </div>

        {/* Main Content */}
        <div className="pb-20">
          {renderActiveComponent()}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;