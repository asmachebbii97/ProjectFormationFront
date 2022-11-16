
import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from "@angular/common/http";
import { Formateur } from '../entities/formateur';
import { Organisme } from '../entities/organisme';
@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  baseUrl: string;

  constructor(private http: HttpClient) {

    this.baseUrl='http://localhost:8092/api';
  }
  
  
  public GetAllFormateur():Observable<Formateur[]> {
    return this.http.get<[Formateur]>(this.baseUrl + '/formateur')
  }

  public GetFormateurById(idformateur: any):Observable<Formateur>  {
    return this.http.get<Formateur>(this.baseUrl + '/formateur/'+idformateur)
  }

 
  
  public addformateur( id_organisme:any ,F: Formateur) {
    return this.http.post(this.baseUrl + '/addFormateur/'+id_organisme, F ); 
  }
   
 public UpdateFormateur(id_organisme:any ,F: Formateur) :Observable<Formateur> {
    return this.http.put<Formateur>(this.baseUrl + '/FormateurId/'+id_organisme, F)
  }

 public DeleteFormateur(id_formateur:any ) {
    return this.http.delete(this.baseUrl + '/DeleteFormateur/'+id_formateur)
  }

  public GetAllOrganisme():Observable<Organisme[]> {
    return this.http.get<[Organisme]>(this.baseUrl + '/organismes')
  }

  
  public GetOrganismeByFormateur(id_formateur : any) {
    return this.http.get(this.baseUrl + '/formateurOrganisme/'+id_formateur)
  }

  
}
