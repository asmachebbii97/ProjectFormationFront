import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeDomaineComponent } from './liste-domaine/liste-domaine.component';


const routes: Routes = [
  {
    path: '',
    component: ListeDomaineComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomaineRoutingModule { }