import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { App } from '../app';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  private token = ''; 
  private baseUrl = 'https://api.spotify.com/v1';
  
  currentSong = signal<any>(null);
  isPlaying = signal<boolean>(false);
  currentQueue = signal<any[]>([]);
  searchResults = signal<any[]>([]);

  private audio = new Audio();

  constructor(
    private http: HttpClient
  ) {
    this.audio.addEventListener('ended', () => this.next());
    this.getToken();
    
  }
  
  getToken() {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);

    // Nota: La URL para tokens es diferente (accounts.spotify.com)
    this.http.post('https://accounts.spotify.com/api/token', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe({
      next: (data: any) => {
        this.token = data.access_token;
        console.log('Token generado automáticamente con éxito');
      },
      error: (err) => {
        console.error('Error obteniendo token automático:', err);
      }
    });
  }

  searchTracks(query: string) {
    if (!this.token) {
      console.error('Aún no hay token, espera un momento...');
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    
    this.http.get(`${this.baseUrl}/search?q=${query}&type=track&limit=10`, { headers })
      .subscribe((response: any) => {
        this.searchResults.set(response.tracks.items);
      });
  }

  playTrack(track: any) {
    this.currentSong.set(track);
    this.isPlaying.set(true); 
    
    console.warn('Modo solo búsqueda: El token automático no permite reproducción de audio completa.');

    const queue = this.currentQueue();
    const exists = queue.some((t: any) => t.id === track.id);

    if (queue.length === 0 || !exists) {
      const index = this.searchResults().findIndex((t: any) => t.id === track.id);
      if (index !== -1) {
        this.currentQueue.set(this.searchResults().slice(index, index + 10));
      }
    }
  }

  togglePlay() {
    this.isPlaying.set(!this.isPlaying());
  }

  next() {
    const queue = this.currentQueue();
    const current = this.currentSong();
    const currentIndex = queue.findIndex((t: any) => t.id === current.id);
    if (currentIndex >= 0 && currentIndex < queue.length - 1) {
      this.playTrack(queue[currentIndex + 1]);
    }
  }

  prev() {
    const queue = this.currentQueue();
    const current = this.currentSong();
    const currentIndex = queue.findIndex((t: any) => t.id === current.id);
    if (currentIndex >= 0 && currentIndex < queue.length - 1) {
      this.playTrack(queue[currentIndex + 1]);
    }
  }
  
  getAudioElement() {
    return this.audio;
  }
  
}
