import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditLenguajeComponent } from './admin-edit-lenguaje.component';

describe('AdminEditLenguajeComponent', () => {
  let component: AdminEditLenguajeComponent;
  let fixture: ComponentFixture<AdminEditLenguajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditLenguajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditLenguajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
