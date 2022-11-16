import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Domaine } from '../entities/Domaine';
import { Observable } from 'rxjs';
import { Participant } from '../entities/Participant';
import { Session_de_Formations } from '../entities/Session_de_Formations';



@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
   private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  
  
  public GetParticipantBySession(id:any):Observable<Participant[]> {
    return this.http.get<[Participant]>(this.baseUrl + '/ParticipantSessionFormation/'+ id )
  }
  
  public Post( IdProfil:any ,IdPays :any ,Idsession :any  , P: Participant) {
    return this.http.post(this.baseUrl + '/addparticipant/'+ IdProfil  + "/" + IdPays + "/" +Idsession, P ); 
  }

  public Put(id:any ,P: Participant) :Observable<Participant> {
    return this.http.put<Participant>(this.baseUrl + '/UpdateParticipant/'+id, P)
  }


  public DeleteParticipant(id_participant:any,id_session :any) {
    return this.http.delete(this.baseUrl + '/DeleteParticipant/'+id_participant +'/'+ id_session) ;
  }

 
}
