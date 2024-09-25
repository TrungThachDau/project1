import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserSuccessfulComponent } from './dialog-add-user-successful.component';

describe('DialogAddUserSuccessfulComponent', () => {
  let component: DialogAddUserSuccessfulComponent;
  let fixture: ComponentFixture<DialogAddUserSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUserSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddUserSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
