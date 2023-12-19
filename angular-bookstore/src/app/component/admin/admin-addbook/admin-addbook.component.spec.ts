import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddbookComponent } from './admin-addbook.component';

describe('AdminAddbookComponent', () => {
  let component: AdminAddbookComponent;
  let fixture: ComponentFixture<AdminAddbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddbookComponent]
    });
    fixture = TestBed.createComponent(AdminAddbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
