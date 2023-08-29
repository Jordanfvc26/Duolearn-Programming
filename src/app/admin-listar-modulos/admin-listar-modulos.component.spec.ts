import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarModulosComponent } from './admin-listar-modulos.component';

describe('AdminListarModulosComponent', () => {
  let component: AdminListarModulosComponent;
  let fixture: ComponentFixture<AdminListarModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListarModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListarModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
