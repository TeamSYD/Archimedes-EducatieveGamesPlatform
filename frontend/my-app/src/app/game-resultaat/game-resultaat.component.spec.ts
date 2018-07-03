import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultaatComponent } from './game-resultaat.component';

describe('GameResultaatComponent', () => {
  let component: GameResultaatComponent;
  let fixture: ComponentFixture<GameResultaatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameResultaatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
