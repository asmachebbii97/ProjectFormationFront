import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Domaine } from 'src/app/model/entities/Domaine';
import { Formation } from 'src/app/model/entities/Formation';
import { DomaineService } from 'src/app/model/services/domaine.service';
import { AddDomaineDiagComponent } from '../add-domaine-diag/add-domaine-diag.component';
import { ModifDomaineDiagComponent } from '../modif-domaine-diag/modif-domaine-diag.component';

@Component({
  selector: 'app-liste-domaine',
  templateUrl: './liste-domaine.component.html',
  styleUrls: ['./liste-domaine.component.scss']
})
export class ListeDomaineComponent implements OnInit {

  displayedColumns = ['idDomaine','libelle', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Domaine>();
  domaines:Domaine[];
  constructor(private domaineservice:DomaineService,private toastr: ToastrService,router: Router,
     private route: ActivatedRoute,private diag: MatDialog,) { }

  ngOnInit(): void {
    this.GetListeDomaine();

  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  


  GetListeDomaine(){
    
    this.domaineservice.GetAlldDomaine()
    .subscribe(data=>{this.domaines=data;
      this.dataSource.data = this.domaines as Domaine[];
    },err=>{
      console.log(err);
    })}




    AddDialog() {
    
      const diagref = this.diag.open(AddDomaineDiagComponent, {
        width: '450px',
        height: 'auto',
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
        this.GetListeDomaine();
      }));;
     
      
    }



    ModifDialog(msg) {
      const newMsg = Object.assign({}, msg);
    console.log(msg);
    
  
      
       const diagref = this.diag.open(ModifDomaineDiagComponent, {
        width: '450px',
        height: 'auto',
      data:{message:newMsg,
      }
      }).afterClosed().subscribe(result => {
        if (result!=false) 
        {  
        this.domaineservice.Put(result.message.idDomaine,result.message).subscribe((data) => {
          this.GetListeDomaine();
          this.toastr.success('Domaine modifié avec succee!')
        },
           (error) => {
          console.log(error);
          this.toastr.error('erreur' );
          
  
        });
      }
      });
  
    }

    Delete(domaines){
      this.domaineservice.Delete(domaines.idDomaine).subscribe(
        (resp) =>{
          console.log(resp);
          this.GetListeDomaine();
        },
        err =>{
          console.log(err);
        }
      );

}



}

