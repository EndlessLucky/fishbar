import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BestDealSectionComponent } from './best-deal-section/best-deal-section.component';
import { PopularProductsSectionComponent } from './popular-products-section/popular-products-section.component';
import { BestDealProductListComponent } from './best-deal-product-list/best-deal-product-list.component';
import { DealProductItemComponent } from './deal-product-item/deal-product-item.component';


@NgModule({
  declarations: [HomeComponent, BestDealSectionComponent, PopularProductsSectionComponent, BestDealProductListComponent, DealProductItemComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
