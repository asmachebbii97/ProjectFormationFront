import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formateur } from 'src/app/model/entities/Formateur';
import { Organisme } from '../../../model/entities/Organisme';
import { Session_de_Formations } from 'src/app/model/entities/Session_de_Formations';
import { FormateurService } from 'src/app/model/services/formateur.service';
import { FormationService } from 'src/app/model/services/formation.service';
import { OrganismeService } from 'src/app/model/services/organisme.service';
import { SessionService } from 'src/app/model/services/session.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {

  listeSession: any;
  session: Session_de_Formations= new Session_de_Formations();
  sessions:Session_de_Formations[];
  formateurs:Formateur[]; 
  organismes : Organisme[];

  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,private formationservice:FormationService,private formateurservice:FormateurService, private organismeservice:OrganismeService,private diag: MatDialog,  public dialogRef: MatDialogRef<AddSessionComponent>,private sessionservice:SessionService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
  } 
  Form: FormGroup;
  ngOnInit(): void {

    console.log(this.data);
    this.ListeSession();
    this.ListeFormateur(); 
    this.ListeOrganisme(); 
    

    this.Form = this.fb.group({
     
      
      Lieu: ['', Validators.required],
      Date_Debut: ['', Validators.required],
      Date_Fin: ['', Validators.required],
      nb_participant: ['', Validators.required],
      formateur_formateur_id: ['', Validators.required],
      org_organisme_id: ['', Validators.required],
      
    
    })
  }


  ListeSession(){
    console.log(this.data);
    this.formationservice.GetSessionByFormation(this.data)
    .subscribe(data=>{this.listeSession=data; 
       },err=>{
      console.log(err);
    })
      
    }



    ListeFormateur(){
      
      this.formateurservice.GetAllFormateur()
      .subscribe(data=>{this.formateurs=data; 
         },err=>{
        console.log(err);
      })
        
      }


      ListeOrganisme(){
      
        this.organismeservice.GetAllOrganisme()
        .subscribe(data=>{this.organismes=data; 
           },err=>{
          console.log(err);
        })
          
        }



  
  AddSession() {
    
    this.sessionservice.Post(this.Form.get('org_organisme_id').value,this.Form.get('formateur_formateur_id').value,this.data,this.session)
      .subscribe(
        res => 
      { 
      console.log(res);
      this.closeDialog();
    
    
      this.toastr.success('session ajouté avec succee!')
      
    
  
      },
      err=>
      {
        console.log(err);
        this.toastr.error('erreur' ); } 
        ) 
       
    }

    closeDialog() {
      this.dialogRef.close(false);
    
    }

    reset() {
      this.Form.reset(); 
  }

  changeFormateur(value) {
    console.log(value);
  
  }

  changeOrganisme(value) {
    console.log(value);
  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.Form.controls[controlName].hasError(errorName);
  }




}
