import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';

import { routes } from './app.routes';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNzI18n(fr_FR)
  ]
};
