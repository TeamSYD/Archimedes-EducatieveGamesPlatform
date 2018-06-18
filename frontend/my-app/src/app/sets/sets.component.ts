import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MatSlideToggle } from "@angular/material";
import { SetRowComponent } from '../set-row/set-row.component'

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements AfterViewInit {
  @ViewChildren(SetRowComponent) rows: QueryList<SetRowComponent>

  setcontent = [];
  setfiller = true;

  duplicate = false;
  invert = false;
  inverted: String = 'gekozen rule';
  duplicates: String = 'gekozen rule';

  constructor() {
    this.setcontent = [[], [], [], []];
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
    if (this.duplicate == false){
      this.duplicates = 'Duplicates'
    } else {
      this.duplicates = 'No duplicates'
    }
  }

  invertButton(){
    if (this.invert == false){
      this.inverted = 'Open cards'
    } else {
      this.inverted = 'Closed cards'
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
