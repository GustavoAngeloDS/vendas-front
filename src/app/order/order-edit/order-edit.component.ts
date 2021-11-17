import { NavbarService } from './../../_services/navbar/navbar.service';
import { ToastService } from './../../_services/toast/toast.service';
import { pipe } from 'rxjs/internal/util/pipe';
import { Product } from './../../shared/models/product.model';
import { OrderItem } from './../../shared/models/order.model';
import { Observable, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, merge, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from './../services/order.service';
import { Order } from 'src/app/shared/models/order.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/shared';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  @ViewChild('formOrder') formOrder!: NgForm;
  order: Order = new Order()
  products!: Product;
  editField!: string;
  isQuantityValid: boolean = true;
  searching: boolean = false;
  notFound: boolean = false;
  searchFailed: boolean = false;
  isInList: boolean = false;
  orderError: boolean = false;
  orderErrorMsg: string = '';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private navbarService: NavbarService
    ) {
      this.navbarService.getInputSearchChange(false);
    }

  ngOnInit(): void {
    this.order.client = new Client()
    this.findOne(this.route.snapshot.params.id);
  }

  findOne(id: number) {
    this.orderService.findById(id).subscribe((order: Order) => {
      this.order = order;
    })
  }

  onSubmit() {
    let isOrderValid = this.validateOrder()
    if (isOrderValid) {
      this.orderService.update(this.order).subscribe((order: Order) => {
        this.toastService.show("Pedido atualizado com sucesso.",
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

  remove(id: any) {
    this.order.items!.splice(id, 1);
  }

  addItem($event: any) {
    let orderItem: OrderItem = { product: $event.item, qtdade: 1 }
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

  search = (text$: Observable<string>) =>
  text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      tap(() => this.notFound = false),
      tap(() => this.isInList = false),
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

  formatter = (x: { id: number, description: string }) => `${x.id} - ${x.description}`;

  navigateOnSuccess() {
    this.router.navigate(['/orders']);
  }

}
