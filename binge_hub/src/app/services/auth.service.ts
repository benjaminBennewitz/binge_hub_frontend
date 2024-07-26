import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernameSource = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  /**
   * Sends a login request with the provided username and password.
   * @param username
   * @param password
   * @returns
   */
  public loginWithEmailAndPassword(username: string, password: string) {
    const url = this.apiUrl + '/login/';
    const body = {
      username: username,
      password: password,
    };
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
   * Fetches the CSRF token from the server and stores it in local storage.
   *
   * This method sends a GET request to the server to retrieve a CSRF token.
   * The token is then stored in local storage for future use in secure requests.
   * It logs a success message to the console if the token is fetched successfully,
   * or an error message if the request fails.
   */
  fetchCsrfToken() {
    this.http
      .get<{ csrf_token: string }>(`${this.apiUrl}/get-csrf-token/`, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          localStorage.setItem('bh-csrf_token', response.csrf_token);
          console.log('Fetching CSRF token successful');
        },
        (error) => {
          console.error('Error fetching CSRF token:', error);
        }
      );
  }


  /**
   * function for performing the password reset
   * @param email
   */
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/password_reset/`,
      { email },
      { withCredentials: true }
    );
  }
}