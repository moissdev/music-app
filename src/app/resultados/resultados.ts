import { Component} from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-resultados',
  standalone: false,
  templateUrl: 'resultados.html',
  styleUrls: ['resultados.css']
})
export class Resultados {

  constructor(public spotifyService: SpotifyService) {}

  seleccionarCancion(track: any) {
    this.spotifyService.playTrack(track);
  }
}