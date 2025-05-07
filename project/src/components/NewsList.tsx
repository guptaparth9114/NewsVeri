import React from 'react';
import NewsCard, { NewsItem } from './NewsCard';

interface NewsListProps {
  news: NewsItem[];
  isPremium?: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ news, isPremium = false }) => {
  if (!news || news.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No news articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <NewsCard key={item.id || index} news={item} isPremium={isPremium} />
      ))}
    </div>
  );
};

export default NewsList;