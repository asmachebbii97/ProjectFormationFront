import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formateur } from 'src/app/model/entities/Formateur';
import { Organisme } from '../../../model/entities/Organisme';
import { FormateurService } from 'src/app/model/services/formateur.service';
import { FormationService } from 'src/app/model/services/formation.service';
import { OrganismeService } from 'src/app/model/services/organisme.service';
import { SessionService } from 'src/app/model/services/session.service';
import { AddSessionComponent } from '../add-session/add-session.component';

@Component({
  selector: 'app-update-session',
  templateUrl: './update-session.component.html',
  styleUrls: ['./update-session.component.scss']
})
export class UpdateSessionComponent implements OnInit {


  formateurs:Formateur[]; 
  organismes : Organisme[];

  
  Lieu = new FormControl('', Validators.required);
  Date_Debut= new FormControl('', Validators.required);
  Date_Fin= new FormControl('', Validators.required);
  nb_participant= new FormControl('', Validators.required);
  formateur_formateur_id= new FormControl('', Validators.required);
  org_organisme_id= new FormControl('', Validators.required);
  
  




  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,private formationservice:FormationService,private formateurservice:FormateurService, private organismeservice:OrganismeService,private diag: MatDialog,  public dialogRef: MatDialogRef<AddSessionComponent>,private sessionservice:SessionService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
  } 
  Form: FormGroup;
  ngOnInit(): void {
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
    this.Lieu.setValue(this.data.message.lieu); 
  //  this.formateur_formateur_id.setValue(this.data.formateur.nom);
    
  }


  UpdSession() {

    var msg = this.data.message.lieu;
  
     if (msg != '') 
     {
       this.dialogRef.close(this.data);
     } 
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
