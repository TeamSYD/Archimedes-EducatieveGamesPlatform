import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  resource: Resource[] = [];
  card: Card;

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

}

