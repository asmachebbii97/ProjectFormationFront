import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profil } from '../entities/Profil';
import { Observable } from 'rxjs';
import { HttpClientModule } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  
  
  public GetAllProfil():Observable<Profil[]> {
    return this.http.get<[Profil]>(this.baseUrl + '/Profils')
  }

  public GetProfilById(idprofil : any):Observable<Profil>  {
    return this.http.get<Profil>(this.baseUrl + '/Profil/'+idprofil)
  }

  
  public addprofil(P:Profil) {
    return this.http.post(this.baseUrl + '/addProfil',P ); 
  }
   
 public updateProfil(id_Profil:any ,P: Profil) :Observable<Profil> {
    return this.http.put<Profil>(this.baseUrl + '/ProfilId/'+id_Profil, P);
  }

 public DeleteProfil(id_Profil:any ) {
    return this.http.delete(this.baseUrl + '/Profil/'+id_Profil);
  }




}
