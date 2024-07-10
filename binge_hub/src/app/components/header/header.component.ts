import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ButtonVisibilityService } from '../../services/button-visibility.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  fadeOut: boolean = false;
  isOverviewRoute: boolean = false;

  constructor(
    private router: Router,
    private snackbarComponent: SnackbarComponent,
    private buttonVisibilityService: ButtonVisibilityService,
  ) {}

  ngOnInit(): void {
    this.buttonVisibilityService.manageButtonsBasedOnURL();
    this.displayHeader();
    this.checkRoutes();
  }

  /**
   * detect the routes and control the right class
   */
  checkRoutes(){
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOverviewRoute = event.urlAfterRedirects === '/overview';
      });
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
    localStorage.removeItem('bh-csrf_token');
    localStorage.removeItem('bh-token');
    localStorage.removeItem('username');
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
