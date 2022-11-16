import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Domaine } from 'src/app/model/entities/Domaine';
import { DomaineService } from 'src/app/model/services/domaine.service';

@Component({
  selector: 'app-add-domaine-diag',
  templateUrl: './add-domaine-diag.component.html',
  styleUrls: ['./add-domaine-diag.component.scss']
})
export class AddDomaineDiagComponent implements OnInit {
  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute, private diag: MatDialog, 
     public dialogRef: MatDialogRef<AddDomaineDiagComponent>,private domaineservice:DomaineService,
     @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
    
  }
  Form: FormGroup;
  domaines:Domaine[];
domaine: Domaine= new Domaine();

  ngOnInit(): void {

  
    

    this.Form = this.fb.group({
     
      libelle: ['', Validators.required],
      
     
    
    })
  }

  






AddDomaine() {
  console.log(this.domaine);
  this.domaineservice.Post(this.domaine)
    .subscribe(
      res => 
    { 
    console.log(res);
    this.closeDialog();
  
    this.GetListeDomaine();
    this.toastr.success('Domaine ajouté avec succee!')
    
  

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




 
  GetListeDomaine(){
    this.domaineservice.GetAlldDomaine()
    .subscribe(data=>{this.domaines=data;
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
