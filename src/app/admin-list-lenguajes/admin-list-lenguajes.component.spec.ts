import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListLenguajesComponent } from './admin-list-lenguajes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LenguajesService } from '../servicios/lenguajes.service';

describe('AdminListLenguajesComponent', () => {

  let component: AdminListLenguajesComponent;
  let fixture: ComponentFixture<AdminListLenguajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [ AdminListLenguajesComponent ],
      providers: [
        LenguajesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListLenguajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
