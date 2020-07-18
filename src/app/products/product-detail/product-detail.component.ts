import { Component, OnDestroy, OnInit, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'fishbar-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productDetail: any[] = [];
  sizePrice: any;
  addonPrice: any;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public router: Router,
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
      this.sizePrice = this.productDetail[0].size[0].price;
      this.addonPrice = 0;
    });
  }

  onCheckboxChange(e): void {
    if (e.target.checked){
      this.addonPrice += parseInt(e.target.value, 10);
    }else{
      this.addonPrice -= parseInt(e.target.value, 10);
    }
  }

  addToCart(product, sizePrice, addonPrice): void {
    this.productService.addToCart(product, sizePrice, addonPrice);

    // this.router.navigate(['/cart', 'cart']);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
