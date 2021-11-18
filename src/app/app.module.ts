import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { OrderModule } from './order';
import { ProductModule } from './product';
import { SharedModule } from './shared';
import { NgbToastModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule, MDBRootModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { ClientModule } from './client';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ToastComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    OrderModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ProductModule,
    BrowserAnimationsModule,
    NgbToastModule,
    MDBRootModule,
    MDBBootstrapModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
