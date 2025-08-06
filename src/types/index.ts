export interface AnimeItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  uploadedAt: string;
  genre: string[];
  rating: number;
  watchTime: number;
}

export interface UploadFormData {
  title: string;
  description: string;
  genre: string[];
  rating: number;
}