import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reveal-animation',
  templateUrl: './reveal-animation.component.html',
  styleUrls: ['./reveal-animation.sass'],
})
export class RevealAnimationComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      const animationWrapper = document.querySelector('.animation-wrapper') as HTMLElement | null;

      if (animationWrapper) {
        animationWrapper.classList.add('pulse');

        setTimeout(() => {
          animationWrapper.classList.add('hidden');
        }, 1000); // Duration of the pulse animation
      }
    }, 3600); // 3 seconds delay
  }
}