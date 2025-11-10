import { Component, OnInit } from '@angular/core';

// (Opcional) Puedes definir una interfaz para dar estructura al objeto Cancion
interface Cancion {
  titulo: string;
  artista: string;
}

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: 'playlist.html',
  styleUrls: ['playlist.css']
})
export class Playlist implements OnInit {

  // **PROPIEDAD DEFINIDA**
  // El array que usamos para iterar en el HTML con *ngFor
  siguientesCanciones: Cancion[] = [
    { titulo: 'Nombre de la canción 1', artista: 'Artista, artistas' },
    { titulo: 'Nombre de la canción 2', artista: 'Artista, artistas' },
    { titulo: 'Nombre de la canción 3', artista: 'Artista, artistas' },
    { titulo: 'Nombre de la canción 4', artista: 'Artista, artistas' },
    { titulo: 'Nombre de la canción 5', artista: 'Artista, artistas' },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar la fila inicial al iniciar el componente
  }
}