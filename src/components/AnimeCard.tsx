import React from 'react';
import { Play, Clock, Star, Trash2 } from 'lucide-react';
import { AnimeItem } from '../types';

interface AnimeCardProps {
  anime: AnimeItem;
  onPlay: (anime: AnimeItem) => void;
  onDelete: (id: string) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onPlay, onDelete }) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const progressPercentage = anime.duration > 0 ? (anime.watchTime / anime.duration) * 100 : 0;

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <video
          src={anime.videoUrl}
          className="w-full h-full object-cover"
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onPlay(anime)}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all"
          >
            <Play className="h-8 w-8 text-white ml-1" />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(anime.id);
          }}
          className="absolute top-2 right-2 bg-red-600 bg-opacity-80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4 text-white" />
        </button>
        {progressPercentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {anime.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {anime.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(anime.duration)}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              {anime.rating.toFixed(1)}
            </div>
          </div>
          <div className="flex space-x-1">
            {anime.genre.slice(0, 2).map((g) => (
              <span key={g} className="bg-purple-600 bg-opacity-60 text-xs px-2 py-1 rounded">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};