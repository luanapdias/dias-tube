import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
})
export class PaginaInicialComponent {
  constructor(public auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/dashboard' }, // Redireciona para o dashboard após login
    });
  }
}
