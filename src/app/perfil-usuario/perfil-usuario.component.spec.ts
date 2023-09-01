import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, HttpClientModule
      ],
      declarations: [ PerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
