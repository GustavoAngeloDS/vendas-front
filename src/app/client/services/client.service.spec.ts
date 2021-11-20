/*
import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Client } from 'src/app/shared';

import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let httpClientSpy:{ get: jasmine.Spy };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const expectedClients: Client[] = [
    {
      id: 1,
      cpf: '123.100.230-19',
      name: 'João',
      lastname: 'Carlos'
    },
    {
      id: 2,
      cpf: '128.156.550-47',
      name: 'Fernanda',
      lastname: 'Silva'
    },
    {
      id: 3,
      cpf: '244.279.410-10',
      name: 'Maria',
      lastname: 'Clara'
    }
  ];

  

  var originalTimeout: number;

  beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
  
      service = TestBed.inject(ClientService);
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all clients', () => {
    httpClientSpy.get.and.returnValue(of(expectedClients));

    service.getClients().subscribe(
      clients => {
        expect(clients).toEqual(expectedClients);
      }
    );
  });
});
*/