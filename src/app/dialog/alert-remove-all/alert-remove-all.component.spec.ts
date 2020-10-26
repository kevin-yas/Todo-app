import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRemoveAllComponent } from './alert-remove-all.component';

describe('AlertRemoveAllComponent', () => {
  let component: AlertRemoveAllComponent;
  let fixture: ComponentFixture<AlertRemoveAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertRemoveAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRemoveAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
