import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  contactNo: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const fromHome = localStorage.getItem('loginFromHome') === 'true';

    this.http.post<any>('http://localhost:8080/api/providers/login', {
      contactNo: this.contactNo,
      password: this.password
    }).subscribe({
      next: (res) => {
       // if (fromHome && res.token && (res.role === 'admin' || res.role === 'provider')) {
       //   localStorage.setItem('userRole', res.role);
       // }

      //  localStorage.removeItem('loginFromHome');
        this.router.navigate(['/profile']);
        console.log('Response from server:', res); // ✅ Add this line to debug
        
        if (res.token) {    
          localStorage.setItem('role', 'PROVIDER');    
          localStorage.setItem('token', res.token);             // ✅ Save token
          localStorage.setItem('provider', JSON.stringify(res.user));
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'No token received from server.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error || 'Login failed. Please try again.';
      }
    });
  }
  validateNumber(event: KeyboardEvent): boolean {
    const input = event.key;
  
    // Allow only digits
    if (!/^[0-9]$/.test(input)) {
      event.preventDefault();
      return false;
    }
  
    // Prevent entering more than 10 digits
    const target = event.target as HTMLInputElement;
    if (target.value.length >= 10) {
      event.preventDefault();
      return false;
    }
  
    return true;
  }
}