import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @ViewChild('formProduct') formProduct!: NgForm;
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params.id);
  }

  private getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  private updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        alert(error.message);
      },
      () => this.returnSessionToProductsList()
    );
  }

  public onSubmit() {
    if (this.formProduct.valid) 
      this.updateProduct(this.product);
  }

  private returnSessionToProductsList(): void {
    this.router.navigate(['/products']);
  }
}
