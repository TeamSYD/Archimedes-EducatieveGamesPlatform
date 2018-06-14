import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DropEvent } from 'ng-drag-drop';

import { ResourceService } from '../resource.service';
import { Resource } from '../resource';
import { CardService } from '../card.service';
import { Card } from '../cards/card';
import {variable} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-card-editor-detail',
  templateUrl: './card-editor-detail.component.html',
  styleUrls: ['./card-editor-detail.component.css']
})

export class CardEditorDetailComponent implements OnInit {
  resource: Resource[] = [];
  card: Card;

  droppedBackcard = [];
  droppedFrontcard = [];
  textBackCard: string;
  textFrontCard: string;

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

  saveCard(): void {
    this.cardService.addCard(this.card)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  onBackDrop(e: DropEvent) {
    this.droppedBackcard.splice(0,1);
    this.droppedBackcard.push(e.dragData);
  }

  onFrontDrop(e: DropEvent) {
    this.droppedFrontcard.splice(0,1);
    this.droppedFrontcard.push(e.dragData);
  }

  onFrontText(){
    this.droppedFrontcard.splice(0,1);
  }

  onBackText(){
    this.droppedBackcard.splice(0,1);
  }

}

