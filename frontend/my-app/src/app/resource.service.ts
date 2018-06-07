import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Resource } from './resource';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private resourceUrl = 'api/resources';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getResource (): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourceUrl)
      .pipe(
        tap(resource => this.log(`fetched resources`)),
        catchError(this.handleError('getResource', []))
      );
  }

  saveResource (resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.resourceUrl, resource, httpOptions).pipe(
      tap((resource: Resource) => this.log(`added resource w/ id=${resource.id}`)),
      catchError(this.handleError<Resource>('addResource'))
    );
  }

  updateResource (resource: Resource): Observable<any> {
    return this.http.put(this.resourceUrl, resource, httpOptions).pipe(
      tap(_ => this.log(`updated resource id=${resource.id}`)),
      catchError(this.handleError<any>('updateResource'))
    );
  }

  deleteResource (resource: Resource | number): Observable<Resource> {
    const id = typeof resource === 'number' ? resource : resource.id;
    const url = `${this.resourceUrl}/${id}`;

    return this.http.delete<Resource>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted resource id=${id}`)),
      catchError(this.handleError<Resource>('deleteResource'))
    );
  }

  getResourceById<Data>(id: number): Observable<Resource> {
    const url = `${this.resourceUrl}/?id=${id}`;
    return this.http.get<Resource[]>(url)
      .pipe(
        map(resource => resource[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} resource id=${id}`);
        }),
        catchError(this.handleError<Resource>(`getResource id=${id}`))
      );
  }

  searchResources(term: string): Observable<Resource[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Resource[]>(`${this.resourceUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found resources matching "${term}"`)),
      catchError(this.handleError<Resource[]>('searchResources', []))
    );
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

  private log(message: string) {
    this.messageService.add('ResourceService: ' + message);
  }
}
