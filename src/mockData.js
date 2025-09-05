// src/data/mockData.js

export const dwlrStations = [
  {
    id: 'DWLR001',
    name: 'Jaipur Station 1',
    state: 'Rajasthan',
    district: 'Jaipur',
    lat: 26.9124,
    lng: 75.7873,
    currentLevel: 45.2,
    previousLevel: 48.1,
    healthScore: 650,
    status: 'critical',
    emergencyPrediction: 23, // days until critical
    lastUpdated: '2025-01-05T14:30:00Z'
  },
  {
    id: 'DWLR002',
    name: 'Chennai Station 3',
    state: 'Tamil Nadu',
    district: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    currentLevel: 12.8,
    previousLevel: 11.2,
    healthScore: 750,
    status: 'warning',
    emergencyPrediction: 67,
    lastUpdated: '2025-01-05T14:25:00Z'
  },
  {
    id: 'DWLR003',
    name: 'Bangalore Urban 2',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    lat: 12.9716,
    lng: 77.5946,
    currentLevel: 28.5,
    previousLevel: 29.1,
    healthScore: 820,
    status: 'safe',
    emergencyPrediction: 120,
    lastUpdated: '2025-01-05T14:20:00Z'
  },
  {
    id: 'DWLR004',
    name: 'Mumbai Suburban 1',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    lat: 19.0760,
    lng: 72.8777,
    currentLevel: 35.7,
    previousLevel: 33.2,
    healthScore: 680,
    status: 'warning',
    emergencyPrediction: 45,
    lastUpdated: '2025-01-05T14:35:00Z'
  },
  {
    id: 'DWLR005',
    name: 'Delhi Central 4',
    state: 'Delhi',
    district: 'Central Delhi',
    lat: 28.6139,
    lng: 77.2090,
    currentLevel: 18.3,
    previousLevel: 20.1,
    healthScore: 420,
    status: 'critical',
    emergencyPrediction: 15,
    lastUpdated: '2025-01-05T14:40:00Z'
  }
];

export const cropRecommendations = [
  {
    location: 'Jaipur, Rajasthan',
    currentWaterLevel: 45.2,
    recommendations: [
      {
        crop: 'Pearl Millet (Bajra)',
        waterRequirement: 350, // mm per season
        profitPotential: 'High',
        riskLevel: 'Low',
        reason: 'Drought resistant, suitable for current water levels'
      },
      {
        crop: 'Sorghum (Jowar)',
        waterRequirement: 400,
        profitPotential: 'Medium',
        riskLevel: 'Low',
        reason: 'Low water requirement, good market demand'
      },
      {
        crop: 'Cotton',
        waterRequirement: 700,
        profitPotential: 'High',
        riskLevel: 'High',
        reason: 'High profit but water intensive - not recommended'
      }
    ]
  }
];

export const emergencyAlerts = [
  {
    id: 'ALERT001',
    type: 'critical',
    station: 'Delhi Central 4',
    message: 'Critical water level predicted in 15 days',
    action: 'Immediate intervention required - restrict pumping',
    timestamp: '2025-01-05T14:40:00Z',
    daysUntilCritical: 15
  },
  {
    id: 'ALERT002',
    type: 'warning',
    station: 'Jaipur Station 1',
    message: 'Water level declining rapidly',
    action: 'Monitor closely, consider conservation measures',
    timestamp: '2025-01-05T14:30:00Z',
    daysUntilCritical: 23
  }
];

export const borewellPredictions = [
  {
    lat: 26.9200,
    lng: 75.7900,
    successProbability: 85,
    recommendedDepth: '45-55 meters',
    estimatedCost: '₹1,50,000',
    waterQuality: 'Good',
    riskFactors: ['Nearby pumping stations', 'Seasonal variation']
  },
  {
    lat: 26.9150,
    lng: 75.7850,
    successProbability: 92,
    recommendedDepth: '35-45 meters',
    estimatedCost: '₹1,25,000',
    waterQuality: 'Excellent',
    riskFactors: ['None significant']
  }
];

export const waterTradingData = [
  {
    sourceRegion: 'Kerala Backwaters',
    targetRegion: 'Karnataka Drought Areas',
    availableSurplus: '500 million liters',
    transportCost: '₹2.50 per 1000L',
    tradingPotential: 'High',
    policyStatus: 'Under Review'
  },
  {
    sourceRegion: 'Punjab Groundwater',
    targetRegion: 'Rajasthan Desert',
    availableSurplus: '200 million liters',
    transportCost: '₹3.20 per 1000L',
    tradingPotential: 'Medium',
    policyStatus: 'Approved'
  }
];

export const historicalData = [
  { date: '2024-01-01', level: 52.1, rainfall: 0 },
  { date: '2024-02-01', level: 51.8, rainfall: 5 },
  { date: '2024-03-01', level: 50.2, rainfall: 0 },
  { date: '2024-04-01', level: 49.1, rainfall: 0 },
  { date: '2024-05-01', level: 47.8, rainfall: 0 },
  { date: '2024-06-01', level: 46.2, rainfall: 85 },
  { date: '2024-07-01', level: 48.5, rainfall: 120 },
  { date: '2024-08-01', level: 49.8, rainfall: 95 },
  { date: '2024-09-01', level: 48.2, rainfall: 45 },
  { date: '2024-10-01', level: 47.1, rainfall: 15 },
  { date: '2024-11-01', level: 46.3, rainfall: 0 },
  { date: '2024-12-01', level: 45.7, rainfall: 0 },
  { date: '2025-01-01', level: 45.2, rainfall: 0 }
];

export const stateStats = {
  total: 5260,
  critical: 1250,
  warning: 1890,
  safe: 2120,
  criticalPercentage: 23.8,
  warningPercentage: 35.9,
  safePercentage: 40.3
};

export const getStatusColor = (status) => {
  switch(status) {
    case 'critical': return '#EF4444';
    case 'warning': return '#F59E0B';
    case 'safe': return '#10B981';
    default: return '#6B7280';
  }
};

export const getHealthScoreColor = (score) => {
  if (score >= 800) return '#10B981'; // Green
  if (score >= 600) return '#F59E0B'; // Yellow
  return '#EF4444'; // Red
};