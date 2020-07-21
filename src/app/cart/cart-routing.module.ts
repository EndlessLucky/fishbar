import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartSectionComponent } from './cart-section/cart-section.component';
import { CheckoutSectionComponent } from './checkout-section/checkout-section.component';
import { OrderSectionComponent } from './order-section/order-section.component';
import { MyorderSectionComponent } from './myorder-section/myorder-section.component';

const routes: Routes = [
  {
    path: '', component: CartComponent,
    children: [
      {
        path: 'cart', component: CartSectionComponent
      },
      {
        path: 'checkout', component: CheckoutSectionComponent
      },
      {
        path: 'order', component: OrderSectionComponent
      },
      {
        path: 'myorder', component: MyorderSectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
