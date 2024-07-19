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

  username: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private snackbarComponent: SnackbarComponent,
    private router: Router,
    private as: AuthService,
    private validatorsService: FormValidationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), this.validatorsService.forbiddenCharactersValidator()]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]]
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
  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    try {
      let resp: any = await this.as.loginWithEmailAndPassword(username, password);
      console.log(resp);
      localStorage.setItem('bh-token', resp['token']);
      localStorage.setItem('username', username);
      this.snackbarComponent.openSnackBar('Login successful!', true, true);
      setTimeout(() => {
        this.router.navigateByUrl('/overview');
      }, 1500);
    } catch (e) {
      this.snackbarComponent.openSnackBar('Login denied!', false, false);
      console.error(e);
    }
  }

  /**
   * step back helper function
   */
  stepBack(){
    window.history.back();
  }

  /**
   * shows the notification for password reset
   */
  passReset(){
    this.snackbarComponent.openSnackBar('Please enter you email adress', true, true);
      setTimeout(() => {
        const externalUrl = `http://localhost:8000/api/bingeHub/password_reset/`;
        window.location.href = externalUrl;
      }, 1500);
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
