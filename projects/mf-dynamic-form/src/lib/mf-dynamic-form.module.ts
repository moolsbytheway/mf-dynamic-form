import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './components/df-component/dynamic-form.component';
import {DfFormControlComponent} from './components/df-form-control/df-form-control.component';
import {CommonModule} from '@angular/common';
import {FormControlService} from './service/form-control.service';
import {DynamicModule} from "ng-dynamic-component";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicModule],
	declarations: [DynamicFormComponent, DfFormControlComponent],
	exports: [DynamicFormComponent],
	providers: [FormControlService],
  bootstrap: [DynamicFormComponent]
})
export class MfDynamicFormModule {
}
