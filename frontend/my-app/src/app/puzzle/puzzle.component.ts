import { Component, OnInit } from '@angular/core';
import {Set} from '../sets/set'
import {Card} from "../cards/card";
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule, MatSliderModule, } from '@angular/material/';
import {Game} from "../game";
import {GameService} from "../game.service";
import {SetService} from "../set.service";
import {CardService} from "../card.service";
import { DropEvent } from 'ng-drag-drop';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  ready: boolean = false;
  sets: Set[];
  cardsInput: Card[] = [];
  winCondition: Card[] = [];
  // filler: Card[];
  cards: Card[];
  game: Game;
  emptyCard: Card;
  gameStatus: boolean = false;

  checkWinCondition(e: DropEvent, index:number){
    console.log('checkwinconditie:');
    console.log('card: ' + e.dragData.id);
    this.cardsInput[index] = e.dragData;

    for(let card of this.cardsInput){
      console.log('cardsInput card: ' + card.id)
    }

    for(let card of this.winCondition){
      console.log('winConditie card: ' + card.id)
    }
    console.log(this.winCondition);
    console.log(this.cardsInput);



    for (let i = 0; i < this.winCondition.length; i++) {
      if(this.winCondition[i].id == this.cardsInput[i].id){
        this.gameStatus = true;
      } else {
        return this.gameStatus = false;
      }
    }

    if(this.gameStatus){
      console.log('ding ding ding winner!')
    } else {
      console.log('ding ding ding loser!')
    }
  }

  test():void{
    console.log('in test met Sets.length: ' + this.sets.length);
    console.log('in test met Cards.length: ' + this.cards.length);

    for(let set of this.sets){
      console.log('set id: ' + set.id);
      console.log('filler: ' + set.filler);
      console.log('card: ' + set.card.id);
    }

    this.configureGameRules();
    console.log('winconditie length: '+ this.winCondition.length);
    this.ready = true;
  }

  test2(): void{

    for(let card of this.winCondition){
      console.log('winconditie: ' + card.id);
    }

    for(let card of this.cards){
      console.log(card.id);
    }

    console.log('card input length: ' + this.cardsInput.length)

    console.log(this.gameStatus);

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
      console.log('in forloop');
      if (set.filler == false){
        console.log(set.card);
        this.winCondition.push(set.card);
        this.cardsInput.push(this.emptyCard)
      }
    }
  }

  getSets(): void {
    this.setService.getSets()
      .subscribe(sets => this.sets = sets);
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }

  constructor(private gameService: GameService,
              private setService: SetService,
              private cardService: CardService,
  ) { }

  ngOnInit() {
    this.getSets();
    this.getCards();
  }

}
