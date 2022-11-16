import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

import { FormationRoutingModule } from './formation-routing.module';
import { ListeFormationComponent } from './liste-formation/liste-formation.component';
import { NzTableModule } from 'ng-zorro-antd/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddFormationDiagComponent } from './add-formation-diag/add-formation-diag.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModifFormationDiagComponent } from './modif-formation-diag/modif-formation-diag.component';
import { ToastrModule , ToastContainerModule} from 'ngx-toastr';
import { SessionComponent } from './session/session.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParticipantComponent } from './participant/participant.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { UpdateSessionComponent } from './update-session/update-session.component';
import { AddparticipantComponent } from './addparticipant/addparticipant.component';
import { UpdparticipantComponent } from './updparticipant/updparticipant.component';
@NgModule({
  imports: [
    CommonModule,
    FormationRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NzTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule , 
    ToastContainerModule,
    MatExpansionModule,
    MatNativeDateModule,
    
 


    
    
 
  ],
  declarations: [ListeFormationComponent, AddFormationDiagComponent, ModifFormationDiagComponent, SessionComponent, ParticipantComponent, AddSessionComponent, UpdateSessionComponent, AddparticipantComponent, UpdparticipantComponent,]
})
export class FormationModule {}
