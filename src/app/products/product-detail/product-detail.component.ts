import { Component, OnDestroy, OnInit, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fishbar-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productDetail: any[] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.document.body.className = 'single-product style-2';
    this.route.params.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(params => {
      this.productService.getProductById(params.productId);
    });

    this.productService.resultUpdater$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( results => {
      this.productDetail = results;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
