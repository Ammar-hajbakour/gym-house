import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

const components = [
  NavbarComponent,
  FooterComponent
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
