import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubCardComponent } from './club-card.component';

describe('ClubCardComponent', () => {
  let component: ClubCardComponent;
  let fixture: ComponentFixture<ClubCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
