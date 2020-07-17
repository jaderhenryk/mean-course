import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BillingCycleService } from '../billingCycle.service';
import { BillingCycle } from 'src/app/model/billingCycle.model';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  formGroup: FormGroup

  numberPattern = /^[0-9]*$/

  billingCycle: BillingCycle

  hasData = false

  ngOnInit() {
    /*
      gambiarra para não ter que passar o billingCycle como observable 
      para as listas de créditos e débitos
    */  
    this.billingCycle = new BillingCycle('', 0, 0)
    this.billingCycle.credits = [{}]
    this.billingCycle.debts = [{}]

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
          this.billingCycle.credits.push({})
        }
        if (this.billingCycle.debts.length === 0) {
          this.billingCycle.debts.push({})
        }
      })
      this.hasData = true
    }
  }

  incluir(formData: any) {
    let billingCycle = new BillingCycle(formData.billingForm.name, formData.billingForm.month, formData.billingForm.year)
    this.billingCycleService.create(billingCycle)
      .subscribe(
        () => {
          this.notifier.successMessage('Novo registro criado com sucesso!')
          this.formGroup.reset()
        },
        httpError => this.handleError(httpError)
      )
  }

  alterar(formData: any) {
    let billingCycle = new BillingCycle(formData.billingForm.name, formData.billingForm.month, formData.billingForm.year)
    billingCycle['_id'] = this.route.snapshot.params['id']
    this.billingCycleService.update(billingCycle)
      .subscribe(
        () => this.notifier.successMessage('Registro atualizado com sucesso!'),
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
}
