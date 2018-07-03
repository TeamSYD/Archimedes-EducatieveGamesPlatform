import {
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { Card } from '../cards/card'
import { CardService } from "../card.service";
import { Renderer2} from "@angular/core";
import {DataService} from "../data-service";

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
}

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  cards: Card[] = [];
  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChildren('cardlistitem') cardListItem: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @ViewChild('carouselcontainer') private carouselContainer : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private currentSlide = 0;
  private carouselCap = 6;
  private carouselWidth;
  private arraySize = null;
  private itemWidth : number;
  gameId: number = parseInt(localStorage.getItem("gameId"));

  constructor(private cardService : CardService, private renderer: Renderer2, private dataService: DataService) {
  }

  log(){
    // Log all variables for debug purposes
    console.log("Carousel Width: "+this.carouselWidth);
    console.log("Current Slide: "+this.currentSlide);
    console.log("Array Size: "+this.arraySize);
    console.log("Carousel Cap: "+this.carouselCap);
    console.log("Item Width: "+this.itemWidth);
  }

  private getCards(){
    this.cardService.getCards().subscribe(cards => this.cards = cards);
  }

  public removeCard(i){
    this.cardService.deleteCard(this.cards[i]).subscribe();
    this.cards.splice(i, 1);
  }

  ngOnInit() {
    this.cardService.gameId = this.gameId;
    this.getCards();
    console.log(this.cards);
    this.dataService.currentCard.subscribe(card => this.cards.push(card));

  }
}
