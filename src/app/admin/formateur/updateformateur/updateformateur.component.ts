import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Formateur, TypeFormateur } from 'src/app/model/entities/formateur';
import { Organisme } from 'src/app/model/entities/organisme';
import { FormateurService } from 'src/app/model/services/formateur.service';

@Component({
  selector: 'app-updateformateur',
  templateUrl: './updateformateur.component.html',
  styleUrls: ['./updateformateur.component.scss']
})
export class UpdateformateurComponent implements OnInit {

  public Types = Object.values(TypeFormateur).filter(value => typeof value === 'string'); // affichage liste de type formation
  organismes:Organisme[];  // liste des domaine
  formateurs:Formateur;
  Form: FormGroup;
  id:any;
  id_organisme:any;
  donnee:number;

  Nom = new FormControl('', Validators.required);
  Prenom= new FormControl('', Validators.required);

  Email= new FormControl('', Validators.required);
  Tlf= new FormControl('', Validators.required);
  typeF= new FormControl('', Validators.required);
  organisme_id= new FormControl('', Validators.required);

  constructor(public router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateformateurComponent>,
    private formateurservice:FormateurService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    
    this.router = router;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }
  val:any;
  ngOnInit(): void {
    
     this. GetListeOrganisme();
      this.Form = this.fb.group({
        Nom : ['', Validators.required],
        Prenom : ['', Validators.required],

        Email: ['', [Validators.required,Validators.email]],
      Tlf: ['', [Validators.required,Validators.min(20000000)]],
        typeF: ['', Validators.required],
       organisme_id: ['', Validators.required]
    })

    
    this.Nom.setValue(this.data.message.nom); 


  }
  
  
  GetListeOrganisme(){  // obtenir liste des domaines
    this.formateurservice.GetAllOrganisme()
    .subscribe(data=>{this.organismes=data;
    },err=>{
      console.log(err);
    })
}


GetOrganisme(){
  this.formateurservice.GetOrganismeByFormateur(this.data.message.idFormateur)
  .subscribe(donnee=>{this.id_organisme=donnee;  console.log(donnee); 
    this.Form.get(" organisme_id").setValue(this.id_organisme);
  },err=>{
    console.log(err);
  })
  
 
}
changeOrganisme(value) {
  console.log(value);

}

update() {

  var msg = this.data.message.nom;
  


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
    this.router.navigateByUrl("formateur").then(() => {
      window.location.reload();
    });; 
  }



  public hasError = (controlName: string, errorName: string) =>{
    return this.Form.controls[controlName].hasError(errorName);
  }

  
}
