import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {ArrangementenService} from "../arrangementen.service";
import {Game} from "../game";

@Component({
  selector: 'app-game-spelen',
  templateUrl: './game-spelen.component.html',
  styleUrls: ['./game-spelen.component.css']
})

export class GameSpelenComponent implements OnInit {

  pin: number;
  gamesArray: Game[];

  constructor(private arrangementService: ArrangementenService,
              private gameService: GameService) { }

  ngOnInit() {
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKey(e){
    this.pin = e.target.value;
  }

  gameStarten(){
    console.log(this.pin);
    this.arrangementService.getSessionByPin(this.pin).subscribe( result => {
      console.log(result);
    });
  }



}
