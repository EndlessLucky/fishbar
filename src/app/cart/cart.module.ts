import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartSectionComponent } from './cart-section/cart-section.component';
import { CheckoutSectionComponent } from './checkout-section/checkout-section.component';
import { OrderSectionComponent } from './order-section/order-section.component';
import { CartRoutingModule } from './cart-routing.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [CartComponent, CartSectionComponent, CheckoutSectionComponent, OrderSectionComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        FormsModule
    ]
})
export class CartModule { }
