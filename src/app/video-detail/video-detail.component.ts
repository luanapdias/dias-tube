import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

interface Video {
  thumbnail: string;
  channel_thumbnail: string;
  title: string;
  url: string; 
  description: string;
  id: string;
  views: number;
  uploadedAt: string;
}

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent implements OnInit {
  videoId!: string;
  video: Video = {} as Video;
  userPicture: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public auth: AuthService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.videoId = params.get('id')!;
      this.fetchVideoDetails(this.videoId);
    });

    this.auth.user$.subscribe({
      next: (user) => {
        this.userPicture = user?.picture || null;
      },
      error: (err) => {
        console.error('Erro ao carregar os dados do usuário:', err);
      },
    });
  }

  fetchVideoDetails(id: string): void {
    this.http.get<Video>(`http://localhost:3000/videos/${id}`).subscribe({
      next: (data) => {
        this.video = data;
      },
      error: (err) =>
        console.error('Erro ao carregar os detalhes do vídeo:', err),
    });
  }

  incrementViewCount(): void {
    this.video.views++;
    this.http.put<Video>(`http://localhost:3000/videos/${this.video.id}`, this.video).subscribe({
      next: (data) => {
        this.video = data;
      },
      error: (err) => console.error('Erro ao atualizar as visualizações:', err),
    });
  }
}
