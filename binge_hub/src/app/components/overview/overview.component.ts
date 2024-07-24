import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor() {}

  ngOnInit(): void {}

  
 /**
   * Plays the video in fullscreen mode and hides the control elements after a short time.
   * - Resets the video to the beginning.
   */
  playVideo(): void {
    const videoElement = document.getElementById('background-video') as HTMLVideoElement;
    videoElement.currentTime = 0;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
      videoElement.play();

      //hide video controls after 2 seconds
      setTimeout(() => {
        videoElement.controls = false;
      }, 2000);
    }
  }
}
