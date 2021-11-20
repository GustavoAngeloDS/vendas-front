import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';

import { ProductService } from './product.service';
import { Product } from 'src/app/shared';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const API_URL = 'http://localhost:8080/products'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService
      ]
    });
    
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get specific product', () => {
    const expectedProduct : Product = { 
      "id": 1,
      "description": "Macbook Pro 16 pol"
    }

    service.getProduct(expectedProduct.id!).subscribe((product) => {
      expect(product).toEqual(expectedProduct);
    })

    const request = httpMock.expectOne(API_URL+'/'+expectedProduct.id);
    expect(request.request.method).toBe('GET');
    request.flush(expectedProduct);
  })

  it('should create a product', () => {
   const newProduct = 
    {
      "id": 2,
      "description": "Acer Nitro 15.6 pol"
    }

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    })

    const request = httpMock.expectOne(API_URL);
    expect(request.request.method).toBe('POST');
    request.flush(newProduct);
  })

  it('should create and update a product', () => {
    const newProduct = 
    {
      "id": 2,
      "description": "Acer Nitro 15.6 pol"
    }

    const updatedProduct = 
    {
      "id": 2,
      "description": "MacBook Pro M1"
    }
 
    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    })
 
    const postRequest = httpMock.expectOne(API_URL);
    expect(postRequest.request.method).toBe('POST');
    postRequest.flush(newProduct);

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    })

    const updateRequest = httpMock.expectOne(API_URL);
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(updatedProduct);
   })

   it('should create and delete a product', () => {
    const product = 
    {
      "id": 2,
      "description": "Acer Nitro 15.6 pol"
    }

    service.createProduct(product).subscribe((product) => {
      expect(product).toEqual(product);
    })
 
    const postRequest = httpMock.expectOne(API_URL);
    expect(postRequest.request.method).toBe('POST');
    postRequest.flush(product);

    service.deleteProduct(product).subscribe();

    const deleteRequest = httpMock.expectOne(API_URL);
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(deleteRequest);
   })

  it('should get all products', () => {
    const expectedProducts: Product[] = 
    [
      {
          "id": 1,
          "description": "Macbook Pro 16 pol"
      },
      {
          "id": 2,
          "description": "Acer Nitro 15.6 pol"
      }
    ]

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(expectedProducts);
    });

    const request = httpMock.expectOne(API_URL);
    expect(request.request.method).toBe('GET');
    request.flush(expectedProducts);
  })

  afterEach(() => {
    httpMock.verify();
  });
});