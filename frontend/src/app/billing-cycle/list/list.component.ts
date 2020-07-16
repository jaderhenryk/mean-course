import { Component, OnInit } from '@angular/core';
import { BillingCycle } from 'src/app/model/billingCycle.model';
import { BillingCycleService } from '../billingCycle.service';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mean-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  billingCycles$: Observable<BillingCycle[]>

  constructor(private billingCycleService: BillingCycleService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.billingCycles$ = this.billingCycleService.all()
  }

  excluir(billingSelected: BillingCycle) {
    const id = billingSelected['_id']
    this.billingCycleService.delete(id)
      .subscribe(
        () => {
          this.notifier.successMessage('Registro removido com sucesso!')
          this.billingCycles$ = this.billingCycleService.all()
        },
        httpError => this.handleError(httpError)
      )
  }

  getUrl(billingCycle: BillingCycle):string {
    const id = billingCycle['_id']
    return `form/${id}`
  }

  private handleError(httpError: HttpErrorResponse) {
    const errors = httpError.error.errors
    if (errors) {
      errors.forEach( err => this.notifier.errorMessage(err) )
    } else {
      this.notifier.errorMessage(httpError.error.message)
    }
  }

}
