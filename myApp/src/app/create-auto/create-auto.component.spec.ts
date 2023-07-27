import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAutoComponent } from './create-auto.component';

describe('CreateAutoComponent', () => {
  let component: CreateAutoComponent;
  let fixture: ComponentFixture<CreateAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAutoComponent]
    });
    fixture = TestBed.createComponent(CreateAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
