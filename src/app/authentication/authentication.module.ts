import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgxIntlTelInputModule
} from 'projects/ngx-intl-tel-input/src/lib/ngx-intl-tel-input.module';

@NgModule({
  declarations: [AuthenticationComponent, VerifyEmailComponent, LoginRegisterComponent, ForgotPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
  ]
})
export class AuthenticationModule { }
