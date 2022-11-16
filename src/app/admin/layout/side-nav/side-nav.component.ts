import { Component, OnInit } from '@angular/core';
import { childRoutes } from '../../child-routes';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showMenu = false;
  routes = [{
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'formation',
    loadChildren: () =>
      import('../../formation/formation.module').then(
        m => m.FormationModule
      ),
    data: { icon: 'storage', text: 'formation' }
  },
  {
    path: 'formateur',
    loadChildren: () =>
      import('../../formateur/formateur.module').then(
        m => m.FormateurModule
      ),
    data: { icon: 'perm_identity', text: 'Formateurs' }
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('../../charts/charts.module').then(m => m.ChartsModule),
    data: { icon: 'bar_chart', text: 'Charts' }
  },]
  constructor() {}

  ngOnInit() {}
}
