import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarComponent: SnackbarComponent
  ) {}

  /**
   * checks if user is logged in, otherwise access to /board will be denied
   * @returns 
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // return true, true = user ist logged in, token is given
    } else {
        this.snackbarComponent.openSnackBar('You must be logged in', false, false);
        this.router.navigate(['/start']); // redirect to /start page
        return false;
    }
  }
}