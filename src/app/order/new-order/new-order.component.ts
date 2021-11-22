import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
import { ToastService } from './../../_services/toast/toast.service';
import { Client } from './../../shared/models/client.model';
import { pipe } from 'rxjs/internal/util/pipe';
import { Product } from './../../shared/models/product.model';
import { OrderItem } from './../../shared/models/order.model';
import { Observable, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from './../services/order.service';
import { Order } from 'src/app/shared/models/order.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  @ViewChild('formOrder') formOrder!: NgForm;
  order: Order = new Order();
  products!: any
  clients!: Client
  editField!: string;
  isQuantityValid: boolean = true;
  searching: boolean = false;
  notFound: boolean = false;
  clientNotFound: boolean = false;
  searchFailed: boolean = false;
  isInList: boolean = false;
  orderError: boolean = false;
  orderErrorMsg: string = '';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.order.client = new Client()
    this.order.items = []
  }

  onSubmit() {
    let isValid = this.validateOrder()
    if (isValid) {
      this.orderService.save(this.order).subscribe((order: Order) => {
        this.toastService.show("Pedido criado com sucesso.",
          {
            delay: 2000,
            autohide: true
          }
        )
        this.navigateOnSuccess()
      })
    } else {
      this.orderError = true
    }
  }

  validateOrder() {
    this.orderError = false
    if (!this.order.client?.id) {
      this.orderErrorMsg = 'Por favor, adicione um cliente ao pedido.'
      return false
    }
    if (!this.order.items?.length) {
      this.orderErrorMsg = 'Por favor, adicione um item ao pedido.'
      return false
    }
    if (!this.isQuantityValid) {
      this.orderErrorMsg = 'Por favor, insira uma quantidade válida.'
      return false
    }

    return true
  }

  updateList(id: number, property: string, event: any) {
    this.isQuantityValid = true
    const editField = event.target.textContent;
    if (property === 'qtdade') {
      this.isQuantityValid = this.quantityValidate(editField)
      if (!this.isQuantityValid) return
      this.order.items![id]['qtdade'] = editField;
    }
  }

  quantityValidate(value: any) {
    if (value <= 0) return false
    if (isNaN(value)) return false
    return true
  }

  removeItem(id: any) {
    this.order.items!.splice(id, 1);
  }

  addItem($event: any) {
    let orderItem: OrderItem = { product: $event.item as Product, qtdade: 1 }
    let isIn = this.isItemAlreadyInList(orderItem)
    if (isIn) {
      this.isInList = true
    } else {
      this.order.items!.push(orderItem);
    }
  }

  isItemAlreadyInList(item: OrderItem) {
    if(!this.order.items?.find(i => i.product!.id === item.product!.id)) return false
    return true
  }

  searchProducts = (text$: Observable<string>) =>
  text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      tap(() => this.notFound = false),
      tap(() => this.isInList = false),
      tap(() => this.orderError = false),
      switchMap(text =>
          this.orderService.findProductByText(text.toLowerCase()).pipe(
              tap(() => this.searchFailed = false),
              pipe(
                map(product => {
                  if(product.length === 0) {
                    this.notFound = true
                  }
                  return product
                })
              ),
              catchError(e => {
                this.searchFailed = true;
                return of([]);
              })
          )
      ),
      tap(() => this.searching = false),
  )

  formatProduct = (x: { id: number, description: string }) => {
    if(!x.id) {
      return ''
    }
    return `${x.id} - ${x.description}`
  }

  searchClients = (text$: Observable<string>) =>
  text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      tap(() => this.clientNotFound = false),
      tap(() => this.orderError = false),
      switchMap(term =>
          this.orderService.findClientByText(term.toLowerCase()).pipe(
              tap(() => this.searchFailed = false),
              pipe(
                map(client => {
                  if(client.length === 0) {
                    this.clientNotFound = true
                  }
                return client
              })),
              catchError(e => {
                this.searchFailed = true;
                return of([]);
            }))
      ),
      tap(() => this.searching = false),
  )

  formatClient = (x: { name: string, lastname: string, cpf: string }) => {
    if (!x.name) {
      return ''
    }
    return `${x.name} ${x.lastname} - ${x.cpf}`
  }

  selectedClient($event: any) {
    console.log("opa ",$event)
    let client: Client = {
      id: $event.item.id,
      name: $event.item.name,
      lastname: $event.item.lastname,
      cpf: $event.item.cpf
    }
    this.order.client = client
  }

  navigateOnSuccess() {
    this.router.navigate(['/orders']);
  }

}
