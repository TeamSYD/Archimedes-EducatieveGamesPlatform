import { Injectable } from '@angular/core';
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
  getSets (): Observable<Set[]> {
    return this.http.get<Set[]>(this.setUrl+"?????")
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

  /** DELETE: delete the set from the server */
  deleteSet (set: Set | number): Observable<Set> {
    const id = typeof set === 'number' ? set : set.id;
    const url = `${this.setUrl}/${id}`;

    return this.http.delete<Set>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted set id=${id}`)),
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
