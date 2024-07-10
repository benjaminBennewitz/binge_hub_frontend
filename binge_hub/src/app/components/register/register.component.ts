import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
   * gets the email (email) from start component
   * sets the email in register field username alias email
   */
  getEmailAsUsername() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.registerForm.patchValue({
          email: email
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
    console.log('Starting registration process...');
    console.log('Registering user with data:', this.registerForm.value);
  
    const body = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
  
    const csrfToken = localStorage.getItem('bh-csrf_token');
    if (csrfToken) {
      console.log('CSRF token found in localStorage:', csrfToken);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      });
  
      this.http.post('http://localhost:8000/accounts/register/', body, { headers }).subscribe({
        next: (response: any) => {
          console.log('Registration successful', response);
          // Handle success: z.B. Benutzer benachrichtigen oder weiterleiten
        },
        error: (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
          // Log the entire error object for detailed inspection
          console.error('Full error object:', error);
          // Handle error: z.B. Benutzer informieren oder Fehlermeldung anzeigen
        }
      });
    } else {
      console.error('CSRF token not found in localStorage.');
      // Handle CSRF token error: z.B. Benutzer informieren oder Fehlermeldung anzeigen
    }
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
