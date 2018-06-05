import { Injectable } from '@angular/core';
import { Category } from './category';
import {MessageService} from "./message.service";
import {Observable} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'api/category';  // URL to web api

  getCategories(): Observable<Category[]> {
    // TODO: send the message _after_ fetching the heroes
    this.log("Fetched categories.")
    return this.http.get<Category[]>(this.categoryUrl)
  }

  private log(message: string) {
    this.messageService.add('CategoryService: ' + message);
  }

  constructor(private messageService: MessageService,
              private http: HttpClient,) { }
}


