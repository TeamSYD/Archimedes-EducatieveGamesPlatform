import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showHome: boolean = true;
  showArrangements: boolean;
  showGames: boolean;

  showArrangementBeheer(){
    this.showGames = false;
    this.showHome = false;
    this.showArrangements = true;
  }

  showGameBeheer(){
    this.showArrangements = false;
    this.showHome = false;
    this.showGames = true;
  }

  showHomepage(){
    this.showArrangements = false;
    this.showGames = false;
    this.showHome = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
