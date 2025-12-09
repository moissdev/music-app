import { Component} from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: 'playlist.html',
  styleUrls: ['playlist.css']
})
export class Playlist {
  constructor(public spotifyService: SpotifyService) {}
}