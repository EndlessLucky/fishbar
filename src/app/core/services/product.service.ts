import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Category } from '../enums/category.enum';
import { BestDealProducts } from '../data/best-deal-products';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  results: any[] = [];
  detailResults: any[] = [];
  postCode: any[] = [];
  routeParam: string;
  totalQuantity: number[] = [];
  totalPrice: any = 0;
  sizePrice: any = 0;
  addonPrice: any = 0;
  isPostcode: boolean;

  public resultUpdater$: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    public router: Router
  ) { }
  getBestDealProducts(): Observable<any[]> {
    return this.db.list('BestDeals').valueChanges();
  }

  getPopularProducts(): Observable<any[]> {
    return this.db.list('MostPopular').valueChanges();
  }

  getCategory(): Observable<any[]> {
    return this.db.list('Category').valueChanges();
  }

  getProductsByCategory(categoryName): void {
    this.db.list('Category').valueChanges().subscribe(categories => {
      this.products = categories;
      this.results = this.products.filter(x => x.name === categoryName)[0].foods;
      this.resultUpdater$.next( this.results );
    });
  }

  getProductById(productId): void {
    this.db.list('Category').valueChanges().subscribe(categories => {
      this.products = categories;
      this.routeParam = localStorage.getItem('routeParam');
      this.results = this.products.filter(x => x.name === this.routeParam)[0].foods;
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

  addToCart(product, sizePrice, addonPrice): void {
    const a: any[] = JSON.parse(localStorage.getItem('cart_item')) || [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < a.length; i++) {
      if (a[i].name === product.name) {
        return;
      }
    }
    a.push(product);
    localStorage.setItem('cart_item', JSON.stringify(a));
    this.sizePrice = sizePrice;
    this.addonPrice = addonPrice;
    alert('successfully added');
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

  checkPostcode(userPostcode): void{
    const userPrefix = userPostcode.substr(0,4);
    this.db.list('Postcode').valueChanges().subscribe(postcodes => {
      for(let i = 0; i < postcodes.length; i++){
        if(userPrefix === postcodes[i].prefix){
          this.router.navigate(['/cart', 'checkout']);
          return;
        }
      }
      alert('Your area is not allowed to deliver');
    });

  }
}
