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
  totalPrice: any = 0;

  constructor(@Inject(DOCUMENT) private document: Document, private productService: ProductService) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-cart';
    this.getCartProduct();
    this.cartProducts.forEach((product) => {
      this.totalPrice += product.price;
    });
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
    this.cartProducts.forEach((product) => {
      this.productService.totalQuantity.push(1);
    });
  }

  calItemPrice(itemPrice): void {
    this.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice += this.cartProducts[i].price * this.productService.totalQuantity[i];
    }
    this.productService.setItemQuantity(this.productService.totalQuantity);
    this.productService.setTotalPrice(this.totalPrice);
  }

  removeCart(product): void{
    this.productService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();

    this.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice += this.cartProducts[i].price * this.productService.totalQuantity[i];
    }
    this.productService.setTotalPrice(this.totalPrice);
  }
}
