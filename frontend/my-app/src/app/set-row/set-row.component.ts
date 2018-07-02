import {Component, OnInit, Input} from '@angular/core';
import { DropEvent } from "ng-drag-drop";
import { Card } from '../cards/card';
import {SetService} from "../set.service";
import { Set } from "../sets/set";

@Component({
  selector: 'app-set-row',
  templateUrl: './set-row.component.html',
  styleUrls: ['./set-row.component.css']
})
export class SetRowComponent implements OnInit {
  //card: Card;
  @Input() cardcontent: Card[];
  @Input() filler: boolean = false;
  gameId: number;
  @Input() setId: number;
  @Input() setcontent: Set[];

  constructor(private setService: SetService) {
    this.cardcontent = [];
  }

  onDrop(index: number, e: DropEvent){
    console.log("SET ID OF SELECTED SET: "+this.setId);

    console.log("BEFORE:");
    console.log(this.cardcontent);

    console.log("BEFORE UPDATE:");
    console.log(this.cardcontent[index].id);
    this.setService.updateCard(this.cardcontent[index].id, this.setId).subscribe(a => this.cardcontent.push(e.dragData));

    console.log("AFTER:");
    console.log(this.cardcontent);
  }

  remove(index: number) {
    console.log("SET ID OF SELECTED SET: "+this.setId);

    console.log("BEFORE:");
    console.log(this.cardcontent);

    this.setService.unlinkCard(this.cardcontent[index].id);
    this.cardcontent.splice(index, 1);

    console.log("AFTER:");
    console.log(this.cardcontent);
  }

  replace(index: number, e: DropEvent) {
    console.log("SET ID OF SELECTED SET: "+this.setId);

    console.log("BEFORE:");
    console.log(this.cardcontent);

    this.setService.unlinkCard(this.cardcontent[index].id);
    this.cardcontent.splice(index, 1, e.dragData);
    this.setService.updateCard(this.cardcontent[index].id, this.setId);

    console.log("AFTER:");
    console.log(this.cardcontent);
  }

  ngOnInit() {
    //this.cardcontent.map(a => this.setcontent.map(a => a.card));
    console.log("INITIAL LOG");
    console.log(this.cardcontent);
  }

}
