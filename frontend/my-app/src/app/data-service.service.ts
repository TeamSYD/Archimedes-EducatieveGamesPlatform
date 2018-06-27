import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {Game} from "./game";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  game: Game;

  private gameSource = new BehaviorSubject<String>("standard messag");
  currentGame = this.gameSource.asObservable();


  constructor() { }

  changeText(text: String){
    console.log(this.currentGame);
    console.log('string: ' + text);
    this.gameSource.next(text);
  }

  // changeGame(game: Game){
  //   console.log('logged in dataservice:' + game.id);
  //   this.gameSource.next(game);
  // }
}
