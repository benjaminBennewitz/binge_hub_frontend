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

  constructor(private http: HttpClient) { }

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
}