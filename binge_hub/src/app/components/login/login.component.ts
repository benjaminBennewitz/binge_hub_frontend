import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from '../../services/form-validation.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbarComponent: SnackbarComponent,
    private router: Router,
    private as: AuthService,
    private validatorsService: FormValidationService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.validatorsService.forbiddenCharactersValidator(),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ],
      ],
    });
  }

  /**
   * calls the login successful snackbar
   */
  loginDialog() {
    this.snackbarComponent.openSnackBar('Login successful!', true, true);
    setTimeout(() => {
      this.router.navigate(['/overview']);
    }, 1500); // Delay of 1.5 seconds
  }

  /**
   * login function
   * @returns
   */
  login() {
    this.loginDialog()
  }

  /**
   * step back helper function
   */
  stepBack(){
    window.history.back();
  }
}
