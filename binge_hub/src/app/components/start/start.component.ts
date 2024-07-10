import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})

export class StartComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router) {}

  /**
   * just redirect to register
   */
  toSignUp() {
    if (this.emailFormControl.valid) {
      this.router.navigate(['/register'], { queryParams: { email: this.emailFormControl.value } });
    } else {
      this.emailFormControl.markAsTouched();
    }
  }  
}
