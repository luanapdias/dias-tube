import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importando o Router

interface Video {
  thumbnail: string;
  channel_thumbnail: string;
  title: string;
  url: string;
  description: string;
  id: string;  // Certifique-se de que o ID do vídeo esteja no seu modelo
  views: number; // Adicionando views
  uploadedAt: string; // Adicionando data de upload
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importando FormsModule para ngModel
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  logoutUrl = window.location.origin;
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  searchQuery: string = '';

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private router: Router // Injetando o Router
  ) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos(): void {
    this.http.get<Video[]>('http://localhost:3000/videos').subscribe({
      next: (data) => {
        this.videos = data;
        this.filteredVideos = data;
      },
      error: (err) => console.error('Erro ao buscar vídeos:', err),
    });
  }

  onVideoClick(id: string): void {
    // Navegar para o componente video-detail com o ID do vídeo
    this.router.navigate(['/video-detail', id]);
  }

  filterVideos(): void {
    if (this.searchQuery.trim()) {
      this.filteredVideos = this.videos.filter((video) =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredVideos = this.videos;
    }
  }
}
