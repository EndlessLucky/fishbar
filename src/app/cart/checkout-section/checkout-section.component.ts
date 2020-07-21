import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import {ProductService} from '../../core/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'fishbar-checkout-section',
  templateUrl: './checkout-section.component.html',
  styleUrls: ['./checkout-section.component.scss']
})
export class CheckoutSectionComponent implements OnInit {
  cartProducts: any[] = [];
  itemPrice: any[] = [];
  today: any;
  postAddress: any[] = null;
  totalQuantity: number[] = [];

  form: FormGroup = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    postCode: ['', Validators.required],
    address: ['', Validators.required]
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-checkout';
    this.getCartProduct();
    this.getItemPrice();
    this.getTotalQuantity();
    if (this.authService.isLoggedIn){
      this.form.setValue({
        displayName: this.authService.userData.displayName,
        email: this.authService.userData.email,
        phoneNumber: this.authService.userData.phoneNumber,
        postCode: this.authService.userData.postCode,
        address: this.authService.userData.address
      });
    }
    this.productService.totalPrice = localStorage.getItem('totalPrice');
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
  }

  searchAddress(): void {
    this.authService.searchAddress().subscribe(res =>{
      this.postAddress = res.addresses;
    });
  }

  placeOrder(): void{

    this.authService.storeOrder(this.cartProducts, this.itemPrice, this.totalQuantity);

    // this.today = new Date();
    // const shopTime = new DatePipe('en-Us').transform(this.today, 'HH', 'GMT+2');
    //
    // if(this.productService.totalPrice < 10){
    //   alert('Please order more items');
    // }else{
    //   if(parseInt(shopTime,10) >= 10 && parseInt(shopTime,10) <= 22){
    //
    //     this.router.navigate(['/cart', 'order']);
    //   }else{
    //     alert('Shop is closed.Please try again tomorrow');
    //   }
    // }

  }
}
