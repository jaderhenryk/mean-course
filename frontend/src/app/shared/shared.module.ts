import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ValueBoxComponent } from './value-box/value-box.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { InputComponent } from './input/input.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { NotifierService } from './notifier/notifier.service';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot() ],
    declarations: [ ContentHeaderComponent, ValueBoxComponent, InputComponent ],
    exports: [ CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, ContentHeaderComponent, ValueBoxComponent, InputComponent ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
       return {
           ngModule: SharedModule,
           providers: [
               DashboardService,
               NotifierService
           ]
       }
    }
}