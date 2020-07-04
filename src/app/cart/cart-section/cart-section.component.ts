import { Component, OnInit , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fishbar-cart-section',
  templateUrl: './cart-section.component.html',
  styleUrls: ['./cart-section.component.scss']
})
export class CartSectionComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-cart';
  }

}
