import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SimplePaymentIntentComponent } from './simple-payment-intent/simple-payment-intent.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SimplePaymentIntentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxStripeModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SimplePaymentIntentComponent
  ]
})
export class LayoutModule { }
