import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Menu, X, User, LogOut, Clock } from "lucide-react";
import { fetchNewsByCategory } from "../services/api";
import NewsCard, { NewsItem } from "../components/NewsCard";

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "world", name: "World" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "entertainment", name: "Entertainment" },
  { id: "sports", name: "Sports" },
  { id: "science", name: "Science" },
  { id: "health", name: "Health" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsResults, setNewsResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
    // Navigate to search results page
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  const handleCategoryClick = async (categoryId: string) => {
    setLoading(true); // ← start loading
    try {
      const data = await fetchNewsByCategory(categoryId);
      setNewsResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // ← stop loading
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top header with logo and auth */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-blue-900">
          Veri-News
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <select
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category...</option>
              <option value="world">World</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
            </select>
          </form>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-700"
              >
                <User size={20} />
                <span className="hidden sm:inline">{user.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-blue-700 hover:text-blue-900">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition"
              >
                Subscribe
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-inner">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-2 pr-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          <div className="space-y-2 mb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="border-t border-gray-200 pt-2 space-y-2">
              <Link
                to="/profile"
                className="flex items-center px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-2" /> Profile
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
              >
                <LogOut size={18} className="mr-2" /> Log out
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-2 flex flex-col space-y-2">
              <Link
                to="/login"
                className="px-2 py-1 text-center text-blue-700 hover:bg-blue-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-2 py-1 text-center bg-blue-700 text-white rounded hover:bg-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscribe
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Categories Nav */}
      <nav className="hidden md:block bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex overflow-x-auto space-x-6 py-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={async () => {
                    const data = await handleCategoryClick(category.id);
                    //navigate(`/category/${category.id}`, { state: { results: data } });
                  }}
                  className="whitespace-nowrap hover:text-blue-200 transition-colors py-1 inline-block text-left"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Clock size={48} className="text-white animate-spin" />
        </div>
      )}

      {/* Render news results directly on homepage */}
      <div className="news-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {newsResults.length > 0 && !loading
          ? newsResults.map((item, idx) => (
              <NewsCard key={idx} news={item} isPremium={!!user?.isPremium} />
            ))
          : !loading && (
              <p className="e-0 text-center text-gray-600">
                Select a category above to load news.
              </p>
            )}
      </div>
    </header>
  );
};

export default Navbar;
