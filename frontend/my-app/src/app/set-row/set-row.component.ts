import {Component, OnInit, Input, Input} from '@angular/core';
import { DropEvent } from "ng-drag-drop";
import { Card } from '../cards/card';

@Component({
  selector: 'app-set-row',
  templateUrl: './set-row.component.html',
  styleUrls: ['./set-row.component.css']
})
export class SetRowComponent implements OnInit {
  card: Card;
  @Input() cardcontent: Card[] = [];
  @Input() filler: boolean = false;
  @Input() gameId: number;

  constructor() { }

  onDrop(e: DropEvent){
    this.cardcontent.push(e.dragData);
  }

  remove(index: number) {
    this.cardcontent.splice(index, 1);
  }

  replace(index: number, e: DropEvent) {
    this.cardcontent.splice(index, 1, e.dragData);
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
