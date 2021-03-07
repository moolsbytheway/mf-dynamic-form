import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {FormControlBase} from '../df-model/form-control-base';

@Injectable()
export class FormControlService {
  private static getValidators(control: FormControlBase) {

    const validators = [];
    if (control.required) {
      validators.push(Validators.required);
    }
    if (control.minLength) {
      validators.push(Validators.minLength(control.minLength));
    }
    if (control.maxLength) {
      validators.push(Validators.maxLength(control.maxLength));
    }
    if (control.alphanumeric) {
      validators.push(Validators.pattern('[a-zA-Z0-9 ]+'));
    }
    if (control.type == 'email') {
      validators.push(Validators.email);
    }

    return validators;
  }

  private static checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('passwordConfirmation').value;

    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  toFormGroup(controls: FormControlBase[]) {
    const group = {};

    controls.forEach(control => {
      const validators = FormControlService.getValidators(control);

      if (control.controlType == 'checkbox') {
        let initialValue = [];
        if (control.value) {
          control.value.forEach(item => {
            initialValue.push(new FormControl(item));
          });
        }
        group[control.key] = new FormArray(initialValue);
      } else {
        group[control.key] = validators.length > 0 ?
          new FormControl(control.value || '',
            Validators.compose(validators))
          : new FormControl(control.value || '');
      }

      if (control.visibleWhen && control.visibleWhen.length > 0) {
        group[control.key].disable();
      }

    });

    const hasPasswordField = controls.findIndex(it => it.controlType == 'password') != -1;

    const options = hasPasswordField ? {validators: FormControlService.checkPasswords} : {};
    return new FormGroup(group, options);
  }


}
