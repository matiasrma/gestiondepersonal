export class Fichada {
    fichadaId? : number;
    fichadaFH : Date;
    fichadaEstado : string;
    persona_personaId : number;
    persona_personaNombre? : string;
    persona_personaApellido? : string;
    persona_personaLegajo? : number;

    constructor(        
        fichadaFH : Date,
        fichadaEstado : string,
        persona_personaId : number
    ){
        this.fichadaFH = fichadaFH;
        this.fichadaEstado = fichadaEstado;
        this.persona_personaId = persona_personaId;
    }

}
