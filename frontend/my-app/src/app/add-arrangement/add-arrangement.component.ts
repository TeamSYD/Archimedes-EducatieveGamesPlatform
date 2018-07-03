import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../game.service";
import {ArrangementenService} from "../arrangementen.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-arrangement',
  templateUrl: './add-arrangement.component.html',
  styleUrls: ['./add-arrangement.component.css']
})
export class AddArrangementComponent implements OnInit {

  name: String;

  onKey(e){
    this.name = e.target.value;
  }

  addArrangement(){
    this.arrangementenService.addArrangement(this.name).subscribe( arrangement => {
    });
  }

  constructor(private arrangementenService: ArrangementenService,
              public router: Router,
              public location: Location) { }

  ngOnInit() {
  }

}
