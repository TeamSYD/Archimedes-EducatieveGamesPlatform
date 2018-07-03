import {Component, OnInit} from '@angular/core';
import {Set} from "../sets/set";
import {Card} from "../cards/card";
import {Game} from "../game";
import {GameService} from "../game.service";
import {SetService} from "../set.service";
import {CardService} from "../card.service";

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  setcontent: Set[] = [];
  cards: Card[] = [];
  game: Game;
  selectedSet: Card[] = [];
  gameId: number = parseInt(localStorage.getItem("gameId"));

  constructor(private gameService: GameService,
              private setService: SetService,
              private cardService: CardService,
  ) {
  }

  addToSelectedSet(card: Card) {


    if (this.selectedSet.length <= 0) {
      this.selectedSet.push(card)
      this.log("eerste IF: " + card.set_id)
      return
    }

    if (this.selectedSet.length >= 1 && this.selectedSet[0].set_id == card.set_id) {
      if (this.selectedSet.length < this.selectedSet[0].set_length) {
        this.selectedSet.push(card)
        this.log(this.selectedSet)
        this.log("tweede IF: " + card.set_id)

        if ((this.selectedSet.length === this.selectedSet[0].set_length)) {
          this.log("PogChamp")
          this.selectedSet.splice(0, this.selectedSet.length)
          return
        }
        return
      }
      else {
        //this.log("PogChamp")
        return
      }
    }
    else {
      this.log("F, try again")
      this.selectedSet.splice(0, this.selectedSet.length)
      return
    }
  }


  checkSelectedSet(): void {

    for (let i in this.selectedSet) {

    }
  }

  getSets(): void {
    this.setService.getSets(this.gameId).subscribe(x => {
      this.setcontent = x;
      this.getCards()
    });
  }

  flip(e) {
    console.log(e.target.innerHTML);
    this.log("YEET!");
    this.log(this.cards);
  }

  getCards(): void {
    for (let i = 0; i < this.setcontent.length; i++) {
      for (let y = 0; y < this.setcontent[i].card.length; y++) {
        this.setcontent[i].card[y].set_length = this.setcontent[i].card.length;
        this.setcontent[i].card[y].set_id = this.setcontent[i].id;
        this.cards.push(this.setcontent[i].card[y])
      }
    }
  }

  ngOnInit() {
    this.getSets();
    //this.getCards();
  }

  private fillSetsAndCards() {

  }

  private log(x) {
    console.log(x);
  }
}
