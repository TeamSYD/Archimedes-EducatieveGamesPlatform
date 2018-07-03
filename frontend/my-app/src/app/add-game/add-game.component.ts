import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule, MatSliderModule} from '@angular/material/';
import {GameService} from '../game.service';
import {Memory} from "../Memory";
import {Puzzle} from "../Puzzle";
import { DataService } from "../data-service";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  selectedGame: string;
  order: boolean = false;
  classicMemory: boolean = false;
  openCards: boolean = false;
  name: string;
  value: 0;

  onKey(e){
    this.name = e.target.value;
  }

log(e){
  this.selectedGame = e.target.value;
  console.log(this.name);
}


  durationValue(e){
    this.value = e.target.value;
    console.log(this.value);
  }

checkIfMemory(): boolean{
  if(this.selectedGame == "Memory"){
    return true;
  } else {
    return false;
  }
}

  checkIfPuzzle(): boolean{
    if(this.selectedGame == "Puzzle"){
      return true;
    } else {
      return false;
    }
  }


  saveGame(){
  console.log(this.value)
  if(this.name != '' && this.name != undefined){

    if(this.selectedGame == "Memory"){
      this.gameService.addMemory(this.classicMemory, this.openCards)
        .subscribe(memory => {
          this.gameService.addGame(this.name, this.value, this.selectedGame, memory.id)
            .subscribe(game => {
              localStorage.setItem("gameId", game.id.toString());
            })
        });

      this.router.navigate(['game-editor-sets']);
    }


    if(this.selectedGame == "Puzzle"){
      this.gameService.addPuzzle(this.order)
        .subscribe(puzzle => {
          this.gameService.addGame(this.name, this.value, this.selectedGame, puzzle.id)
            .subscribe(game => {
              console.log('id :' + game.id);
              localStorage.setItem("gameId", game.id.toString());
            })
        });
      this.router.navigate(['game-editor-sets']);

    }


    console.log('in saveGame if statement');
    console.log(this.order, this.classicMemory, this.openCards)
  }

  }


  constructor(private gameService: GameService,
              public router: Router,
              public location: Location) { }

  ngOnInit() {
    localStorage.clear();
  }

}
