
import {Router, ActivatedRoute} from '@angular/router';
import { FormationService } from '../../../model/services/formation.service';
import { Formation ,TypeFormation} from '../../../model/entities/Formation';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SelectionModel } from '@angular/cdk/collections';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DomaineService } from 'src/app/model/services/domaine.service';
import { Domaine } from 'src/app/model/entities/Domaine';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ListeFormationComponent } from '../liste-formation/liste-formation.component';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-modif-formation-diag',
  templateUrl: './modif-formation-diag.component.html',
  styleUrls: ['./modif-formation-diag.component.scss']
})
export class ModifFormationDiagComponent implements OnInit {
  public Types = Object.values(TypeFormation).filter(value => typeof value === 'string'); // affichage liste de type formation
  domaines:Domaine[];  // liste des domaine
  formations:Formation;
  Form: FormGroup;
  id:any;
  id_domaine:any;
  donnee:number;

  titre = new FormControl('', Validators.required);
  annee= new FormControl('', Validators.required);
  duree= new FormControl('', Validators.required);
  nb_session= new FormControl('', Validators.required);
  budget= new FormControl('', Validators.required);
  typeF= new FormControl('', Validators.required);
  Dom_domaine_id= new FormControl('', Validators.required);
  
  constructor(public router: Router, private route: ActivatedRoute,public dialogRef: MatDialogRef<ModifFormationDiagComponent>,private domaineservice:DomaineService,private formationservice:FormationService,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    
    this.router = router;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }
  val:any;
  ngOnInit(): void {
    
     this. GetListeDomaine();
      this.Form = this.fb.group({
      titre : ['', Validators.required],
      annee: ['', Validators.required],
      duree: ['', Validators.required],
      nb_session: ['', Validators.required],
      budget: ['', Validators.required],
      typeF: ['', Validators.required],
      Dom_domaine_id: ['', Validators.required]
    
    })

    
    this.titre.setValue(this.data.message.titre); 

    //set the value of domaine by geting the id domaine selon el idFormation //
   // this.GetDomaine();
  }
  
  
  GetListeDomaine(){  // obtenir liste des domaines
    this.domaineservice.GetAlldDomaine()
    .subscribe(data=>{this.domaines=data;
    },err=>{
      console.log(err);
    })
}



  
 
changeDomaine(value) {
  console.log(value);

}

update() {

  var msg = this.data.message.titre;
  


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
    this.router.navigateByUrl("formation").then(() => {
      window.location.reload();
    });; 
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.Form.controls[controlName].hasError(errorName);
  }

}

