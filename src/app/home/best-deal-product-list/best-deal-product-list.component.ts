import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'fishbar-best-deal-product-list',
  templateUrl: './best-deal-product-list.component.html',
  styleUrls: ['./best-deal-product-list.component.scss']
})
export class BestDealProductListComponent implements OnInit{

  bestdeals: any[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getBestDealProducts().subscribe(value => {
      this.bestdeals = value;
    });
  }


}
