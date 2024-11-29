import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Para ngModel

interface Video {
  thumbnail: string;
  channel_thumbnail: string;
  title: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importando FormsModule para ngModel
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  logoutUrl = window.location.origin; // Armazena o URL base
  videos: Video[] = []; // Inicializa como array vazio
  filteredVideos: Video[] = []; // Vídeos filtrados
  searchQuery: string = ''; // Query de pesquisa

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVideos(); // Carregar vídeos ao inicializar o componente
  }

  // Método para buscar os vídeos
  fetchVideos(): void {
    this.http.get<Video[]>('http://localhost:3000/videos').subscribe({
      next: (data) => {
        this.videos = data; // Preenche os vídeos com a resposta
        this.filteredVideos = data; // Inicializa os vídeos filtrados
      },
      error: (err) => console.error('Erro ao buscar vídeos:', err),
    });
  }

  // Método para abrir o link do vídeo
  openVideo(url: string): void {
    window.open(url, '_blank'); // Abre o link em uma nova aba
  }

  // Método para filtrar os vídeos com base na pesquisa
  filterVideos(): void {
    if (this.searchQuery.trim()) {
      this.filteredVideos = this.videos.filter(video =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredVideos = this.videos; // Caso a busca esteja vazia, mostra todos os vídeos
    }
  }
}
