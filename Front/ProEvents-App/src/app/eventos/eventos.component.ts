import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any;

  constructor(private http: HttpClient) {}

  //esse método chama nosso getEventos antes da aplicação interpretar o html, é tipo o useEffect
  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    //chamando a api para pegar a resposta e atribuir na variavel eventos tds os eventos
    this.http.get('https://localhost:5001/api/event').subscribe(
      (response) => (this.eventos = response), //trás os eventos da api
      (error) => console.log(error) //escreve algum erro q der
    );
  }
}
