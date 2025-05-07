import React from 'react';

interface AvgStatsCardProps {
  stats: {
    avg_sentiment: number;
    avg_fake_score: number;
  };
}

const AvgStatsCard: React.FC<AvgStatsCardProps> = ({ stats }) => {
  const getSentimentClass = (score: number) => {
    if (score > 0.2) return 'text-green-600';
    if (score < -0.2) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-lg font-medium text-gray-600">Average Sentiment</h2>
        <p className={`text-3xl font-bold ${getSentimentClass(stats.avg_sentiment)}`}>
          {stats.avg_sentiment > 0 ? '+' : ''}
          {stats.avg_sentiment.toFixed(2)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-lg font-medium text-gray-600">Average Fake News Score</h2>
        <p className="text-3xl font-bold text-orange-600">
          {(stats.avg_fake_score * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default AvgStatsCard;
