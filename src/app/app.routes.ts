import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'exercises',
    loadComponent: () => import('./pages/exercises/exercises.component').then(m => m.ExercisesComponent),
  },
  {
    path: 'exercises/:id',
    loadComponent: () => import('./pages/exercise-detail/exercise-detail.component').then(m => m.ExerciseDetailComponent)
  },
  {
    path: '**',
    redirectTo: '',
  }
];
