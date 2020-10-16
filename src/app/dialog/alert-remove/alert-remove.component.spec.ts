import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRemoveComponent } from './alert-remove.component';

describe('AlertRemoveComponent', () => {
  let component: AlertRemoveComponent;
  let fixture: ComponentFixture<AlertRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
