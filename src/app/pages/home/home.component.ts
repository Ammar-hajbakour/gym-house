import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ExercisesComponent } from '../exercises/exercises.component';
import { DataService } from '../../services/data.service';
import { Exercise } from '../../models/exercise';
import { EFilter } from '../../models/e-filter';
import { JsonPipe } from '@angular/common';
import { HorizontalScrollBarComponent } from '../../components/horizontal-scroll-bar/horizontal-scroll-bar.component';
import { exersices } from '../../services/static.data';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
