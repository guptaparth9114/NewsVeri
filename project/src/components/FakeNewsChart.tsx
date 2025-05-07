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

export interface FakeNewsHour {
  hour: string;     // e.g. "00:00", "01:00", … "23:00"
  percent: number;  // e.g. 12.5 for 12.5%
}

interface FakeNewsChartProps {
  data: FakeNewsHour[];
}

const FakeNewsChart: React.FC<FakeNewsChartProps> = ({ data }) => {
  // Static fallback for 24 hours
  const staticData: FakeNewsHour[] = Array.from({ length: 24 }).map((_, i) => ({
    hour: i.toString().padStart(2, '0') + ':00',
    percent: Math.random() * 20  // just dummy values
  }));

  // Merge fetched data over static slots
  const merged = staticData.map(s => {
    const found = data.find(d => d.hour === s.hour);
    return found || s;
  });

  const chartData = {
    labels: merged.map(d => d.hour),
    datasets: [
      {
        label: '% Fake News',
        data: merged.map(d => d.percent),
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Hourly Fake News %', font: { size: 16 } },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%`
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: '% Fake News' },
      },
      x: {
        title: { display: true, text: 'Hour of Day' },
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default FakeNewsChart;
