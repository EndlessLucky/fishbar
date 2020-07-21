import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'fishbar-myorder-section',
  templateUrl: './myorder-section.component.html',
  styleUrls: ['./myorder-section.component.scss']
})
export class MyorderSectionComponent implements OnInit {

  cartProducts: any[] = [];
  itemPrice: any[] = [];
  totalQuantity: number[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-checkout';
    this.getCartProduct();
    this.getItemPrice();
    this.getTotalQuantity();
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
  }

  getItemPrice(): void {
    this.itemPrice = this.productService.getItemPrice();
  }

  getTotalQuantity(): void {
    this.totalQuantity = this.productService.getTotalQuantity();
  }

  reorder(): void {

  }
}
