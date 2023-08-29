import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearModulosComponent } from './admin-crear-modulos.component';

describe('AdminCrearModulosComponent', () => {
  let component: AdminCrearModulosComponent;
  let fixture: ComponentFixture<AdminCrearModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrearModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrearModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
