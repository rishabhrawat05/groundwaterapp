// src/components/StationDetail.js
import React from 'react';
import { ArrowLeft, AlertTriangle, TrendingDown, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { historicalData, getHealthScoreColor } from '../mockData';

const StationDetail = ({ station, onBack }) => {
  if (!station) return <div className="p-4">No station selected</div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-16 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold">{station.name}</h2>
            <p className="text-gray-500 text-sm">{station.district}, {station.state}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Health Score */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Groundwater Health Score</h3>
            <div 
              className="px-3 py-1 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: getHealthScoreColor(station.healthScore) }}
            >
              {station.healthScore}/1000
            </div>
          </div>
          
          <div className="relative bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${(station.healthScore / 1000) * 100}%`,
                backgroundColor: getHealthScoreColor(station.healthScore)
              }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">
            {station.healthScore >= 800 ? 'Excellent - Sustainable extraction' :
             station.healthScore >= 600 ? 'Good - Monitor regularly' :
             'Critical - Immediate intervention needed'}
          </p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Current Level</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{station.currentLevel}m</p>
            <p className="text-xs text-gray-500">
              {station.currentLevel > station.previousLevel ? '↑' : '↓'} 
              {Math.abs(station.currentLevel - station.previousLevel).toFixed(1)}m from last reading
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Emergency Alert</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{station.emergencyPrediction}</p>
            <p className="text-xs text-gray-500">days until critical level</p>
          </div>
        </div>

        {/* Emergency Prediction */}
        {station.emergencyPrediction < 30 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Critical Water Level Predicted</h4>
                <p className="text-sm text-red-700 mt-1">
                  Based on current depletion rate, this station will reach critical levels in {station.emergencyPrediction} days.
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-red-800">Recommended Actions:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Implement immediate pumping restrictions</li>
                    <li>• Activate emergency water supply protocols</li>
                    <li>• Notify district administration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Water Level Trend */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-4">Water Level Trend (12 Months)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Jan 2024</span>
            <span>Current: {station.currentLevel}m</span>
            <span>Jan 2025</span>
          </div>
        </div>

        {/* Station Information */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">Station Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Station ID:</span>
              <span className="font-medium">{station.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{station.lat}°N, {station.lng}°E</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium">
                {new Date(station.lastUpdated).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium capitalize ${
                station.status === 'critical' ? 'text-red-600' :
                station.status === 'warning' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {station.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;