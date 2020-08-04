import { Component, OnInit } from '@angular/core';
import { BillingSummary } from '../model/billingSummary.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'mean-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  billingSummary: BillingSummary

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.summary().subscribe(billingSummary => {
      this.billingSummary = billingSummary
      this.billingSummary.total = this.billingSummary.credit - this.billingSummary.debt
    })
  }

}
