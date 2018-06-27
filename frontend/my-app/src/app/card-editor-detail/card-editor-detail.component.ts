import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { DropEvent } from 'ng-drag-drop';
import {SnackbarService} from "../snackbar.service";
import { ResourceService } from '../resource.service';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-editor-detail',
  templateUrl: './card-editor-detail.component.html',
  styleUrls: ['./card-editor-detail.component.css']
})

export class CardEditorDetailComponent implements OnInit {

  cards = [];
  droppedBackcard = [];
  droppedFrontcard = [];
  frontText: String;
  backText: String;
  showBack = false;
  showFront = false;
  frontValue: string = 'Text';
  backValue: string = 'Text';
  finalFrontId: number;
  finalBackId: number;

  constructor(private resourceService: ResourceService,
              private cardService: CardService,
              private location: Location,
              private snackbarService: SnackbarService)
  {}

  ngOnInit(): void {
  }

  saveNewText() : void {

    if(this.frontText != undefined){
      this.resourceService.saveResourceText(this.frontText).subscribe(resource => {
        this.finalFrontId = resource.id;
      });
    }

    if (this.backText != undefined) {
      this.resourceService.saveResourceText(this.backText).subscribe(resource => {
        this.finalBackId = resource.id;
      });
    }

    if (this.droppedFrontcard[0] != undefined){
      this.finalFrontId = this.droppedFrontcard[0].id;
    }

    if (this.droppedBackcard[0] != undefined){
      this.finalBackId = this.droppedBackcard[0].id;
    }
  }

  saveNewCard(): void {

    this.saveNewText();

    this.cardService.saveCard(this.finalFrontId, this.finalBackId).subscribe(card => {
      this.cards.push(card);
    });

    this.showFront = false;
    this.showBack = false;
    this.frontText = undefined;
    this.backText = undefined;
    this.droppedFrontcard.splice(0,1);
    this.droppedBackcard.splice(0,1);

    this.finalFrontId = 0;
    this.finalBackId = 0;
  }

  onKeyf(e){
    this.frontText = e.target.value;
  }

  onKeyb(e){
    this.backText = e.target.value;
  }

  goBack(): void {
    this.location.back();
  }

  onBackDrop(e: DropEvent) {
    this.showBack = false;
    this.changeBackValue();
    this.droppedBackcard.splice(0,1);
    this.droppedBackcard.push(e.dragData);
  }

  onFrontDrop(e: DropEvent) {
    this.showFront = false;
    this.changeFrontValue();
    this.droppedFrontcard.splice(0,1);
    this.droppedFrontcard.push(e.dragData);
  }

  onFrontText(){
    this.droppedFrontcard.splice(0,1);
    this.showFront = !this.showFront;
    this.changeFrontValue()
  }

  onBackText(){
    this.droppedBackcard.splice(0,1);
    this.showBack = !this.showBack;
    this.changeBackValue();
  }

  changeFrontValue() {
    if (this.showFront == true){
      this.frontValue = 'No text';
    } else {
      this.frontValue = 'Text';
    }
  }

  changeBackValue(){
    if (this.showBack == true){
      this.backValue = 'No text';
    } else {
      this.backValue = 'Text';
    }
  }

  OpenSnackBarError(text: String) {
    this.snackbarService.ErrorSnackBar(text);
  }

  OpenSnackbarSucces(text: String) {
    this.snackbarService.SuccesSnackBar(text);
  }

}

