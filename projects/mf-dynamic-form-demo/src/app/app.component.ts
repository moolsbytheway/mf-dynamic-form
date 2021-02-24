import {Component, OnInit} from '@angular/core';
import {FormsService} from './forms.service';
import {MfForm} from "../../../mf-dynamic-form/src/lib/df-model/form-control-base";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: MfForm | undefined;

  formData: any;

  ngOnInit(): void {
    this.form = FormsService.getRegisterForm();
  }

  onSubmit(formData: any) {
    this.formData = formData;
  }
}
