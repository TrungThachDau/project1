import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSectionComponent } from './user-list-section.component';

describe('UserListSectionComponent', () => {
  let component: UserListSectionComponent;
  let fixture: ComponentFixture<UserListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
