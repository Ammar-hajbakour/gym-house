import { HttpInterceptorFn } from '@angular/common/http';
import { of, tap } from 'rxjs';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') return next(req);
  const ls = localStorage.getItem(req.url);
  const cachedRequest = ls ? JSON.parse(ls) : null;
  return cachedRequest ? of(cachedRequest) : next(req).pipe(tap((res: any) => {
    localStorage.setItem(`${req.url}`, JSON.stringify(res));
  }));
};
