import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeFormateurComponent } from './liste-formateur/liste-formateur.component';


const routes: Routes = [
  {
    path: '',
    component: ListeFormateurComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurRoutingModule { }