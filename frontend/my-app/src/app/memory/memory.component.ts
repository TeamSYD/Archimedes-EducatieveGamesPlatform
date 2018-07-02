import { Component, OnInit } from '@angular/core';
import {Set} from "../sets/set";
import {Card} from "../cards/card";
import {Game} from "../game";
import {GameService} from "../game.service";
import {SetService} from "../set.service";
import {CardService} from "../card.service";

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  sets : Set[];
  cards:Card[];
  winSet: Set;
  game: Game[];

  constructor(private gameService: GameService,
              private setService: SetService,
              private cardService: CardService,
  ) { }

  getGame(){

  }
  getSets(): void {
    // this.setService.getSets()
    //   .subscribe(sets => this.sets = sets);
  }
  flip(e){
    console.log(e.target.innerHTML);
  }
  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }



  ngOnInit() {
    this.getSets();
    this.getCards();
  }
}
