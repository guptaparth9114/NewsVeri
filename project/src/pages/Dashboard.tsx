import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import SentimentChart from '../components/SentimentChart';
import TopicStatsChart from '../components/TopicStatsChart';
import AvgStatsCard from '../components/AvgStatsCard';
import { getTrendingNews, getSentimentTrend, getTopicStats, getAvgStats } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [topicStats, setTopicStats] = useState([]);
  const [avgStats, setAvgStats] = useState({ avg_sentiment: 0, avg_fake_score: 0 });
  const [activeChart, setActiveChart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [newsData, trendData, topicStatsData, avgStatsData] = await Promise.all([
          getTrendingNews(),
          getSentimentTrend(),
          getTopicStats(),
          getAvgStats()
        ]);
        setNews(newsData);
        setTrendData(trendData);
        setTopicStats(topicStatsData);
        setAvgStats(avgStatsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTopicClick = async (topic: string) => {
    try {
      setIsLoading(true);
      const filteredNews = await getTrendingNews(topic); // API call with topic
      setNews(filteredNews);
    } catch (error) {
      console.error('Error fetching news by topic:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleChartClick = (type: string) => {
    setActiveChart(type === activeChart ? null : type); // toggle chart
  };

  return (
    <div className="relative container mx-auto px-4 py-6">
      {/* Overlay when chart is active */}
      {activeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-4xl relative z-20">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
              onClick={() => setActiveChart(null)}
            >
              ✕
            </button>
            {activeChart === 'trend' && <SentimentChart data={trendData} />}
            {activeChart === 'topics' && <TopicStatsChart data={topicStats} />}
            {activeChart === 'stats' && <AvgStatsCard stats={avgStats} />}
          </div>
        </div>
      )}

      {/* Sidebar options */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleChartClick('trend')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Sentiment Trend
        </button>
        <button
          onClick={() => handleChartClick('topics')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Topic Stats
        </button>
        <button
          onClick={() => handleChartClick('stats')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          View Avg Scores
        </button>
      </div>

      {/* Main content dims when overlay is active */}
      <div className={`${activeChart ? 'opacity-20 pointer-events-none' : ''}`}>
      {topicStats.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Explore by Topic</h2>
    <div className="flex flex-wrap gap-2">
      {topicStats.map((t: any) => (
        <button
          key={t.topic}
          onClick={() => handleTopicClick(t.topic)}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition"
        >
          {t.topic}
        </button>
      ))}
    </div>
  </div>
)}

        <h1 className="text-3xl font-bold mb-4">Your Personalized Dashboard</h1>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : (
          <NewsList news={news} isPremium={!!user?.isPremium} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
