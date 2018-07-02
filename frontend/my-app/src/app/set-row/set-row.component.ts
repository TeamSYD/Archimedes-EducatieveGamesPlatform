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
  @Input() cardcontent: Card[];
  @Input() filler: boolean = false;
  gameId: number;
  @Input() setId: number;
  @Input() setcontent: Set[];

  constructor(private setService: SetService) {
    this.cardcontent = [];
  }

  onDrop(index: number, e: DropEvent){
    this.setService.updateCard(e.dragData.id, this.setId).subscribe(a => this.cardcontent.push(e.dragData));
  }

  remove(index: number) {
    this.setService.unlinkCard(this.setcontent[0].card[index].id).subscribe();
    this.cardcontent.splice(index, 1);
  }

  replace(index: number, e: DropEvent) {
    this.setService.unlinkCard(this.setcontent[0].card[index].id).subscribe();
    this.cardcontent.splice(index, 1, e.dragData);
    this.setService.updateCard(e.dragData.id, this.setId).subscribe();
  }

  ngOnInit() {

  }

}
