import { Formateur } from "./Formateur";
import { Organisme } from "./Organisme";
import { Participant } from "./Participant";

export class Session_de_Formations {
	idSession : number; 
	 lieu : String
	date_Debut: Date;
	 date_Fin: Date ;
	nb_participant:number;
	participant : Participant; 
	formateur : Formateur ; 
	org : Organisme; 
	formateur_formateur_id : number;
	org_organisme_id : number; 


    
    }