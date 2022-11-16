import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pays } from 'src/app/model/entities/Pays';
import { PaysService } from 'src/app/model/services/pays.service';

@Component({
  selector: 'app-addpay',
  templateUrl: './addpay.component.html',
  styleUrls: ['./addpay.component.scss']
})
export class AddpayComponent implements OnInit {

  constructor(private toastr: 
    ToastrService,public router: Router, private route: ActivatedRoute, 
    private diag: MatDialog,  public dialogRef: MatDialogRef<AddpayComponent>,
    private paysservice:PaysService,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
    
  }
  Form: FormGroup;
  payss:Pays[];
  pays: Pays= new Pays();

  ngOnInit(): void {

    this.Form = this.fb.group({
     
      Libelle: ['', Validators.required]
      
    
    })
  }

  AddPays() {
    console.log(this.pays);
    this.paysservice.addpays(this.pays)
      .subscribe(
        res => 
      { 
      console.log(res);
      this.closeDialog();
    
      this.GetListePays();
      this.toastr.success('pays ajouté avec succee!')
      
    
  
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
  
   
    GetListePays(){
      this.paysservice.GetAllPays()
      .subscribe(data=>{this.payss=data;
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
