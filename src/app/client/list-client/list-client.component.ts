import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared';
import { ClientService } from '../services';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  public clients!: Client[];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listClients();
  }

  public listClients(): void {
    this.clientService.getClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      (error) => {
        alert(error);
      }
    );
  }

  public deleteClient($event: any, client: Client): void {
    $event.preventDefault();

    if (confirm(`Deseja excluir o cliente "${client.name}"?`)) {
      this.clientService.deleteClient(client).subscribe(() => {
          this.clients = this.clients.filter((c) => c.id !== client.id);
        }, (error) => {
          alert(error.error.message);
        }
      );
    }
  }

  public editClient(client: Client): void {
    this.router.navigate(['/clients/edit', client.id]);
  }

  public createClient(): void {
    this.router.navigate(['/clients/new']);
  }
}
