import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import {ProductService} from '../../core/services/product.service';

@Component({
  selector: 'fishbar-checkout-section',
  templateUrl: './checkout-section.component.html',
  styleUrls: ['./checkout-section.component.scss']
})
export class CheckoutSectionComponent implements OnInit {
  cartProducts: any[] = [];
  itemPrice: any[] = [];
  today: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-checkout';
    this.getCartProduct();
    this.getItemPrice();
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
  }

  getItemPrice(): void {
    this.itemPrice = this.productService.getItemPrice();
  }

  placeOrder(): void{
    this.today = new Date();
    const shopTime = new DatePipe('en-Us').transform(this.today, 'HH', 'GMT+2');
    console.log(shopTime);
    if(parseInt(shopTime,10) >= 10 && parseInt(shopTime,10) <= 22){
      this.router.navigate(['/cart', 'order']);
    }else{
     alert('Shop is closed.Please try again tomorrow');
    }
  }
}
