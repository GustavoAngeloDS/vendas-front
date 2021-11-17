import { NavbarService } from './../../_services/navbar/navbar.service';
import { ToastService } from './../../_services/toast/toast.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './../services/order.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  styles: [`.form-control { width: 300px; }`]
})
export class OrderListComponent implements OnInit {
  @Input() clientOrderResult: Order[] = []
  @Output() searchResponse = new EventEmitter()

  orders!: Order[];
  clients!: any;
  searchFailed = false;
  notFound = false;
  searching = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService,
    private navbarService: NavbarService,
    ) {
      this.navbarService.getNavbarChangeEmitter()
      .subscribe(orders => this.resultSearchOrders(orders))

      this.navbarService.getAllOrdersEmitter()
      .subscribe(() => this.getAllOrders())

      this.navbarService.getInputSearchChange(true);
    }

  ngOnInit(): void {
    this.getAllOrders()
  }

  resultSearchOrders(orders: Order[]) {
    this.orders = orders;
  }

  getAllOrders() {
    this.clients = null
    this.orderService.findAll()
    .subscribe((orders: Order[]) => {
      this.orders = orders;
    })
  }

  editOrder(order: Order) {
    this.router.navigate(['/orders/edit', order.id]);
  }

  deleteOrder(e: any, order: Order) {
    this.orderService.delete(order)
      .subscribe(() => {
        this.toastService.show("Pedido deletado com sucesso.",
          {
            delay: 2000,
            autohide: true
          }
        )
        this.getAllOrders()
      })
  }

  newOrder() {
    this.router.navigate(['/orders/new']);
  }

  orderItemQuantity(items: any) {
    let orderProductCounter = 0;
    items.map((item: any) => orderProductCounter+= item.qtdade )
    return orderProductCounter
  }

}
