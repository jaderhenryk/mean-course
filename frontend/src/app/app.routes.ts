import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingCycleComponent } from './billing-cycle/billing-cycle.component';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './security/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

export const ROUTES = [
    {
        path: '',
        component: LayoutComponent,
        children: [
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
            }, 
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {
                path: '',
                loadChildren: () => import('./security/auth/auth.module').then(m => m.AuthModule)
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