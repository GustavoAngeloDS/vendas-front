import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared';

import { OrderService } from './services';
import { OrderListComponent } from './order-list';
import { OrderEditComponent } from './order-edit';
import { NewOrderComponent } from './new-order';

@NgModule({
  declarations: [
    NewOrderComponent,
    OrderListComponent,
    OrderEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    NgbTypeaheadModule,
    MDBBootstrapModule,
  ],
  providers: [OrderService],
})
export class OrderModule { }
