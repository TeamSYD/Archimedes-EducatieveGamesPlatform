import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule, MatSliderModule, } from '@angular/material/';
import {Game} from "../game";
import {DataService} from "../data-service";
import {Router} from "@angular/router";
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent implements OnInit {

  constructor(private dataService: DataService,
  private router: Router) {}


  memory: boolean = false;
  gameScore: boolean = false;
  games: Game[];
  gameStatus: boolean = false;
  currentGame: number = 0;
  array: number[] = [1,2,3,4]
  puzzle: boolean = true;
  gameTime: number = 20;
  intervalId = 0;
  seconds = this.gameTime;
  score = this.seconds;
  totalScore: number = 0;

  test2(){
    console.log(this.seconds)
    console.log(this.score);
  }

  receiveMessage($event){
    this.currentGame = $event;
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
    for(let game of this.array){
    }
  }

  ngOnInit() {
    this.play();
    this.start();
  }

}
