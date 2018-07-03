import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from "./message.service";
import {Arrangementen} from "./arrangementen";
import {Session} from "./session";
import {Game} from "./game";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArrangementenService {

  getArrangementen(): Observable<Arrangementen[]> {
    return this.http.get<Arrangementen[]>('http://localhost:8080/api/account/1/arrangements')
      .pipe(map(res => <Arrangementen[]>res['content']),
        tap(game => console.log(game),
          catchError(this.handleError('getArrangementen', []))
        ));
  }

  addArrangement(name: String): Observable<Arrangementen>{
    return this.http.post<Arrangementen>('http://localhost:8080/api/arrangements/'+1, "{'name':"+name+"}",httpOptions).pipe(
      tap((arrangement: Arrangementen) => console.log(`added arrangement w/ id=${arrangement.id}`)),
      catchError(this.handleError<Arrangementen>('addArrangement'))
    );
  }

  deleteArrangement(arrangement: Arrangementen | number): Observable<Arrangementen> {
    const id = typeof arrangement === 'number' ? arrangement : arrangement.id;
    return this.http.delete<Arrangementen>('http://localhost:8080/api/arrangements/'+id, httpOptions).pipe(
      tap(_ => console.log(`deleted arrangement id=${id}`)),
      catchError(this.handleError<Arrangementen>('deleteArrangement'))
    );
  }

  addSession (pin:number, arrangement_id: number): Observable<Session>{
    return this.http.post<Session>('http://localhost:8080/api/sessions/'+arrangement_id, "{'pin':" + pin + ", 'game_id': " + arrangement_id + "}", httpOptions).pipe(
      tap((session: Session) => console.log(`added session w/ id=${session.id}`)),
      catchError(this.handleError<Session>('addSession'))
    );
  }

  getSessionByArrangementId(arrangement_id: number) : Observable<Session[]> {
    return this.http.get<Session[]>('http://localhost:8080/api/sessions/table/'+arrangement_id).pipe(
      map(res => <Session[]>res['content']),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} game_id=${arrangement_id}`);
      }),
      catchError(this.handleError<Session[]>(`getSessionById id=${arrangement_id}`))
    );
  }

  getSessionByPin(pin: number) : Observable<Session> {
    return this.http.get<Session>('http://localhost:8080/api/session/pin/'+pin).pipe(
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} session pin=${pin}`);
      }),
      catchError(this.handleError<Session>(`getSessionByPin pin=${pin}`))
    );
  }

  getGamesByArrangementId(arrangement_id: number) : Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8080/api/arrangement/'+arrangement_id+'/games').pipe(
      map(res => <Game[]>res['content']),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} arrangement_id=${arrangement_id}`);
      }),
      catchError(this.handleError<Game[]>(`getGamesByArrangementId id=${arrangement_id}`))
    );
  }

  private log(message: string) {
    this.messageService.add('CategoryService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private messageService: MessageService,
              private http: HttpClient) { }
}
