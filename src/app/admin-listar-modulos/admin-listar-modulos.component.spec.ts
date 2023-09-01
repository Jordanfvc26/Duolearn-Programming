import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarModulosComponent } from './admin-listar-modulos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LenguajesService } from '../servicios/lenguajes.service';

describe('AdminListarModulosComponent', () => {
  let component: AdminListarModulosComponent;
  let fixture: ComponentFixture<AdminListarModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [ AdminListarModulosComponent ],
      providers: [
        LenguajesService
      ]
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
