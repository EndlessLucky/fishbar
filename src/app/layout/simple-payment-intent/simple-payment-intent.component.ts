import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { StripeCardElementOptions, StripeElementsOptions, PaymentIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'fishbar-simple-payment-intent',
  templateUrl: './simple-payment-intent.component.html',
  styleUrls: ['./simple-payment-intent.component.scss']
})
export class SimplePaymentIntentComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1001, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.get('amount').value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest.get('name').value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${env.apiUrl}/create-payment-intent`,
      { amount }
    );
  }
}
