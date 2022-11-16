export const childRoutes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.module').then(m => m.ChartsModule),
    data: { icon: 'bar_chart', text: 'Charts' }
  },
  
  {
    path: 'organisme',
    loadChildren: () =>
      import('./organisme/organisme.module').then(
        m => m.OrganismeModule
      ),
    data: { icon: 'storage', text: 'Organisme' }
  }, 
  {
    path: 'domaine',
    loadChildren: () =>
      import('./domaine/domaine.module').then(
        m => m.DomaineModule
      ),
    data: { icon: 'storage', text: 'Domaine' }
  }, 
  
 
  {
    path: 'formation',
    loadChildren: () =>
      import('./formation/formation.module').then(
        m => m.FormationModule
      ),
    data: { icon: 'storage', text: 'formation' }
  }
  , 
  {
    path: 'Profil',
    loadChildren: () =>
      import('./profil/profil.module').then(
        m => m.ProfilModule
      ),
    data: { icon: 'code', text: 'Profils' }
  },
  {
    path: 'Pays',
    loadChildren: () =>
      import('./pay/pay.module').then(
        m => m.PayModule
      ),
    data: { icon: 'language', text: 'Pays' }
  },
  {
    path: 'formateur',
    loadChildren: () =>
      import('./formateur/formateur.module').then(
        m => m.FormateurModule
      ),
    data: { icon: 'perm_identity', text: 'Formateurs' }
  }
];
