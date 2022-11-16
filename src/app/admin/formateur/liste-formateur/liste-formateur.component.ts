import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formateur } from 'src/app/model/entities/formateur';
import { Organisme } from 'src/app/model/entities/organisme';
import { FormateurService } from 'src/app/model/services/formateur.service';
import { AddformateurComponent } from '../addformateur/addformateur.component';
import { UpdateformateurComponent } from '../updateformateur/updateformateur.component';

@Component({
  selector: 'app-liste-formateur',
  templateUrl: './liste-formateur.component.html',
  styleUrls: ['./liste-formateur.component.scss']
})
export class ListeFormateurComponent implements OnInit {

  selectedRow:any;
  formateurs:Formateur[];
  formateur:any;
  organismes:Organisme[]; 
  idFormateur:any;
   libelle:any ; 
  
  displayedColumns = ['Nom', 'Prenom', 'Email', 'Tlf', 'typeF','organisme','action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Formateur>();
  
  constructor(private toastr: ToastrService,private router: Router,  private route: ActivatedRoute, private formateurservice:FormateurService,private diag: MatDialog,) { }




  ngOnInit() {
    
    this.GetListeFormateur();
   
    
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

  GetListeFormateur(){
    
    this.formateurservice.GetAllFormateur()
    .subscribe(data=>{this.formateurs=data;
     
      this.dataSource.data = this.formateurs as Formateur[];
       },err=>{
      console.log(err);
    })}


   AddDialog() {
    
    const diagref = this.diag.open(AddformateurComponent, {
      width: '650px',
      height: 'auto',
     
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.GetListeFormateur();
    }));;
   
    
  }


  ModifDialog(msg) {
    const newMsg = Object.assign({}, msg);
  console.log(msg);
     const diagref = this.diag.open(UpdateformateurComponent, {
      width: '650px',
      height: 'auto',
    data:{message:newMsg,
    }
    }).afterClosed().subscribe(result => {
      if (result!=false) 
      {  
      this.formateurservice.UpdateFormateur(result.message.idFormateur,result.message).subscribe((data) => {
        this.GetListeFormateur();
        this.toastr.success('Formation modifié avec succee!')
      }, (error) => {
        console.log(error);
        this.toastr.error('erreur' );
        

      });
    }
    });;
  }
  
  
 

Delete( id:number)
{
  this.formateurservice.DeleteFormateur(id).subscribe(result => {
     
   this.GetListeFormateur(); 
      this.toastr.success('formateur supprimé avec succee!')
    }, (error) => {
      console.log(error);
      this.toastr.error("erreur" );
      

    });
}

  

}
