import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then( m => m.AdminPanelPageModule),
    canLoad: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canLoad: [AuthGuard],
    data: {
      role: 'USER'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule),
    canLoad: [AuthGuard],
    data: {
      role: 'USER'
    }
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
