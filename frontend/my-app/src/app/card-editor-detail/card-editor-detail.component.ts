import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DropEvent } from 'ng-drag-drop';

import { ResourceService } from '../resource.service';
import { Resource } from '../resource';
import { CardService } from '../card.service';
import { Card } from '../cards/card';

@Component({
  selector: 'app-card-editor-detail',
  templateUrl: './card-editor-detail.component.html',
  styleUrls: ['./card-editor-detail.component.css']
})

export class CardEditorDetailComponent implements OnInit {
  resources: Resource[];
  card: Card;

  droppedBackcard = [];
  droppedFrontcard = [];
  frontText: String;
  backText: String;
  showBack = false;
  showFront = false;
  frontValue: string = 'Text';
  backValue: string = 'Text';

  constructor(private resourceService: ResourceService,
              private cardService: CardService,
              private route: ActivatedRoute,
              private location: Location)
  {}

  ngOnInit(): void {
  }

  saveCard(text_resource: String): void {
    if(this.frontText != undefined){
      this.resourceService.saveResourceText(this.frontText).subscribe(resource => {
        this.resources.push(resource);
      });
    }

    if (this.backText != undefined) {
      this.resourceService.saveResourceText(this.backText).subscribe(resource => {
        this.resources.push(resource);
      });
    }

    if (this.droppedFrontcard != []){

    }

    if (this.droppedBackcard != []){

    }

    this.frontText = undefined;
    this.backText = undefined;
    this.droppedFrontcard.splice(0,1);
    this.droppedBackcard.splice(0,1);
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

}

