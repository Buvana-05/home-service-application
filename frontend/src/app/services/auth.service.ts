import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(value: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}
onLogin(email: string, password: string): Observable<boolean> {
    console.log('AuthService.login() called with:', email, password);

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('✅ Login API response:', response);
        if (response?.token) {
          localStorage.setItem('jwt', response.token);
        } else {
          console.warn('🚨 No token in response:', response);
        }
      }),
      map(() => true),
      catchError(error => {
        console.error('❌ Login error:', error);
        return of(false);
      })
    );
  }
getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
