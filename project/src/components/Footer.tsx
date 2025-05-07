import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">NewsVeri</h3>
            <p className="text-gray-300 mb-4">
              Bringing you the latest news with insightful sentiment analysis
              and fake news detection.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.twitter.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/world"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  World
                </Link>
              </li>
              <li>
                <Link
                  to="/category/business"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to="/category/technology"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/category/entertainment"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  to="/category/sports"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/premium"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Premium Subscription
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Subscribe to Newsletter
            </h4>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-r flex items-center"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>
            <p className="text-gray-300 text-sm">
              Get the latest news and updates directly to your inbox.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>
            &copy; {new Date().getFullYear()} NewsInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
