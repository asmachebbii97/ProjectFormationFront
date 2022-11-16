import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Domaine } from '../entities/Domaine';
import { Observable } from 'rxjs';
import { Participant } from '../entities/Participant';
import { Session_de_Formations } from '../entities/Session_de_Formations';



@Injectable({
  providedIn: 'root'
})
export class SessionService {
   private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  
  
  public GetParticipantBySession(id:any):Observable<Participant[]> {
    return this.http.get<[Participant]>(this.baseUrl + '/ParticipantSessionFormation/'+ id )
  }
  
  public Post( idorg:any ,idformateur :any ,idFormation :any  , S: Session_de_Formations) {
    return this.http.post(this.baseUrl + '/addSession_de_Formation/'+ idorg  + "/" + idformateur + "/" +idFormation, S ); 
  }

  public Put(id:any ,S: Session_de_Formations) :Observable<Session_de_Formations> {
    return this.http.put<Session_de_Formations>(this.baseUrl + '/Session_de_FormationId/'+id, S)
  }

  public DeleteSession(id_S:any,id_F :any  ) {
    return this.http.delete(this.baseUrl + '/Session_de_Formation/'+id_S+'/'+id_F);
  }
 
}
