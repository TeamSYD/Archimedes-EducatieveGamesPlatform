import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { Card } from '../cards/card'
import { CardService } from "../card.service";
import { Renderer2} from "@angular/core";
import {Observable} from "rxjs/Rx";

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
  cards: Observable<Card[]>;
  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChildren('cardlistitem') cardListItem: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @ViewChild('carouselcontainer') private carouselContainer : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player : AnimationPlayer;
  private currentSlide = 0;
  private carouselCap = 6;
  private carouselWidth;
  private arraySize = null;
  private itemWidth : number;

  constructor( private builder : AnimationBuilder, private cardService : CardService, private renderer: Renderer2 ) {

  }

  getCards(): void {
    //this.cardService.getCards()

      //.subscribe(cards => {
        //this.log();
        //this.arraySize = cards.length-(this.carouselCap-1);
        //this.resizeColumns();
        //this.cards = cards;
        //console.log(cards);
        //console.log(cards[0].openface_side.type);
      //});
  }

  setCarouselCap(amount : number) {
    this.carouselCap = amount;
  }

  updateArraySize(){
    //this.arraySize = this.cards.length-(this.carouselCap-1);
  }

  updateCarouselWidth(){
    this.carouselWidth = this.carouselContainer.nativeElement.offsetWidth;
  };

  updateItemWidth(){
    this.itemWidth = this.carouselWidth / this.carouselCap;
  }

  /*
  @HostListener('window:resize', ['$event'])
  resizeColumns() {
    this.updateCarouselWidth();
    this.updateItemWidth();
    this.cardListItem.forEach((cc) => {
      this.renderer.setStyle(
        cc.nativeElement,
        'width',
        `${this.itemWidth}px`
      );
    });
  }
  */

  /*
  updateItemWidth(){
    this.itemWidth = this.cardListItem.nativeElement.attributes['width'].value();
  }
  */
  // Handig voor later
  //let widths = this.cardListItem.map(cc => cc.nativeElement.offsetWidth);

  log(){
    // Log all variables for debug purposes
    console.log("Carousel Width: "+this.carouselWidth);
    console.log("Current Slide: "+this.currentSlide);
    console.log("Array Size: "+this.arraySize);
    console.log("Carousel Cap: "+this.carouselCap);
    console.log("Item Width: "+this.itemWidth);
  }

  next() {
    //if(this.arraySize != this.cards.length-this.carouselCap){
    //  this.updateArraySize();
    //}
    //this.resizeColumns();

    if( this.currentSlide + 1 === this.arraySize ) return;
    this.currentSlide = (this.currentSlide + 1) % this.arraySize;
    //this.log();
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  prev() {
    //if(this.arraySize != this.cards.length-this.carouselCap){
    //  this.updateArraySize();
    //}
    //this.resizeColumns();

    if( this.currentSlide === 0 ) return;
    this.currentSlide = ((this.currentSlide - 1) + this.arraySize) % this.arraySize;
    //this.log();
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

  ngAfterViewInit() {
    //this.getCards();
    this.cards = this.cardService.getCards();

    //setTimeout(() => {
    // TODO: GET items.length dynamicly from the DOM
    //console.log('AfterView Reached');

    // Triggers too early
    //this.updateArraySize();

    /* SHOULD PROBABLY BE DELETED
    this.listWidth = this.itemWidth * this.arraySize;
    this.carouselWrapperStyle = {width: '80%'};
    this.carouselCap = this.carouselWidth / this.itemWidth;
    this.cardWidthPercentage = 100/ this.arraySize;
    this.carousel.nativeElement.attribute('Width').value;

    this.carouselWrapperStyle = {
       width: `${this.itemWidth}px`
    };
    */
    //});

    // TODO: Load both functions AFTER cards have been loaded (Async function)
    //this.updateArraySize();
    //this.resizeColumns();
  }

}
