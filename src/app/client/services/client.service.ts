import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl: string = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  public getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  public createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.apiUrl, client);
  }

  public deleteClient(client: Client): Observable<any> {
    return this.http.delete<void>(this.apiUrl, {
      body: {
        id: client.id,
        cpf: client.cpf,
        name: client.name,
        lastname: client.lastname
      },
    });
  }
}
