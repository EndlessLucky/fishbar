import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'fishbar-popular-products-section',
  templateUrl: './popular-products-section.component.html',
  styleUrls: ['./popular-products-section.component.scss']
})
export class PopularProductsSectionComponent implements OnInit {
  populars: any[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getPopularProducts().subscribe(value => {
      this.populars = value;
    });
  }

}
