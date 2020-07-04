import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { BestDealProductListComponent } from './best-deal-product-list/best-deal-product-list.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: ':PIZZA', component: BestDealProductListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
