import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'initiation'
  },
  {
    path: 'initiation',
    loadComponent: () =>
      import('./pages/transfer-initiation/transfer-initiation.component').then(
        (m) => m.TransferInitiationComponent
      )
  },
  {
    path: 'virements',
    loadComponent: () =>
      import('./pages/transfer-list/transfer-list.component').then((m) => m.TransferListComponent)
  },
  {
    path: '**',
    redirectTo: 'initiation'
  }
];
