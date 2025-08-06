import { AnimeItem } from '../types';

const STORAGE_KEY = 'anime_collection';

export const getStoredAnime = (): AnimeItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading anime data:', error);
    return [];
  }
};

export const saveAnimeItem = (anime: AnimeItem): void => {
  try {
    const existing = getStoredAnime();
    const updated = [...existing, anime];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving anime data:', error);
  }
};

export const updateAnimeProgress = (id: string, watchTime: number): void => {
  try {
    const existing = getStoredAnime();
    const updated = existing.map(anime => 
      anime.id === id ? { ...anime, watchTime } : anime
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating watch progress:', error);
  }
};

export const deleteAnimeItem = (id: string): void => {
  try {
    const existing = getStoredAnime();
    const updated = existing.filter(anime => anime.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting anime:', error);
  }
};