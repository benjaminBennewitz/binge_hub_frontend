import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { VideoService } from '../../services/video.service';
import { Video } from './video.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  currentVideo: string = '';
  currentTitle: string = '';
  currentDescription: string = '';
  videos: Video[] = [];

  newVideos: Video[] = [];
  documentaryVideos: Video[] = [];
  dramaVideos: Video[] = [];
  romanceVideos: Video[] = [];
  crimeVideos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }


  /**
   * Loads the videos from the backend and categorizes them.
   * It retrieves the video data via the VideoService, constructs the full URL for the thumbnails,
   * and populates the videos array. The videos are then categorized into different categories.
   * If there are videos available, the first video is set as the current video.
   */
  loadVideos() {
    this.videoService.getVideos().subscribe((data) => {
      const baseUrl = 'http://localhost:8000';

      this.videos = data.map((video) => ({
        ...video,
        thumbnail: `${baseUrl}${video.thumbnail}`,
      }));

      this.categorizeVideos();

      if (this.videos.length > 0) {
        this.setVideo(this.videos[0]);
      }
    });
  }

  
   /**
   * Categorizes the videos into different categories based on their properties.
   * It filters the videos array to create separate arrays for new videos,
   * documentaries, dramas, romances, and crimes.
   */
  categorizeVideos() {
    this.newVideos = this.videos.filter((video) => video.is_new);
    this.documentaryVideos = this.videos.filter(
      (video) => video.category === 'docu'
    );
    this.dramaVideos = this.videos.filter(
      (video) => video.category === 'drama'
    );
    this.romanceVideos = this.videos.filter(
      (video) => video.category === 'romance'
    );
    this.crimeVideos = this.videos.filter(
      (video) => video.category === 'crime'
    );
  }


  /**
   * Sets the current video to be played in the background video container.
   * Updates the current video URL, title, and description based on the provided video object.
   * It also updates the video element's source, loads the new video, and starts playing it.
   * 
   * @param video - The video object containing details about the video to be set.
   *                It should include properties like video_file, title, and description.
   */
  setVideo(video: Video) {
    this.currentVideo = `http://localhost:8000${video.video_file}`;
    this.currentTitle = video.title;
    this.currentDescription = video.description;

    const videoElement = document.getElementById(
      'background-video'
    ) as HTMLVideoElement;
    videoElement.src = this.currentVideo;
    videoElement.load();
    videoElement.play();
  }


  /**
   * Plays the video in fullscreen mode and hides the control elements after a short time.
   * - Resets the video to the beginning.
   * @param video - Das Video-Objekt, das abgespielt werden soll
   */
  playVideo(): void {
    const videoElement = document.getElementById(
      'background-video'
    ) as HTMLVideoElement;
    videoElement.currentTime = 0;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    }
    videoElement.play();
    // Hide video controls after 2 seconds
    setTimeout(() => {
      videoElement.controls = false;
    }, 2000);
  }
}