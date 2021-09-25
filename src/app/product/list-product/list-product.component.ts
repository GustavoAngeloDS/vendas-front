import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared';
import { ProductService } from '../services';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  public products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  public listProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        alert(error);
      }
    );
  }
}
