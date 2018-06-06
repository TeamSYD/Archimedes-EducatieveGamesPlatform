import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Resource } from '../resource';
import { CardService } from '../card.service';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-card-editor-detail',
  templateUrl: './card-editor-detail.component.html',
  styleUrls: ['./card-editor-detail.component.css']
})
export class CardEditorDetailComponent implements OnInit {
  resource: Resource[] = [];

  constructor(    private route: ActivatedRoute,
                  private cardService: CardService,
                  private resourceService: ResourceService,
                  private location: Location)
  {}

  ngOnInit(): void {
 //   this.getResource();
  }

 // getResource(): void {
 //   this.resourceService.getResource()
 //     .subscribe(resource => this.resource = resource);
 // }

  //goBack(): void {
   // this.location.back();
 // }

 // saveCard(): void {
 //   this.cardService.saveCard(this.resource)
  //    .subscribe(() => this.goBack());
 // }

}

