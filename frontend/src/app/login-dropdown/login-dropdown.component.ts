import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dropdown',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './login-dropdown.component.html',
  styleUrl: './login-dropdown.component.css'
})
export class LoginDropdownComponent {
  showMenu = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.showMenu = false; // Close dropdown after navigation
  }
}
