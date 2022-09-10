import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { SpeakersComponent } from './speakers/speakers.component';

@NgModule({
  declarations: [AppComponent, EventosComponent, SpeakersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //respondável por importar o tipo necessário pra chamada da api no ts dos componentes
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
