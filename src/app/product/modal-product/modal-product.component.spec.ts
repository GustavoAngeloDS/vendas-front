import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalProductComponent } from './modal-product.component';

describe('ModalProductComponent', () => {
  let component: ModalProductComponent;
  let fixture: ComponentFixture<ModalProductComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProductComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
});
