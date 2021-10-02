import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared';
import { ProductService } from '../services';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  @ViewChild('formProduct') formProduct!: NgForm;
  product!: Product;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product = new Product();
  }

  private createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  public onSubmit(): void {
    if (this.formProduct.valid) {
      this.createProduct(this.product);
    }
    this.router.navigate(['/products']);
  }
}
