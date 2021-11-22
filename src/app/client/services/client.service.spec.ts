import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { of } from 'rxjs';
import { Client } from 'src/app/shared';

import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  let httpClientSpy:{ get: jasmine.Spy };
  let httpMock: HttpTestingController;

  const API_URL = 'http://localhost:8080/clients';

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

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ClientService]
      });

      httpMock = TestBed.inject(HttpTestingController);
  
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

    const getRequest = httpMock.expectOne(API_URL);
    expect(getRequest.request.method).toBe('GET');
    getRequest.flush(expectedClients);
  });
  
  it('should get empty client list', () => {
    service.getClients().subscribe(
      clients => {
        expect(clients).toEqual([]);
      }
    );

    const getRequest = httpMock.expectOne(API_URL);
    expect(getRequest.request.method).toBe('GET');
    getRequest.flush([]);
  });

  it('getClients should return 500', () => {
    service.getClients().subscribe(
      clients => {
        expect(clients).toEqual([]);
      }
    );

    const getRequest = httpMock.expectOne(API_URL);
    expect(getRequest.request.method).toBe('GET');
    getRequest.flush('error', { status: 500, statusText: 'Bad request' });
  });

  it('should get client by id', () => {
    httpClientSpy.get.and.returnValue(of(expectedClients[0]));

    service.getClient(1).subscribe(
      client => {
        expect(client).toEqual(expectedClients[0]);
      }
    );

    const getRequest = httpMock.expectOne(API_URL + "/" + expectedClients[0].id);
    expect(getRequest.request.method).toBe('GET');
    getRequest.flush(expectedClients[0]);
  });

  it('getClient by id should return 404', () => {
    service.getClient(4).subscribe(
      client => {
        expect(client).toEqual({});
      }
    );

    const getRequest = httpMock.expectOne(API_URL + "/4");
    expect(getRequest.request.method).toBe('GET');
    getRequest.flush('error', { status: 404, statusText: 'Client not found' });
  });

  it('should create client', () => {
    const newClient: Client = {
      id: 4,
      cpf: '228.830.770-61',
      name: 'Vitória',
      lastname: 'Melo'
    }

    service.createClient(newClient).subscribe(
      client => {
        expect(client).toEqual(newClient);
      }
    );

    const createRequest = httpMock.expectOne(API_URL);
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(newClient);
  });

  it('should not create client and return 404', () => {
    service.createClient({}).subscribe(
      client => {
        expect(client).toEqual({});
      }
    );

    const createRequest = httpMock.expectOne(API_URL);
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush('error', { status: 404, statusText: 'An error ocurred while creating client.'});
  });

  it('should update client', () => {
    const updateClient = {
      id: 2,
      cpf: '316.706.290-82',
      name: 'Fernanda',
      lastname: 'Honorio'
    }

    service.updateClient(updateClient).subscribe(
      client => {
        expect(client).toEqual(updateClient);
      }
    );

    const updateRequest = httpMock.expectOne(API_URL);
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(updateClient);
  });

  it('should not update client and return 404 when client not found', () => {
    const updateClient = {
      id: 4,
      cpf: '908.270.520-65',
      name: 'Mariana',
      lastname: 'Luiza'
    }
    
    service.updateClient(updateClient).subscribe(
      client => {
        expect(client).toEqual({});
      }
    );

    const updateRequest = httpMock.expectOne(API_URL);
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush('error', { status: 404, statusText: 'Client not found'});
  });

  it('should delete client', () => {
    const deleteClient = {
      id: 3,
      cpf: '244.279.410-10',
      name: 'Maria',
      lastname: 'Clara'
    }

    service.deleteClient(deleteClient).subscribe();

    const deleteRequest = httpMock.expectOne(API_URL);
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(deleteClient);
  });

  it('should not delete client and return 404 when client not found', () => {
    service.deleteClient({}).subscribe();

    const deleteRequest = httpMock.expectOne(API_URL);
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush('error', { status: 404, statusText: 'Client not found' });
  });
});