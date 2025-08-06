import React from 'react';
import { Film, Upload } from 'lucide-react';

interface EmptyStateProps {
  onUploadClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onUploadClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
        <Film className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">No anime uploaded yet</h2>
      <p className="text-gray-400 mb-8 max-w-sm">
        Start building your collection by uploading your first anime video
      </p>
      <button
        onClick={onUploadClick}
        className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
      >
        <Upload className="h-5 w-5 mr-2" />
        Upload First Anime
      </button>
    </div>
  );
};