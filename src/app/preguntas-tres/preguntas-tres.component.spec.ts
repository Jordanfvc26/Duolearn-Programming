import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasTresComponent } from './preguntas-tres.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PreguntasTresComponent', () => {
  let component: PreguntasTresComponent;
  let fixture: ComponentFixture<PreguntasTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [ PreguntasTresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
