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
  localSession = localStorage.getItem("sessionId");
  score: number = parseInt(localStorage.getItem('score'));
  scoreboardid: number;
  localSessionId: number;
  name: String;


  getScoreboard(){
    this.localSessionId = parseInt(this.localSession);
    console.log(this.localSessionId)
    this.scoreService.getScoreboardBySession(this.localSessionId).subscribe( scoreboard => {
      this.scoreboardid = scoreboard.id;
      console.log('scoreboard: ' + scoreboard.id);
    });
  }

  getScores(){
    this.scoreService.getScoresByScoreboard(this.scoreboardid).subscribe( scores => {
      this.scoresArray = scores;
    });
  }

  onKey(e){
    this.name = e.target.value;
  }

  postScore(){
    this.scoreService.addScore(this.name, this.score, this.scoreboardid).subscribe( score => {
      console.log(score);
    })
  }

  constructor(private scoreService: ScoreService) { }


  ngOnInit() {
    this.getScoreboard();
    this.getScores();
  }

}
