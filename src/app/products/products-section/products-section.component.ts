import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../core/services/product.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'fishbar-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements OnInit, OnDestroy {

  products: any[] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
      private route: ActivatedRoute,
      private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(params => {
      this.productService.getProductsByCategory(params.id);
      this.productService.setRouteParam(params.id);
    });

    this.productService.resultUpdater$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( results => {
        this.products = results;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
