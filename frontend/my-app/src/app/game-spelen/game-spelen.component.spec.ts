import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpelenComponent } from './game-spelen.component';

describe('GameSpelenComponent', () => {
  let component: GameSpelenComponent;
  let fixture: ComponentFixture<GameSpelenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSpelenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSpelenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
