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

  ngOnInit(): void {
  }

}
