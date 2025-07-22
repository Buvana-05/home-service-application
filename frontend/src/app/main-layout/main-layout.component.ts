import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone : true,
  imports: [ CommonModule,RouterOutlet, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls:[ './main-layout.component.css']
})
export class MainLayoutComponent implements OnInit{
  showLogout = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const role = localStorage.getItem('role');
        this.showLogout = role === 'ADMIN' || role === 'PROVIDER'; // ✅ Only show for admin
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/goodbye']);
  }
}
// <button routerLink="/goodbye" class="logout-btn">Logout</button>