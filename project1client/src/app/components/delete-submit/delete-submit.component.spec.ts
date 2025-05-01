import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubmitComponent } from './delete-submit.component';

describe('DeleteSubmitComponent', () => {
  let component: DeleteSubmitComponent;
  let fixture: ComponentFixture<DeleteSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
