import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BestDealSectionComponent } from './best-deal-section/best-deal-section.component';
import { PopularProductsSectionComponent } from './popular-products-section/popular-products-section.component';


@NgModule({
  declarations: [HomeComponent, BestDealSectionComponent, PopularProductsSectionComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
