import { Order } from 'src/app/shared/models/order.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { OrderService } from './order.service';
import { environment } from 'src/environments/environment';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.apiUrl
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    })
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  const dummyOrder: Order = {
    id:22,
    date: new Date(),
    items:[{qtdade:1,product:{id:1,description:"Macbook Pro 16"}}],
    client:{ id:5, cpf: "02730404222", name:"Daniel", lastname: "Santos"}
  }

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created service', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });

  it('findAll() should return data', () => {
    const dummyOrders = {
      data: [
        {"id":9,
        "date":"17/11/2021 01:13",
        "items":[{"qtdade":1,"product":{"id":1,"description":"Macbook Pro 16"}}],
        "client":{"id":5,"cpf":"02730404222","name":"Daniel","lastname":"Santos"}
        },
        {"id":11,
        "date":"17/11/2021 01:44",
        "items":[{"qtdade":1,"product":{"id":2,"description":"Acer Nitro 15.6 polaa"}}],
        "client":{"id":1,"cpf":"12345678999","name":"Palmiani","lastname":"André"}
        },
        {"id":12,
        "date":"17/11/2021 01:47",
        "items":[{"qtdade":1,"product":{"id":3,"description":"Smart TV 55 pol Philco"}}],
        "client":{"id":6,"cpf":"027.304.042-10","name":"Alice","lastname":"souza"}
        },
        {
        "id":13,
        "date":"17/11/2021 20:44",
        "items":[{"qtdade":1,"product":{"id":5,"description":"Celular LG 123"}}],
        "client":{"id":5,"cpf":"02730404222","name":"Daniel","lastname":"Santos"}
        }
      ]
    }
    service.findAll()
    .subscribe((res: any) => {
      expect(res).toEqual(dummyOrders);
    });
    const req = httpMock.expectOne(`${apiUrl}/orders`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('findById() should return order by id', () => {
    service.findById(9)
    .subscribe((res: any) => {
      expect(res).toEqual(dummyOrder);
    });
    const req = httpMock.expectOne(`${apiUrl}/orders/${9}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrder);
  });

  it('findByCpf() should order by client cpf', () => {
    const cpf = '02730404222'
    service.findByCpf(cpf)
    .subscribe((res: any) => {
      expect(res).toEqual(dummyOrder);
    });
    const req = httpMock.expectOne(`${apiUrl}/orders/cpf/${cpf}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrder);
  });

  it('findClientByText() should return clients that the name, last name or cpf contains the `text` typed', () => {
    const dummyText = 'santos'
    const dummyClients = {
      data: [
        {
          "id":5,
          "cpf":"02730404222",
          "name":"Daniel",
          "lastname":"Santos"
        },
        {
          "id":7,
          "cpf":"02730404333",
          "name":"Aline",
          "lastname":"Santos"
        }
      ]
    }
    service.findClientByText(dummyText)
    .subscribe((res: any) => {
      expect(res).toEqual(dummyClients);
    });
    const req = httpMock.expectOne(`${apiUrl}/clients/search/${dummyText}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClients);
  });

  it('findProductByText() should return products that the description contains the `text` typed', () => {
    const dummyText = 'tv'
    var dummyProducts = {
      data: [
        {
          "id":3,
          "description":"Smart TV 55 pol Philco"
        },
        {
          "id":4,
          "description":"Smart TV 60 pol LG"
        }
      ]
    }
    service.findProductByText(dummyText)
    .subscribe((res: any) => {
      expect(res).toEqual(dummyProducts);
    });
    const req = httpMock.expectOne(`${apiUrl}/products/search/${dummyText}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('delete() should delete order', () => {
    let succeeded = false;
    let body: string | undefined

    const dummyOrder: Order = {
        id:9,
        date: new Date(),
        items:[{qtdade:1,product:{id:1,description:"Macbook Pro 16"}}],
        client:{ id:5, cpf: "02730404222", name:"Daniel", lastname: "Santos"}
    }
    service.delete(dummyOrder)
    .subscribe((res: any) => {
      succeeded = true
      body = res
    });
    const req = httpMock.expectOne(`${apiUrl}/orders/`);
    req.flush({body: undefined});
    expect(req.request.method).toBe('DELETE');
    expect(succeeded).toBeTrue()
  });

  it('update() should update order', () => {
    service.update(dummyOrder)
    .subscribe((res: any) => {
      expect(res).toEqual(dummyOrder)
    });
    const req = httpMock.expectOne(`${apiUrl}/orders`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyOrder);
  });

  it('save() should save order', () => {
    service.save(dummyOrder)
    .subscribe((res: any) => {
      expect(res).toEqual(dummyOrder)
    });
    const req = httpMock.expectOne(`${apiUrl}/orders`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyOrder);
  });

});

//});
