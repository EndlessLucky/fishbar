import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fishbar-order-section',
  templateUrl: './order-section.component.html',
  styleUrls: ['./order-section.component.scss']
})
export class OrderSectionComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-page woocommerce-order-received woocommerce-checkout';
  }

}
