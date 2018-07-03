import { Component, OnInit } from '@angular/core';
import {ScoreService} from "../score.service";
import {Score} from "../score";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  scoresArray: Score[];
  score: number = localStorage.getItem('score');

  getScoreboard(){
    this.scoreService.getScoreboardBySession(1).subscribe( scoreboard => {
      console.log("Scoreboard id: " + scoreboard.id)
    });
  }

  getScores(){
    this.scoreService.getScoresByScoreboard(6).subscribe( scores => {
      this.scoresArray = scores;
    });
  }

  constructor(private scoreService: ScoreService) { }


  ngOnInit() {
    this.getScores();
  }

}
