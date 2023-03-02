import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaIngresoComponent } from './persona-ingreso.component';

describe('PersonaIngresoComponent', () => {
  let component: PersonaIngresoComponent;
  let fixture: ComponentFixture<PersonaIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaIngresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
