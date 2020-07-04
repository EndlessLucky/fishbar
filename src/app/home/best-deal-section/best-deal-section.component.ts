import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'fishbar-best-deal-section',
  templateUrl: './best-deal-section.component.html',
  styleUrls: ['./best-deal-section.component.scss']
})
export class BestDealSectionComponent implements OnInit {
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
