import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyC4KK2l1-wzxdk2JKR0Aol3okxfFnrz-KY',
      authDomain: 'project1-2b957.firebaseapp.com',
      projectId: 'project1-2b957',
      storageBucket: 'project1-2b957.appspot.com',
      messagingSenderId: '967594474287',
      appId: '1:967594474287:web:06d53832325392b9c27fda',
      measurementId: 'G-8M0MQWR1LE'
    })),
    provideAuth(() => getAuth()),
    provideRouter(routes), provideAnimations(), provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()

  ]
};
