import { Component, OnInit , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {ProductService} from '../../core/services/product.service';

@Component({
  selector: 'fishbar-cart-section',
  templateUrl: './cart-section.component.html',
  styleUrls: ['./cart-section.component.scss']
})
export class CartSectionComponent implements OnInit {
  cartProducts: any[] = [];

  constructor(@Inject(DOCUMENT) private document: Document, public productService: ProductService) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-cart';
    this.getCartProduct();
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += (this.cartProducts[i].price + this.productService.sizePrice + this.productService.addonPrice) * this.productService.totalQuantity[i];
    }
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
    this.cartProducts.forEach((product) => {
      this.productService.totalQuantity.push(1);
    });
  }

  calItemPrice(itemPrice): void {
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += (this.cartProducts[i].price + this.productService.sizePrice + this.productService.addonPrice) * this.productService.totalQuantity[i];
    }
    this.productService.setItemQuantity(this.productService.totalQuantity);
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  removeCart(product): void{
    this.productService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += (this.cartProducts[i].price + this.productService.sizePrice + this.productService.addonPrice) * this.productService.totalQuantity[i];
    }
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }
}
