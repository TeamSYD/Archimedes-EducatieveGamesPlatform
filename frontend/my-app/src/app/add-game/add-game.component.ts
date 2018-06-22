import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule} from '@angular/material/';
import {GameService} from '../game.service';

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



  onKey(e){
    this.name = e.target.value;
  }

log(e){
  this.selectedGame = e.target.value;
  console.log(this.name);
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
  if(this.name != '' && this.name != undefined){
    console.log('in saveGame if statement')
    console.log(this.order, this.classicMemory, this.openCards)
  }

  }


  constructor() { }

  ngOnInit() {
  }

}
