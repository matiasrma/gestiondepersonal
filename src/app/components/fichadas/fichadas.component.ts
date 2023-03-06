import { Component, Input, OnInit } from '@angular/core';
import { Fichada } from 'src/Models/fichada';
import { FichadaService } from 'src/Services/fichada.service';

@Component({
  selector: 'app-fichadas',
  templateUrl: './fichadas.component.html',
  styleUrls: ['./fichadas.component.css']
})
export class FichadasComponent implements OnInit {

  @Input() listaFichadas: Fichada[] = [];

  constructor() { 
  }

  ngOnInit(): void {    
  }



}
