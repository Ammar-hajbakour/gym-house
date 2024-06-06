import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hero-banner',
  standalone: true,
  imports: [],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent {
  router = inject(Router)
}
