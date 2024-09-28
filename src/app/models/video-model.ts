// export interface Video {
//   hls_url(hls_url: any): unknown;
//   id: number,
//   created_at: Date,
//   title: string,
//   description: string,
//   video_file: string,
// }

export interface Video {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  video_file: string;
  hls_url: string; // Hinzugefügt
}