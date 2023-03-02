import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { lastValueFrom, Observable } from 'rxjs';
import { Persona } from 'src/Models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = environment.URL + 'persona/';
  respuesta: any = "";

  constructor(private httpClient : HttpClient) { }

  async lista(): Promise<Persona[]>{

    const data$ = this.httpClient.get(this.URL, {responseType: 'json'})

    try{
        const value = await lastValueFrom(data$, {defaultValue: "false"}) ?? "false";       
        this.respuesta = value;

    } catch(e) {
      if (e instanceof HttpErrorResponse){
          this.respuesta = (e.error);
      }
    }

    return this.respuesta;

  }
  
  async save(Persona: any): Promise<any>{

    const params = new HttpParams({

      fromObject: {
        personaLegajo : Persona.personaLegajo,
        personaNombre : Persona.personaNombre,
        personaApellido : Persona.personaApellido
      }
    });

    const data$ = this.httpClient.post(this.URL, Persona, {params, responseType: 'json'});

    try{
        const value = await lastValueFrom(data$, {defaultValue: "false"}) ?? "false";       
        this.respuesta = value;

    } catch(e) {
      if (e instanceof HttpErrorResponse){
          this.respuesta = (e.error);
      }
    }

    return this.respuesta;

  }    
  

  
  
}
