import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import id from '@angular/common/locales/id';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminId: string = '';
  adminName: string = '';
  errorMessage: string = '';
  providers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

 loginAdmin(): void {
    if (!this.adminId || !this.adminName) {
      this.errorMessage = 'Both ID and Name are required';
      return;
    }

    const payload = {
      id: this.adminId,
      name: this.adminName
    };

    this.http.post<{ token: string, message: string }>('http://localhost:8080/admin/login', payload).subscribe({
      next: (response) => {
        // ✅ Store the token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'ADMIN');

        // ✅ Navigate to admin dashboard
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = err.error?.message || 'Login failed. Please check ID and name.';
      }
    });
  }
  }