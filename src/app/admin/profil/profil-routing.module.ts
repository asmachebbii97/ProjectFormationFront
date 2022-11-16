import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  ListeProfilComponent } from './liste-profil/liste-profil.component';

const routes: Routes = [
  {
    path: '',
    component: ListeProfilComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
                                                      
