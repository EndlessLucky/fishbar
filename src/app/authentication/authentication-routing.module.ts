import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', component: AuthenticationComponent,
    children: [
      {
        path: ':login', component: LoginRegisterComponent
      },
      {
        path: 'login/verify_email/forgot_pwd/:register', component: RegisterComponent
      },
      {
        path: 'login/:verify_email', component: VerifyEmailComponent
      },
      {
        path: 'login/verify_email/:forgot_pwd', component: ForgotPasswordComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
