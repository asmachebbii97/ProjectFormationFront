import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formation } from 'src/app/model/entities/Formation';
import { Participant } from 'src/app/model/entities/Participant';
import { Session_de_Formations } from 'src/app/model/entities/Session_de_Formations';
import { DomaineService } from 'src/app/model/services/domaine.service';
import { FormationService } from 'src/app/model/services/formation.service';
import { SessionService } from 'src/app/model/services/session.service';
import { AddSessionComponent } from '../add-session/add-session.component';
import { ModifFormationDiagComponent } from '../modif-formation-diag/modif-formation-diag.component';
import { ParticipantComponent } from '../participant/participant.component';
import { UpdateSessionComponent } from '../update-session/update-session.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit  {
  displayedColumns = ['idSession', 'date_Fin', 'date_Debut', 'lieu','nb_participant', 'formateur','organisme','action'];
  forma:Formation; 
  listeSession: any;
  listeParticipant : Participant[];
  idSession: number; 
  idFormation:any; 
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Session_de_Formations>();

  constructor(private toastr: ToastrService,public router: Router, private route: ActivatedRoute,public dialogRef: MatDialogRef<SessionComponent>,private sessionservice:SessionService,private formationservice:FormationService,@Inject(MAT_DIALOG_DATA) public data: any,private diag: MatDialog) { }

  ngOnInit(): void {
    this.ListeSession(); 
    this.forma=this.data.message;
    
  }


  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  GetParticipant(msg ){

    const newMsg = Object.assign({},msg);
  console.log(newMsg);
 
     const diagref = this.diag.open(ParticipantComponent, {
      width: '900px',
      height: 'auto',
    data:newMsg
    });
  }
  
  ListeSession(){
  this.idFormation= this.data.message.idFormation;
  this.formationservice.GetSessionByFormation(this.idFormation)
  .subscribe(data=>{this.listeSession=data; 
    this.dataSource.data = this.listeSession as Session_de_Formations[];
     },err=>{
    console.log(err);
  })
    
  }


  AddSession(msg) {
    
    const diagref = this.diag.open(AddSessionComponent, {
      width: '650px',
      height: 'auto',
      data: msg, 
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ListeSession();
    }));;
   
    
  }


  UpdateSession(msg){
    const newMsg = Object.assign({}, msg);
    console.log(msg);
       const diagref = this.diag.open(UpdateSessionComponent, {
        width: '650px',
        height: 'auto',
      data:{message:newMsg,
      }
      }).afterClosed().subscribe(result => {
        if (result!=false) 
        {  
        this.sessionservice.Put(result.message.idSession,result.message).subscribe((data) => {
          this.ListeSession(); 
          this.toastr.success('Session modifié avec succee!')
        }, (error) => {
          console.log(error);
          this.toastr.error('erreur' );
          
  
        });
      }
      });;


  }


  Delete( id:number)
{  this.idFormation= this.data.message.idFormation;
  this.sessionservice.DeleteSession(id, this.idFormation).subscribe(result => {
     
   this.ListeSession();
      this.toastr.success('session supprimé avec succee!')
    }, (error) => {
      console.log(error);
      this.toastr.error("erreur ! cette session à des participants ! les supprimez  d'abord" );
      

    });
}




}
