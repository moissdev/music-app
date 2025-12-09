import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { App } from '../app';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  private token = this.getToken(); 
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
    
  }

  getToken(): Observable<any> {
    const body = new HttpParams()
      .set("grant_type","client_credentials")
      .set("client_id",environment.client_id)
      .set("client_secret",environment.client_secret)

    return this.http.post<any>(`${environment.API_URL}api/token`, body.toString(),
    {
      headers: {'Content-Type': "application/x-www-form-urlencoded"}
    }
  );

  }

  searchTracks(query: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this.http.get(`${this.baseUrl}/search?q=${query}&type=track&limit=10`, { headers })
      .subscribe((response: any) => {
        this.searchResults.set(response.tracks.items);
      });
  }

  playTrack(track: any) {
    this.currentSong.set(track);
    
    if (track.preview_url) {
      this.audio.src = track.preview_url;
      this.audio.load();
      this.audio.play();
      this.isPlaying.set(true);
    } else {
      console.warn('Esta canción no tiene preview disponible en la API gratuita');
    }

    const queue = this.currentQueue();
    const exists = queue.some((t: any) => t.id === track.id);

    if (queue.length === 0 || !exists) {
      const index = this.searchResults().findIndex((t: any) => t.id === track.id);
      
      if (index !== -1) {
        const newQueue = this.searchResults().slice(index, index + 10);
        this.currentQueue.set(newQueue);
      }
    }
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.isPlaying.set(true);
    } else {
      this.audio.pause();
      this.isPlaying.set(false);
    }
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

    if (currentIndex > 0) {
      this.playTrack(queue[currentIndex - 1]);
    }
  }
  
  getAudioElement() {
    return this.audio;
  }
  
}
