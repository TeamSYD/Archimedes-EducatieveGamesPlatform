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
import {DataService} from "../data-service";

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit, OnChanges {


  card_order: boolean;
  ready: boolean = false;
  readyButton: boolean = true;
  sets: Set[] = [];
  cardsInput: Card[] = [];
  winCondition: Card[] = [];
  cards: Card[] = [];
  @Input() game: Game;
  emptyCard: Card;
  gameStatus: boolean = false;
  counter: number;
  @Output() gameEvent = new EventEmitter<number>();


  sendGameEvent(){
    this.gameEvent.emit(this.counter + 1);
  }


  ngOnChanges(changes: SimpleChanges) {
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

  console.log('cardorder: ' + this.card_order);

    if(this.card_order == false){
      for(let card of this.winCondition){
        if(this.cardsInput.includes(card)){
          this.gameStatus = true
        } else {
          return false;
        }
      }
    } else {
      for (let i = 0; i < this.winCondition.length; i++) {
        if(this.winCondition[i].id == this.cardsInput[i].id){
          this.gameStatus = true;
        } else {
          return this.gameStatus = false;
        }
      }
    }





    if(this.gameStatus){
      this.sendGameEvent();
    } else {
      console.log('wrong combination!')
    }
  }

  test():void{
    console.log(this.game);
    console.log('in test met Sets.length:'  );
    console.log('in test met Cards.length: ' + this.cards.length);

    for(let set of this.sets){
      console.log('set id: ' + set.id);
      console.log('filler: ' + set.filler);
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

    this.gameService.getPuzzleByGameId(this.game.id).subscribe(result => {this.card_order = result.cardOrder;
    console.log(result);});
    console.log('ik kom zoiezo bij sendgameEvent')
    this.sendGameEvent();
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

    for(let i = 0; i < this.sets.length; i++){
      console.log('in forloop');
      if (this.sets[i].filler == false){
        for (let y = 0; y < this.sets[i].card.length; y++) {
          this.winCondition.push(this.sets[i].card[y]);
          this.cardsInput.push(this.emptyCard)
        }
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
    console.log(this.game);
    this.setService.getSets(this.game.id).subscribe(x => {
      this.sets = x;
      this.getCards();
      console.log(x);
    });
  }

  getCards(): void {
    for (let i = 0; i < this.sets.length; i++) {
      for (let y = 0; y < this.sets[i].card.length; y++) {
        this.sets[i].card[y].set_length = this.sets[i].card.length;
        this.sets[i].card[y].set_id = this.sets[i].id;
        this.cards.push(this.sets[i].card[y])
      }
    }
  }

  constructor(private gameService: GameService,
              private setService: SetService,
              private cardService: CardService,
              private route: ActivatedRoute,
              private location: Location,
              private dataService: DataService,
  ) { }

  ngOnInit() {
  }

}
