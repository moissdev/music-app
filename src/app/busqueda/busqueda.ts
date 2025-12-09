import { Component} from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-busqueda',
  standalone: false,
  templateUrl: './busqueda.html',
  styleUrls: ['./busqueda.css']
})
export class Busqueda {
  termino: string = '';

  constructor(private spotifyService: SpotifyService) {}

  buscar() {
    if (this.termino.trim().length > 0) {
      this.spotifyService.searchTracks(this.termino);
    }
  }
}