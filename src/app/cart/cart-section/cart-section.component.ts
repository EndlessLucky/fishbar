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
  totalQuantity: number[] = [];
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
    this.getTotalQuantity();
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += this.itemPrice[i] * this.totalQuantity[i];
    }
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();

  }

  getItemPrice(): void {
    this.itemPrice = this.productService.getItemPrice();
  }

  getTotalQuantity(): void{
    this.totalQuantity = this.productService.getTotalQuantity();
    console.log(this.totalQuantity);
    if(this.totalQuantity.length === 0){
      this.cartProducts.forEach((product) => {
        this.totalQuantity.push(1);
      });
    }
  }

  calItemPrice(itemPrice): void {
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += (this.itemPrice[i]) * this.totalQuantity[i];
    }
    this.productService.setItemQuantity(this.totalQuantity);
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  removeCart(product): void{
    this.productService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += this.itemPrice[i] * this.totalQuantity[i];
    }
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  checkOut(): void {
    this.productService.checkPostcode(this.userPostcode);
  }
}
