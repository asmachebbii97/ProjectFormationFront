
import {Router, ActivatedRoute} from '@angular/router';
import { FormationService } from '../../../model/services/formation.service';
import { Formation } from '../../../model/entities/Formation';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SelectionModel } from '@angular/cdk/collections';
import { MatDatepicker } from '@angular/material/datepicker';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Profil } from 'src/app/model/entities/profil';
import { ProfilService } from 'src/app/model/services/profil.service';
import { AddprofilComponent } from '../addprofil/addprofil.component';
import { UpdateprofilComponent } from '../updateprofil/updateprofil.component';
@Component({
  selector: 'app-liste-profil',
  templateUrl: './liste-profil.component.html',
  styleUrls: ['./liste-profil.component.scss']
})
export class ListeProfilComponent implements OnInit {

  selectedRow:any;
  profils:Profil[];

  displayedColumns = ['ID','lib','action'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Profil>();


  constructor(private toastr: ToastrService,
    router: Router, private route: ActivatedRoute, 
    private profilservice:ProfilService,private diag: MatDialog,) { }

  ngOnInit() {
    
    this.GetListeProfil();
    
   
    
  }

 

 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  GetListeProfil(){
    
    this.profilservice.GetAllProfil().subscribe(data=>{
      this.profils=data;
      this.dataSource.data = this.profils as Profil[];

    },err=>{
      console.log(err);
    })}


    Delete( id:number)
    {
      this.profilservice.DeleteProfil(id).subscribe(result => {
         
        this. GetListeProfil();
          this.toastr.success('Profil supprimé avec succee!')
        }, (error) => {
          console.log(error);
          this.toastr.error('erreur' );
          
    
        });
    }
  


  AddDialog() {
    
    const diagref = this.diag.open(AddprofilComponent, {
      width: '450px',
      height: 'auto',
     
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.GetListeProfil();
    }));;
   
    
  }


  ModifDialog(msg) {
    const newMsg = Object.assign({}, msg);
  console.log(msg);
  

    
     const diagref = this.diag.open(UpdateprofilComponent, {
      width: '450px',
      height: 'auto',
    data:{message:newMsg,
    }
    }).afterClosed().subscribe(result => {
      if (result!=false) 
      {  
      this.profilservice.updateProfil(result.message.idProfil,result.message).subscribe((data) => {
        this. GetListeProfil();
        this.toastr.success('Profil modifié avec succee!')
      }, (error) => {
        console.log(error);
        this.toastr.error('erreur' );
        

      });
    }
    

    
  
   


    });;
  
   
    
  }
  
}


