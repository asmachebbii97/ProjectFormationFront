import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Participant, TypeParticipant } from 'src/app/model/entities/Participant';
import { Pays } from 'src/app/model/entities/Pays';
import { Profil } from 'src/app/model/entities/Profil';
import { FormateurService } from 'src/app/model/services/formateur.service';
import { FormationService } from 'src/app/model/services/formation.service';
import { OrganismeService } from 'src/app/model/services/organisme.service';
import { ParticipantService } from 'src/app/model/services/participant.service';
import { PaysService } from 'src/app/model/services/pays.service';
import { ProfilService } from 'src/app/model/services/profil.service';
import { SessionService } from 'src/app/model/services/session.service';
import { AddSessionComponent } from '../add-session/add-session.component';
import { AddparticipantComponent } from '../addparticipant/addparticipant.component';

@Component({
  selector: 'app-updparticipant',
  templateUrl: './updparticipant.component.html',
  styleUrls: ['./updparticipant.component.scss']
})
export class UpdparticipantComponent implements OnInit {
  participants:Participant[];
  pays:Pays[]; 
  profils : Profil[];
  public TypesP = Object.values(TypeParticipant).filter(value => typeof value === 'string');


  nom = new FormControl('', Validators.required);
  prenom= new FormControl('', Validators.required);
  email= new FormControl('', Validators.required);
  tlf= new FormControl('', Validators.required);
  typeP= new FormControl('', Validators.required);
  p_profil_id= new FormControl('', Validators.required);
  pays_pay_id= new FormControl('', Validators.required);
  typep= new FormControl('', Validators.required);


  
  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,private participantservice:ParticipantService,private paysservice:PaysService, private profilservice:ProfilService,private diag: MatDialog,  public dialogRef: MatDialogRef<AddparticipantComponent>,private sessionservice:SessionService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
  } 
  Form: FormGroup;
  ngOnInit(): void {
   this.ListeProfils(); 
   this.ListePays(); 
   

    this.Form = this.fb.group({
     
      
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      Email: ['', [Validators.required,Validators.email]],
      tlf: ['', [Validators.required,Validators.min(20000000)]],
      typeP: ['', Validators.required],
      p_profil_id: ['', Validators.required],
      pays_pay_id: ['', Validators.required],
      typep: ['', Validators.required],
      
    
    })

    this.nom.setValue(this.data.message.nom); 

  }





  UpdParticipant() {

    var msg = this.data.message.nom;
  
     if (msg != '') 
     {
       this.dialogRef.close(this.data);
     } 
   }
  

   

    ListePays(){
      console.log(this.data);
      this.paysservice.GetAllPays()
      .subscribe(data=>{this.pays=data; 
         },err=>{
        console.log(err);
      })
        
      }


      ListeProfils(){
        console.log(this.data);
        this.profilservice.GetAllProfil()
        .subscribe(data=>{this.profils=data; 
           },err=>{
          console.log(err);
        })
          
        }

        closeDialog() {
          this.dialogRef.close(false);
        
        }
      
        reset() {
          this.Form.reset(); 
      }
      
      changePays(value) {
        console.log(value);
      
      }
    
      changeProfils(value) {
        console.log(value);
      
      }

      
  public hasError = (controlName: string, errorName: string) =>{
    return this.Form.controls[controlName].hasError(errorName);
  }

  
}
