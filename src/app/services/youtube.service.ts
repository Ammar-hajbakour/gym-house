import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  http = inject(HttpClient)
  constructor() { }
  options = {
    method: 'GET',
    params: {
      query: ''
    },
    headers: {
      'X-RapidAPI-Key': environment.apiKey,
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };


  search(query: string): Observable<any> {
    this.options.params.query = query
    const url = `${environment.youtubeUrl}?q=${query}`
    const ls = localStorage.getItem(url);
    const cachedResponse = ls ? JSON.parse(ls) : null;
    return cachedResponse ? of(cachedResponse.body) : this.http.get<any>(url, this.options)
  }

}
