import { NgModule,provideZoneChangeDetection, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Reproductor } from './reproductor/reproductor';
import { Playlist } from './playlist/playlist';
import { Busqueda } from './busqueda/busqueda';
import { Resultados } from './resultados/resultados';

@NgModule({
  declarations: [
    App,
    Reproductor,
    Playlist,
    Busqueda,
    Resultados
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
