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

@Component({
  selector: 'app-maintain-game',
  templateUrl: './maintain-game.component.html',
  styleUrls: ['./maintain-game.component.css']
})
export class MaintainGameComponent implements OnInit {

  selectedIndex: number;
  games: Game[];
  game_id: number;
  selected: Game;
  deleteGame: false;
  confirm: boolean = false;
  pin: number;
  sessionArray: Session[];

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
    console.log(this.games[this.selectedIndex].id);
    this.gameService.getSessionByGameId(this.games[this.selectedIndex].id).subscribe(sessions => {
      this.sessionArray = sessions;
      for(let session of this.sessionArray){
        var date = new Date(session.createdAt);     //create date from createdAt attribute.
        var date2 = date.getTime()/1000;            //get epoch from createdAt attribute
        var local = new Date().getTime()/1000;      //get epoch from current date
        var difference = local - date2;             //difference between createdAt and current date
        var fourHoursDifference = 14400 - difference;
        var date3 = new Date(null);
        date3.setSeconds(fourHoursDifference);
        var dateResult = date3.toISOString().substr(11, 8);
        session.remainingTime = dateResult;
      }
    });
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

  generatePin(){
    this.pin = Math.floor(1000 + Math.random() * 9000);
    this.gameService.addSession(this.pin, this.games[this.selectedIndex].id).subscribe( session => {
      this.sessionArray.push(session);
      alert('Uw gegenereerde PIN is: ' + session.pin);
    });
  }

  constructor(private gameService: GameService,
              private snackBarService: SnackbarService,
              public router: Router) { }

  ngOnInit() {
    this.getGames();
  }

}
