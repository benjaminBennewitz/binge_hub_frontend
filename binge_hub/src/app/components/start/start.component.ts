import {Component} from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})

export class StartComponent {

  constructor() {}

  /**
   * just redirect to register
   */
  toSignUp() {
    const externalUrl = `http://localhost:8000/accounts/register/`;
    window.location.href = externalUrl;
  }
}
