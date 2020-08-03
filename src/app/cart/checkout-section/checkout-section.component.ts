import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import {ProductService} from '../../core/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
    public authService: AuthService,
    private http: HttpClient
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
    // this.authService.storeOrder(this.cartProducts, this.itemPrice, this.totalQuantity);



    // const url = 'https://fcm.googleapis.com/fcm/send';
    //
    // let headers = new HttpHeaders({
    //   'Authorization': 'key=AAAAjpt5FwY:APA91bEbFfwJXlscdU-6p5WmLuhxbkqeeW5WcgTH5ci7XmIN6XtkD6yB2PRPKXlhr6G_ILIZ5PG1GhEpnUXcrNsa4uFQqSqY7srz3QZk4u2FmINADw4bfOvrmPgOO9_R9DuP0t9NuSuc',
    //   'Content-Type': 'application/json'
    // });
    // let options = { headers: headers };
    //
    // const body = {
    //   "notification" : {
    //     "title": 'New order',
    //     "body": 'New order is received from',
    //     "click_action": "http://localhost:4200"
    //   },
    //   "to": 'dgxJ6Er0Tt6PtkF2AE73dg:APA91bHMjZROljMtXZwP2T6CmwiDlhpgOPpnQ3F3P2RZNHGB4sGKTBa-0YdD7-fmV4rzRzs8Xlg8n58TU_yWdVv-jn4tbgIZsolPyZr9N5_Qgpxkf1-Cf0DLF4vvQuSy-NOKPQMO4oK0'
    // }
    //
    // this.http.post(url,body, options).pipe(
    //   tap(res => {
    //     console.log(res);
    //   })
    // );


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
