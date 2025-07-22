import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginDropdownComponent } from '../login-dropdown/login-dropdown.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,RouterLink, LoginDropdownComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  showDropdown = false;

  logout(): void {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.clear();
      this.router.navigate(['/goodbye'], {
        state: { message: 'Thanks for visiting!' }
      });
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('provider');
  }

  goToLogin(): void {
    localStorage.setItem('loginFromHome', 'true');
    this.router.navigate(['/login/login']);
  }
}

