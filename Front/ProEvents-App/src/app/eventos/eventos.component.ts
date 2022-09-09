import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any;

  constructor() {}

  //esse método chama nosso getEventos antes da aplicação interpretar o html, é tipo o useEffect
  ngOnInit(): void {
    this.getEventos;
  }

  public getEventos(): void {
    this.eventos = [
      {
        Tema: 'Angular 11',
        Local: 'Seattle',
      },
      {
        Tema: '.NET 5',
        Local: 'New York',
      },
      {
        Tema: 'Angular e suas novidades',
        Local: 'Boston',
      },
    ];
  }
}
