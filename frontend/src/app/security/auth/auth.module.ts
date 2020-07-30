import { NgModule, ModuleWithProviders } from '@angular/core'
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from '../user/user.service';
import { RouterModule } from '@angular/router';
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
    ],
    providers: [ UserService ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [UserService]  
        };
    }
}