import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { SetRowComponent } from '../set-row/set-row.component'
import {Observable} from "rxjs/Rx";
import {SetService} from "../set.service";
import {Card} from "../cards/card";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  @ViewChildren(SetRowComponent) rows: QueryList<SetRowComponent>

  //setObservable : Observable<Set[]>;
  set: Set;
  //sets: Set[];
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
    this.setService.deleteSet(this.setcontent[0].id).subscribe(a => this.setcontent.splice(index, 1))
  }

  ngOnInit() {
    this.setService.getSets(1).subscribe(a => console.log(a));
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
    this.setService.getSets(1).subscribe(a => a.forEach(this.setcontent.concat(a)));
    console.log("SAVE BUTTON CLICKED");
    var i = 0;
    this.rows.forEach(res => {
      console.log("SetRowCompnent: "+i);
      let gameId: number[] = res.cardcontent.map(a => a.game.id);
      this.setService.saveSetNew(res.cardcontent, res.filler, 1).subscribe();
    });

    console.log(this.setcontent);

  }

  ngAfterViewInit() {
    this.rows.forEach(rowInstance => console.log(rowInstance));
  }
}
