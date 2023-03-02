export class Persona {

    personaId? : number;
    personaLegajo : number;
    personaNombre : string;
    personaApellido : string;
    personaCuil? : string;
    personaEstado? : string;
    personaPuesto? : string;
    personaSector? : string;
    personaFechaAlta? : Date;
    personaFechaNacimiento? : Date;

    constructor(
        personaLegajo : number,
        personaNombre : string,
        personaApellido : string,        
    ){
        this.personaLegajo = personaLegajo;
        this.personaNombre = personaNombre;
        this.personaApellido = personaApellido;
        
    }
}
