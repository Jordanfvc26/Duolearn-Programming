import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearLenguajesComponent } from './admin-crear-lenguajes.component';

describe('AdminCrearLenguajesComponent', () => {
  let component: AdminCrearLenguajesComponent;
  let fixture: ComponentFixture<AdminCrearLenguajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrearLenguajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrearLenguajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
