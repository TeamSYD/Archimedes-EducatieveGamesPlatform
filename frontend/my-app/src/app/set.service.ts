import {Injectable, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Set } from './sets/set';
import { MessageService } from './message.service';
import {Card} from "./cards/card";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class SetService {
  private setUrl = 'http://localhost:8080/api';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET sets from the server */
  getSets (gameId): Observable<Set[]> {
    return this.http.get<Set[]>(this.setUrl+"/games/"+gameId+"/sets")
      .pipe(map(set => set), tap(set => this.log(`fetched sets`)),
        catchError(this.handleError('getSets', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new set to the server */
  saveSet (set: Set): Observable<Set> {
    return this.http.post<Set>(this.setUrl, set, httpOptions).pipe(
      tap((set: Set) => this.log(`added set w/ id=${set.id}`)),
      catchError(this.handleError<Set>('addSet'))
    );
  }

  addSet (gameId: number): Observable<Set> {
    return this.http.post<Set>(this.setUrl+"/games/"+gameId+"/set", httpOptions).pipe(
      tap((set: Set) => this.log(`added set w/ id=${set.id}`)),
      catchError(this.handleError<Set>('addSet'))
    );
  }

  addFillerSet (gameId: number): Observable<Set> {
    return this.http.post<Set>(this.setUrl+"/games/"+gameId+"/fillerset", httpOptions).pipe(
      tap((set: Set) => this.log(`added set w/ id=${set.id}`)),
      catchError(this.handleError<Set>('addSet'))
    );
  }

  /** POST: add a new set to the server */
  saveSetNew (cards: Card[], filler: boolean, gameId: number): Observable<Set> {
    return this.http.post<Set>(this.setUrl+'/games/'+gameId+'/set', new Set(1, filler), httpOptions).pipe(
      tap((set: Set) => this.log(`added set w/ id=${set.id}`)),
      catchError(this.handleError<Set>('addSet'))
    );
  }

  updateCard(card_id: number, set_id: number){
    return this.http.put(this.setUrl+"/card/"+card_id+"/set/"+set_id, httpOptions).pipe(
      tap((set: Set) => this.log(`updated card w/ id=${card_id}`)),
      catchError(this.handleError<Set>('updateCard'))
    );
  }

  unlinkCard(card_id: number){
    return this.http.put(this.setUrl+"/card/"+card_id+"/noset", httpOptions).pipe(
      tap((set: Set) => this.log(`updated card w/ id=${card_id}`)),
      catchError(this.handleError<Set>('unlinkCard'))
    );
  }

  /** DELETE: delete the set from the server */
  deleteSet (set: Set): Observable<Set> {
    return this.http.delete<Set>(this.setUrl+"/set/"+set.id, httpOptions).pipe(
      tap(_ => this.log(`deleted set id=${set.id}`)),
      catchError(this.handleError<Set>('deleteSet'))
    );
  }

  /** PUT: update the set on the server */
  updateSet (set: Set): Observable<any> {
    return this.http.put(this.setUrl, set, httpOptions).pipe(
      tap(_ => this.log(`updated set id=${set.id}`)),
      catchError(this.handleError<any>('updateSet'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

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

  /** Log a SetService message with the MessageService */
  private log(message: string) {
    this.messageService.add('SetService: ' + message);
  }
}
