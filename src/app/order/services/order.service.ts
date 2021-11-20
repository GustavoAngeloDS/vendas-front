import { Product } from './../../shared/models/product.model';
import { Client } from './../../shared/models/client.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = `${environment.apiUrl}`;
  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/orders`)
  }

  findClientByText(text: string): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.apiUrl}/clients/search/${text}`)
  }

  findProductByText(text: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products/search/${text}`)
  }

  save(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiUrl}/orders`, order)
  }

  update(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.apiUrl}/orders`, order)
  }

  delete(order: Order): Observable<any> {
    return this.httpClient.delete<Order>(`${this.apiUrl}/orders/`, { body: order })
  }

  findById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/orders/${id}`)
  }

  findByCpf(cpf: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/orders/cpf/${cpf}`)
  }

}
