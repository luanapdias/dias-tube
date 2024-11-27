import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent }, // Página inicial
  { path: 'dashboard', component: DashboardComponent }, // Dashboard
];
