import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValueBoxComponent } from './value-box/value-box.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { InputComponent } from './input/input.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { NotifierService } from './notifier/notifier.service';
import { AuthInterceptor } from '../security/auth/auth.interceptor';
import { UserService } from '../security/user/user.service';
import { AuthGuard } from '../security/auth/auth.guard';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ToastrModule.forRoot() ],
    declarations: [ ContentHeaderComponent, ValueBoxComponent, InputComponent, PaginatorComponent ],
    exports: [ CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, ContentHeaderComponent, ValueBoxComponent, InputComponent, PaginatorComponent ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
       return {
           ngModule: SharedModule,
           providers: [
               DashboardService,
               NotifierService,
               UserService,
               AuthGuard,
               {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
           ]
       }
    }
}