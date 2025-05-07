import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import SentimentChart from '../components/SentimentChart';
import { getTrendingNews, getSentimentTrend, getAvgStats } from '../services/api';
import { useAuth } from '../context/AuthContext';
import FakeNewsChart from '../components/FakeNewsChart';

import { ChevronRight, TrendingUp, BarChart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [news, setNews] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [stats, setStats] = useState({ avg_sentiment: 0, avg_fake_score: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [topTopics, setTopTopics] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [newsData, sentimentData, statsData] = await Promise.all([
          getTrendingNews(),
          getSentimentTrend(),
          getAvgStats()
        ]);
        console.log("Fetched sentimentData:", sentimentData); // ✅ Add this
        setNews(newsData);
        setTrendData(sentimentData);
        setStats(statsData);

        const keywords = extractTopTopics(newsData);
        setTopTopics(keywords);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractTopTopics = (articles: any[]) => {
    const freq: Record<string, number> = {};
    articles.forEach(a => {
      a.title.split(/\s+/).forEach(w => {
        const clean = w.toLowerCase().replace(/[^a-z]/g, '');
        if (clean.length > 3) freq[clean] = (freq[clean] || 0) + 1;
      });
    });

    return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));
};


  const getSentimentClass = (score: number) => {
    if (score > 0.2) return 'text-green-600';
    if (score < -0.2) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="bg-indigo-900 text-white rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-serif font-bold mb-2">
            Jaypee's News Explorer 🚀
          </h1>
          <p className="text-lg mb-4 max-w-3xl text-indigo-200">
            A minor project—AI-powered mood check
            and fake-news alarm for all your daily news scrolly needs.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-indigo-900 px-5 py-2 rounded-md font-medium hover:bg-indigo-50 transition"
            >
              Try Premium Stuff <ChevronRight size={18} className="ml-1" />
            </Link>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow flex items-center">
          <div className="bg-indigo-100 p-2 rounded-full mr-3">
            <BarChart size={20} className="text-indigo-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Mood Score</p>
            <p className={`text-2xl font-semibold ${getSentimentClass(stats.avg_sentiment)}`}>
              {stats.avg_sentiment > 0 ? '+' : ''}{stats.avg_sentiment.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <TrendingUp size={20} className="text-green-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Top Buzz Words</p>
            <p className="text-2xl font-semibold text-gray-800">
              {topTopics.length ? topTopics.join(', ') : 'None yet'}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow flex items-center">
          <div className="bg-orange-100 p-2 rounded-full mr-3">
            <AlertTriangle size={20} className="text-orange-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Fake News Level</p>
            <p className="text-2xl font-semibold text-orange-600">
              {(stats.avg_fake_score * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </section>
 {/* Two Charts Side by Side */}
 <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-3">Mood Over Days</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-indigo-900 rounded-full" />
            </div>
          ) : trendData.length > 0 ? (
            <SentimentChart data={trendData} />
          ) : (
            <p className="text-gray-500 text-center">No mood data yet.</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold mb-3">Fake News % by Hour</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-orange-700 rounded-full" />
            </div>
          ) : (
            <FakeNewsChart data={[]} />  
          )}
        </div>
      </section>

      {/* News List */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-serif font-bold">What’s Hot Today</h2>
          <Link to="/dashboard" className="text-indigo-700 hover:text-indigo-900 flex items-center">
            See All <ChevronRight size={18} />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-900 rounded-full" />
          </div>
        ) : (
          <NewsList news={news} isPremium={!!user?.isPremium} />
        )}
      </section>
       {/* Gentle nudge for premium */}
       {!user?.isPremium && (
        <section className="bg-yellow-200 rounded-lg p-6 text-yellow-900 shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-2">Want More Features?</h2>
          <p className="mb-4">
            If you wanna dive deeper—like see more old news, get alerts for fake stuff, or play with our API—subscribe to premium. It’s ₹79/month, student-friendly! 
          </p>
          <Link
            to="/premium"
            className="inline-block bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Check Premium Plans
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
