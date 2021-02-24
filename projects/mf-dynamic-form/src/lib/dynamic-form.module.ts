import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './components/df-component/dynamic-form.component';
import {DfFormControlComponent} from './components/df-form-control/df-form-control.component';
import {CommonModule} from '@angular/common';
import {FormControlService} from './df-service/form-control.service';
import {CountryStateCityPicker} from './components/country-picker/csc-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [DynamicFormComponent, DfFormControlComponent, CountryStateCityPicker],
  exports: [DynamicFormComponent],
  providers: [FormControlService],
})
export class MFDynamicFormModule {
}
