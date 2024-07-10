// auth-interceptor.ts

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = localStorage.getItem('csrf_token');

    // Add CSRF token to headers for POST requests
    if (csrfToken && request.method === 'POST') {
      request = request.clone({
        headers: request.headers.set('X-CSRFToken', csrfToken),
        withCredentials: true  // Ensure withCredentials is set for cookie transmission
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized (e.g., redirect to login page)
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
