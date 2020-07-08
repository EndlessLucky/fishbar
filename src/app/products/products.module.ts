import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, ProductsSectionComponent, ProductItemComponent, ProductDetailComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FormsModule
    ]
})
export class ProductsModule { }
