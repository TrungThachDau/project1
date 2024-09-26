import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationListSectionComponent } from './authorization-list-section.component';

describe('AuthorizationListSectionComponent', () => {
  let component: AuthorizationListSectionComponent;
  let fixture: ComponentFixture<AuthorizationListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationListSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
