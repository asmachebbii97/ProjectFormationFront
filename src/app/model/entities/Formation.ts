import {Domaine} from './Domaine'
import {Session_de_Formations} from './Session_de_Formations'
export class Formation {
	idFormation:number; 
     titre:  String ;
	 annee: number;
	nb_session: number;
	 duree: number;
	
    budget: number;
	typeF:TypeFormation;
	dom : Domaine ;
	Dom_domaine_id: number ; 
	session_de_Formations : Session_de_Formations ; 
    
    }

	export enum TypeFormation {
		national ,international
	  }