import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls:[ './about.component.css']
})
export class AboutComponent {
  services: string[] = [
    '🛠️ Plumbing',
    '💡 Electrician',
    '🧹 Home Cleaning'
  ];
}
