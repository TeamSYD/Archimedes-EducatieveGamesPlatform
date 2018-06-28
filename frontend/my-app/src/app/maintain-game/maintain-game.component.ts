import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  MatCheckboxModule, MatInputModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatButtonModule,
  MatSliderModule
} from '@angular/material/';
import {GameService} from '../game.service';
import {Game} from "../game";
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
  selected: Game;
  deleteGame: false;
  confirm: boolean = false;
  pin: number;




  change() {
    if (this.deleteGame) {
      console.log(this.deleteGame)
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

  selectGame(e){
    this.selectedIndex = e.target.value;
    console.log(this.games[this.selectedIndex])
  }

  updateGame(){

    if(this.selectedIndex != undefined){
      localStorage.setItem("gameId", this.games[this.selectedIndex].id.toString());
      this.router.navigate(['game-editor-sets']);
    } else {
      this.snackBarService.ErrorSnackBar('Select a game first!')
    }

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
    console.log(this.pin);
    this.gameService.addSession(this.pin).subscribe( session => {
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
