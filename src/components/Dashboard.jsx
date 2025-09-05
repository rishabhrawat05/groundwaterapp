// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Droplets, TrendingDown, MapPin, RefreshCw, Bell, Filter } from 'lucide-react';
import { dwlrStations, emergencyAlerts, stateStats, getStatusColor } from '../mockData';

const Dashboard = ({ onSelectStation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [animationKey, setAnimationKey] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Filter stations based on selected filter
  const filteredStations = dwlrStations.filter(station => {
    if (selectedFilter === 'all') return true;
    return station.status === selectedFilter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const filterOptions = [
    { value: 'all', label: 'All Stations', color: 'bg-gray-500' },
    { value: 'safe', label: 'Safe', color: 'bg-green-500' },
    { value: 'warning', label: 'Warning', color: 'bg-yellow-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header with interactive controls */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full transition-all duration-200 ${
                showNotifications 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === option.value
                  ? 'bg-blue-500 text-white transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className={`w-2 h-2 ${option.color} rounded-full mr-2`}></div>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg animate-fadeIn">
          <div className="flex items-center">
            <Bell className="text-blue-500 w-5 h-5 mr-2" />
            <h3 className="text-blue-800 font-semibold">Active Notifications</h3>
          </div>
          <div className="mt-2 text-sm text-blue-700">
            <p>• Real-time monitoring active for {dwlrStations.length} stations</p>
            <p>• {emergencyAlerts.length} emergency alerts pending action</p>
            <p>• Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      )}

      {/* Emergency Alerts with enhanced interactivity */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 w-5 h-5 mr-2 animate-pulse" />
            <h3 className="text-red-800 font-semibold">Emergency Alerts</h3>
          </div>
          <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            {emergencyAlerts.length} Active
          </span>
        </div>
        <div className="space-y-2 mt-3">
          {emergencyAlerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-red-800">{alert.station}</div>
                  <div className="text-sm text-red-700 mt-1">{alert.message}</div>
                  <div className="text-xs text-red-500 mt-1 flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-ping"></div>
                    {alert.daysUntilCritical} days until critical
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Cards with enhanced animations */}
      <div className="grid grid-cols-2 gap-4" key={animationKey}>
        <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Stations</p>
              <p className="text-2xl font-bold text-blue-600">{stateStats.total.toLocaleString()}</p>
            </div>
            <div className="relative">
              <Droplets className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Active monitoring network
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical Zones</p>
              <p className="text-2xl font-bold text-red-600">{stateStats.critical.toLocaleString()}</p>
              <p className="text-xs text-red-500">{stateStats.criticalPercentage}%</p>
            </div>
            <div className="relative">
              <TrendingDown className="w-8 h-8 text-red-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="mt-2 text-xs text-red-500">
            Requires immediate attention
          </div>
        </div>
      </div>

      {/* Interactive Status Distribution */}
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-3">National Water Status</h3>
        <div className="space-y-3">
          {[
            { status: 'critical', count: stateStats.critical, color: 'bg-red-500', textColor: 'text-red-700' },
            { status: 'warning', count: stateStats.warning, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
            { status: 'safe', count: stateStats.safe, color: 'bg-green-500', textColor: 'text-green-700' }
          ].map((item, index) => (
            <div 
              key={item.status}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedFilter(item.status)}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 ${item.color} rounded-full mr-3 animate-pulse`}></div>
                <span className={`text-sm font-medium ${item.textColor} capitalize`}>{item.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.count} stations</span>
                <div className={`text-xs px-2 py-1 rounded-full ${item.color} text-white`}>
                  {Math.round((item.count / stateStats.total) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden relative">
          <div className="h-full flex transition-all duration-1000">
            <div 
              className="bg-red-500 transition-all duration-1000" 
              style={{ width: `${stateStats.criticalPercentage}%` }}
            ></div>
            <div 
              className="bg-yellow-500 transition-all duration-1000" 
              style={{ width: `${stateStats.warningPercentage}%` }}
            ></div>
            <div 
              className="bg-green-500 transition-all duration-1000" 
              style={{ width: `${stateStats.safePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Stations */}
      <div className="bg-white rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Recent Updates</h3>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Showing {filteredStations.slice(0, 4).length} of {filteredStations.length}
            </span>
          </div>
        </div>
        <div className="divide-y">
          {filteredStations.slice(0, 4).map((station, index) => (
            <div 
              key={station.id} 
              className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
              onClick={() => onSelectStation(station)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div 
                      className="w-4 h-4 rounded-full mr-3 animate-pulse"
                      style={{ backgroundColor: getStatusColor(station.status) }}
                    ></div>
                    <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: getStatusColor(station.status) }}
                    ></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm hover:text-blue-600 transition-colors">
                      {station.name}
                    </p>
                    <p className="text-gray-500 text-xs flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {station.district}, {station.state}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{station.currentLevel}m</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Health:</span>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      station.healthScore >= 800 ? 'bg-green-100 text-green-800' :
                      station.healthScore >= 600 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {station.healthScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show more button */}
        {filteredStations.length > 4 && (
          <div className="p-4 border-t bg-gray-50">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View {filteredStations.length - 4} more stations →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;