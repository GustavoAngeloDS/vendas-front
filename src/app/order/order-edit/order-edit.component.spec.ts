import { OrderItem } from './../../shared/models/order.model';
import { Order } from 'src/app/shared/models/order.model';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { OrderEditComponent } from './order-edit.component';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;

  
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderEditComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validateOrder() should return false if no client was provided', () => {
    const dummyOrder: Order =
    {
      date:new Date(),
      items:[
        {
          qtdade:1,
          product:{
            id:1,
            description:"Macbook Pro 16"
          }
        }
      ],
      client: undefined
    }
    component.order = dummyOrder
    let isOrderValid = component.validateOrder()
    expect(isOrderValid).toBeFalse()
  });

  it('validateOrder() should return false if no item was provided', () => {
    const dummyOrder: Order =
    {
      date: new Date(),
      items: [],
      client: {
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }
    component.order = dummyOrder
    let isOrderValid = component.validateOrder()
    expect(isOrderValid).toBeFalse()
  });

  it('validateOrder() should return true for success', () => {
    const dummyOrder: Order =
    {
      date:new Date(),
      items:[
        {
          qtdade:1,
          product:{
            id:1,
            description:"Macbook Pro 16"
          }
        }
      ],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }
    component.order = dummyOrder
    let isOrderValid = component.validateOrder()
    expect(isOrderValid).toBeTrue()
  });

  it('quantityValidate() should return false if item quantity <= 0', () => {
    const dummyQuantity = 0
    let isOrderValid = component.quantityValidate(dummyQuantity)
    expect(isOrderValid).toBeFalse()
  });

  it('quantityValidate() should return false if item quantity === string', () => {
    const dummyQuantity = 'dois'
    let isOrderValid = component.quantityValidate(dummyQuantity)
    expect(isOrderValid).toBeFalse()
  });

  it('quantityValidate() should return true if item quantity === number and > 0 ', () => {
    const dummyQuantity = 5
    let isOrderValid = component.quantityValidate(dummyQuantity)
    expect(isOrderValid).toBeTrue()
  });

  it('removeItem() should remove order item by index ', () => {
    const dummyOrder: Order =
    {
      items:[
        {
          qtdade:1,
          product:{
            id:1,
            description:"Macbook Pro 16"
          }
        },
        {
          qtdade:1,
          product:{
            id:5,
            description:"Celular LG 123"
          }
        }
      ],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }

    const expectedData = {
      items:[
        {
          qtdade:1,
          product:{
            id:1,
            description:"Macbook Pro 16"
          }
        },
      ],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }
    component.order = dummyOrder
    component.removeItem(1)
    expect(component.order).toEqual(expectedData)
  });

  it('addItem() should add an new order item', () => {
    const dummyOrder: Order =
    {
      items:[],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }
    const dummyItem = {
      item: {
        id:1,
        description:"Macbook Pro 16"
      }
    }
    const expectedData: Order = {
      items:[
        {
          qtdade:1,
          product:{
            id:1,
            description:"Macbook Pro 16"
          }
        }
      ],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }

    component.order = dummyOrder
    component.addItem(dummyItem)
    expect(component.order).toEqual(expectedData)
  });

  it('isItemAlreadyInList() should return false if current item is not in the order', () => {
    const dummyOrder: Order =
    {
      items:[
        {
          qtdade: 1,
          product: {
            id: 1,
            description: "Macbook Pro 16"
          }
        },
      ],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }
    const dummyItem: OrderItem = {
      product: {
        id:5,
        description:"Celular LG 123"
      }
    }
    component.order = dummyOrder
    let isAlreadyInList = component.isItemAlreadyInList(dummyItem)
    expect(isAlreadyInList).toBeFalse()
  });

  it('isItemAlreadyInList() should return true if current item is in the order', () => {
    const dummyOrder: Order =
    {
      items:[
        {
          qtdade: 1,
          product: {
            id: 1,
            description: "Macbook Pro 16"
          }
        },
      ],
      client:{
        id:5,
        cpf:"02730404222",
        name:"Daniel",
        lastname:"Santos"
      }
    }
    const dummyItem: OrderItem = {
      product: {
        id: 1,
        description: "Macbook Pro 16"
      }
    }
    component.order = dummyOrder
    let isAlreadyInList = component.isItemAlreadyInList(dummyItem)
    expect(isAlreadyInList).toBeTrue()
  });

  it('formatProduct() should return product input suggestions formatted', () => {
    const dummyProduct = {
        id: 1,
        description: "Macbook Pro 16"
    }
    let formattedProduct = component.formatProduct(dummyProduct)
    expect(formattedProduct).toEqual(`${dummyProduct.id} - ${dummyProduct.description}`)
  });
});
