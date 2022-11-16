
import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pays } from '../entities/Pays';
import { Observable } from 'rxjs';
import { HttpClientModule } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  
  
  public GetAllPays():Observable<Pays[]> {
    return this.http.get<[Pays]>(this.baseUrl + '/Pays')
  }

  public GetPaysById(idpays : any):Observable<Pays>  {
    return this.http.get<Pays>(this.baseUrl + '/Pays/'+idpays)
  }

  
  public addpays(P:Pays) {
    return this.http.post(this.baseUrl + '/addPays',P ); 
  }
   
 public updatePays(id_Pays:any ,P: Pays) :Observable<Pays> {
    return this.http.put<Pays>(this.baseUrl + '/PaysId/'+id_Pays, P);
  }

 public DeletePays(id_Pays:any ) {
    return this.http.delete(this.baseUrl + '/Pays/'+id_Pays);
  }
}