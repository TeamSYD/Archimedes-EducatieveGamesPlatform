import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditorDetailComponent } from './card-editor-detail.component';

describe('CardEditorDetailComponent', () => {
  let component: CardEditorDetailComponent;
  let fixture: ComponentFixture<CardEditorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEditorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEditorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
