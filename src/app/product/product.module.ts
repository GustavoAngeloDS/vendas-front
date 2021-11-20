import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import { ProductService } from './services';

import { CreateProductComponent } from './create-product';
import { ListProductComponent } from './list-product';
import { ModalProductComponent } from './modal-product';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    ModalProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
