import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mean-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit {

  constructor() { }

  @Input()
  debts: any[]

  @Output()
  onUpdateDebts = new EventEmitter<any[]>()

  status: any[] = ['PAGO', 'PENDENTE', 'AGENDADO']

  ngOnInit(): void {
  }

  incluir(index) {
    this.debts.splice(index + 1, 0, {name: '', value: 0, status: 'PENDENTE'})
    this.onUpdateDebts.emit(this.debts)
  }

  clonar(index, data) {
    this.debts.splice(index + 1, 0, {name: data.name, value: data.value, status: data.status})
    this.onUpdateDebts.emit(this.debts)
  }

  excluir(index) {
    this.debts.splice(index, 1)
    this.onUpdateDebts.emit(this.debts)
  }

  updateDebt() {
    this.onUpdateDebts.emit(this.debts)
  }

}
