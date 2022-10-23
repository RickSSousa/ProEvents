import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '@app/models/Event';

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

  public post(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/post`, event);
  }

  public put(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/put/${id}`, event);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);//lembrando q ele retorna uma stg dzd se foi del
  }
}
