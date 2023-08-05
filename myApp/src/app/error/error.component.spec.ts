import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ERRORComponent } from './error.component';

describe('ERRORComponent', () => {
  let component: ERRORComponent;
  let fixture: ComponentFixture<ERRORComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ERRORComponent]
    });
    fixture = TestBed.createComponent(ERRORComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
