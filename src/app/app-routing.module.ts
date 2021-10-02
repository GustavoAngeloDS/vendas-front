import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './order/new-order/new-order.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';

import {
  CreateProductComponent,
  ListProductComponent,
  EditProductComponent,
} from './product';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // TODO: INSERT HOMEPAGE COMPONENT HERE
    component: ListProductComponent,
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ListProductComponent,
      },
      {
        path: 'edit/:id',
        component: EditProductComponent,
      },
      {
        path: 'new',
        component: CreateProductComponent,
      },
    ],
  },
  {
    path: 'clients',
    children: [
      {
        path: '',
        component: ListProductComponent,
      },
      {
        path: 'edit/:id',
        component: EditProductComponent,
      },
      {
        path: 'new',
        component: CreateProductComponent,
      },
    ],
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        component: OrderListComponent,
      },
      {
        path: 'edit/:id',
        component: OrderEditComponent,
      },
      {
        path: 'new',
        component: NewOrderComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
