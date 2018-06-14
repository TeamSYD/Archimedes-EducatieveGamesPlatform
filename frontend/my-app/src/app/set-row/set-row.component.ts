import { Component, OnInit } from '@angular/core';
import { DropEvent } from "ng-drag-drop";
import { Card } from '../cards/card';

@Component({
  selector: 'app-set-row',
  templateUrl: './set-row.component.html',
  styleUrls: ['./set-row.component.css']
})
export class SetRowComponent implements OnInit {
  card: Card;

  setcontent = [];
  cardcontent = [];

  constructor() { }

  onDrop(e: DropEvent){
    this.cardcontent.push(e.dragData);
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.id);
    list.splice(index, 1);
  }

  remove(index: number) {
    this.cardcontent.splice(index, 1);
  }

  replace(index: number, e: DropEvent) {
    this.cardcontent.splice(index, 1, e.dragData);
  }

  ngOnInit() {
  }

}
