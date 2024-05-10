import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyTemplateComponent } from './add-modify-template.component';

describe('AddModifyTemplateComponent', () => {
  let component: AddModifyTemplateComponent;
  let fixture: ComponentFixture<AddModifyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModifyTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddModifyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
