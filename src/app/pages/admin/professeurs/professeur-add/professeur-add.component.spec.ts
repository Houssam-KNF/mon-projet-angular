import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurAddComponent } from './professeur-add.component';

describe('ProfesseurAddComponent', () => {
  let component: ProfesseurAddComponent;
  let fixture: ComponentFixture<ProfesseurAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesseurAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
