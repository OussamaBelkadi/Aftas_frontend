import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCompetitionsComponent } from './subscription-competitions.component';

describe('SubscriptionCompetitionsComponent', () => {
  let component: SubscriptionCompetitionsComponent;
  let fixture: ComponentFixture<SubscriptionCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCompetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
