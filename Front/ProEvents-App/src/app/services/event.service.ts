import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '@app/models/Event';
import { take } from 'rxjs/operators';

//nosso objetivo é tornar esse serviço, algo injetável, para ser usado em outros locais. O provider abaixo permite a injeção em qualquer lugar. Tbm posso tornar ele injetavel colocando ele dentro do array de Providers no app.module.ts ou colocando a linha providers: [(nome do service)], dentro de @component, dentro do .components.ts do componente q quero injetar
@Injectable()
//{providedIn: 'root',}
export class EventService {
  baseUrl = 'https://localhost:5001/api/event';

  //aqui estou injetando o httpClient para ser usado n minha classe EventServie, para que eu possa fazer requisições http (cvs com minha API)
  constructor(private http: HttpClient) {}

  //com o Observable, eu estou tipando o método
  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/all`).pipe(take(1)); //esse take vai me desinscrever dos observables d acordo com o número d vezes q eu definir ali. Nesse caso, camou o getEvents 1x ele já desinscreve da chamada "subscribe"
  }

  public getEventsByTheme(theme: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/theme/${theme}`).pipe(take(1));
  }

  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/id/${id}`).pipe(take(1));
  }

  public post(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/post`, event).pipe(take(1));
  }

  public put(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/put/${event.id}`, event).pipe(take(1));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(take(1));//lembrando q ele retorna uma stg dzd se foi del
  }
}
