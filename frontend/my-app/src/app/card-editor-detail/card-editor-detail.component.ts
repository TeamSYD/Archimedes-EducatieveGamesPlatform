import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  resource: Resource[];
  card: Card;

  droppedBackcard = [];
  droppedFrontcard = [];
  @ViewChild('frontText') private frontText: ElementRef;
  @ViewChild('backText') private backText: ElementRef;
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
    this.getResource();
  }

  getResource(): void {
    this.resourceService.getResource()
      .subscribe(resource => this.resource = resource);
  }

  saveCard(text_resource: String): void {
    console.log(this.frontText.nativeElement.innerHTML);
    console.log(this.backText.nativeElement.innerHTML);
    this.resourceService.saveResourceText(text_resource)
      .subscribe(resource => {
        this.resource.push(this.frontText.nativeElement.innerHTML);
        this.resource.push(this.backText.nativeElement.innerHTML);
      });
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

