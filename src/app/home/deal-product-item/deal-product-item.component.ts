import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fishbar-deal-product-item',
  templateUrl: './deal-product-item.component.html',
  styleUrls: ['./deal-product-item.component.scss']
})
export class DealProductItemComponent implements OnInit {

  @Input() product: any;
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
