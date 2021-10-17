import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  public searchClient(cpf: string): void {
    var cleanCpf = cpf.replace(/[^\w\s]/gi, '');
    this.orderService.findByCpf(cleanCpf);
    // TODO: Open modal with order modal with client orders
  }
}
