import { Injectable } from '@angular/core';
import { Game } from './game'
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {




  /** POST: add a new game to the server */
  addGame (game: Game): Observable<Game> {
    return this.http.post<Game>(this.heroesUrl, game, httpOptions).pipe(
      tap((game: Game) => this.log(`added hero w/ id=${game.id}`)),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  constructor(private messageService: MessageService,
              private http: HttpClient,) { }
}
