import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Domaine } from '../entities/Domaine';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DomaineService {
   private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  public GetAlldDomaine():Observable<Domaine[]> {
    return this.http.get<[Domaine]>(this.baseUrl + '/Domaines')
  }
  public Post( D: Domaine) {
    return this.http.post(this.baseUrl + '/addDomaine/', D ); 
  }
  public Put(idDomaine:any ,D: Domaine):Observable<Domaine> {
    return this.http.put<Domaine>(this.baseUrl + '/UpdateDomaine/'+idDomaine, D);
  }
  public Delete(idDomaine:any) {
    return this.http.delete(this.baseUrl + '/DeleteDomaine/'+idDomaine);
  } 
}
