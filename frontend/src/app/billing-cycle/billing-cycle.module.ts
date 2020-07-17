import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BillingCycleService } from './billingCycle.service';
import { CreditListComponent } from './credit-list/credit-list.component';
import { DebtListComponent } from './debt-list/debt-list.component';


const BILLING_CYCLE_ROUTES = [
    {path: '', component: ListComponent},
    {path: 'form', component: FormComponent},
    {path: 'form/:id', component: FormComponent}
]

@NgModule({
    declarations: [ ListComponent, FormComponent, CreditListComponent, DebtListComponent ],
    imports: [ SharedModule, RouterModule.forChild(BILLING_CYCLE_ROUTES) ],
    providers: [BillingCycleService]
})
export class BillingCycleModule {}