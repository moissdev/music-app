import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // --- CONFIGURACIÓN API ---
  // Nota: Necesitarás un token válido. Para pruebas rápidas obtenlo aquí: 
  // https://developer.spotify.com/console/get-search-item/
  private token = '1POdFZRZbvb...qqillRxMr2z'; 
  private baseUrl = 'https://api.spotify.com/v1';
  
  currentSong = signal<any>(null);
  isPlaying = signal<boolean>(false);
  currentQueue = signal<any[]>([]);
  searchResults = signal<any[]>([]);

  private audio = new Audio();

  constructor(private http: HttpClient) {
    // Escuchar cuando termina una canción para pasar a la siguiente
    this.audio.addEventListener('ended', () => this.next());
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
    
    // Nota: La API estándar solo da 'preview_url' (30 seg). 
    // Para canciones completas se necesita el Web Playback SDK (más avanzado).
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
  
  // Obtener tiempo actual y duración para la barra de progreso
  getAudioElement() {
    return this.audio;
  }
  
}
