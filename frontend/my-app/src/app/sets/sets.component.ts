import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { SetRowComponent } from '../set-row/set-row.component'
import {Observable} from "rxjs/Rx";
import {SetService} from "../set.service";
import {Card} from "../cards/card";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";
import {Set} from "./set";
import {forEach} from "@angular/router/src/utils/collection";
import {GameService} from "../game.service";

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  @ViewChildren(SetRowComponent) rows: QueryList<SetRowComponent>;
  set: Set;
  setcontent: Set[];
  addFillerButton = true;
  setfiller = false;
  duplicate = false;
  invert = false;
  inverted: String = 'Cards open';
  duplicates: String = 'Duplicates on';
  gameId: number = parseInt(localStorage.getItem("gameId"));

  constructor(private setService: SetService, private  gameService: GameService) {
    this.setcontent = [];
  }

  add(){
    this.checkFiller();
    this.setService.addSet(this.gameId).subscribe( a => this.setcontent.push(a));
    this.setService.getSets(this.gameId).subscribe();
  }

  addFiller(){
    this.addFillerButton = false;
    this.setService.addFillerSet(this.gameId).subscribe( a => this.setcontent.push(a));
  }

  checkFiller(){
    for (let i in this.setcontent){
      if (this.setcontent[i].filler == true){
        this.addFillerButton = false;
        return;
      }
      this.addFillerButton = true;
    }
  }

  remove(index: number) {
    if (this.setcontent[index].filler == true){
      this.addFillerButton = true;
    }

    for (let i in this.setcontent[index].card) {
      this.setService.unlinkCard(this.setcontent[index].card[i].id).subscribe();
    }
    this.setService.deleteSet(this.setcontent[index].id).subscribe(a => this.setcontent.splice(index, 1));
  }

  ngOnInit() {
    //this.gameService.getMemoryByGameId(this.gameId).subscribe(a => console.log(a));
    this.setService.getSets(this.gameId).subscribe(a => {this.setcontent = a;  this.checkFiller()});
  }

  duplicateToggle(){
    this.duplicateButton();
  }

  invertToggle(){
    this.invertButton();
  }

  duplicateButton(){
    this.duplicate = !this.duplicate;
    if (this.duplicate == false){
      this.duplicates = 'Duplicates off';

    } else {
      this.duplicates = 'Duplicates on';
    }
  }

  invertButton(){
    this.invert = !this.invert;
    if (this.invert == false){
      this.inverted = 'Cards open';
    } else {
      this.inverted = 'Cards closed';
    }
  }

  saveButton() {
    this.gameService.updateMemory(this.gameId, this.duplicate, this.invert).subscribe();
  }
}
