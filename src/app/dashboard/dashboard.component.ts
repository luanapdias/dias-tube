import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Video {
  thumbnail: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  logoutUrl = window.location.origin;
  videos: Video[] = [];

  constructor(public auth: AuthService, private http: HttpClient) {
    this.fetchVideos();
  }

  private fetchVideos(): void {
    this.http.get<Video[]>('http://localhost:3000/videos').subscribe({
      next: (data) => {
        this.videos = data;
      },
      error: (err) => console.error('Erro ao buscar vídeos:', err),
    });
  }

  openVideo(url: string): void {
    window.open(url, '_blank');
  }
}
