import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profil } from 'src/app/model/entities/profil';
import { ProfilService } from 'src/app/model/services/profil.service';


@Component({
  selector: 'app-updateprofil',
  templateUrl: './updateprofil.component.html',
  styleUrls: ['./updateprofil.component.scss']
})
export class UpdateprofilComponent implements OnInit {

  profils:Profil;
  Form: FormGroup;
  libelle = new FormControl('', Validators.required);
  constructor(public router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateprofilComponent>,
    private profilservice:ProfilService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    
    this.router = router;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }

  ngOnInit(): void {


    this.Form = this.fb.group({
      libelle: ['', Validators.required]
    
    })

    
    this.libelle.setValue(this.data.message.libelle); 


  }

  update() {

    var msg = this.data.message.libele;
    
  
  
     if (msg != '') 
     {
       this.dialogRef.close(this.data);
     } 
   }
  
  
  
  
  
    reset() {
      this.Form.reset(); 
  }
  

  public hasError = (controlName: string, errorName: string) =>{
    return this.Form.controls[controlName].hasError(errorName);
  }

}
