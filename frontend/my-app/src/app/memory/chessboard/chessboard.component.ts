import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Card} from "../../cards/card";

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  cards$: Observable<Card[]>;

  constructor() {}

  trackByCards(index: number, card: Card) {
    return card.id
  }
  flipCard(card: Card): any {

  }
  ngOnInit(): void {
  }

}
