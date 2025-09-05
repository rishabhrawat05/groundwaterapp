import React, { useState } from 'react';
import { MapPin, Target, TrendingUp, Droplets, AlertCircle, CheckCircle, Building2, Globe, Search, Star, Eye, Calculator } from 'lucide-react';
import { borewellPredictions, waterTradingData } from '../mockData';

const PlanningTools = () => {
  const [activeTab, setActiveTab] = useState('borewell');
  const [selectedSite, setSelectedSite] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const getSuccessColor = (probability) => {
    if (probability >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getTradingPotentialColor = (potential) => {
    switch(potential.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPolicyStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'under review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const CostCalculator = () => {
    const [depth, setDepth] = useState(45);
    const [diameter, setDiameter] = useState(6);
    const [location, setLocation] = useState('urban');
    
    const calculateCost = () => {
      const baseCost = 1000;
      const depthCost = depth * 50;
      const diameterCost = diameter * 100;
      const locationMultiplier = location === 'urban' ? 1.5 : 1;
      return Math.round((baseCost + depthCost + diameterCost) * locationMultiplier);
    };

    if (!showCalculator) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setShowCalculator(false)}>
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4 transform animate-modalEnter" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Borewell Cost Calculator
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Depth (meters)</label>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={depth} 
                onChange={(e) => setDepth(e.target.value)}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{depth}m</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Diameter (inches)</label>
              <input 
                type="range" 
                min="4" 
                max="12" 
                value={diameter} 
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{diameter}"</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location Type</label>
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">₹{calculateCost().toLocaleString()}</div>
              <div className="text-sm text-gray-600">Estimated Cost</div>
            </div>

            <button 
              onClick={() => setShowCalculator(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close Calculator
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBorewellPredictions = () => (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Site Selection Analysis
          </h3>
          <button 
            onClick={() => setShowCalculator(true)}
            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
          >
            <Calculator className="w-4 h-4 mr-1" />
            Calculator
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          🤖 AI-powered borewell site recommendations based on groundwater data, geological surveys, and historical success rates.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>High Success (80%+)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Medium (60-79%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Low (&lt;60%)</span>
          </div>
        </div>
      </div>

      {borewellPredictions.map((prediction, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] interactive-card"
          onClick={() => setSelectedSite(selectedSite === index ? null : index)}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              <div>
                <h4 className="font-semibold flex items-center">
                  Site #{index + 1}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(`borewell-${index}`);
                    }}
                    className={`ml-2 p-1 rounded-full transition-colors ${
                      favorites.has(`borewell-${index}`) 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${favorites.has(`borewell-${index}`) ? 'fill-current' : ''}`} />
                  </button>
                </h4>
                <p className="text-xs text-gray-500 flex items-center">
                  📍 {prediction.lat.toFixed(4)}°N, {prediction.lng.toFixed(4)}°E
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center ${getSuccessColor(prediction.successProbability)}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {prediction.successProbability}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <Target className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-xs text-gray-600 mb-1">Recommended Depth</p>
              <p className="font-semibold text-blue-600">{prediction.recommendedDepth}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg text-center hover:from-green-100 hover:to-green-200 transition-all duration-200">
              <Building2 className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <p className="text-xs text-gray-600 mb-1">Estimated Cost</p>
              <p className="font-semibold text-green-600">{prediction.estimatedCost}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg mb-3">
            <div className="flex items-center mb-2">
              <Droplets className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Water Quality: </span>
              <span className={`ml-1 text-sm font-bold ${
                prediction.waterQuality === 'Excellent' ? 'text-green-600' :
                prediction.waterQuality === 'Good' ? 'text-blue-600' : 'text-yellow-600'
              }`}>
                {prediction.waterQuality}
              </span>
            </div>
          </div>

          {prediction.riskFactors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-3">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 mb-1">⚠️ Risk Factors:</p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    {prediction.riskFactors.map((risk, riskIndex) => (
                      <li key={riskIndex} className="flex items-center">
                        <span className="w-1 h-1 bg-yellow-600 rounded-full mr-2"></span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedSite === index && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Select Site
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderWaterTrading = () => (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-500 animate-spin" style={{animationDuration: '3s'}} />
            Water Trading Opportunities
          </h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          🌍 Inter-regional water transfer opportunities to optimize resource allocation and support drought-affected areas.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>High Potential</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Medium Potential</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Low Potential</span>
          </div>
        </div>
      </div>

      {waterTradingData
        .filter(trading => 
          searchTerm === '' || 
          trading.sourceRegion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trading.targetRegion.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((trading, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] interactive-card"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold flex items-center">
                  🔄 Trading Route #{index + 1}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(`trading-${index}`);
                    }}
                    className={`ml-2 p-1 rounded-full transition-colors ${
                      favorites.has(`trading-${index}`) 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${favorites.has(`trading-${index}`) ? 'fill-current' : ''}`} />
                  </button>
                </h4>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getTradingPotentialColor(trading.tradingPotential)}`}>
                  {trading.tradingPotential} Potential
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <strong>From:</strong>
                    </div>
                    <span className="text-blue-700 font-medium">{trading.sourceRegion}</span>
                  </div>
                  <div className="flex items-center justify-center my-2">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <div className="px-2 text-gray-500">→</div>
                    <div className="h-px bg-gray-300 flex-1"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <strong>To:</strong>
                    </div>
                    <span className="text-green-700 font-medium">{trading.targetRegion}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <Droplets className="w-5 h-5 text-blue-500 mb-1" />
                  <span className="text-xs text-gray-600 block">Available Surplus</span>
                </div>
                <span className="font-semibold text-blue-600 text-sm">{trading.availableSurplus}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <Building2 className="w-5 h-5 text-green-500 mb-1" />
                  <span className="text-xs text-gray-600 block">Transport Cost</span>
                </div>
                <span className="font-semibold text-green-600 text-sm">{trading.transportCost}</span>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg border ${getPolicyStatusColor(trading.policyStatus)}`}>
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Policy Status</span>
            </div>
            <div className="flex items-center">
              {trading.policyStatus === 'Approved' && <CheckCircle className="w-4 h-4 mr-1" />}
              {trading.policyStatus === 'Under Review' && <AlertCircle className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{trading.policyStatus}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                <Eye className="w-4 h-4 mr-2" />
                View Route
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Request Quote
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {searchTerm && waterTradingData.filter(trading => 
        trading.sourceRegion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trading.targetRegion.toLowerCase().includes(searchTerm.toLowerCase())
      ).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No trading opportunities found for "{searchTerm}"</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Planning Tools</h2>
          </div>
          <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
            AI Powered
          </div>
        </div>
        <p className="text-blue-100 text-sm">Strategic water resource management and site planning</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-sm text-blue-100">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Real-time analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            {favorites.size > 0 && (
              <div className="flex items-center text-sm text-yellow-200">
                <Star className="w-4 h-4 mr-1 fill-current" />
                <span>{favorites.size} saved</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="flex">
          <button
            onClick={() => setActiveTab('borewell')}
            className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-300 ${
              activeTab === 'borewell'
                ? 'bg-blue-500 text-white transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <Target className="w-5 h-5 mr-2" />
              <span>Borewell Sites</span>
            </div>
            {activeTab === 'borewell' && (
              <div className="mt-1 text-xs opacity-75">
                {borewellPredictions.length} sites analyzed
              </div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('trading')}
            className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-300 ${
              activeTab === 'trading'
                ? 'bg-blue-500 text-white transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <Globe className="w-5 h-5 mr-2" />
              <span>Water Trading</span>
            </div>
            {activeTab === 'trading' && (
              <div className="mt-1 text-xs opacity-75">
                {waterTradingData.length} opportunities
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {activeTab === 'borewell' ? renderBorewellPredictions() : renderWaterTrading()}
      </div>

      {/* Enhanced Additional Info */}
      <div className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-500 animate-pulse" />
          Planning Guidelines & Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: '🌊', text: 'Consider seasonal variations in groundwater levels', color: 'bg-blue-50 border-blue-200' },
            { icon: '📋', text: 'Ensure compliance with local water extraction regulations', color: 'bg-green-50 border-green-200' },
            { icon: '🔬', text: 'Conduct geological surveys before borewell installation', color: 'bg-yellow-50 border-yellow-200' },
            { icon: '🌍', text: 'Monitor environmental impact of water transfers', color: 'bg-purple-50 border-purple-200' }
          ].map((tip, index) => (
            <div 
              key={index}
              className={`flex items-start p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${tip.color}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-lg mr-3">{tip.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{tip.text}</p>
              </div>
              <button className="text-blue-500 hover:text-blue-700 text-xs font-medium ml-2">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <CostCalculator />
    </div>
  );
};

export default PlanningTools;
