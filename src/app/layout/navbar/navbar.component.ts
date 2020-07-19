import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import {ProductService} from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'fishbar-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  category: any[] = [];

  constructor(
      private productService: ProductService,
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.productService.getCategory().subscribe(value => {
      this.category = value;
    });


  }


}
