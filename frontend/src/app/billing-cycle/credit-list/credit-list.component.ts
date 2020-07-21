import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mean-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {

  constructor() { }

  @Input()
  credits: any[]

  @Output()
  onUpdateCredits = new EventEmitter<any[]>()

  ngOnInit(): void {
  }

  incluir(index) {
    this.credits.splice(index + 1, 0, {name: '', value: 0})
    this.onUpdateCredits.emit(this.credits)
  }

  clonar(index, data) {
    this.credits.splice(index + 1, 0, {name: data.name, value: data.value})
    this.onUpdateCredits.emit(this.credits)
  }

  excluir(index) {
    this.credits.splice(index, 1)
    this.onUpdateCredits.emit(this.credits)
  }

  updateCredit() {
    this.onUpdateCredits.emit(this.credits)
  }
}
