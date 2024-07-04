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
   * just redirect do register
   */
  toSignUp() {
    this.router.navigate(['/register']);
  }
}
