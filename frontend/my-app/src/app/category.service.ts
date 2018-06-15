import { Injectable } from '@angular/core';
import { Category } from './category';
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'api/category';  // URL to web api



  getCategories(): Observable<Category[]> {
    // TODO: send the message _after_ fetching the heroes
    console.log("Fetched categories.");
    return this.http.get<Category[]>('http://localhost:8080/api/account/1/categories')
      .pipe(map(res => <Category[]>res['content']),
      tap(categories => console.log(categories)),
      catchError(this.handleError('getCategories', []))
    );
  }

  /** PUT: update the category on the server */
  //TODO: add accountId to update category with correct account
  updateCategory (category: Category): Observable<any> {
    return this.http.put(this.categoryUrl, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  /** POST: add a new category to the server */
  //TODO: add accountId to save category with correct account
  addCategory (category: Category): Observable<Category> {
    console.log('in addcategory met naam: ' + name);
    return this.http.post<Category>('http://localhost:8080/api/account/1/category', category, httpOptions).pipe(
      tap((category: Category) => console.log(`added category w/ id=${category.id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  /** DELETE: delete the hero from the server */
  //TODO: add accountId to delete category with correct account
  deleteHero (category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoryUrl}/${id}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  /* GET categories whose name contains search term */
  searchCategories(term: string): Observable<Category[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Category[]>(`${this.categoryUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Category[]>('searchCategories', []))
    );
  }


  private log(message: string) {
    this.messageService.add('CategoryService: ' + message);
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

  constructor(private messageService: MessageService,
              private http: HttpClient,) { }
}


