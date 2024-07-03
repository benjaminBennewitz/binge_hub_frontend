import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  fadeOut: boolean = false;

  ngOnInit(): void {

    /**
     * displays the header after 4 seconds
     * removes class hide from header
     */
    setTimeout(() => {
      this.fadeOut = true;
      setTimeout(() => {
        const header = document.querySelector('header');
        if (header) {
          header.classList.remove('hide');
        }
      }, 500);
    }, 4000);
  }
}
