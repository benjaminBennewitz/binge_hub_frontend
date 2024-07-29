import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  constructor(private router: Router) {}


  /**
   * just redirect to register
   */
  toSignUp() {
    const externalUrl = `${environment.baseUrl}/accounts/register/`;
    window.location.href = externalUrl;
  }


  /**
   * link to imprint
   */
  toImprint() {
    this.router.navigateByUrl('/imprint');
  }


  /**
   * link to pp
   */
  toPP() {
    this.router.navigateByUrl('/privacy-policy');
  }
}