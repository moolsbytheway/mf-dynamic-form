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
  i18n = {next: 'Next', cancel: 'Cancel', previous: 'Previous', save: 'Save',errors: {isRequired: "est obligatoire ", minLength: "La longueur minimal est de", maxLength: "La longueur maximal est de", emailInvalid: "invalid",alphanumeric:"doit être Alphanumeric",passwordMismatch:"Les mots de passe ne sont pas identiques"}};


  formData: any;

  ngOnInit(): void {
    this.form = FormsService.getRegisterForm();
  }

  onSubmit(formData: any) {
    this.formData = formData;
  }
}
