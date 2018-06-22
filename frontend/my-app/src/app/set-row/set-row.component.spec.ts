import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRowComponent } from './set-row.component';

describe('SetRowComponent', () => {
  let component: SetRowComponent;
  let fixture: ComponentFixture<SetRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
