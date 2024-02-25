import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowCompetitionComponent } from './flow-competition.component';

describe('FlowCompetitionComponent', () => {
  let component: FlowCompetitionComponent;
  let fixture: ComponentFixture<FlowCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowCompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
