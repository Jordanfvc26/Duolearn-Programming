import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditModulosComponent } from './admin-edit-modulos.component';

describe('AdminEditModulosComponent', () => {
  let component: AdminEditModulosComponent;
  let fixture: ComponentFixture<AdminEditModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
