import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BillingCycleService } from './billingCycle.service';

const BILLING_CYCLE_ROUTES = [
    {path: '', component: ListComponent},
    {path: 'form', component: FormComponent},
    {path: 'form/:id', compoent: FormComponent}
]

@NgModule({
    declarations: [ ListComponent, FormComponent ],
    imports: [ SharedModule, RouterModule.forChild(BILLING_CYCLE_ROUTES) ],
    providers: [BillingCycleService]
})
export class BillingCycleModule {}