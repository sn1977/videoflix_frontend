export interface Video {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  video_file: string;
  hls_url: string;
  thumbnail: string;      
  category: Category;      
}

export interface Category {
  id: number;
  name: string;
  videos: Video[];
}