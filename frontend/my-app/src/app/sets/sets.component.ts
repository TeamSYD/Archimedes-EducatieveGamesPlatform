import { Component, OnInit } from '@angular/core';
import { SetRowComponent} from "../set-row/set-row.component";

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  setfiller = true;

  duplicate = false;
  invert = false;
  inverted: String = 'gekozen rule';
  duplicates: String = 'gekozen rule';


  constructor() {

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

  }

}
