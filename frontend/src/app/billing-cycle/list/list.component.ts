import { Component, OnInit } from '@angular/core';
import { BillingCycle } from 'src/app/model/billingCycle.model';
import { BillingCycleService } from '../billingCycle.service';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mean-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  ROOT_URL = 'billingCycles'

  billingCycles$: Observable<BillingCycle[]>

  pages$: Observable<number>

  constructor(
    private billingCycleService: BillingCycleService, 
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let page = this.route.snapshot.queryParams['page'] || 1
    page = (page - 1) * 10
    this.billingCycles$ = this.billingCycleService.all(1)
    this.pages$ = this.billingCycleService.count()
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

  pageChange(page:number) {
    let pg = page || 1
    pg = (pg - 1) * 10
    this.billingCycles$ = this.billingCycleService.all(pg)
  }

  getTotalPages(totalPages: number) {
    return Math.ceil(totalPages / 10)
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
