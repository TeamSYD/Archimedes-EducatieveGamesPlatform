import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEditorSetsComponent } from './game-editor-sets.component';

describe('GameEditorSetsComponent', () => {
  let component: GameEditorSetsComponent;
  let fixture: ComponentFixture<GameEditorSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEditorSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEditorSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
