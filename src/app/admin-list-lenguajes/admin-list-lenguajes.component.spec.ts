import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListLenguajesComponent } from './admin-list-lenguajes.component';

describe('AdminListLenguajesComponent', () => {
  let component: AdminListLenguajesComponent;
  let fixture: ComponentFixture<AdminListLenguajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListLenguajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListLenguajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
