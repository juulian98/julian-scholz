import {ApplicationConfig} from '@angular/core';
import {InMemoryScrollingFeature, provideRouter, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  });
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, inMemoryScrollingFeature)]
};
