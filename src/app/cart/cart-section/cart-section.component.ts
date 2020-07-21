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
    if(this.cartProducts.length - this.totalQuantity.length > 0){
      for(let i = this.totalQuantity.length; i<this.cartProducts.length; i++){
        this.totalQuantity.push(1);
      }
    }
    this.productService.setItemQuantity(this.totalQuantity);
  }

  calItemPrice(itemPrice): void {
    this.productService.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++){
      this.productService.totalPrice += (this.itemPrice[i]) * this.totalQuantity[i];
    }
    this.productService.setItemQuantity(this.totalQuantity);
    localStorage.setItem('totalPrice', this.productService.totalPrice);
  }

  removeCart(product, itemPrice, totalQuantity): void{
    this.productService.removeLocalCartProduct(product);
    this.productService.removeLocalItemPrice(itemPrice);
    this.productService.removeLocalTotalQuantity(totalQuantity);

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
