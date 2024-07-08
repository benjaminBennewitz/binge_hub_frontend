import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})

export class StartComponent {
  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router) {}

  /**
   * just redirect do register
   */
  toSignUp() {
    if (this.usernameFormControl.valid) {
      this.router.navigate(['/register'], { queryParams: { username: this.usernameFormControl.value } });
    } else {
      this.usernameFormControl.markAsTouched();
    }
  }  
}
