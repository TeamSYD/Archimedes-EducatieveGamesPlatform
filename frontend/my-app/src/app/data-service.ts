import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {Game} from "./game";
import {Card} from "./cards/card";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  card: Card;

  private cardSource = new BehaviorSubject<Card>(this.card);
  currentCard = this.cardSource.asObservable();


  constructor() { }

  changeCard(card: Card){
    console.log(this.currentCard);
    this.cardSource.next(card);
  }
}
