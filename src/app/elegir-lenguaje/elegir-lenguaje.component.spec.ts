import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirLenguajeComponent } from './elegir-lenguaje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ElegirLenguajeComponent', () => {
  let component: ElegirLenguajeComponent;
  let fixture: ComponentFixture<ElegirLenguajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, HttpClientModule
      ],
      declarations: [ ElegirLenguajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirLenguajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
