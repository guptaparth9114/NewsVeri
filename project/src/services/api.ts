import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/';

// Fetch trending news (e.g., category = "world", "business", etc.)
export const getTrendingNews = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/trending-news`);
  return response.data;
};

// Get average sentiment and fake score for current trending news
export const getAvgStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/average-stats`);
  return response.data;
};

// Get overall sentiment trend over time (line chart)
export const getSentimentTrend = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/sentiment-trend`);
  return response.data;
};

// Get topic-wise average stats (used in TopicStatsChart)
export const getTopicStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/topic-stats`);
  return response.data;
};

export const fetchNewsByCategory = async (category: string) => {
  const response = await axios.post(`${API_BASE_URL}/search`, {
    query: category,
  });
  return response.data;
};
