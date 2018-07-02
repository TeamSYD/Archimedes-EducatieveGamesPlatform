import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Set} from '../sets/set'
import {Card} from "../cards/card";
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule, MatSliderModule, } from '@angular/material/';
import {Game} from "../game";
import {GameService} from "../game.service";
import {SetService} from "../set.service";
import {CardService} from "../card.service";
import { DropEvent } from 'ng-drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {DataService} from "../data-service.service";

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit, OnChanges {

  ready: boolean = false;
  readyButton: boolean = true;
  sets: Set[];
  cardsInput: Card[] = [];
  winCondition: Card[] = [];
  cards: Card[] = [];
  @Input() game: number;
  emptyCard: Card;
  gameStatus: boolean = false;
  @Output() gameEvent = new EventEmitter<number>();


  sendGameEvent(){
    this.gameEvent.emit(this.game + 1);
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.game);
    this.getSets();
    this.readyButton = true;
    this.ready = false;
  }


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

    for(let card of this.winCondition){
      if(this.cardsInput.includes(card)){
        console.log('xD');
      } else {
        console.log('sadFace');
      }
    }



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
      console.log('ding ding dingloser!')
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

    console.log(this.cards);
    console.log(this.sets);
    console.log(this.winCondition);
    console.log(this.cardsInput);
    this.ready = true;
    this.readyButton = false;
    this.cards = this.shuffle(this.cards);
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
    console.log(this.game);
    this.sendGameEvent();


  }


  configureGameRules(): void{
    for(let set of this.sets){
      console.log('in forloop');
      if (set.filler == false){
        console.log(set.card);
        this.winCondition.push(set.card);
        this.cards.push(set.card);
        this.cardsInput.push(this.emptyCard)
      } else {
        this.cards.push(set.card);
      }
    }
  }

  reset(){
    this.cardsInput = [];
    for (let i = 0; i < this.winCondition.length; i++) {
      this.cardsInput.push(this.emptyCard);
    }
  }


  shuffle(arr: any[]) {
    const newArr = arr.slice();
    for (let i = newArr.length; i; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const x = newArr[i - 1];
      newArr[i - 1] = newArr[j];
      newArr[j] = x;
    } return newArr;}

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
              private route: ActivatedRoute,
              private location: Location,
              private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getSets();

  }

}
