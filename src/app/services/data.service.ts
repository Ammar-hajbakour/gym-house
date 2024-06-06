import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of, tap } from 'rxjs';
import { Exercise } from '../models/exercise';
import { HttpClient } from '@angular/common/http';
import { EFilter } from '../models/e-filter';
import { bodyPart, equipment, exersices, target } from './static.data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient)
  constructor() { }
  private options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': environment.apiKey,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  // getExercises(filter: EFilter, currentPage = 1): Observable<Exercise[] | null> {
  //   let url: string
  //   const offset = (currentPage - 1) * 10
  //   const { name, equipment, target, bodyPart } = filter
  //   if (name) url = `${environment.apiUrl}/name/${name}`
  //   else if (equipment) url = `${environment.apiUrl}/equipment/${equipment}`
  //   else if (target) url = `${environment.apiUrl}/target/${target}`
  //   else if (bodyPart) url = `${environment.apiUrl}/bodyPart/${bodyPart}`
  //   else url = environment.apiUrl

  //   url = `${url}?limit=10&offset=${offset}`

  //   const ls = localStorage.getItem(`${url}`);
  //   const cachedResponse = ls ? JSON.parse(ls) : null;
  //   return cachedResponse ? of(cachedResponse.body) : this.http.get<Exercise[]>(url, this.options)
  // }
  // getById(id: string): Observable<Exercise | null> {
  //   const url = `${environment.apiUrl}/exercises/exercise/${id}`
  //   const ls = localStorage.getItem(`${url}`);
  //   const cachedResponse = ls ? JSON.parse(ls) : null;
  //   return cachedResponse ? of(cachedResponse.body) : this.http.get<Exercise>(url, this.options)
  // }
  getExercises(filter: EFilter, currentPage = 1): Observable<Exercise[] | null> {
    return of(exersices)
  }

  getById(id: string): Observable<Exercise | null> {
    return of(exersices.filter(exercise => exercise.id === id)[0] || null)
  }

  getListOf(x: string): Observable<string[]> {
    return x === 'bodyPart' ? of(bodyPart) : (x === 'equipment' ? of(equipment) : of(target))
  }
}
