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

  static Toggle(card: Card): void {
    card.flipped = !card.flipped

  }

  addToSelectedSet(card: Card) {

    let exist: boolean = this.selectedSet.some(x =>
      x.id === card.id
    );

    if (this.selectedSet.length <= 0) {
      this.selectedSet.push(card);
      this.showBack(card);
      return
    }

    if (!exist && this.selectedSet[0].set_id == card.set_id) {
      if (this.selectedSet.length < this.selectedSet[0].set_length) {
        this.selectedSet.push(card);


        if ((this.selectedSet.length === this.selectedSet[0].set_length)) {
          this.log("PogChamp");
          this.showBack(card);
          for (let i =0;i < this.selectedSet.length; i++){
            let index = this.cards.findIndex(x => x.id === this.selectedSet[i].id);
            this.log(index)
            this.cards.splice(index, 1);
          }
          this.selectedSet.splice(0, this.selectedSet.length);
          this.log(this.cards);
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
      this.log("F, try again");
      for (let i =0;i < this.selectedSet.length; i++) {
      this.showFront(this.selectedSet[i])

      }
      this.selectedSet.splice(0, this.selectedSet.length);
      return
    }
  }

  checkSelectedSet(card: Card): void {
    this.addToSelectedSet(card);

  }

  toggle(card: Card): void {
    if (!card.flipped)
    card.flipped = !card.flipped;
  }
  showFront(card: Card):void{
    card.flipped = false;
  }
  showBack(card: Card):void{
    card.flipped = true;
  }

  getSets(): void {
    this.setService.getSets(this.gameId).subscribe(x => {
      this.setcontent = x;
      this.getCards()
    });
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
