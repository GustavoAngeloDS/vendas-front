import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { NewOrderComponent } from './new-order/new-order.component';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderEditComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[OrderListComponent, OrderEditComponent, NewOrderComponent]
})
export class OrderModule { }
