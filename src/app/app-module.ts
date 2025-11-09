import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
