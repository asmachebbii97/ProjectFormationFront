import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Participant } from 'src/app/model/entities/Participant';
import { Session_de_Formations } from 'src/app/model/entities/Session_de_Formations';
import { DomaineService } from 'src/app/model/services/domaine.service';
import { FormationService } from 'src/app/model/services/formation.service';
import { ParticipantService } from 'src/app/model/services/participant.service';
import { SessionService } from 'src/app/model/services/session.service';
import { AddparticipantComponent } from '../addparticipant/addparticipant.component';
import { UpdparticipantComponent } from '../updparticipant/updparticipant.component';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  displayedColumns = ['idParticipant', 'nom', 'prenom', 'tlf','lieu',"email", 'pays','profil','action'];
  IdSession:any ; 
  listeSession: Session_de_Formations[] ;
  listeParticipant : Participant[]; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Participant>();

  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,public dialogRef: MatDialogRef<ParticipantComponent>,private participantservice:ParticipantService , private sessionservice:SessionService,private formationservice:FormationService,@Inject(MAT_DIALOG_DATA) public data: any,private diag: MatDialog) { }


  ngOnInit(): void {
    this.ListeParticipant();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public customSort = (event) => {
    console.log(event);
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  
  ListeParticipant(){
     
    //this.listeParticipant= this.data.message.session_de_Formations.participant;
    //console.log(this.data.idSession);
  
    
    this.sessionservice.GetParticipantBySession(this.data.idSession)
    .subscribe(data=>{this.listeParticipant=data; 
      this.dataSource.data = this.listeParticipant as Participant[];
       },err=>{
      console.log(err);
    })


   }

   AddParticipant(){

    const diagref = this.diag.open(AddparticipantComponent, {
      width: '650px',
      height: 'auto',
      data: this.data.idSession, 
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ListeParticipant();
    }));;





   }





   UpdParticipant(msg){
    const newMsg = Object.assign({}, msg);
    console.log(msg);
       const diagref = this.diag.open(UpdparticipantComponent, {
        width: '650px',
        height: 'auto',
      data:{message:newMsg,
      }
      }).afterClosed().subscribe(result => {
        if (result!=false) 
        {  
        this.participantservice.Put(result.message.idParticipant,result.message).subscribe((data) => {
          this.ListeParticipant(); 
          this.toastr.success('participant modifié avec succee!')
        }, (error) => {
          console.log(error);
          this.toastr.error('erreur modification' );
          
  
        });
      }
      });;


  }


  Delete( id:number)
{
  this.participantservice.DeleteParticipant(id,this.data.idSession).subscribe(result => {
     
   this.ListeParticipant(); 
      this.toastr.success('participant supprimé avec succee!')
    }, (error) => {
      console.log(error);
      this.toastr.error("erreur ! cet participant à des session ! les supprimez  d'abord" );
      

    });
}






}
