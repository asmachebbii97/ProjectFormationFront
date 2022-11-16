import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organisme } from '../../../model/entities/Organisme';
import { OrganismeService } from 'src/app/model/services/organisme.service';

@Component({
  selector: 'app-add-organisme-diag',
  templateUrl: './add-organisme-diag.component.html',
  styleUrls: ['./add-organisme-diag.component.scss']
})
export class AddOrganismeDiagComponent implements OnInit {

  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute, private diag: MatDialog, 
    public dialogRef: MatDialogRef<AddOrganismeDiagComponent>,private organismeservice:OrganismeService,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
   
 }
 Form: FormGroup;
 organismes:Organisme[];
organisme: Organisme= new Organisme();

 ngOnInit(): void {

 
   

   this.Form = this.fb.group({
    
    libelle: ['', Validators.required],
     
    
   
   })
 }

 






AddOrganisme() {
 console.log(this.organisme);
 this.organismeservice.Post(this.organisme)
   .subscribe(
     res => 
   { 
   console.log(res);
   this.closeDialog();
 
   this.GetListeOrganisme();
   this.toastr.success('Organisme ajouté avec succee!')
   
 

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


 GetListeOrganisme(){
   this.organismeservice.GetAllOrganisme()
   .subscribe(data=>{this.organismes=data;
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
