import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
// Import your library
import { NgxStripeModule } from 'ngx-stripe';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { MessagingService } from './core/services/messaging.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('***your-stripe-publishable-key***'),
  ],
  providers: [MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
