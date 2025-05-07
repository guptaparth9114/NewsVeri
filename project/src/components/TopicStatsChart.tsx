import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface TopicStatsChartProps {
  data: {
    topic: string;
    avg_sentiment: number;
    avg_fake_score: number;
  }[];
}

const TopicStatsChart: React.FC<TopicStatsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.topic),
    datasets: [
      {
        label: 'Avg Sentiment',
        data: data.map(item => item.avg_sentiment),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Avg Fake Score',
        data: data.map(item => item.avg_fake_score),
        backgroundColor: 'rgba(234, 179, 8, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopicStatsChart;
