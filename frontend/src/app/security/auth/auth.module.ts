import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const AUTH_ROUTES = [
   {path: 'login', component: LoginComponent},
   {path: 'signup', component: RegisterComponent}
]

@NgModule({
    declarations: [ AuthComponent, LoginComponent, RegisterComponent ],
    imports: [ 
        SharedModule,
        RouterModule.forChild(AUTH_ROUTES)
    ]
})
export class AuthModule {
    
}