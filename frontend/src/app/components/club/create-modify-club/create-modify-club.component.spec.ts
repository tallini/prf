import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyClubComponent } from './create-modify-club.component';

describe('CreateModifyClubComponent', () => {
  let component: CreateModifyClubComponent;
  let fixture: ComponentFixture<CreateModifyClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModifyClubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModifyClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
