import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ButtonVisibilityService } from '../../services/button-visibility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  fadeOut: boolean = false;

  constructor(
    private router: Router,
    private snackbarComponent: SnackbarComponent,
    private buttonVisibilityService: ButtonVisibilityService,
  ) {}

  ngOnInit(): void {
    this.buttonVisibilityService.manageButtonsBasedOnURL();
    this.displayHeader();
  }

  /**
   * displays the header after 4 seconds
   * removes class hide from header
   */
  displayHeader() {
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

  /**
   * just redirect do login
   */
  toLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * log out the user
   * removes every item from local storage
   */
  logOut() {
    this.logOutDialog();
  }

  /**
   * calls the login successful snackbar
   */
  logOutDialog() {
    this.snackbarComponent.openSnackBar('Logging out!', true, true);
    setTimeout(() => {
      this.router.navigate(['/start']);
    }, 1500); // Delay of 1.5 seconds
  }
}
