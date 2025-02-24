import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BillingCycleService } from '../billingCycle.service';
import { BillingCycle } from 'src/app/model/billingCycle.model';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mean-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private billingCycleService: BillingCycleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  formGroup: FormGroup

  numberPattern = /^[0-9]*$/

  billingCycle: BillingCycle
  totalCredit: number = 0
  totalDebt: number = 0
  totalConsolidado: number = 0

  hasData = false

  ngOnInit() {
    this.billingCycle = new BillingCycle('', 0, 0)
    this.billingCycle.credits = [{name: '', value: 0}]
    this.billingCycle.debts = [{name: '', value: 0, status: 'PENDENTE'}]

    this.formGroup = this.formBuilder.group({
      billingForm: this.formBuilder.group({
        name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
        month: new FormControl('', {validators: [Validators.required, Validators.pattern(this.numberPattern), Validators.min(1), Validators.max(12)]}),
        year: new FormControl('', {validators: [Validators.required, Validators.pattern(this.numberPattern), Validators.min(1970), Validators.max(9999)]})
      }),
    })
    const id = this.route.snapshot.params['id']
    if (id) {
      this.billingCycleService.one(id).subscribe(bill => {
        this.formGroup.get('billingForm').get('name').setValue(bill.name)
        this.formGroup.get('billingForm').get('month').setValue(bill.month)
        this.formGroup.get('billingForm').get('year').setValue(bill.year)
        this.billingCycle = bill
        if (this.billingCycle.credits.length === 0) {
          this.billingCycle.credits.push({name: '', value: 0})
        } else {
          this.totalCredit = this.getTotalCredit()
        }
        if (this.billingCycle.debts.length === 0) {
          this.billingCycle.debts.push({name: '', value: 0, status: 'PENDENTE'})
        } else {
          this.totalDebt = this.getTotalDebt()
        }
        this.totalConsolidado = this.totalCredit - this.totalDebt
      })
      this.hasData = true
    }
  }

  incluir(formData: any) {
    let newBilling = new BillingCycle(formData.billingForm.name, formData.billingForm.month, formData.billingForm.year)
    let newCredits = this.validateCreditsDebts(this.billingCycle.credits)
    if (newCredits.length > 0) {
      newBilling.credits = newCredits
    }
    let newDebts = this.validateCreditsDebts(this.billingCycle.debts)
    if (newDebts.length > 0) {
      newBilling.debts = newDebts
    }
    this.billingCycleService.create(newBilling)
      .subscribe(
        () => {
          this.notifier.successMessage('Novo registro criado com sucesso!')
          this.router.navigate(['/billingCycles'])
        },
        httpError => this.handleError(httpError)
      )
  }

  alterar(formData: any) {
    let updatedBilling = new BillingCycle(formData.billingForm.name, formData.billingForm.month, formData.billingForm.year)
    updatedBilling.credits = this.validateCreditsDebts(this.billingCycle.credits)
    updatedBilling.debts = this.validateCreditsDebts(this.billingCycle.debts)
    updatedBilling['_id'] = this.route.snapshot.params['id']
    this.billingCycleService.update(updatedBilling)
      .subscribe(
        () => {
          this.notifier.successMessage('Registro atualizado com sucesso!')
          this.router.navigate(['/billingCycles'])
        },
        httpError => this.handleError(httpError)
      )
  }

  private handleError(httpError: HttpErrorResponse) {
    const errors = httpError.error.errors
    if (errors) {
      errors.forEach( err => this.notifier.errorMessage(err) )
    } else {
      this.notifier.errorMessage(httpError.error.message)
    }
  }

  getTotalCredit(): number {
    let total = 0
    total = this.billingCycle.credits.map(credit => credit.value).reduce((prev, value) => prev + value, 0)
    return isNaN(total) ? 0 : parseFloat(total.toFixed(2))
  }

  getTotalDebt(): number {
    let total = 0
    total = this.billingCycle.debts.map(debt => debt.value).reduce((prev, value) => prev + value, 0)
    return isNaN(total) ? 0 : parseFloat(total.toFixed(2))
  }

  updateCredits(updatedCredits) {
    this.billingCycle.credits = updatedCredits
    this.refreshTotals()
  }

  updateDebts(updatedDebts) {
    this.billingCycle.debts = updatedDebts
    this.refreshTotals()
  }

  refreshTotals() {
    this.totalCredit = this.getTotalCredit()
    this.totalDebt = this.getTotalDebt()
    this.totalConsolidado = this.totalCredit - this.totalDebt
  }

  validateCreditsDebts(data: any[]) {
    let newData = []
    data.forEach((item) => {
      if (item && item.name && item.name !== '' && item.value) {
        newData.push(item)
      }
    })
    return newData
  }
}
