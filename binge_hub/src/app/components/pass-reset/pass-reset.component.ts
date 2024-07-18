import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrl: './pass-reset.component.scss',
})
export class PassResetComponent {
  resetForm: FormGroup;
  csrfToken: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarComponent,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]});
  }

  ngOnInit() {
    this.authService.fetchCsrfToken();
  }

  /**
   * redirect to login after reset the passwort
   * sends the request to api
   */
  redirect() {
    const email = this.resetForm.value.email;

    this.authService.resetPassword(email).subscribe(
      () => {
        this.snackbar.openSnackBar('Password reset email sent successfully', true, true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error => {
        console.error('Error sending password reset email:', error);
        this.snackbar.openSnackBar('Error sending password reset email. Please try again', false, true);
      }
    );
  }

  /**
   * helper function for geting back
   */
  stepBack(): void {
    window.history.back();
  }

    /**
   * link to imprint
   */
    toImprint(){
      this.router.navigateByUrl('/imprint');
    }
  
    /**
     * link to pp
     */
    toPP(){
      this.router.navigateByUrl('/privacy-policy');
    }
}
