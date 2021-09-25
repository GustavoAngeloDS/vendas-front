import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Product } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }

  public deleteProduct(product: Product): Observable<any> {
    return this.http.delete<void>(this.apiUrl, {
      body: {
        product,
      },
    });
  }
}
