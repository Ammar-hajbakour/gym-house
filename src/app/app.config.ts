import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cachingInterceptor } from './services/caching.interceptor';
import { httpErrorsInterceptor } from './services/http.erros.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })), provideHttpClient(withInterceptors([httpErrorsInterceptor, cachingInterceptor]))]
};
