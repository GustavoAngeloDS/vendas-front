import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CreateProductComponent,
  ListProductComponent,
  EditProductComponent,
} from './product';

import {
  NewOrderComponent,
  OrderEditComponent,
  OrderListComponent
} from './order'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OrderListComponent,
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
    path:'orders',
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
