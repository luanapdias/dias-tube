import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      () => {
        const auth = inject(AuthService);
        return auth.isAuthenticated$.pipe(
          tap((isAuthenticated) => {
            if (!isAuthenticated) {
              window.location.href = '/'; // Redireciona para a página inicial
            }
          })
        );
      },
    ],
  },
];
