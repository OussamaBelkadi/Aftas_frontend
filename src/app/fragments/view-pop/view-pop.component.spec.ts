import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPopComponent } from './view-pop.component';

describe('ViewPopComponent', () => {
  let component: ViewPopComponent;
  let fixture: ComponentFixture<ViewPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
