import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Order } from 'src/app/shared/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl);
  }

  save(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrl, order);
  }

  update(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.apiUrl, order);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  findById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/${id}`);
  }

  findByCpf(cpf: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/cpf/${cpf}`);
  }
}
