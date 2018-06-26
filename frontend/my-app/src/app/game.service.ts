import { Injectable } from '@angular/core';
import { game } from './game'
import { memory } from './memory'
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {




  constructor(private messageService: MessageService,
              private http: HttpClient) { }
}
