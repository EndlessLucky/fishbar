import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'fishbar-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: any;
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  routeParam: string;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    // this.routeParam = this.productService.getRouteParam();
    this.routeParam = localStorage.getItem('routeParam');
  }

}
