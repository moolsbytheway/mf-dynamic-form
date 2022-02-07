import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './components/df-component/dynamic-form.component';
import {DfFormControlComponent} from './components/df-form-control/df-form-control.component';
import {CommonModule, DatePipe} from '@angular/common';
import {FormControlService} from './service/form-control.service';
import {DynamicModule} from "ng-dynamic-component";
import { DfDateFormComponent } from './components/df-form-control/df-date-form/df-date-form.component';
import {ToolTipComponent} from './components/tool-tip/tool-tip.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicModule],
	declarations: [DynamicFormComponent, DfFormControlComponent,DfDateFormComponent, ToolTipComponent],
	exports: [DynamicFormComponent, ToolTipComponent],
	providers: [FormControlService,DatePipe],
  bootstrap: [DynamicFormComponent]
})
export class MfDynamicFormModule {
}
