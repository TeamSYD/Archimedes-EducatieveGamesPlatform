import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Memory } from './Memory'
import { MessageService } from "./message.service";
import { Game } from "./game";
import { Puzzle } from "./Puzzle";
import { Session } from "./session";


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

  /** POST: add a new puzzle game to the server */
  addPuzzle (card_order: boolean): Observable<Puzzle> {
    return this.http.post<Puzzle>('http://localhost:8080/api/puzzle', "{\"cardOrder\":"+card_order+"}", httpOptions).pipe(
      tap((puzzle: Puzzle) => console.log(`added puzzle w/ id=${puzzle.id}`)),
      catchError(this.handleError<Puzzle>('addPuzzle'))
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

  /** DELETE: delete the game from the server */
  deleteGame (game: Game | number): Observable<Game> {
    const id = typeof game === 'number' ? game : game.id;
    console.log('in delete game met id: ' + id);
    return this.http.delete<Game>('http://localhost:8080/api/games/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted game id=${id}`)),
      catchError(this.handleError<Game>('deleteGame'))
    );
  }

  getGames(): Observable<Game[]> {
  // TODO: send the message _after_ fetching the games
  console.log("Fetched games.");
  return this.http.get<Game[]>('http://localhost:8080/api/account/1/games')
.pipe(map(res => <Game[]>res['content']),
  tap(game => console.log(game),
  catchError(this.handleError('getGames', []))
));
}

  updateGameArrangementId(gameId: number, arrangement_id: number): Observable<any> {
    return this.http.put('http://localhost:8080/api/games/'+gameId+'/arrangement/'+arrangement_id, httpOptions).pipe(
      tap(_ => this.log(`updated arrangement_id id=${arrangement_id}`)),
      catchError(this.handleError<any>('updateGameArrangementId'))
    );
  }

  updateMemory(id: number, duplicate: boolean, inverted: boolean){
    return this.http.put("http://localhost:8080/api/memory/"+id+"/update", {"duplicates": duplicate, "inverted": inverted}, httpOptions).pipe(
      tap((memory: Memory) => this.log("Memory w/"+id),
    catchError(this.handleError<Memory>('updateCard')))
  );
  }

  getPuzzleByGameId(id: number): Observable<Puzzle> {
    // TODO: send the message _after_ fetching the games
    console.log("Fetched games.");
    return this.http.get<Puzzle>('http://localhost:8080/api/puzzle/' + id + '/rule')
      .pipe(tap(game => console.log(game),
          catchError(this.handleError('getPuzzle'))
        ));
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
              private http: HttpClient
  ) { }
}
