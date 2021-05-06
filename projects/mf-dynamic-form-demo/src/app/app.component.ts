import {Component, OnInit} from '@angular/core';
import {PURCHASE_ORDER_FORM_DEFINITION} from './order-form-definition';
import {MfForm} from 'mf-dynamic-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  form: MfForm = PURCHASE_ORDER_FORM_DEFINITION;
  formData: any;

  onSubmit(formData: any) {
    this.formData = formData;
  }
}
