import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importa FormsModule también si es necesario
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule], // Asegúrate de incluir los módulos necesarios
      declarations: [LoginComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password pattern', () => {
    const claveControl = component.form_registro.get('clave');
    
    // Test valid passwords
    claveControl.setValue('Abcd123$');
    expect(claveControl.valid).toBeTruthy();

    // Test invalid passwords
    claveControl.setValue('invalidpassword');
    expect(claveControl.valid).toBeFalsy();
  });

  it('should require a password', () => {
    const claveControl = component.form_registro.get('clave');
    
    // Test empty password
    claveControl.setValue('');
    expect(claveControl.hasError('required')).toBeTruthy();
  });

  it('should have minimum length', () => {
    const claveControl = component.form_registro.get('clave');
    
    // Test short password
    claveControl.setValue('Ab1$');
    expect(claveControl.hasError('minlength')).toBeTruthy();
  });

  it('should have maximum length', () => {
    const claveControl = component.form_registro.get('clave');
    
    // Test long password
    claveControl.setValue('Aa1$Bb2$Cc3$Dd4$Ee5$Ff6$');
    expect(claveControl.hasError('maxlength')).toBeTruthy();
  });
});
