import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListePayComponent } from './liste-pay/liste-pay.component';

const routes: Routes = [
  {
    path: '',
    component: ListePayComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }