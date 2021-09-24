import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = ""
  constructor(private httpClient: HttpClient) { }

  allOrders() {

  }

  newOrder() {

  }

  updateOrder() {

  }

  removeOrder() {

  }

  orderById(id: number) {

  }


}
