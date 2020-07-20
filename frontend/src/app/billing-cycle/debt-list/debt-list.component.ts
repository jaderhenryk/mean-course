import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mean-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit {

  constructor() { }

  @Input()
  debts: any[]

  status: any[] = ['PAGO', 'PENDENTE', 'AGENDADO']

  ngOnInit(): void {
  }

  incluir(index) {
    this.debts.splice(index + 1, 0, {})
  }

  clonar(index, data) {
    this.debts.splice(index + 1, 0, data)
  }

  excluir(index) {
    this.debts.splice(index, 1)
  }

}
