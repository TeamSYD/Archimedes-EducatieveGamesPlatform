import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  @ViewChild('gameName') private gameName: ElementRef;

  selectedGame: string;

selectGame(e){
  this.selectedGame = e.target.value;
}

  constructor() { }

  ngOnInit() {
  }

}
