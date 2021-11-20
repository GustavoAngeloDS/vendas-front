import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/shared';
import { ClientService } from '../services';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  @ViewChild('formClient') formClient!: NgForm;
  client!: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getClient(this.route.snapshot.params.id);
  }

  private getClient(id: number) {
    this.clientService.getClient(id).subscribe(
      (client: Client) => {
        this.client = client;
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  private updateClient(client: Client){
    this.clientService.updateClient(client).subscribe(
      (client: Client) => {
        this.client = client;
        this.router.navigate(['/clients']);
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  public onSubmit() {
    if (this.formClient.valid) {
      this.updateClient(this.client);
    }
  }

  public onCpfBlur(): void {
    let clientCPF = this.client.cpf;

    if (clientCPF !== null && clientCPF !== undefined && !cpf.isValid(clientCPF)) {
        alert("CPF inválido");
    }
  }
}
