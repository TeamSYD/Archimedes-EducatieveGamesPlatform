import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import {Card} from '../cards/card'
import {CardService} from "../card.service";
import {forEach} from "@angular/router/src/utils/collection";

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
export class CarouselComponent implements AfterViewInit {
  cards: Card[] = [];
  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player : AnimationPlayer;
  private itemWidth : number;
  private currentSlide = 0;
  carouselWrapperStyle = {}
  private arraySize = this.cards.length;

  setArraySize(){
    this.arraySize = this.cards.length;
  }

  next() {
    if(!this.arraySize){
      this.setArraySize();
    }
    if( this.currentSlide + 1 === this.arraySize ) return;
    this.currentSlide = (this.currentSlide + 1) % this.arraySize;


    console.log(this.currentSlide);
    console.log(this.arraySize);
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    if(!this.arraySize){
      this.setArraySize();
    }
    if( this.currentSlide === 0 ) return;
    this.currentSlide = ((this.currentSlide - 1) + this.arraySize) % this.arraySize;

    console.log(this.currentSlide);
    console.log(this.arraySize);
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  constructor( private builder : AnimationBuilder, private cardService : CardService ) {
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }
  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    this.getCards()
    setTimeout(() => {
    this.itemWidth = 100;
    // TODO: GET items.length dynamicly from the DOM
    this.setArraySize()
      //this.carouselWrapperStyle = {
      //  width: `${this.itemWidth}px`
    //};
    });
  }

}
