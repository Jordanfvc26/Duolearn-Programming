import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaPreguntasComponent } from './mapa-preguntas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MapaPreguntasComponent', () => {
  let component: MapaPreguntasComponent;
  let fixture: ComponentFixture<MapaPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [ MapaPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
