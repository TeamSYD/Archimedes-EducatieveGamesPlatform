import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CardService} from "../../card.service";
import {Card} from "../../cards/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards: Card[] = [];
  @Output() flipped :EventEmitter<any> = new EventEmitter();

  constructor(private cardService: CardService) { }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }
  flip(card: Card) {
    if (card) {
      return
    }
    this.flipped.emit(card)
  }

  ngOnInit() {
    console.log(this.cards)
    this.getCards();
  }

}
