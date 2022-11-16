import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-addparticipant',
  templateUrl: './addparticipant.component.html',
  styleUrls: ['./addparticipant.component.scss']
})
export class AddparticipantComponent implements OnInit {
  participant: Participant= new Participant();
  participants:Participant[];
  pays:Pays[]; 
  profils : Profil[];


  public TypesP = Object.values(TypeParticipant).filter(value => typeof value === 'string');


  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,private participantservice:ParticipantService,private paysservice:PaysService, private profilservice:ProfilService,private diag: MatDialog,  public dialogRef: MatDialogRef<AddparticipantComponent>,private sessionservice:SessionService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) { 
  } 

  Form: FormGroup;
  ngOnInit(): void {
    this.ListeParticicpant(); 
    this.ListePays(); 
    this.ListeProfils(); 


    this.Form = this.fb.group({
     
      
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      tlf: ['', [Validators.required,Validators.min(20000000)]],
      typeP: ['', Validators.required],
      p_profil_id: ['', Validators.required],
      pays_pay_id: ['', Validators.required],
      typep: ['', Validators.required],
      
    
    })



  }



  ListeParticicpant(){

    console.log(this.data); 
    this.sessionservice.GetParticipantBySession(this.data)
    .subscribe(data=>{this.participants=data; 
       },err=>{
      console.log(err);
    })
      
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




        AddParticipant() {
        
          this.participantservice.Post(this.Form.get('p_profil_id').value,this.Form.get('pays_pay_id').value,this.data,this.participant)
            .subscribe(
              res => 
            { 
            console.log(res);
            this.closeDialog();
          
          
            this.toastr.success('participant ajouté avec succee!')
            
          
        
            },
            err=>
            {
              console.log(err);
              this.toastr.error('erreur participant' ); } 
              ) 
            
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
