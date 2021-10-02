import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
