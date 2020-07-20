import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mean-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {

  constructor() { }

  @Input()
  credits: any[]

  ngOnInit(): void {
  }

  incluir(index) {
    this.credits.splice(index + 1, 0, {})
  }

  clonar(index, data) {
    this.credits.splice(index + 1, 0, data)
  }

  excluir(index) {
    this.credits.splice(index, 1)
  }
}
