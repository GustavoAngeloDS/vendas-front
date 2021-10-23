import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product';
import { SharedModule } from './shared';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    OrderModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ProductModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
