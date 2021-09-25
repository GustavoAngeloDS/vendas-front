import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListProductComponent } from './product/list-product';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // TODO: INSERT HOMEPAGE COMPONENT HERE
    component: ListProductComponent,
  },
  {
    path: 'products',
    component: ListProductComponent,
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
