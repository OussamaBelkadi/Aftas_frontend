import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionDashbordComponent } from './competition-dashbord.component';

describe('CompetitionDashbordComponent', () => {
  let component: CompetitionDashbordComponent;
  let fixture: ComponentFixture<CompetitionDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
