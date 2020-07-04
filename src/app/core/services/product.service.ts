import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Category } from '../enums/category.enum';
import { BestDealProducts } from '../data/best-deal-products';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  results: any[] = [];
  detailResults: any[] = [];
  routeParam: string;

  public resultUpdater$: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase) { }
  getBestDealProducts(): Observable<any[]> {
    return this.db.list('BestDeals').valueChanges();
  }

  getPopularProducts(): Observable<any[]> {
    return this.db.list('MostPopular').valueChanges();
  }

  getCategory(): Observable<any[]> {
    return this.db.list('Category').valueChanges();
  }

  getProductsByCategory(id): void {
    this.db.list('Category').valueChanges().subscribe(categories => {
      this.products = categories;
      this.results = this.products.filter(x => x.id === id)[0].foods;
      this.resultUpdater$.next( this.results );
    });
  }

  getProductById(productId): void {
    this.db.list('Category').valueChanges().subscribe(categories => {
      this.products = categories;
      this.results = this.products.filter(x => x.id === this.routeParam)[0].foods;
      this.detailResults = this.results.filter(x => x.id === productId);
      this.resultUpdater$.next( this.detailResults );
    });
  }

  setRouteParam(param): void{
    this.routeParam = param;
  }

  getRouteParam(): string{
    return this.routeParam;
  }
}
