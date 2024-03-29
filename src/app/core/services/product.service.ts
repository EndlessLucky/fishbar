import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Category } from '../enums/category.enum';
import { BestDealProducts } from '../data/best-deal-products';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  results: any[] = [];
  detailResults: any[] = [];
  postCode: any[] = [];
  totalQuantity: number[] = [];
  routeParam: string;
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

  getBestDealById(productId): void{
    this.db.list('BestDeals').valueChanges().subscribe(categories => {
      this.products = categories;
      this.results = this.products.filter(x => x.name === productId);
      this.resultUpdater$.next( this.results );
    });
  }

  getPopularById(productId): void{
    this.db.list('MostPopular').valueChanges().subscribe(categories => {
      this.products = categories;
      this.results = this.products.filter(x => x.name === productId);
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
        if(a[i].addon === undefined && a[i].size === undefined){
          return;
        }
      }
    }
    a.push(product);
    localStorage.setItem('cart_item', JSON.stringify(a));
    const itemPrice = product.price+sizePrice+addonPrice;
    const b: any[] = JSON.parse(localStorage.getItem('item_price')) || [];
    b.push(itemPrice);
    localStorage.setItem('item_price', JSON.stringify(b));
    alert('successfully added');
  }

  getLocalCartProducts(): any[] {
    const products: any[] = JSON.parse(localStorage.getItem('cart_item')) || [];
    return products;
  }

  getItemPrice(): any[] {
    const price: any[] = JSON.parse(localStorage.getItem('item_price')) || [];
    return price;
  }

  getTotalQuantity(): number[] {
    const quantity: number[] = JSON.parse(localStorage.getItem('total_quantity')) || [];
    return quantity;
  }

  setItemQuantity(quantity): void{
    this.totalQuantity = quantity;
    localStorage.setItem('total_quantity', JSON.stringify(this.totalQuantity));
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

  removeLocalItemPrice(itemPrice): void {
    const localItemPrice: any[] = JSON.parse(localStorage.getItem('item_price'));
    for (let i = 0; i < localItemPrice.length; i++) {
      if (localItemPrice[i] === itemPrice) {
        localItemPrice.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('item_price', JSON.stringify(localItemPrice));
  }

  removeLocalTotalQuantity(totalQuantity): void {
    const localTotalQuantity: any[] = JSON.parse(localStorage.getItem('total_quantity'));
    for (let i = 0; i < localTotalQuantity.length; i++) {
      if (localTotalQuantity[i] === totalQuantity) {
        localTotalQuantity.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('total_quantity', JSON.stringify(localTotalQuantity));
  }

  checkPostcode(userPostcode): void{
    const userPrefix = userPostcode.substr(0,4);
    this.db.list('Postcode').valueChanges().subscribe(postcodes => {
      this.postCode = postcodes;
      for(let i = 0; i < this.postCode.length; i++){
        if(userPrefix === this.postCode[i].prefix){
          this.router.navigate(['/cart', 'checkout']);
          return;
        }
      }
      alert('Your area is not allowed to deliver');
    });
  }

  clearCart(): void{
    localStorage.clear();
  }
}
