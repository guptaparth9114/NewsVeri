import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentTrend {
  date: string; // date
  avg_sentiment: number;
}

interface SentimentChartProps {
  data: SentimentTrend[];
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const staticData: SentimentTrend[] = [
    { date: '2025-04-29', avg_sentiment: 0.12 },
    { date: '2025-04-30', avg_sentiment: 0.08 },
    { date: '2025-05-01', avg_sentiment: -0.05 },
    { date: '2025-05-02', avg_sentiment: 0.10 },
    { date: '2025-05-03', avg_sentiment: -0.08 },
    { date: '2025-05-04', avg_sentiment: 0.15 },
    { date: '2025-05-05', avg_sentiment: 0.05 }
  ];
  const mergedData = [...staticData, ...data];
  const chartData = {
    labels: mergedData.map(item => item.date),
    datasets: [
      {
        label: 'Average Sentiment',
        data: mergedData.map(item => item.avg_sentiment),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sentiment Trend Over Time',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(3);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        title: {
          display: true,
          text: 'Sentiment Score',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };
  
  return (
    
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;