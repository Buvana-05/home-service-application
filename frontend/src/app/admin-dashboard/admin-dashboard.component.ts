import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  providers: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    const url = `http://localhost:8080/admin/all-providers?page=${this.currentPage}&size=5&search=${this.searchTerm}`;
    this.http.get<any>(url).subscribe({
      next: data => {
        this.providers = data.content;
        this.totalPages = data.totalPages;
      },
      error: err => {
        alert('Failed to load providers');
        console.error(err);
      }
    });
  }

  searchProviders(): void {
    this.currentPage = 0; // reset to first page
    this.loadProviders();
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadProviders();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProviders();
    }
  }

  editProvider(provider: any): void {
    localStorage.setItem('provider', JSON.stringify(provider));
    localStorage.setItem('role', 'ADMIN');
    this.router.navigate(['/profile']);
  }

  deleteProvider(id: number): void {
    if (confirm('Are you sure you want to delete this provider?')) {
      this.http.delete(`http://localhost:8080/admin/delete-provider/${id}`, { responseType: 'text' })
        .subscribe({
          next: () => {
            alert('Provider deleted successfully');
            this.loadProviders(); // refresh list
          },
          error: err => {
            alert('Failed to delete provider');
            console.error(err);
          }
        });
    }
  }
}
