import { Product } from 'src/app/shared';
import { Client } from './client.model';
export class Order {
  constructor(public id?: number, public date?: Date, public client?: Client, public items?: OrderItem[]) {}
}

export class OrderItem {
  constructor(public qtdade?: number, public product?: Product) {}
}
