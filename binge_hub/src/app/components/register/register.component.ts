import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormValidationService } from '../../services/form-validation.service';
import { environment } from '../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Non-null Assertion Operator '!'
  csrfToken!: string;

  constructor(
    private fb: FormBuilder,
    private snackbarComponent: SnackbarComponent,
    private router: Router,
    private route: ActivatedRoute,
    private vs: FormValidationService,
    private http: HttpClient,
    private as: AuthService,
  ) {}

  ngOnInit(): void {
    this.as.fetchCsrfToken();
    this.validation();
    this.getEmailAsUsername();
  }

  /**
   * gets the username (email) from start component
   * sets the username in register field username alias email
   */
  getEmailAsUsername() {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.registerForm.patchValue({
          username: username
        });
      }
    });
  }

  /**
   * Helper function for form validation
   */
  validation() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(18), this.vs.forbiddenCharactersValidator(),]],
        email: ['', [Validators.required, Validators.email, this.vs.forbiddenCharactersValidator(),]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(18), this.vs.forbiddenCharactersValidator(),]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    // checks password matching every second
    setInterval(() => {
      this.checkPasswords();
    }, 1000);
  }

  /**
   * costum validator for password machting
   * @param control
   * @returns
   */
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const passwordsMatch = password && confirmPassword && password.value === confirmPassword.value;
    return passwordsMatch ? null : { passwordMismatch: true };
  };

  /**
   * function for checking passwords and updating their validity
   */
  checkPasswords() {
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  /**
   * Function for registering a new user.
   * Sends a POST request to the backend with the user's registration details.
   * Closes the registration dialog and indicates success if the request is successful.
   * Displays an error message if the request fails.
   */
  register() {
    const body = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
  
    this.http.post('http://localhost:8000/accounts/register/', body).subscribe({
      next: (_response: any) => {
        console.log('Registration successful');
        // Handle success, e.g., show success message
      },
      error: (error: any) => {
        console.error('Registration failed', error);
        // Handle error, e.g., show error message
      },
    });
  }
  
  
  
  /**
   * calls the registration successful snackbar
   */
  registerDialog() {
    this.snackbarComponent.openSnackBar('Registration successful! Please see your emails', true, true);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500); // Delay of 1.5 seconds
  }

  /**
   * step back helper function
   */
  stepBack() {
    window.history.back();
  }
}
