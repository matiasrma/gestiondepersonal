import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Exception } from '@zxing/library';
import { distinctUntilChanged, filter, fromEvent, observable, Observable, of, timer } from 'rxjs';
import { Fichada } from 'src/Models/fichada';
import { Persona } from 'src/Models/persona';
import { FichadaService } from 'src/Services/fichada.service';
import { PersonaService } from 'src/Services/persona.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})

export class CamaraComponent implements OnInit {
  
  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results:string[]=[];

  capturando : string = "";

  public inputLegajo: number | null = null;
  letras = /[a-zA-z]/

  listaPersonas : Persona[] = [];
  listaFichadas : Fichada[] = [];
  
  ultimaNombre: string | null = null;  
  saludo?: string | null;
  mensaje: string | null = null;

  constructor(
    private personaService : PersonaService,
    private fichadaService : FichadaService
  ) {  }
  
  ngOnInit(): void {
    this.cargarPersona();
    this.cargarFichadas();    
  }  

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  async scanSuccessHandler(event:string){    

    this.capturando = "captura";
    this.mensaje = null;    
    let ahora: Date = new Date();          
    let fichadaActual: any = new Fichada(new Date(ahora.getFullYear(),ahora.getMonth(),ahora.getDate(),ahora.getHours(),ahora.getMinutes()), 'fichada', 0);

    try{      
            
		fichadaActual.persona_personaLegajo = parseInt(event);    
		fichadaActual.persona_personaId = this.listaPersonas.filter(persona => persona.personaLegajo === parseInt(event))[0].personaId!;    
		fichadaActual.persona_personaNombre = this.listaPersonas.filter(persona => persona.personaLegajo === parseInt(event))[0].personaNombre;    
		
		let fichadaAnterior = this.listaFichadas.filter(elemento => elemento.persona_personaId === fichadaActual.persona_personaId)[0];            
			
		if (fichadaAnterior != undefined) {
			fichadaAnterior.fichadaFH = new Date(fichadaAnterior.fichadaFH);
		} else {
			fichadaAnterior = new Fichada(new Date(ahora.getFullYear(),ahora.getMonth(),ahora.getDate()-1), "Ingreso", 1);
		}
		
		if (fichadaAnterior.fichadaFH.getDate() === fichadaActual.fichadaFH.getDate() &&
		fichadaAnterior.fichadaFH.getHours() === fichadaActual.fichadaFH.getHours() &&
		fichadaAnterior.fichadaFH.getMinutes() + 2 > fichadaActual.fichadaFH.getMinutes() ){                  
					
			this.ultimaNombre = fichadaAnterior.persona_personaNombre!;
			this.mensaje = fichadaAnterior.persona_personaNombre + " podes volver a fichar a las " +
			(fichadaAnterior.fichadaFH.getHours().toString().padStart(2,"0") + ":" + (fichadaAnterior.fichadaFH.getMinutes() + 2).toString().padStart(2,"0"));                

		} else if (fichadaActual.persona_personaId >= 1) {        

			this.ultimaNombre = fichadaActual.persona_personaNombre;
			const responseFichada = await this.fichadaService.save(fichadaActual);

			if ((typeof responseFichada) === "object"){
				console.log(responseFichada);		
				this.ultimaNombre = fichadaActual.persona_personaNombre;	
				responseFichada.fichadaEstado === "Ingreso" ? this.saludo = "Buen dia" : this.saludo = "Buen descanso";
				await this.cargarFichadas(); 
			}else{
			alert("FICHADA NO GUARDADA: \n" + responseFichada);
			}
        
      	}

    } catch(e: any) {

      if (this.letras.test(event)) { this.mensaje = "Error, el numero de legajo NO debe contener letras" }
      else if (event.length != 5) { this.mensaje = "Cantidad de numeros incorrecta" }
      else if (fichadaActual.persona_personaId === 0 ) { this.mensaje = "Numero de legajo incorrecto" }
      else if (e.name = "TypeError") { this.mensaje = e }
      
    } finally {
      this.inputLegajo = null; 
      this.capturando = "captura-lista";
    }

  }  

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;        
        this.scannerEnabled=true;
      }
    })    
  }

  async cargarPersona(){
    this.listaPersonas = await this.personaService.lista()    
  }

  async cargarFichadas(){
    this.listaFichadas = await this.fichadaService.lista();           
  }    
  
}
