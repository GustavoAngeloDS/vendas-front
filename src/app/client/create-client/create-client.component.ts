import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared';
import { ClientService } from '../services';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  @ViewChild('formClient') formClient!: NgForm;
  client!: Client;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client = new Client();
  }

  private createClient(client: Client): void {    
    this.clientService.createClient(client).subscribe(() => 
      {
        this.router.navigate(['/clients']);
      }, 
      (error: any) => {
        alert(error.error.message);
      }
    );
  }

  public onSubmit(): void {
    if (this.formClient.form.valid) {
      this.createClient(this.client);
    }
  }

  public onCpfBlur(): void {
    let clientCPF = this.client.cpf;

    if (clientCPF !== null && clientCPF !== undefined && !cpf.isValid(clientCPF)) {
        alert("CPF inválido");
    }
  }
}
