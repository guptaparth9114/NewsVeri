import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";

export interface NewsItem {
  id?: string;
  title: string;
  description?: string;
  url: string;
  published_at: string;
  sentiment: number;
  fake_news_score: number;
  premium?: boolean;
}

interface NewsCardProps {
  news: NewsItem;
  isPremium?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, isPremium = false }) => {
  // Get sentiment color based on the score
  const getSentimentColor = (score: number) => {
    if (score > 0.2) return "bg-green-100 text-green-800 border-green-300";
    if (score < -0.2) return "bg-red-100 text-red-800 border-red-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  // Get sentiment icon based on the score
  const getSentimentIcon = (score: number) => {
    if (score > 0.2) return <ThumbsUp size={16} className="mr-1" />;
    if (score < -0.2) return <ThumbsDown size={16} className="mr-1" />;
    return null;
  };

  // Format date
  const getFormattedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        {isPremium && news.premium && (
          <span className="inline-block px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 border border-yellow-300 mb-2">
            Premium
          </span>
        )}

        <h3 className="text-xl font-serif font-semibold mb-2 line-clamp-2">
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
          >
            {news.title}
          </a>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {news.description || "No description available"}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500"></span>

          <div className="flex space-x-2">
            {/* Sentiment indicator */}
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getSentimentColor(
                news.sentiment
              )}`}
            >
              {getSentimentIcon(news.sentiment)}
              Sentiment: {news.sentiment.toFixed(2)}
            </span>

            {/* Fake news indicator */}
            {news.fake_news_score > 0.5 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 border border-orange-300">
                <AlertTriangle size={16} className="mr-1" />
                Possibly Fake: {(news.fake_news_score * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
