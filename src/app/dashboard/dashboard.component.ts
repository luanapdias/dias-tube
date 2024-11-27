import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Video {
  thumbnail: string;
  title: string;
  url: string;
}

interface ApiResponse {
  videos: Video[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  logoutUrl = window.location.origin; // Armazena o URL base
  videos: Video[] = []; // Lista de vídeos

  constructor(public auth: AuthService, private http: HttpClient) {
    this.fetchVideos();
  }

  // Método para buscar os vídeos
  fetchVideos(): void {
    this.http.get<ApiResponse>('http://localhost:3000/videos').subscribe({
      next: (data) => {
        this.videos = data.videos; // Mapeia os vídeos corretamente
      },
      error: (err) => console.error('Erro ao buscar vídeos:', err),
    });
  }

  // Método para abrir o link do vídeo
  openVideo(url: string): void {
    window.open(url, '_blank'); // Abre o link em uma nova aba
  }
}
