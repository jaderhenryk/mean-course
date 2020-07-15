import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BillingCycleService } from '../billingCycle.service';
import { BillingCycle } from 'src/app/model/billingCycle.model';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mean-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private billingCycleService: BillingCycleService
    ) { }

  formGroup: FormGroup

  numberPattern = /^[0-9]*$/

  ngOnInit() {
    const self = this
    self.formGroup = self.formBuilder.group({
      billingForm: self.formBuilder.group({
        name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
        month: new FormControl('', {validators: [Validators.required, Validators.pattern(this.numberPattern), Validators.min(1), Validators.max(12)]}),
        year: new FormControl('', {validators: [Validators.required, Validators.pattern(this.numberPattern), Validators.min(1970), Validators.max(9999)]})
      }),
    })
  }

  incluir(formData: any) {
    let billingCycle = new BillingCycle(formData.billingForm.name, formData.billingForm.month, formData.billingForm.year)
    this.billingCycleService.create(billingCycle)
      .subscribe(
        response => this.notifier.successMessage('Novo registro criado com sucesso!'),
        httpError => this.handleError(httpError)
      )
    // this.clearFields()
  }

  alterar() {
    console.log('Alterado o registro!!!')
  }

  excluir() {
    console.log('Excluido o registro!!!')
  }

  cancelar() {
    console.log('Cancelando a operação!!!')
  }

  clearFields() {

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
