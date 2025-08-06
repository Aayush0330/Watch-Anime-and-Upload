import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AnimeCard } from './components/AnimeCard';
import { VideoPlayer } from './components/VideoPlayer';
import { UploadModal } from './components/UploadModal';
import { EmptyState } from './components/EmptyState';
import { AnimeItem, UploadFormData } from './types';
import { getStoredAnime, saveAnimeItem, updateAnimeProgress, deleteAnimeItem } from './utils/storage';

function App() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<AnimeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'library'>('home');
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedAnime = getStoredAnime();
    setAnimeList(storedAnime);
    setFilteredAnime(storedAnime);
  }, []);

  useEffect(() => {
    const filtered = animeList.filter((anime) =>
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredAnime(filtered);
  }, [animeList, searchQuery]);

  const handleUpload = async (data: UploadFormData & { videoFile: File }) => {
    setIsLoading(true);
    
    try {
      // Create video URL
      const videoUrl = URL.createObjectURL(data.videoFile);
      
      // Create video element to get duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      const duration = await new Promise<number>((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video.duration);
        };
        video.src = videoUrl;
      });

      const newAnime: AnimeItem = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        thumbnail: videoUrl, // Using video URL for thumbnail
        videoUrl: videoUrl,
        duration: duration,
        uploadedAt: new Date().toISOString(),
        genre: data.genre,
        rating: data.rating,
        watchTime: 0
      };

      saveAnimeItem(newAnime);
      setAnimeList(prev => [...prev, newAnime]);
    } catch (error) {
      console.error('Error uploading anime:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = (anime: AnimeItem) => {
    setSelectedAnime(anime);
  };

  const handleTimeUpdate = (currentTime: number) => {
    if (selectedAnime) {
      updateAnimeProgress(selectedAnime.id, currentTime);
      setAnimeList(prev => 
        prev.map(anime => 
          anime.id === selectedAnime.id 
            ? { ...anime, watchTime: currentTime }
            : anime
        )
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this anime?')) {
      deleteAnimeItem(id);
      setAnimeList(prev => prev.filter(anime => anime.id !== id));
    }
  };

  const displayedAnime = currentView === 'home' 
    ? filteredAnime.slice(0, 12) // Show latest uploads on home
    : filteredAnime; // Show all in library

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        onUploadClick={() => setIsUploadModalOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to AnimeStream</h2>
            <p className="text-gray-400">Your personal anime collection</p>
          </div>
        )}

        {displayedAnime.length === 0 && searchQuery === '' ? (
          <EmptyState onUploadClick={() => setIsUploadModalOpen(true)} />
        ) : displayedAnime.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-xl">No anime found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                onPlay={handlePlay}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {selectedAnime && (
        <VideoPlayer
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          onTimeUpdate={handleTimeUpdate}
        />
      )}

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white">Uploading anime...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;