import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from "rxjs/index";
import {Score} from "./score";
import {Scoreboard} from "./scoreboard";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ScoreService {

  addScoreboard (session_id: number): Observable<Scoreboard>{
    return this.http.post<Scoreboard>('http://localhost:8080/api/scoreboards/'+session_id, httpOptions).pipe(
      tap((scoreboard: Scoreboard) => console.log(`added scoreboard w/ id=${scoreboard.id}`)),
      catchError(this.handleError<Scoreboard>('addScoreboard'))
    );
  }

  addScore(name: String, score: number, scoreboard_id: number): Observable<Score>{
    return this.http.post<Score>('http://localhost:8080/api/scores/'+scoreboard_id,"{'name': '"+name+"','game_score':"+score+"}", httpOptions).pipe(
      tap((score: Score) => console.log(`added score w/ id=${score.id}`)),
      catchError(this.handleError<Score>('addScore'))
    );
  }

  getScoresByScoreboard(scoreboard_id: number): Observable<Score[]> {
    return this.http.get<Score[]>('http://localhost:8080/api/scoreboard/'+scoreboard_id+'/scores')
      .pipe(map(res => <Score[]>res['content']),
        tap(score => console.log(score),
          catchError(this.handleError('getScoresByScoreboard', []))
        ));
  }

  getScoreboardBySession(session_id: number): Observable<Scoreboard> {
    return this.http.get<Scoreboard>('http://localhost:8080/api/scoreboard/1'+session_id+'/scores').pipe(
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} session id=${session_id}`);
      }),
      catchError(this.handleError<Scoreboard>(`getScoreboardBySession id=${session_id}`))
    );
  }







  private log(message: string) {
    this.messageService.add('Scoreservice: ' + message);
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
              private http: HttpClient ) {}
}
