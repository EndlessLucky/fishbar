import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fishbar-checkout-section',
  templateUrl: './checkout-section.component.html',
  styleUrls: ['./checkout-section.component.scss']
})
export class CheckoutSectionComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-checkout';
  }

}
