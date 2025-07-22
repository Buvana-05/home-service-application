import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goodbye',
  standalone: true,
  imports: [],
  templateUrl: './goodbye.component.html',
  styleUrl: './goodbye.component.css'
})
export class GoodbyeComponent implements OnInit{
  message: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.message = nav?.extras?.state?.['message'] || 'Thank you for visiting!';
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
