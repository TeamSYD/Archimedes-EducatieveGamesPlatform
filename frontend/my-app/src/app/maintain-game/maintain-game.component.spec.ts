import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainGameComponent } from './maintain-game.component';

describe('MaintainGameComponent', () => {
  let component: MaintainGameComponent;
  let fixture: ComponentFixture<MaintainGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
