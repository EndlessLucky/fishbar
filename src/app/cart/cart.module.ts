import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartSectionComponent } from './cart-section/cart-section.component';
import { CheckoutSectionComponent } from './checkout-section/checkout-section.component';
import { OrderSectionComponent } from './order-section/order-section.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyorderSectionComponent } from './myorder-section/myorder-section.component';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [CartComponent, CartSectionComponent, CheckoutSectionComponent, OrderSectionComponent, MyorderSectionComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class CartModule { }
