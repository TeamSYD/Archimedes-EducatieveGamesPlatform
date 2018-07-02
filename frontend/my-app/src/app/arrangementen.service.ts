import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from "./message.service";
import {Arrangementen} from "./arrangementen";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArrangementenService {

  addArrangement(pin:number, game_id: number): Observable<Arrangementen>{
    return this.http.post<Arrangementen>('http://localhost:8080/api/sessions/'+game_id, "{'pin':" + pin + ", 'game_id': " + game_id + "}", httpOptions).pipe(
      tap((arrangement: Arrangementen) => console.log(`added session w/ id=${arrangement.id}`)),
      catchError(this.handleError<Arrangementen>('addSession'))
    );
  }

  deleteArrangement(arrangement: Arrangementen | number): Observable<Arrangementen> {
    const id = typeof arrangement === 'number' ? arrangement : arrangement.id;
    console.log('in delete arrangement met id: ' + id);
    return this.http.delete<Arrangementen>('http://localhost:8080/api/arrangements/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted arrangement id=${id}`)),
      catchError(this.handleError<Arrangementen>('deleteArrangement'))
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
