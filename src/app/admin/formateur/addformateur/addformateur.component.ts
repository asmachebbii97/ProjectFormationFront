import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formateur, TypeFormateur } from 'src/app/model/entities/formateur';
import { Organisme } from 'src/app/model/entities/organisme';
import { FormateurService } from 'src/app/model/services/formateur.service';

@Component({
  selector: 'app-addformateur',
  templateUrl: './addformateur.component.html',
  styleUrls: ['./addformateur.component.scss']
})
export class AddformateurComponent implements OnInit {

  organismes:Organisme[]; 
  
  formateur: Formateur= new Formateur();
  formateurs:Formateur[];
  
  public Types = Object.values(TypeFormateur).filter(value => typeof value === 'string');
  
  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,
     private diag: MatDialog,  public dialogRef: MatDialogRef<AddformateurComponent>,private formateurservice:FormateurService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
    
  }
  Form: FormGroup;
  ngOnInit(): void {

  
    this.GetListeOrganisme();
    

    this.Form = this.fb.group({
     
      Nom : ['', Validators.required],
      Prenom : ['', Validators.required],
      Email: ['', [Validators.required,Validators.email]],
      Tlf: ['', [Validators.required,Validators.min(20000000)]],
      typeF: ['', Validators.required],
     organisme_id: ['', Validators.required]
    
    })


  }
  
  
  GetListeOrganisme(){
    this.formateurservice.GetAllOrganisme()
    .subscribe(data=>{this.organismes=data;
    },err=>{
      console.log(err);
    })
}




changeOrganisme(value) {
  console.log(value);

}

AddFormateur() {
  console.log(this.formateur);
  this.formateurservice.addformateur(this.Form.get('organisme_id').value,this.formateur)
    .subscribe(
      res => 
    { 
    console.log(res);
    this.closeDialog();
  
    this.GetListeFormateur();
    this.toastr.success('Formateur ajouté avec succee!')
    
  

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

 
  GetListeFormateur(){
    this.formateurservice.GetAllFormateur()
    .subscribe(data=>{this.formateurs=data;
    },err=>{
      console.log(err);
    })


  }

  reset() {
    this.Form.reset(); 
}

  


public hasError = (controlName: string, errorName: string) =>{
  return this.Form.controls[controlName].hasError(errorName);
}
}
