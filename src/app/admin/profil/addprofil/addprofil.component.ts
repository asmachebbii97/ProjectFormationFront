import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Profil } from 'src/app/model/entities/profil';
import { ProfilService } from 'src/app/model/services/profil.service';
@Component({
  selector: 'app-addprofil',
  templateUrl: './addprofil.component.html',
  styleUrls: ['./addprofil.component.scss']
})
export class AddprofilComponent implements OnInit {
  constructor(private toastr: 
    ToastrService,public router: Router, private route: ActivatedRoute, 
    private diag: MatDialog,  public dialogRef: MatDialogRef<AddprofilComponent>,
    private profilservice:ProfilService,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
    
  }
  Form: FormGroup;
  profils:Profil[];
  profil: Profil= new Profil();

  ngOnInit(): void {

    this.Form = this.fb.group({
     
      Libelle: ['', Validators.required]
      
    
    })
  }

  AddProfil() {
    console.log(this.profil);
    this.profilservice.addprofil(this.profil)
      .subscribe(
        res => 
      { 
      console.log(res);
      this.closeDialog();
    
      this.GetListeProfil();
      this.toastr.success('profil ajouté avec succee!')
      
    
  
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
  
   
    GetListeProfil(){
      this.profilservice.GetAllProfil()
      .subscribe(data=>{this.profils=data;
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
