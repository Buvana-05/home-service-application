import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-find-provider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-provider.component.html',
  styleUrl: './find-provider.component.css'
})
export class FindProviderComponent {
  city = '';
  profession = '';
  professions = ['Plumber', 'Electrician', 'Cleaner'];

  providers: any[] = [];
  showResults = false;
  isAdmin: boolean = true;

  constructor(private http: HttpClient) {}

  findServiceProvider() {
   // if (this.city && this.profession) {
   //   const url = `http://localhost:8080/api/providers?city=${this.city}&profession=${this.profession}`;
    //  this.http.get<any[]>(url).subscribe({
    //    next: (data) => {
    //      this.providers = data;
    //      this.showResults = true;
    //    },
    //    error: (err) => {
     //     console.error('Error fetching providers:', err);
     //     alert('Failed to load service providers.');
     //     this.showResults = false;
     //   }
     // });
    //} else {
   //   alert('Please enter city and select profession');
   //   this.showResults = false;
   // }

   const params = new HttpParams()
   .set('city', this.city)
   .set('profession', this.profession);

 this.http.get<any[]>('http://localhost:8080/api/providers', { params })
   .subscribe({
     next: data => this.providers = data,
     error: err => console.error('Error fetching providers', err)
   });
}
  
}