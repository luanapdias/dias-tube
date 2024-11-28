import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sessionKey = 'userSession';

  constructor() {}

  // Salva o estado da sessão
  login(userData: any): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(userData));
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return localStorage.getItem(this.sessionKey) !== null;
  }

  // Retorna os dados da sessão
  getUserData(): any {
    const data = localStorage.getItem(this.sessionKey);
    return data ? JSON.parse(data) : null;
  }

  // Remove o estado da sessão
  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }
}
