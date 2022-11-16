import { Pays } from "./Pays";
import { Profil } from "./Profil";

export class Participant {
   idParticipant :number;

   nom:String;
   prenom:String;
   email:String;
   typeP:TypeParticipant;
   tlf:number; 
   pays : Pays;
   profil : Profil; 
   p_profil_id:any ; 
   pays_pay_id:any ; 



 


}


export enum TypeParticipant {
   national ,international
  }
