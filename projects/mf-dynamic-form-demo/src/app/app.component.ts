import {Component, ViewChild} from '@angular/core';
import {PURCHASE_ORDER_FORM_DEFINITION} from './order-form-definition';
import {DynamicFormComponent, FormApi, MfForm} from 'mf-dynamic-form';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;

  externalFormGroup = this.fb.group({
    firstName: [''],
    lastName: ['']
  });

  form: MfForm = PURCHASE_ORDER_FORM_DEFINITION(this.externalFormGroup);
  api: FormApi;
  formData: any;



  constructor(private fb: FormBuilder) { }

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
