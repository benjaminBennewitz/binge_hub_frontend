// button-visibility.service.ts

import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ButtonVisibilityService {

  constructor(private router: Router) {
    this.manageButtonsBasedOnURL();
    // detect routing changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.manageButtonsBasedOnURL();
    });
  }

  /**
   * hides or displays specific button by current url
   * hide log in button when url is not /overview
   * displays log out button when url is /overview
   */
  manageButtonsBasedOnURL() {
    // get current url
    const currentURL = this.router.url;

    const logInButton = document.getElementById('logIn');
    const logOutButton = document.getElementById('logOut');

    if (logInButton && logOutButton) {
      if (currentURL !== '/overview') {
        logInButton.classList.remove('hide');
        logOutButton.classList.add('hide');
      } else {
        logInButton.classList.add('hide');
        logOutButton.classList.remove('hide');
      }
    }
  }
}