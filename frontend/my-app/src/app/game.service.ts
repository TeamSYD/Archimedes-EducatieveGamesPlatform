import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Memory } from './Memory'
import {MessageService} from "./message.service";
import {Game} from "./game";
import {Session} from "./session";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /** POST: add a new memory game to the server */
  addMemory (duplicates:boolean, openCards: boolean): Observable<Memory> {
    return this.http.post<Memory>('http://localhost:8080/api/memory', "{\"duplicates\":"+duplicates+",\"inverted\":"+openCards+"}", httpOptions).pipe(
      tap((memory: Memory) => console.log(`added memory w/ id=${memory.id}`)),
      catchError(this.handleError<Memory>('addMemory'))
    );
  }


  /** POST: add a new game game to the server */
  //TODO: add accountId to save Game with correct account
  addGame (name:string, time:number, game:string, ruleId:number): Observable<Game> {
    return this.http.post<Game>('http://localhost:8080/api/games/1/' + ruleId, "{\"name\":\""+name+"\",\"time\":"+time+",\"game\":\""+game+"\"}", httpOptions).pipe(
      tap((game: Game) => console.log(`added game w/ id=${game.id}`)),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  addSession (pin:number): Observable<Session>{
    return this.http.post<Session>('http://localhost:8080/api/sessions', "{'PIN':" + pin + "}", httpOptions).pipe(
      tap((session: Session) => console.log(`added session w/ id=${session.id}`)),
      catchError(this.handleError<Session>('addSession'))
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
