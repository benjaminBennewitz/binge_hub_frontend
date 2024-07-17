import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrl: './new-pass.component.scss'
})
export class NewPassComponent {

  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarComponent: SnackbarComponent
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]});
  }

  /**
   * redirect to login after reset the passwort
   * sends the request to api
   */
  redirect() {
    this.snackbarComponent.openSnackBar('Password reset successful, please login', true, true);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500); // Delay of 1.5 seconds
  }

  /**
   * helper function for geting back
   */
  stepBack(): void {
    window.history.back();
  }
}