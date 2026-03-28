import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Yahan path sahi hona chahiye
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));