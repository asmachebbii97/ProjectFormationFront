import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeFormationComponent } from './liste-formation/liste-formation.component';

const routes: Routes = [
  {
    path: '',
    component: ListeFormationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
