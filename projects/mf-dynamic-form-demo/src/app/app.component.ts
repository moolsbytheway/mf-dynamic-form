import {Component, OnInit, ViewChild} from '@angular/core';
import {PURCHASE_ORDER_FORM_DEFINITION} from './order-form-definition';
import {MfForm} from 'mf-dynamic-form';
import {DynamicFormComponent} from 'mf-dynamic-form';
import {FormApi} from 'mf-dynamic-form/src/lib/service/form-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;

  form: MfForm = PURCHASE_ORDER_FORM_DEFINITION;
  api: FormApi;
  formData: any;

  onSubmit(formData: any) {
    console.log(formData)
    this.formData = formData;
  }

  isStep2Validated() {
    alert(this.dynamicForm.isStepValidated(1))
  }

  printDebugData() {
    this.api.printDebugDataToConsole();
  }
  enableEdit() {
    this.api.enableEditMode();
  }
  disableEdit() {
    this.api.disableEditMode();
  }

  formReady(api: FormApi) {
    console.log("form ready")
    this.api = api;
  }
}
