import { Organisme } from "./organisme";

export class Formateur {
    idFormateur:number;
	 nom:string;
    prenom:String;
     email: String ;
    tlf:number;
	type:TypeFormateur;
    organismes_organisme_id:number;
	orgrnismes: Organisme;

    
}

export enum TypeFormateur {
    interne ,externe
  }