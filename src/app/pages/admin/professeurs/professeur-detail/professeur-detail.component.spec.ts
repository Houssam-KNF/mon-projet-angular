import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurDetailComponent } from './professeur-detail.component';

describe('ProfesseurDetailComponent', () => {
  let component: ProfesseurDetailComponent;
  let fixture: ComponentFixture<ProfesseurDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesseurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
