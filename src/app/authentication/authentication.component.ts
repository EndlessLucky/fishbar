import { Component, OnInit , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fishbar-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.className = 'woocommerce-account';
  }

}
