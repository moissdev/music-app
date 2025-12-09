import { Component, effect } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-reproductor',
  standalone: false,
  templateUrl: 'reproductor.html',
  styleUrl: 'reproductor.css',
})
export class Reproductor {
  currentTime: number = 0;
  duration: number = 0;

  constructor(public spotifyService: SpotifyService) {
    const audio = this.spotifyService.getAudioElement();

    // Actualizar barra de progreso
    audio.ontimeupdate = () => {
      this.currentTime = audio.currentTime;
    };
    audio.ondurationchange = () => {
      this.duration = audio.duration;
    };
  }

  seek(event: any) {
    const audio = this.spotifyService.getAudioElement();
    audio.currentTime = event.target.value;
  }
}
