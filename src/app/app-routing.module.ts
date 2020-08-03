import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
