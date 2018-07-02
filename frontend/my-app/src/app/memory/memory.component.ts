import { Component, OnInit } from '@angular/core';
import {Set} from "../sets/set";
import {Card} from "../cards/card";
import {Game} from "../game";
import {GameService} from "../game.service";

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

  constructor(private gameService: GameService) { }

  getSets():void{

  }

  getGame(){

  }
  getCards(){

  }

  ngOnInit() {
    this.getSets();
    this.getGame();
    this.getCards();
  }
}
