import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BillingCycle } from 'src/app/model/billingCycle.model';
import { BillingCycleService } from '../billingCycle.service';
import { Observable } from 'rxjs';
import { MEAN_API } from 'src/app/app.api';

@Component({
  selector: 'mean-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  billingCycles$: Observable<BillingCycle[]>

  constructor(private billingCycleService: BillingCycleService) { }

  ngOnInit(): void {
    this.billingCycles$ = this.billingCycleService.all()
  }

  getUrl(billingCycle: BillingCycle):string {
    const id = billingCycle['_id']
    return `billingCycles/form/${id}`
  }

}
