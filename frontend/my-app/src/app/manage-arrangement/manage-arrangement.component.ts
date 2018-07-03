import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SnackbarService} from "../snackbar.service";
import {ArrangementenService} from "../arrangementen.service";
import {Session} from "../session";
import {Arrangementen} from "../arrangementen"
import {ScoreService} from "../score.service";
import {Game} from "../game";
import {GameService} from "../game.service";

@Component({
  selector: 'app-manage-arrangement',
  templateUrl: './manage-arrangement.component.html',
  styleUrls: ['./manage-arrangement.component.css']
})
export class ManageArrangementComponent implements OnInit {

  selectedIndexArrangement: number;
  selectedIndexGame: number;
  arrangementen: Arrangementen[];
  pin: number;
  sessionArray: Session[];
  deleteArrangement: false;
  confirm: boolean = false;
  games: Game[];
  gamesArray: Game[];


  getArrangementen(){
    this.arrangementenService.getArrangementen()
      .subscribe(arrangementen =>
        this.arrangementen = arrangementen);
  }

  getGamesByArrId() {
    this.arrangementenService.getGamesByArrangementId(this.arrangementen[this.selectedIndexArrangement].id).subscribe(games => {
      this.gamesArray = (games);
    })
  }

  updateGameArrangementId(){
    console.log(this.selectedIndexGame);
    console.log(this.selectedIndexArrangement);
    this.gameService.updateGameArrangementId(this.games[this.selectedIndexGame].id, this.arrangementen[this.selectedIndexArrangement].id).subscribe(_ => {
      this.arrangementenService.getGamesByArrangementId(this.arrangementen[this.selectedIndexArrangement].id).subscribe(games => {
        this.gamesArray = (games);
        console.log(this.gamesArray);
      });
    });
  }

  getGames(){
    this.gameService.getGames()
      .subscribe(games =>
        this.games = games);
  }


  generatePin(){
    this.pin = Math.floor(1000 + Math.random() * 9000);
    this.arrangementenService.addSession(this.pin, this.arrangementen[this.selectedIndexArrangement].id).subscribe( session => {
      this.sessionArray.push(session);
      console.log(session.id);
      this.scoreService.addScoreboard(session.id).subscribe(scoreboard => {
        console.log("scoreboard id: " + scoreboard.id);
      });
    });
  }

  selectGame(e){
    this.selectedIndexGame = e.target.value;
    console.log(this.selectedIndexGame);
  }

  selectArrangement(e){
    this.selectedIndexArrangement = e.target.value;
    console.log(this.selectedIndexArrangement);
    this.arrangementenService.getSessionByArrangementId(this.arrangementen[this.selectedIndexArrangement].id).subscribe(sessions => {
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

  change() {
    if (this.deleteArrangement) {
      this.arrangementenService.deleteArrangement(this.arrangementen[this.selectedIndexArrangement]).subscribe((response) => {
        this.getArrangementen();
        this.deleteArrangement = false;
        this.confirm = false;
        this.reset();
      });
    }
  }

  reset(){
    if(this.arrangementen.length == 0){
      this.selectedIndexArrangement = undefined;
    } else {
      this.selectedIndexArrangement = 0;
    }
  }

  deleteArrangements() {
    if(this.selectedIndexArrangement != undefined){
      console.log('in delete arrangement');
      this.confirm = true;
    } else {
      this.snackBarService.ErrorSnackBar('Select an arrangement first!')
    }}

  constructor(              private snackBarService: SnackbarService,
                            public router: Router,
                            private arrangementenService: ArrangementenService,
                            private scoreService: ScoreService,
                            private gameService: GameService) { }

  ngOnInit() {
    this.getArrangementen();
    this.getGames();

  }

}
