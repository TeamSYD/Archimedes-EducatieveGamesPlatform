import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  MatCheckboxModule, MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule,
  MatSliderModule
} from '@angular/material/';
import {GameService} from '../game.service';
import {Game} from "../game";
import {Session} from "../session";

import {SnackbarService} from "../snackbar.service";
import {Router} from "@angular/router";
import {ScoreService} from "../score.service";

@Component({
  selector: 'app-maintain-game',
  templateUrl: './maintain-game.component.html',
  styleUrls: ['./maintain-game.component.css']
})
export class MaintainGameComponent implements OnInit {

  selectedIndex: number;
  games: Game[];
  selected: Game;
  deleteGame: false;
  confirm: boolean = false;
  sessionArray: Session[];
  game_id: number;


  change() {
    if (this.deleteGame) {
      console.log(this.deleteGame);
      this.gameService.deleteGame(this.games[this.selectedIndex]).subscribe((response) => {
        this.getGames();
        this.deleteGame = false;
        this.confirm = false;
        this.reset();
      });
    }
  }

  reset(){
    if(this.games.length == 0){
      this.selectedIndex = undefined;
    } else {
      this.selectedIndex = 0;
    }
  }

  updateGame(){
    if(this.selectedIndex != undefined){

      localStorage.setItem("gameId", this.games[this.selectedIndex].id.toString());
      console.log(localStorage.getItem("gameId"));
      this.router.navigate(['game-editor-sets']);
    } else {
      this.snackBarService.ErrorSnackBar('Select a game first!')
    }
  }

  selectGame(e){
    this.selectedIndex = e.target.value;
  }

  getGames(){
    this.gameService.getGames()
      .subscribe(games =>
        this.games = games);
  }

  delete() {
    if(this.selectedIndex != undefined){
      console.log('in delete game');
      this.confirm = true;
    } else {
      this.snackBarService.ErrorSnackBar('Select a game first!')
    }}

  constructor(private gameService: GameService,
              private snackBarService: SnackbarService,
              public router: Router,
) { }

  ngOnInit() {
    this.getGames();
    localStorage.clear();
  }

}
