import React from 'react';
import { Upload, Search, Home, Library } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  currentView: 'home' | 'library';
  onViewChange: (view: 'home' | 'library') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onUploadClick,
  onSearchChange,
  searchQuery,
  currentView,
  onViewChange
}) => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AnimeStream
              </h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => onViewChange('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </button>
              <button
                onClick={() => onViewChange('library')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'library'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Library size={16} />
                <span>Library</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search anime..."
                className="block w-64 pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={onUploadClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};