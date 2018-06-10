import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import {Card} from '../cards/card'
import {CardService} from "../card.service";

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
  @ViewChild('cardcontainer') private cardcontainer : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player : AnimationPlayer;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  private carouselCap = 3;
  private carouselWidth;

  private arraySize = null;
  private listWidth;
  private cardWidthPercentage : number;
  private itemWidth : number;

  constructor( private builder : AnimationBuilder, private cardService : CardService ) {
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }
  updateArraySize(){
    this.arraySize = this.cards.length-this.carouselCap;
  }

  updateCardWidthPercentage(){
    this.cardWidthPercentage = 100/ this.arraySize;
  }

  updateCarouselCap(){
    this.carouselCap = this.carouselWidth / this.itemWidth;
  }

  updateItemWidth(){
    this.itemWidth = this.cardcontainer.nativeElement.attributes['width'].value();
  }

  fetchCarouselWidth(){
    //this.carouselWidth = this.carousel.nativeElement.attributes['width'].value();
  };

  log(){
    // Log all variables for debug purposes
    console.log("Carousel Width: "+this.carouselWidth);
    console.log("Current Slide: "+this.currentSlide);
    console.log("Array Size: "+this.arraySize);
    console.log("Card Width Percentage: "+this.cardWidthPercentage);
    console.log("Item Width: "+this.itemWidth);
  }

  next() {
    if(this.arraySize != this.cards.length-this.carouselCap){
      this.updateArraySize();
    }
    if( this.currentSlide + 1 === this.arraySize ) return;
    this.currentSlide = (this.currentSlide + 1) % this.arraySize;
    this.log();
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
    if(this.arraySize != this.cards.length-this.carouselCap){
      this.updateArraySize();
    }
    if( this.currentSlide === 0 ) return;
    this.currentSlide = ((this.currentSlide - 1) + this.arraySize) % this.arraySize;
    this.log();
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }


  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    this.getCards()

    setTimeout(() => {
    // TODO: GET items.length dynamicly from the DOM
    console.log('AfterView Reached');
    this.updateArraySize();
    this.fetchCarouselWidth();
    this.cardWidthPercentage = 100 / this.cards.length;
    this.updateItemWidth();
    this.updateCarouselCap();

    /*
    this.listWidth = this.itemWidth * this.arraySize;
    this.carouselWrapperStyle = {width: '80%'};
    this.carouselCap = this.carouselWidth / this.itemWidth;
    this.cardWidthPercentage = 100/ this.arraySize;
    this.carousel.nativeElement.attribute('Width').value;

    this.carouselWrapperStyle = {
       width: `${this.itemWidth}px`
    };
    */

    });
  }

}
