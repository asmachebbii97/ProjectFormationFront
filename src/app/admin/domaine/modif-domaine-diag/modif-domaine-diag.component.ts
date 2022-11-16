import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Domaine } from 'src/app/model/entities/Domaine';
import { Organisme } from 'src/app/model/entities/Organisme';
import { DomaineService } from 'src/app/model/services/domaine.service';

@Component({
  selector: 'app-modif-domaine-diag',
  templateUrl: './modif-domaine-diag.component.html',
  styleUrls: ['./modif-domaine-diag.component.scss']
})
export class ModifDomaineDiagComponent implements OnInit {
  domaines:Domaine[];
  Form: FormGroup;
  libelle= new FormControl('', Validators.required);
 
  constructor(public router: Router, private route: ActivatedRoute,public dialogRef: MatDialogRef<ModifDomaineDiagComponent>,
    private domaineservice:DomaineService,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    
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
      this.router.navigateByUrl("Domaine").then(() => {
        window.location.reload();
      });; 
    }
  

    public hasError = (controlName: string, errorName: string) =>{
      return this.Form.controls[controlName].hasError(errorName);
    }
  }

 