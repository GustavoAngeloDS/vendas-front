import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  onGetClientOrders: EventEmitter<any> = new EventEmitter();
  onGetAllOrders: EventEmitter<any> = new EventEmitter();
  onHideInputSearch: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emitNavbarChange(data: any) {
    this.onGetClientOrders.emit(data);
  }

  getNavbarChangeEmitter() {
    return this.onGetClientOrders;
  }

  getAllOrders() {
    this.onGetAllOrders.emit()
  }

  getAllOrdersEmitter() {
    return this.onGetAllOrders;
  }

  hideInputSearchEmitter() {
    return this.onHideInputSearch;
  }

  getInputSearchChange(status: boolean) {
    return this.onHideInputSearch.emit(status);
  }

}
