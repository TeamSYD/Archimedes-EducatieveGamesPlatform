import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { SetRowComponent } from '../set-row/set-row.component'
import {Observable} from "rxjs/Rx";
import {SetService} from "../set.service";
import {Card} from "../cards/card";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";
import {Set} from "./set";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  @ViewChildren(SetRowComponent) rows: QueryList<SetRowComponent>

  //setObservable : Observable<Set[]>;
  set: Set;
  setcontent: Set[];
  setfiller = true;
  duplicate = false;
  invert = false;
  inverted: String = 'Cards open';
  duplicates: String = 'Duplicates on';

  constructor(private setService: SetService) {
    this.setcontent = [];
  }

  add(){
    this.setService.addSet(1).subscribe( a => this.setcontent.push(a));
    console.log(this.setcontent)
  }

  remove(index: number) {
    for (let i in this.setcontent[index].card) {
      this.setService.unlinkCard(this.setcontent[index].card[i].id).subscribe();
    }
    this.setService.deleteSet(this.setcontent[index].id).subscribe(a => this.setcontent.splice(index, 1));

  }

  ngOnInit() {
    console.log("START FILLING SETCONTENT");
    this.setService.getSets(1).subscribe(a => this.setcontent = a);
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
    console.log("SAVE BUTTON CLICKED");
    console.log(this.setcontent);
  }
}
