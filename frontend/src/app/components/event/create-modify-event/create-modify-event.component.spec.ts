import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyEventComponent } from './create-modify-event.component';

describe('CreateModifyEventComponent', () => {
  let component: CreateModifyEventComponent;
  let fixture: ComponentFixture<CreateModifyEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModifyEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModifyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
