import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/Models/persona';
import { PersonaService } from 'src/Services/persona.service';

@Component({
  selector: 'app-persona-ingreso',
  templateUrl: './persona-ingreso.component.html',
  styleUrls: ['./persona-ingreso.component.css']
})
export class PersonaIngresoComponent implements OnInit {

  nombre: string = "";
  apellido: string = "";
  legajo: string = "";
  nuevoLegajo: Persona | null = null;

  listaPersonas: Persona[] = []

  numeros = /[0-9]/

  disponible: boolean = false;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.cargarListaPersonas();
    console.log(this.nuevoLegajo);
    
  }

  async cargarListaPersonas() {
    const responseLista = await this.personaService.lista();
    if (typeof responseLista === 'object'){
      this.listaPersonas = responseLista;
      this.nuevoLegajo = new Persona(
        this.listaPersonas[this.listaPersonas.length-1].personaLegajo + 1,
        this.nombre,
        this.apellido
      );                
    }
  }

  async Save(){

    this.disponible = true;
    
    if (this.numeros.test(this.nombre + this.apellido)) {
      alert("Los campos no deben contener numeros");
    } else if (this.nombre === "" || this.apellido === ""){
      alert("Debe completar ambos campos");      
    } else {          
      this.nuevoLegajo!.personaNombre = this.nombre;
      this.nuevoLegajo!.personaApellido = this.apellido;
      const responsePersona = this.personaService.save(this.nuevoLegajo!);
      if (typeof responsePersona === 'object'){
        alert("El numero de legajo es: " + this.nuevoLegajo?.personaLegajo);              
      }      
    }

    location.reload();
  }
  

}
