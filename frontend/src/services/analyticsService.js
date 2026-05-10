// Mock service to simulate real-time analytics data fetching and forecasting
export const fetchRealTimeStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    totalLearning: 128.4 + (Math.random() * 0.5),
    neuralStreak: 24,
    conceptMastery: 82 + (Math.random() * 2),
    globalRank: "1.2k",
    trend: "+12.4%"
  };
};

export const generateForecastData = (currentVelocity) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const baseActual = [2.5, 3.8, 1.5, 4.2, 3.0, 0, 0];
  
  return days.map((day, i) => {
    const actual = baseActual[i] || null;
    // Forecast is based on velocity (hrs/day)
    const predicted = actual || (currentVelocity * (1 + (Math.random() * 0.2)));
    return { day, actual, predicted: parseFloat(predicted.toFixed(1)) };
  });
};

export const generateDynamicInsights = (stats) => {
  const insights = [];
  if (stats.conceptMastery < 85) {
    insights.push({
      type: 'Optimization Needed',
      text: `Your current mastery is at ${stats.conceptMastery.toFixed(1)}%. Focus on weak modules to hit 90% by next week.`,
      status: 'warning'
    });
  }
  if (stats.totalLearning > 100) {
    insights.push({
      type: 'Velocity Milestone',
      text: "You've maintained a 2.5hr/day velocity for 5 days. You're in the top 3% of users this week.",
      status: 'success'
    });
  }
  return insights;
};
