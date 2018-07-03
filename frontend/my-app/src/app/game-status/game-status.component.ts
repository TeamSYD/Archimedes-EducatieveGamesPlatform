import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule, MatSliderModule, } from '@angular/material/';
import {Game} from "../game";
import {DataService} from "../data-service";
import {Router} from "@angular/router";
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import {ArrangementenService} from "../arrangementen.service";
import {Arrangementen} from "../arrangementen";

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent implements OnInit {

  constructor(private dataService: DataService,
  private router: Router,
  private arrangementenService: ArrangementenService) {}

 //changes when player presses play
  playerIsReady: boolean = true;

  memory: boolean = false;
  gameScore: boolean = false;
  games: Game[] = [];
  gameStatus: boolean = false;
  gameIndex: number = 0;
  currentGame: Game;
  puzzle: boolean = false;
  gameTime: number = 20;
  intervalId = 0;
  seconds = this.gameTime;
  score = this.seconds;
  totalScore: number = 0;
  @Input() arrangement: Arrangementen;

  test2(){
    console.log(this.seconds)
    console.log(this.score);
    console.log(this.games);
  }

  receiveMessage($event){
    console.log('message received');
    if(this.playerIsReady){
      this.start();
      this.playerIsReady = false;
    } else {
      this.memory = false;
      this.puzzle = false;
      this.score = 1000 + (this.seconds * 10);
      this.gameScore = true;
      this.clearTimer();
      this.playerIsReady = true;
      this.gameIndex += 1;
      this.totalScore += this.score;
    }
    // this.currentGame = $event;
  }

  continue(){
    this.gameScore = false;
    this.play();
  }

  clearTimer() { clearInterval(this.intervalId); }
  start() { this.countDown(); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
      } else {
        if (this.seconds < 0) { this.seconds = 0;
                                this.score = 0;
        this.clearTimer();} // reset
      }
    }, 1000);
  }


  play(){

    if(this.gameIndex < this.games.length){
      if(this.games[this.gameIndex].game == "Memory"){
        this.memory = true;
      } else if (this.games[this.gameIndex].game == "Puzzle"){
        this.puzzle = true;
      }
      this.currentGame = this.games[this.gameIndex];
      this.seconds = this.currentGame.time;

    } else {
      localStorage.setItem('score',this.totalScore.toString());
      this.router.navigate(['scoreboard'])
    }
  }

  getGames(){
    console.log('in getgames');
    console.log(this.arrangement)
    this.arrangementenService.getGamesByArrangementId(this.arrangement.id).subscribe(x => {
      this.games = x;
      this.currentGame = x[0];
      console.log('sdasdsad');
      this.seconds = x[0].time;
      console.log('game: '+ x[0].game);
    if(x[0].game == 'Puzzle'){
      console.log('in puzzle');
      this.puzzle = true;
    } else if ( x[0].game == 'Memory'){
      this.memory = true;
    }});
  }

  ngOnInit() {
    console.log('oninit');
    this.getGames();
    this.play();
  }

}
