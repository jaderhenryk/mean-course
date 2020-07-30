import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingCycleComponent } from './billing-cycle/billing-cycle.component';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

export const ROUTES = [
    { path: '',  redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { 
        path: 'billingCycles', 
        component: BillingCycleComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./billing-cycle/billing-cycle.module').then(m => m.BillingCycleModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}