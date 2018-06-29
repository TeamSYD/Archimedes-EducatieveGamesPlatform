import { Component, OnInit } from '@angular/core';
import {Set} from '../sets/set'
import {Card} from "../cards/card";
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule, MatSliderModule} from '@angular/material/';
import {Game} from "../game";

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  sets: Set[];
  cardsInput: Card[];
  winCondition: Card[];
  // filler: Card[];
  cards: Card[];
  game: Game;

  checkWinCondition(e, index:number): boolean {
    this.cardsInput[index] = e.target.value;

    if(this.cardsInput == this.winCondition){
      return true;
    } else {
      return false;
    }
  }

  // fillFillers(id: number): void{
  //   for(let card of this.cards){
  //     if (card.id == id ){
  //       this.filler.push(card);
  //     }
  //   }
  // }

  configureGameRules(): void{
    for(let set of this.sets){
      if (set.filler == false){
        for(var card of this.cards){
          if(set.cardId == card.id){
            this.winCondition.push(card)
          }
        }
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
