import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organisme } from '../../../model/entities/Organisme';
import { OrganismeService } from 'src/app/model/services/organisme.service';
import { AddOrganismeDiagComponent } from '../add-organisme-diag/add-organisme-diag.component';
import { ModifOrganismeDiagComponent } from '../modif-organisme-diag/modif-organisme-diag.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Session_de_Formations } from 'src/app/model/entities/Session_de_Formations';

@Component({
  selector: 'app-liste-organisme',
  templateUrl: './liste-organisme.component.html',
  styleUrls: ['./liste-organisme.component.scss']
})
export class ListeOrganismeComponent implements OnInit {

  displayedColumns = ['idOrganisme','libelle', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Organisme>();

  organismes:Organisme[];
  constructor(private organismeservice:OrganismeService,private toastr: ToastrService,router: Router,
     private route: ActivatedRoute,private diag: MatDialog,) { }



  ngOnInit(): void {
    this.GetListeOrganisme();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  GetListeOrganisme(){
    
    this.organismeservice.GetAllOrganisme()
    .subscribe(data=>{this.organismes=data;
      this.dataSource.data = this.organismes as Organisme[];

    },err=>{
      console.log(err);
    })}


    AddDialog() {
    
      const diagref = this.diag.open(AddOrganismeDiagComponent, {
        width: '450px',
        height: 'auto',
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
        this.GetListeOrganisme();
      }));;
     
      
    }



    ModifDialog(msg) {
      const newMsg = Object.assign({}, msg);
    console.log(msg);
    
  
       const diagref = this.diag.open(ModifOrganismeDiagComponent, {
        width: '450px',
        height: 'auto',
      data:{message:newMsg,}
      }).afterClosed().subscribe(result => {
        if (result!=false) 
        {  
        this.organismeservice.Put(result.message.idOrganisme,result.message).subscribe((data) => {
          this.GetListeOrganisme();
          this.toastr.success('Organisme modifié avec succee!')
        },
         (error) => {
          console.log(error);
          this.toastr.error('erreur' );
          
  
        });
      }
      
  
      
    
     
  
  
      });;
    
     
      
    }

    Delete(organismes){
      this.organismeservice.Delete(organismes.idOrganisme).subscribe(
        (resp) =>{
          console.log(resp);
          this.GetListeOrganisme();
        },
        err =>{
          console.log(err);
        }
      );
 
  
    }


}
