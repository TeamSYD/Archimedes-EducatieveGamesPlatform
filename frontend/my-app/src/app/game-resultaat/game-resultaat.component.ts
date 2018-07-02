import { Component, OnInit } from '@angular/core';
import {ScoreService} from "../score.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-resultaat',
  templateUrl: './game-resultaat.component.html',
  styleUrls: ['./game-resultaat.component.css']
})
export class GameResultaatComponent implements OnInit {

  name: String;

  onKey(e){
    this.name = e.target.value;
    console.log(this.name);
  }

  addScore(){
    if(this.name != undefined){
      this.scoreService.addScore(this.name, 20, 6).subscribe(score => {
        console.log(score);
        this.router.navigate(['scoreboard']);
      });
    } else {
      //snakbar error vul een naam in
    }

  }
  constructor(private scoreService : ScoreService,
              public router : Router) { }

  ngOnInit() {
  }

}
