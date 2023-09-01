import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruccionesComponent } from './instrucciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('InstruccionesComponent', () => {
  let component: InstruccionesComponent;
  let fixture: ComponentFixture<InstruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [ InstruccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
