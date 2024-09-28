export interface Video {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  video_file: string;
  hls_url: string;
  thumbnail: string;       // Hinzugefügt
  category: Category;      // Hinzugefügt
}

export interface Category {
  id: number;
  name: string;
  videos: Video[];
}