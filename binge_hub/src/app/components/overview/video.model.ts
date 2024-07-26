/**
 * Represents a video object with its details.
 *
 * @interface Video
 * @property {number} id - The unique identifier for the video.
 * @property {string} title - The title of the video.
 * @property {string} description - A brief description of the video content.
 * @property {string} video_file - The path to the video file.
 * @property {string} thumbnail - The path to the video's thumbnail image.
 * @property {boolean} is_new - Indicates whether the video is new or not.
 * @property {string} category - The category of the video (e.g., 'docu', 'drama', 'romance', etc.).
 * @property {string} video_480p_path - The path to the video file in 480p resolution.
 * @property {string} video_720p_path - The path to the video file in 720p resolution.
 * @property {string} video_1080p_path - The path to the video file in 1080p resolution.
 */
export interface Video {
  id: number;
  title: string;
  description: string;
  video_file: string;
  thumbnail: string;
  is_new: boolean;
  category: string;

  video_480p_path: string;
  video_720p_path: string;
  video_1080p_path: string;
}