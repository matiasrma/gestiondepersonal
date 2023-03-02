import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fichada } from 'src/Models/fichada';

@Injectable({
  providedIn: 'root'
})
export class FichadaService {

  URL = environment.URL + 'fichada/';
  respuesta : any = null;
  constructor(private httpClient : HttpClient) { }

  async lista(): Promise<Fichada[]>{

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
  
  async save(fichada: any): Promise<any>{

    const params = new HttpParams({

      fromObject: {
        fichadaFH : fichada.fichadaFH.toISOString(),
        fichadaEstado : fichada.fichadaEstado,
        persona_personaId : fichada.persona_personaId
      }
    });

    const data$ = this.httpClient.post(this.URL, fichada, {params, responseType: 'json'});

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
