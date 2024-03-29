import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import {ProductsSectionComponent} from './products-section/products-section.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      {
        path: ':categoryName', component: ProductsSectionComponent
      },
      {
        path: ':id/:productId', component: ProductDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
