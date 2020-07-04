import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'fishbar-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
