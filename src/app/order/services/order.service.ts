import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl: string = ""
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Order> {
    return this.httpClient.get<Order[]>(this.apiUrl)
  }

  save(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrl, order)
  }

  update(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.apiUrl, order)
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`)
  }

  findById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/${id}`)
  }

}
