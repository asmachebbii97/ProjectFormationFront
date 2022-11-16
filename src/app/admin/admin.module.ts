import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NzTableModule } from 'ng-zorro-antd/table';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrModule , ToastContainerModule} from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    ToastrModule.forRoot({
     timeOut:500,
     positionClass:'toast-top-right',
     preventDuplicates:false
    }) ,
     ToastContainerModule
   
  
  
  ],
  declarations: [LayoutComponent, TopNavComponent, SideNavComponent ]
})
export class AdminModule {}
