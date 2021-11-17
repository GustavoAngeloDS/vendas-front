import { NavbarService } from './../../_services/navbar/navbar.service';
import { Order } from './../../shared/models/order.model';
import { Client } from 'src/app/shared';
import { Observable, of} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs/internal/util/pipe';
import { OrderService } from 'src/app/order/services/order.service';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  clients!: any;
  searching = false;
  notFound = false;
  searchFailed = false;
  orders!: Order[];
  showInputSearch: boolean = true;

  constructor(
    private orderService: OrderService,
    private navbarService: NavbarService
  ) {
    this.navbarService.hideInputSearchEmitter()
      .subscribe(status => this.hideInputSearch(status))
  }

  ngOnInit(): void {

  }

  getAllOrders() {
    this.clients = null;
    this.navbarService.getAllOrders();
  }

  hideInputSearch(status: boolean) {
    this.showInputSearch = status;
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
    this.orderService.findByCpf(client.cpf!)
      .subscribe((orders: Order[]) => {
        this.orders = orders
        this.navbarService.emitNavbarChange(orders)
      })
  }

}
