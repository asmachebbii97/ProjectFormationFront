import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisme } from '../../../model/entities/Organisme';
import { OrganismeService } from 'src/app/model/services/organisme.service';

@Component({
  selector: 'app-modif-organisme-diag',
  templateUrl: './modif-organisme-diag.component.html',
  styleUrls: ['./modif-organisme-diag.component.scss']
})
export class ModifOrganismeDiagComponent implements OnInit {

  organismes:Organisme[];
  Form: FormGroup;
  libelle= new FormControl('', Validators.required);
 
  constructor(public router: Router, private route: ActivatedRoute,public dialogRef: MatDialogRef<ModifOrganismeDiagComponent>,
    private organismeservice:OrganismeService,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    
    this.router = router;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }

  ngOnInit(): void {


    this.Form = this.fb.group({
      libelle : ['', Validators.required],
      
     
    
    })

    
    this.libelle.setValue(this.data.message.titre); 


  }

  update() {

    var msg = this.data.message.libelle;
    
  
  
     if (msg != '') 
     {
       this.dialogRef.close(this.data);
     } 
   }
  
  
  
  
  
    reset() {
      this.Form.reset(); 
  }
  
  
  
  
  
    closeDialog() {
      this.dialogRef.close(false);
      this.router.navigateByUrl("organisme").then(() => {
        window.location.reload();
      });; 
    }


    public hasError = (controlName: string, errorName: string) =>{
      return this.Form.controls[controlName].hasError(errorName);
    }
  
  
  }

 
