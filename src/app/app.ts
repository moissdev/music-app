import { Component, signal, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('music-app');

  constructor(
    private spotifyLogin: SpotifyService
  ) {}

  ngOnInit(): void {
    this.spotifyLogin.getToken().subscribe((data) => {
      const token = data.access_token;
  });
  }

  
}
