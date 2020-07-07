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
  totalQuantity: number[] = [];
  totalPrice: any = 0;

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
      this.detailResults = this.results.filter(x => x.name === productId);
      this.resultUpdater$.next( this.detailResults );
    });
  }

  setRouteParam(param): void{
    this.routeParam = param;
  }

  getRouteParam(): string{
    return this.routeParam;
  }

  addToCart(product): void {
    const a: any[] = JSON.parse(localStorage.getItem('cart_item')) || [];
    for (let i = 0; i < a.length; i++) {
      if (a[i].name === product.name) {
        return;
      }
    }
    a.push(product);
    localStorage.setItem('cart_item', JSON.stringify(a));
  }

  getLocalCartProducts(): any[] {
    const products: any[] = JSON.parse(localStorage.getItem('cart_item')) || [];

    return products;
  }

  removeLocalCartProduct(product): void {
    const products: any[] = JSON.parse(localStorage.getItem('cart_item'));

    for (let i = 0; i < products.length; i++) {
      if (products[i].name === product.name) {
        products.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('cart_item', JSON.stringify(products));
  }

  setItemQuantity(quantity): void{
    this.totalQuantity = quantity;
  }

  setTotalPrice(price): void{
    this.totalPrice = price;
  }
}
