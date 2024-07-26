import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}


  /**
   * inserts the token to every header when posting
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
      const csrfToken = localStorage.getItem('bh-csrf_token');
      if (csrfToken) {
        request = request.clone({
          headers: request.headers.set('X-CSRFToken', csrfToken),
          withCredentials: true
        });
      }
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
