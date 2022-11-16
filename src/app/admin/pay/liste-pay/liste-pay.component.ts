import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pays } from 'src/app/model/entities/Pays';
import { PaysService } from 'src/app/model/services/pays.service';
import { AddpayComponent } from '../addpay/addpay.component';
import { UpdatepayComponent } from '../updatepay/updatepay.component';

@Component({
  selector: 'app-liste-pay',
  templateUrl: './liste-pay.component.html',
  styleUrls: ['./liste-pay.component.scss']
})
export class ListePayComponent implements OnInit {

  selectedRow:any;
  payss:Pays[];
 
 
  displayedColumns = ['ID','Libelle','action'];
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource= new  MatTableDataSource<Pays>();

  constructor(private toastr: ToastrService,
    router: Router, private route: ActivatedRoute, 
    private paysservice:PaysService,private diag: MatDialog) { }

  ngOnInit() {
    
    this.GetListePays();
    
   
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  GetListePays(){
    
    this.paysservice.GetAllPays().subscribe(data=>{
      this.payss=data;
      this.dataSource.data = this.payss as Pays[];
      

    },err=>{
      console.log(err);
    })}


    Delete( id:number)
    {
      this.paysservice.DeletePays(id).subscribe(result => {
         
        this. GetListePays();
          this.toastr.success('Pays supprimé avec succee!')
        }, (error) => {
          console.log(error);
          this.toastr.error('erreur' );
          
    
        });
    }
  


  AddDialog() {
    
    const diagref = this.diag.open(AddpayComponent, {
      width: '450px',
      height: 'auto',
     
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.GetListePays();
    }));;
   
    
  }


  ModifDialog(msg) {
    const newMsg = Object.assign({}, msg);
  console.log(msg);
  

    
     const diagref = this.diag.open(UpdatepayComponent, {
      width: '450px',
      height: 'auto',
    data:{message:newMsg,
    }
    }).afterClosed().subscribe(result => {
      if (result!=false) 
      {  
      this.paysservice.updatePays(result.message.payId,result.message).subscribe((data) => {
        this. GetListePays();
        this.toastr.success('Pays modifié avec succee!')
      }, (error) => {
        console.log(error);
        this.toastr.error('erreur' );
        

      });
    }
    

    
  
   


    });;
  
   
    
  }

}
