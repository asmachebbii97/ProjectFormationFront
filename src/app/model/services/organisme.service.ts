import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisme } from '../entities/Organisme';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {

  private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  public GetAllOrganisme():Observable<Organisme[]> {
    return this.http.get<[Organisme]>(this.baseUrl + '/organismes')
  }
  public Post( O : Organisme) {
    return this.http.post(this.baseUrl + '/addOrganisme/', O ); 
  }
  public Put(id:any ,O: Organisme) :Observable<Organisme> {
    return this.http.put<Organisme>(this.baseUrl + '/updateOrganisme/'+id, O)
  }
  /*public Put(O: Organisme) :Observable<Organisme> {
    return this.http.put<Organisme>(this.baseUrl + '/UpdateOrganisme/', O);
  }*/

  public Delete(id_Organisme:any ) {
    return this.http.delete(this.baseUrl + '/DeleteOrganisme/'+id_Organisme);
  }
}
