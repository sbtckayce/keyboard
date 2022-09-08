import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ProductsComponent } from './component/products/products.component';
import { CartComponent } from './component/cart/cart.component';
import { DetailComponent } from './component/detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// npm i ng2-search-filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// npm i ngx-pagination
import { NgxPaginationModule } from 'ngx-pagination';

// npm i ng2-order-pipe
import { Ng2OrderModule } from 'ng2-order-pipe';


// npm i @angular/fire
import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FilterPipe } from './_pipes/filter.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FooterComponent } from './component/footer/footer.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { CheckoutComponent } from './component/checkout/checkout.component';




registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CartComponent,
    DetailComponent,
    FilterPipe,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAI7Uh8DsezCgrPVj4fxQKQsd9Y8P3xV2M",
      authDomain: "ecommerce-keyboard.firebaseapp.com",
      projectId: "ecommerce-keyboard",
      storageBucket: "ecommerce-keyboard.appspot.com",
      messagingSenderId: "1093141974849",
      appId: "1:1093141974849:web:a69b401b8da5196d5a9bc0",
      measurementId: "G-BYEBZC6NBF"
    }),
    GooglePayButtonModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
