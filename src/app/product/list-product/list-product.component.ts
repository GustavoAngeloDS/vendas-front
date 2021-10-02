import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared';
import { ProductService } from '../services';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  public products!: Product[];

  constructor(private productService: ProductService, private router: Router) {}

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

  public deleteProduct($event: any, product: Product): void {
    $event.preventDefault();
    if (
      confirm(
        `Tem certeza que deseja excluir o produto "${product.description}"?`
      )
    ) {
      this.productService.deleteProduct(product).subscribe(
        () => {
          this.products = this.products.filter((p) => p.id !== product.id);
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  public editProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  public createProduct(): void {
    this.router.navigate(['/products/new']);
  }
}
