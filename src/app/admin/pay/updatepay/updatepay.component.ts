import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Pays } from 'src/app/model/entities/Pays';
import { PaysService } from 'src/app/model/services/pays.service';

@Component({
  selector: 'app-updatepay',
  templateUrl: './updatepay.component.html',
  styleUrls: ['./updatepay.component.scss']
})
export class UpdatepayComponent implements OnInit {

  
  pays:Pays;
  Form: FormGroup;
Libelle = new FormControl('', Validators.required);
  constructor(public router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdatepayComponent>,
    private paysservice:PaysService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    
    this.router = router;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }

  ngOnInit(): void {


    this.Form = this.fb.group({
      Libelle: ['', Validators.required]
    
    })

    
    this.Libelle.setValue(this.data.message.libele); 


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
