import { Component, DestroyRef, Input, effect, inject, signal } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { DataService } from '../../services/data.service';
import { EFilter } from '../../models/e-filter';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { HorizontalScrollBarComponent } from '../../components/horizontal-scroll-bar/horizontal-scroll-bar.component';

const components = [
  SearchBarComponent,
  HorizontalScrollBarComponent,
  ExerciseCardComponent
]
@Component({
  selector: 'exercises',
  standalone: true,
  imports: [...components],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {

  private router = inject(Router)


  openDetails(exerciseId: string) {
    this.router.navigate(['exercises', exerciseId])
  }


  private readonly destroyRef = inject(DestroyRef)
  private dataService = inject(DataService)
  filter = signal<EFilter>({})
  filterItems = ["bodyPart", "equipment", "target"]
  exercises = signal<Exercise[]>([])
  bodyPart: Record<string, string>[] = []
  target: Record<string, string>[] = []
  equipment: Record<string, string>[] = []

  page = signal(1)
  constructor() {
    effect(() => {
      this.dataService.getExercises(this.filter(), this.page()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.exercises.set(res as Exercise[])
        }
      })
    }, { allowSignalWrites: true })
  }
  getListOf(x: string) {
    return this.dataService.getListOf(x).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (x === "bodyPart") this.bodyPart = res.map((x) => ({ title: x, imgUrl: "assets/icons/body-part.png" }))
        if (x === "target") this.target = res.map((x) => ({ title: x, imgUrl: "assets/icons/target.png" }))
        if (x === "equipment") this.equipment = res.map((x) => ({ title: x, imgUrl: "assets/icons/equipment.png" }))
      }
    })
  }
  ngOnInit() {
    this.filterItems.forEach((item) => this.getListOf(item))

  }
  searchByName(name: string) {
    this.filter.set({ name: name.toLowerCase() })
  }
  filterBy(item: string, value: string) {
    this.filter.set({ ...this.filter(), [item]: value })
  }

  loadMore() {
    this.page.update((val) => val + 1)
  }

}
