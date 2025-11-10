// app-resultados-busqueda.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  standalone: false,
  templateUrl: 'resultados.html',
  styleUrls: ['resultados.css']
})
export class Resultados implements OnInit {

  // **PROPIEDAD DEFINIDA**
  // Booleano que controla si se muestra el mensaje inicial o los resultados de una búsqueda
  busquedaActiva: boolean = false; // Inicialmente es 'false' para mostrar el mensaje: "Aquí se mostrarán..."

  // También puedes definir la variable para el término de búsqueda
  terminoBusqueda: string = '';

  // Y el array de resultados, que estaría vacío inicialmente
  resultados: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // Ejemplo de un método que se ejecutaría al recibir un resultado
  mostrarResultados(activa: boolean): void {
    this.busquedaActiva = activa;
  }
}