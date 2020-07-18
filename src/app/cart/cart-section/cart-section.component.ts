import { Component, OnInit , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {ProductService} from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'fishbar-cart-section',
  templateUrl: './cart-section.component.html',
  styleUrls: ['./cart-section.component.scss']
})
export class CartSectionComponent implements OnInit {
  cartProducts: any[] = [];
  itemPrice: any[] = [];
  userPostcode: any;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public productService: ProductService,
    private authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.userPostcode = this.authService.userData.postCode;
    this.document.body.className = 'woocommerce-cart';
    this.getCartProduct();
    this.getItemPrice();
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += this.itemPrice[i] * this.productService.totalQuantity[i];
    }
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
    this.cartProducts.forEach((product) => {
      this.productService.totalQuantity.push(1);
    });
  }

  getItemPrice(): void {
    this.itemPrice = this.productService.getItemPrice();
  }

  calItemPrice(itemPrice): void {
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += (this.itemPrice[i]) * this.productService.totalQuantity[i];
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

  checkOut(): void {
    this.productService.checkPostcode(this.userPostcode);
  }
}
