import {Component, OnInit, Input} from '@angular/core';
import { DropEvent } from "ng-drag-drop";
import { Card } from '../cards/card';
import {SetService} from "../set.service";

@Component({
  selector: 'app-set-row',
  templateUrl: './set-row.component.html',
  styleUrls: ['./set-row.component.css']
})
export class SetRowComponent implements OnInit {
  //card: Card;
  cardcontent: Card[];
  @Input() filler: boolean = false;
  gameId: number;
  setId: number;

  constructor(private setService: SetService) {
    this.cardcontent = [];
  }

  onDrop(index: number, e: DropEvent){
    console.log(this.cardcontent);
    this.cardcontent.push(e.dragData);
    this.setService.updateCard(this.cardcontent[index].id, this.setId);
  }

  remove(index: number) {
    console.log(this.cardcontent);
    this.setService.unlinkCard(this.cardcontent[index].id);
    this.cardcontent.splice(index, 1);
  }

  replace(index: number, e: DropEvent) {
    console.log(this.cardcontent);
    this.setService.unlinkCard(this.cardcontent[index].id);
    this.cardcontent.splice(index, 1, e.dragData);
    this.setService.updateCard(this.cardcontent[index].id, this.setId);

  }

  getCards(){
    return this.cardcontent;
  }

  clear() {
    this.cardcontent = [];
  }

  ngOnInit() {
  }

}
