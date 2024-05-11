import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyCommentComponent } from './create-modify-comment.component';

describe('CreateModifyCommentComponent', () => {
  let component: CreateModifyCommentComponent;
  let fixture: ComponentFixture<CreateModifyCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModifyCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateModifyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
