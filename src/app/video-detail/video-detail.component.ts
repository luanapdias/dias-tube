import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  videoId!: string;
  video: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id')!;
      this.fetchVideoDetails(this.videoId);
    });
  }

  fetchVideoDetails(id: string): void {
    this.http.get<any>(`http://localhost:3000/videos/${id}`).subscribe({
      next: (data) => {
        this.video = data;
      },
      error: (err) => console.error('Erro ao carregar os detalhes do vídeo:', err)
    });
  }
}

