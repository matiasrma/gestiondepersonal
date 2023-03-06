import { Component, Input, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { Fichada } from 'src/Models/fichada';

@Component({
  selector: 'app-presentes',
  templateUrl: './presentes.component.html',
  styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit {

  @Input() lista: Fichada[] =  [];
  

  constructor() { }

  ngOnInit(): void {
    

  }

  filtrar(lista: Fichada[]){

    let listaFinal: Fichada[] = [];
    let day = new Date().getDate();
    let mm = new Date().getMonth();
    let yy = new Date().getFullYear();

    lista.forEach(element => {
      if (!listaFinal.some(fichada => fichada.persona_personaId === element.persona_personaId)){
        
        let fichadaDate = new Date(element.fichadaFH);

        if (fichadaDate.getDate() === day && fichadaDate.getMonth() === mm && fichadaDate.getFullYear() == yy){
          listaFinal.push(element);
        }

      }
    });    

    listaFinal = listaFinal.filter(fichada => fichada.fichadaEstado === "Ingreso");

    return listaFinal;
  }

}
