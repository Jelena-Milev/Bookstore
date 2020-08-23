import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelPage } from './admin-panel.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelPage
  },
  {
    path: 'publishers',
    loadChildren: () => import('./publishers/publishers.module').then( m => m.PublishersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelPageRoutingModule {}
