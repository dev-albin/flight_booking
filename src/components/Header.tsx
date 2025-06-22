import React from 'react';
import { ChevronDown, User, Bell, HelpCircle, MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Egencia</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <span>Book</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors">Trips</button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <span>Tools</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="w-4 h-4" />
              <span>Admin</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors">Community</button>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-600 transition-colors">Help</button>
          <button className="text-gray-600 hover:text-blue-600 transition-colors">Feedback</button>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span>Mr. David AAEgencia</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;