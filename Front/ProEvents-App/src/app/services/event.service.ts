import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//nosso objetivo é tornar esse serviço, algo injetável, para ser usado em outros locais. O provider abaixo permite a injeção em qualquer lugar. Tbm posso tornar ele injetavel colocando ele dentro do array de Providers no app.module.ts ou colocando a linha providers: [(nome do service)], dentro de @component, dentro do .components.ts do componente q quero injetar
@Injectable()
//{providedIn: 'root',}
export class EventService {
  baseUrl = 'https://localhost:5001/api/event';

  //aqui estou injetando o httpClient para ser usado n minha classe EventServie, para que eu possa fazer requisições http (cvs com minha API)
  constructor(private http: HttpClient) {}

  //com o Observable, eu estou tipando o método
  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/all`);
  }

  public getEventsByTheme(theme: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/theme/${theme}`);
  }

  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/id/${id}`);
  }
}
