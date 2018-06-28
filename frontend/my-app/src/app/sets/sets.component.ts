import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { SetRowComponent } from '../set-row/set-row.component'
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements AfterViewInit {
  @ViewChildren(SetRowComponent) rows: QueryList<SetRowComponent>

  //setObservable : Observable<Set[]>;
  setcontent = [];
  setfiller = true;

  duplicate = false;
  invert = false;
  inverted: String = 'Cards open';
  duplicates: String = 'Duplicates on';


  constructor() {
    this.setcontent = [[], []];
  }

  add(){
    this.setcontent.push([]);
  }

  remove(index: number) {
    this.setcontent.splice(index, 1);
  }

  ngOnInit() {}

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
    this.rows.forEach(rowInstance => console.log(rowInstance));
  }

  ngAfterViewInit() {
    this.rows.forEach(rowInstance => console.log(rowInstance));
  }
}
