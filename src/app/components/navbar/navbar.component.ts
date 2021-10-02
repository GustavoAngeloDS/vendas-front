import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('cpfInput') cpfInput!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  public searchClient() {
    console.log(this.cpfInput.nativeElement.value);
  }
}
