import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  MatCheckboxModule, MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule,
  MatSliderModule
} from '@angular/material/';
import {GameService} from '../game.service';
import {Game} from "../game";

@Component({
  selector: 'app-maintain-game',
  templateUrl: './maintain-game.component.html',
  styleUrls: ['./maintain-game.component.css']
})
export class MaintainGameComponent implements OnInit {

  games: Game[];
  selected: Game;
  delete: false;
  confirm: boolean = false;



  change(){
    if (this.delete){
      console.log('in change')
      this.gameService.deleteGame(this.selected)
    }

  }


  getGames(){
    this.gameService.getGames()
      .subscribe(games =>
        this.games = games);

  }

  deleteGame() {
    console.log('in delete game');
    this.confirm = true;



  }


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

}
