import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usernameSource = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Sends a login request with the provided username and password.
   * @param username 
   * @param password 
   * @returns 
   */
  public loginWithEmailAndPassword(username:string, password:string){
    const url = environment.apiUrl + '/login/';
    const body = {
      "username": username,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * help function to check if user is logged in, if true then returns the token
   * @returns 
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('bh-token');
  }

  /**
   * 
   */
  fetchCsrfToken() {
    const apiUrl = environment.apiUrl;
    this.http.get<{ csrf_token: string }>(`${apiUrl}/get-csrf-token/`, { withCredentials: true })
      .subscribe(
        response => {
          localStorage.setItem('bh-csrf_token', response.csrf_token);
          console.log('Fetching CSRF token successful');
        },
        error => {
          console.error('Error fetching CSRF token:', error);
        }
      );
  }

   /**
   * function for performing the password reset
   * @param email
   */
   resetPassword(email: string) {
    const apiUrl = environment.apiUrl;
    return this.http.post<any>(`${apiUrl}/get-csrf-token/`, { email }, { withCredentials: true });
  }
}