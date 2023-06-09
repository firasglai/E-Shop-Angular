import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedComponent } from './checked.component';

describe('CheckedComponent', () => {
  let component: CheckedComponent;
  let fixture: ComponentFixture<CheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
