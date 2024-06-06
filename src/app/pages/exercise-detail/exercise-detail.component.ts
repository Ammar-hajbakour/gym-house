import { Component, DestroyRef, Signal, WritableSignal, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Exercise } from '../../models/exercise';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { YoutubeService } from '../../services/youtube.service';
import { ReplaySubject } from 'rxjs';
import { HorizontalScrollBarComponent } from '../../components/horizontal-scroll-bar/horizontal-scroll-bar.component';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [TitleCasePipe, JsonPipe, HorizontalScrollBarComponent, ExerciseCardComponent],
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.scss'
})
export class ExerciseDetailComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  dataService = inject(DataService)
  youtubeService = inject(YoutubeService)
  destroyRef = inject(DestroyRef)


  exercise = signal<Exercise | null>(null)
  youtubeVideos: any[] = []
  similarExercises: Record<string, Exercise[]> = {}

  showingItemsCount!: number;
  constructor() {
    effect(() => {
      const q = this.exercise() ? this.exercise()?.name ?? '' : ''
      this.youtubeService.search(q).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.youtubeVideos = res.contents.slice(0, 3)
        }
      })
    })
  }

  navigateToExercise(exercise: any) {
    this.router.navigate(['exercises', exercise.id])
  }
  ngOnInit() {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (params) => {
        if (!params['id']) return
        this.dataService.getById(params['id']).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (res: Exercise | null) => {
            if (!res) return
            this.exercise.set(res)
          }
        })
      }
    })
    this.dataService.getExercises({ target: this.exercise()?.target ?? '' }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: Exercise[] | null) => {
        if (!res) return
        this.similarExercises['target'] = res
      }
    })

    this.dataService.getExercises({ equipment: this.exercise()?.equipment ?? '' }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: Exercise[] | null) => {
        if (!res) return
        this.similarExercises['equipment'] = res
      }
    })

    this.dataService.getExercises({ bodyPart: this.exercise()?.bodyPart ?? '' }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: Exercise[] | null) => {
        if (!res) return
        this.similarExercises['bodyPart'] = res
      }
    })
  }
}
