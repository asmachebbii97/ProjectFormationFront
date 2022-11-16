import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeOrganismeComponent } from './liste-organisme/liste-organisme.component';


const routes: Routes = [
  {
    path: '',
    component: ListeOrganismeComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganismeRoutingModule { }
