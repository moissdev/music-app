// app-barra-busqueda.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  standalone: false,
  templateUrl: './busqueda.html',
  styleUrls: ['./busqueda.css']
})
export class Busqueda implements OnInit {

  // **PROPIEDAD DEFINIDA**
  // Almacena el texto que el usuario ingresa en la barra de búsqueda.
  // Es necesaria para el two-way binding con [(ngModel)] en el HTML.
  terminoBusqueda: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  // Ejemplo de un método que se podría llamar al presionar 'Enter'
  iniciarBusqueda(): void {
    if (this.terminoBusqueda.trim().length > 0) {
      console.log('Buscando:', this.terminoBusqueda);
      // Aquí iría la lógica para emitir el término a otros componentes (p. ej., a ResultadosBusquedaComponent)
    }
  }
}