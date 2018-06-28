import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  MatCheckboxModule, MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule,
  MatSliderModule
} from '@angular/material/';
import {GameService} from '../game.service';
import {Game} from "../game";
import {Session} from "../session";


@Component({
  selector: 'app-maintain-game',
  templateUrl: './maintain-game.component.html',
  styleUrls: ['./maintain-game.component.css']
})
export class MaintainGameComponent implements OnInit {

  today: number = Date.now();
  games: Game[];
  game_id: number;
  selected: Game;
  delete: false;
  confirm: boolean = false;
  pin: number;
  selectedIndex: number;
  sessionArray: Session[];


  change(){
    if (this.delete){
      console.log('in change');
      this.gameService.deleteGame(this.selected)
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


        console.log(date);
        console.log(date2);
        console.log(local);
        console.log(difference);
        console.log(date3);
        console.log(dateResult);
      }
    });
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

  generatePin(){
    this.pin = Math.floor(1000 + Math.random() * 9000);
    this.gameService.addSession(this.pin, this.games[this.selectedIndex].id).subscribe( session => {
      this.sessionArray.push(session);
      alert('Uw gegenereerde PIN is: ' + session.pin);
    });


  }

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

}
