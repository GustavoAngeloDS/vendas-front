import { ToastService } from './../../_services/toast/toast.service';
import { Observable, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, merge, map } from 'rxjs/operators';
import { Client } from './../../shared/models/client.model';
import { OrderItem } from './../../shared/models/order.model';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs/internal/util/pipe';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  styles: [`.form-control { width: 300px; }`]
})
export class OrderListComponent implements OnInit {
  orders!: Order[];
  clients!: any;
  searchFailed = false;
  notFound = false;
  searching = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    this.clients = null
    this.orderService.findAll().subscribe((orders: Order[]) => {
      this.orders = orders;
    })
  }

  editOrder(order: Order) {
    this.router.navigate(['/orders/edit', order.id]);
  }

  deleteOrder(e: any, order: Order) {
    this.orderService.delete(order).subscribe(() => {
      this.toastService.show("Pedido deletado com sucesso.",
        {
          delay: 5000,
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

  search = (text$: Observable<string>) =>
  text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      tap(() => this.notFound = false),
      switchMap(term =>
          this.orderService.findClientByText(term.toLowerCase()).pipe(
              tap(() => this.searchFailed = false),
              pipe(
                map(item => {
                  if(item.length === 0) {
                    this.notFound = true
                  }
                return item
              })),
              catchError(e => {
                this.searchFailed = true;
                return of([]);
            }))
      ),
      tap(() => this.searching = false),
  )

  clientFormat = (x: { name: string, lastname: string, cpf: string }) => `${x.name} ${x.lastname} - ${x.cpf}`;

  selectedClient($event: any) {
    let client: Client = $event.item as Client
    this.orderService.findByCpf(client).subscribe((orders: Order[]) => {
      this.orders = orders
    })
  }


}
