import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { defineCustomElements, addTheme } from '@scania-sdds/components';
import { theme as scania } from '@scania-sdds/theme-light';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

defineCustomElements();
addTheme(scania);
