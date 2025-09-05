import React, { useState, useEffect } from 'react';
import { Wheat, Droplets, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, XCircle, Calendar, MapPin, RefreshCw, Zap } from 'lucide-react';
import { cropRecommendations } from '../mockData';

const FarmerAdvisory = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 15,
    forecast: 'Moderate rainfall expected'
  });

  const currentData = cropRecommendations[selectedLocation];

  const getRiskColor = (risk) => {
    switch(risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProfitColor = (profit) => {
    switch(profit.toLowerCase()) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRecommendationIcon = (risk) => {
    switch(risk.toLowerCase()) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return XCircle;
      default: return AlertTriangle;
    }
  };

  const handleLocationChange = (index) => {
    setAnimationKey(prev => prev + 1);
    setSelectedLocation(index);
  };

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setShowDetailModal(true);
  };

  const CropDetailModal = () => {
    if (!showDetailModal || !selectedCrop) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setShowDetailModal(false)}>
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4 transform animate-modalEnter" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-bold mb-4">{selectedCrop.crop} - Detailed Analysis</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Water Requirement</span>
              <span className="text-blue-600 font-bold">{selectedCrop.waterRequirement}mm</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Profit Potential</span>
              <span className={`font-bold ${getProfitColor(selectedCrop.profitPotential)}`}>
                {selectedCrop.profitPotential}
              </span>
            </div>

            <div className={`p-3 rounded-lg border ${getRiskColor(selectedCrop.riskLevel)}`}>
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="font-medium">Risk Assessment</span>
              </div>
              <p className="text-sm">{selectedCrop.reason}</p>
            </div>

            <button 
              onClick={() => setShowDetailModal(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Wheat className="w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Farmer Advisory</h2>
          </div>
          <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-green-100 text-sm">Smart crop recommendations based on groundwater data</p>
        <div className="mt-3 flex items-center text-sm text-green-100">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Weather Information Card */}
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Current Weather
          </h3>
          <div className="text-xs text-gray-500">Live</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</div>
            <div className="text-xs text-gray-600">Temperature</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{weatherData.humidity}%</div>
            <div className="text-xs text-gray-600">Humidity</div>
          </div>
        </div>
        <div className="mt-3 p-2 bg-yellow-50 rounded-lg text-center">
          <div className="text-sm text-yellow-800 font-medium">{weatherData.forecast}</div>
        </div>
      </div>

      {/* Interactive Location Selection */}
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          Select Location
        </h3>
        <div className="space-y-2">
          {cropRecommendations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationChange(index)}
              className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                selectedLocation === index
                  ? 'bg-blue-500 text-white transform scale-[1.02]'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{location.location}</span>
                {selectedLocation === index && (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
              <div className="text-sm opacity-75 mt-1">
                Water Level: {location.currentWaterLevel}m
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Current Water Status */}
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300" key={animationKey}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center">
            <Droplets className="w-5 h-5 mr-2 text-blue-500 animate-pulse" />
            Current Water Level
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-xs text-green-600">Active</span>
          </div>
        </div>
        <div className="relative">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <span className="text-4xl font-bold text-blue-600 counter">
              {currentData.currentWaterLevel}m
            </span>
            <div className="mt-2 text-sm text-blue-700">
              Below ground level
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs animate-bounce">
            Live
          </div>
        </div>
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            💡 Based on current groundwater levels, here are our smart recommendations for optimal crop selection.
          </p>
        </div>
      </div>

      {/* Enhanced Crop Recommendations */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Crop Recommendations
        </h3>
        
        {currentData.recommendations.map((recommendation, index) => {
          const IconComponent = getRecommendationIcon(recommendation.riskLevel);
          
          return (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] interactive-card"
              onClick={() => handleCropClick(recommendation)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <IconComponent className={`w-5 h-5 mr-3 ${
                    recommendation.riskLevel.toLowerCase() === 'low' ? 'text-green-600 animate-bounce' :
                    recommendation.riskLevel.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-lg interactive-text">{recommendation.crop}</h4>
                    <div className="text-xs text-gray-500 mt-1">Click for detailed analysis</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(recommendation.riskLevel)}`}>
                  {recommendation.riskLevel} Risk
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-3 rounded-lg text-center hover:from-blue-50 hover:to-blue-100 transition-all duration-200">
                  <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-xs text-gray-600 mb-1">Water Need</p>
                  <p className="font-semibold text-blue-600">{recommendation.waterRequirement}mm</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-green-50 p-3 rounded-lg text-center hover:from-green-50 hover:to-green-100 transition-all duration-200">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-500" />
                  <p className="text-xs text-gray-600 mb-1">Profit Potential</p>
                  <p className={`font-semibold ${getProfitColor(recommendation.profitPotential)}`}>
                    {recommendation.profitPotential}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-transparent p-3 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-700">
                  <strong>💡 Recommendation:</strong> {recommendation.reason}
                </p>
              </div>

              {/* Progress indicator for water requirement vs. current level */}
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Water Efficiency</span>
                  <span className="text-xs text-gray-600">
                    {Math.round((currentData.currentWaterLevel / recommendation.waterRequirement) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full progress-bar ${
                      recommendation.riskLevel.toLowerCase() === 'low' ? 'bg-green-500' :
                      recommendation.riskLevel.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${Math.min(Math.round((currentData.currentWaterLevel / recommendation.waterRequirement) * 100), 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quick Tips */}
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-3 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
          Smart Farming Tips
        </h3>
        <div className="space-y-3">
          {[
            { icon: '🔍', text: 'Monitor groundwater levels regularly before planting', color: 'bg-green-50 border-green-200' },
            { icon: '💧', text: 'Consider drip irrigation for water-efficient farming', color: 'bg-blue-50 border-blue-200' },
            { icon: '🔄', text: 'Plan crop rotation to maintain soil health', color: 'bg-yellow-50 border-yellow-200' },
            { icon: '⚠️', text: 'Avoid high-risk crops during water scarcity', color: 'bg-red-50 border-red-200' }
          ].map((tip, index) => (
            <div 
              key={index}
              className={`flex items-start p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${tip.color}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-lg mr-3">{tip.icon}</span>
              <p className="text-sm text-gray-700 flex-1">{tip.text}</p>
              <button className="text-blue-500 hover:text-blue-700 text-xs font-medium">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <CropDetailModal />
    </div>
  );
};

export default FarmerAdvisory;