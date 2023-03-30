import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lot } from '@app/models/Lot';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class LotService {
  baseUrl = 'https://localhost:5001/api/lots';

  constructor(private http: HttpClient) {}

  public getLotsByEventId(eventId: number): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.baseUrl}/all/${eventId}`).pipe(take(1));
  }

  public saveLot(eventId: number, lots: Lot[]): Observable<Lot[]> {
    return this.http.put<Lot[]>(`${this.baseUrl}/put/${eventId}`, lots).pipe(take(1));
  }

  public deleteLot(eventId: number, lotId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${eventId}/${lotId}`).pipe(take(1));
  }
}
