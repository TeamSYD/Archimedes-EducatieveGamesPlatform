import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArrangementComponent } from './manage-arrangement.component';

describe('ManageArrangementComponent', () => {
  let component: ManageArrangementComponent;
  let fixture: ComponentFixture<ManageArrangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageArrangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
