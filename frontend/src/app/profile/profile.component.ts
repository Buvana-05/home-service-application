import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls:[ './profile.component.css']
})
export class ProfileComponent implements OnInit{
  provider: any = {};
  role: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    
    const stored = localStorage.getItem('provider');
    this.provider = stored ? JSON.parse(stored) : {};
    this.role = localStorage.getItem('role') || '';
    //console.log("📸 Photo Path: ", this.provider.photoPath);
   
    // ✅ Fallback: infer role from data
    if (!this.role && this.provider?.contactNo) {
      this.role = 'PROVIDER';
    }

    console.log("🔎 Loaded Role:", this.role);
    console.log("👤 Provider:", this.provider);
    
    if (!stored) {
      this.router.navigate(['/']);
    }

    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (stored) {
      this.provider = JSON.parse(stored);
      
    } else {
      //alert('No provider data found. Redirecting to login.');
      this.router.navigate(['/']);
    }    
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isProvider(): boolean {
    return this.role === 'PROVIDER';
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('contactNo', this.provider.contactNo); // Important
  
      this.http.post<any>('http://localhost:8080/api/providers/upload-photo', formData)
        .subscribe({
          next: (res) => {
          alert(res.message);  // e.g., "Photo uploaded successfully"
          this.provider.photoPath = res.photoPath;  // ✅ Use actual file name returned from server
          },
      error: (err) => {
      alert('Photo upload failed');
      console.error(err);
      }
    });
  }
  }

  updateProfile(): void {
    console.log("🔁 Attempting update with role:", this.role);
    console.log("📦 Provider data:", this.provider);
    console.log("🔄 Updating provider:", this.provider);
  
  if (this.role === 'ADMIN') {
    // Admin update with ID
    const id = this.provider.id;
    this.http.put(`http://localhost:8080/admin/update-provider/${id}`, this.provider, {
      responseType: 'text' // avoid 200 error misinterpreted
    }).subscribe({
      next: (res) => {
        alert('✅ Admin updated provider successfully');
        console.log("✅ Response:", res);
      },
      error: (err) => {
        alert('❌ Admin update failed');
        console.error(err);
      }
    });

  } else if (this.role === 'PROVIDER') {
    // Provider updates own profile
    this.http.put('http://localhost:8080/api/providers/update', this.provider, {
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        alert('✅ Provider updated profile successfully');
        console.log("✅ Response:", res);
      },
      error: (err) => {
        alert('❌ Provider update failed');
        console.error(err);
      }
    });

  } else {
    alert('⚠️ Unknown role. Cannot update.');
  }

}
//logout() {
 // localStorage.clear(); // or remove specific keys like localStorage.removeItem('contactNo')
//  this.router.navigate(['/login/login']); // ✅ Redirect to login page
//}
}