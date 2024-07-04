import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private emailSource = new BehaviorSubject<string>('');
  currentUsername = this.emailSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Sends a login request with the provided email and password.
   * @param email 
   * @param password 
   * @returns 
   */
  public loginWithUserAndPassword(email:string, password:string){
    const url = environment.baseUrl + '/login/';
    const body = {
      "email": email,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * help function to check if user is logged in, if true then returns the token
   * @returns 
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}