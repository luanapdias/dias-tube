import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-trvf8twqkvtfdt56.us.auth0.com',
      clientId: 'pNLQAHg8h3TAM1sDc60Db0hvc6LSgCS1',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      skipRedirectCallback: false, 
    }),
  ],
};
