import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {I18n} from '../../model/i18n';
import {FormControlService} from '../../service/form-control.service';
import {DropdownOption, OPERATOR} from '../../model/form-control-base';

@Component({
  selector: 'df-form-control',
  styleUrls: ['./df-form-control.component.scss'],
  templateUrl: './df-form-control.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DfFormControlComponent implements OnInit, OnDestroy {
  @Input() control: any;
  @Input() formReadOnly: boolean;
  @Input() showEmptyReadOnlyFields: boolean;
  @Input() form: FormGroup;
  @Input() i18n: I18n;
  private subx: Subscription[] = [];

  customControlOutputs: any;

  private updateCustomFormControl(value, options?: { emitEvent: boolean }) {
    this.form.controls[this.control.key].setValue(value);
    this.form.controls[this.control.key].markAsTouched();
    this.form.controls[this.control.key].updateValueAndValidity();
    if (options?.emitEvent && this.control.onChanged) this.control.onChanged(value)
  }

  get isDisabled() {
    return this.form.controls[this.control.key].disabled;
  }

  get isValid() {
    return this.form.controls[this.control.key].valid;
  }

  get isTouched() {
    return this.form.controls[this.control.key].touched;
  }

  get formErrors() {
    return this.form.controls[this.control.key].errors;
  }

  get formControlIsRequired() {
    if (this.control.required) {
      return true;
    }

    if (!this.form.controls[this.control.key].validator) {
      return false;
    }
    const validator = this.form.controls[this.control.key].validator({} as AbstractControl);
    if (!validator) {
      return false;
    }
    return validator.required;
  }

  get isRequired() {
    return this.formErrors && this.formErrors.required;
  }

  get errorMinLength() {
    return this.formErrors && this.formErrors.minlength;
  }

  get errorMaxLength() {
    return this.formErrors && this.formErrors.maxlength;
  }

  get emailInvalid() {
    return this.formErrors && this.formErrors.email;
  }

  get patternInvalid() {
    return this.formErrors && this.formErrors.pattern;
  }

  get isConfirmField() {
    return this.control.key == 'passwordConfirmation';
  }

  get passwordMismatch() {
    return this.form.errors && this.form.errors.passwordMismatch;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.initCustomFormControlOutputs();
    this.subscribeToRequirementDependecies();
    this.subscribeToVisibilityDependencies(true);
    this.subscribeToDisabilityDependencies();
    this.subscribeToOptionsPromises();
    this.subscribeToFormChanges();
  }

  onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.controls[this.control.key].setValue(reader.result);
      };
    }
  }

  updateCity(city: string) {
    this.form.controls[this.control.key].setValue(city);
    this.form.controls[this.control.key].markAsTouched();
    this.form.controls[this.control.key].updateValueAndValidity();
  }

  public itemIsChecked(item) {
    const formArray: FormArray = this.form.get(this.control.key) as FormArray;
    let isChecked = false;

    for (let i = 0; i < formArray.controls.length; i++) {
      const ctrl = formArray.controls[i];
      if (ctrl.value == item) {
        isChecked = true;
        break;
      }
    }
    return isChecked;

  }

  onCheckChange(event) {
    const formArray: FormArray = this.form.get(this.control.key) as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    if (formArray.controls.length > 0 && (!formArray.value || !formArray.value.length)) {
      formArray.setValue(null);
    }
  }

  private unsubscribe() {
    if (this.subx && this.subx.length > 0) {
      this.subx.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  private subscribeToRequirementDependecies() {
    if (!this.form) {
      throw new Error('Couldn\'t subscribe to form input dependecies value change');
    }
    const deps = this.control.requiredWhen;
    const hasDeps = deps && deps.length > 0;
    if (!hasDeps) {
      return;
    }

    let found = false;
    for (let i in deps) {
      const dep = deps[i];
      if (found) {
        break;
      }
      const isString = typeof dep == 'string';
      const fieldName = isString ? dep : dep['field'];
      const expectedValue = isString ? '' : dep['value'];

      const operator: OPERATOR = isString ? 'EQUALS' :
        dep['op'] ? dep['op'] : 'EQUALS';

      const shouldBeRequiredWhenValueIsEqualToExpectedValue = value => {
        if (operator == 'EQUALS') {
          return !isString && value == expectedValue;
        }
        return !isString && value != expectedValue;
      };

      const shouldBeRequiredWhenValueIsNotEmpty = (value: string) => isString && value;

      const currentValue = this.form.get(fieldName).value;

      const validators = FormControlService.getValidators(this.control);
      if (shouldBeRequiredWhenValueIsNotEmpty(currentValue) ||
        shouldBeRequiredWhenValueIsEqualToExpectedValue(currentValue)) {
        validators.push(Validators.required);
        this.form.get(this.control.key).setValidators(validators);
        this.form.get(this.control.key).updateValueAndValidity();
        found = true;
      } else {
        const newValidators = validators.filter(it => it && it.name != 'required');
        this.form.get(this.control.key).setValidators(newValidators);
        this.form.get(this.control.key).updateValueAndValidity();
      }

      this.subx.push(this.form.get(fieldName).valueChanges.subscribe(value => {
        const validators = FormControlService.getValidators(this.control);
        if (shouldBeRequiredWhenValueIsNotEmpty(value) ||
          shouldBeRequiredWhenValueIsEqualToExpectedValue(value)) {
          validators.push(Validators.required);
          this.form.get(this.control.key).setValidators(validators);
          this.form.get(this.control.key).updateValueAndValidity();
          found = true;
        } else {
          const newValidators = validators.filter(it => it && it.name != 'required');
          this.form.get(this.control.key).setValidators(newValidators);
          this.form.get(this.control.key).updateValueAndValidity();
        }
      }));
    }

  }

  private subscribeToDisabilityDependencies() {
    const deps = this.control.disableWhen;
    const hasDeps = deps && deps.length > 0;
    if (!hasDeps) {
      return;
    }

    let found = false;
    for (let i in deps) {
      const dep = deps[i];
      if (found) {
        break;
      }
      const fieldName = dep['field'];
      const expectedValue = dep['value'];

      const operator: OPERATOR = dep['op'] ? dep['op'] : 'EQUALS';

      const shouldBeDisableWhenValueIsEqualToExpectedValue = value => {
          if (operator == 'EQUALS') {
            return value == expectedValue;
          }
          return value != expectedValue;
        };
      if (shouldBeDisableWhenValueIsEqualToExpectedValue(this.form.get(fieldName).value)) {
        this.form.get(this.control.key).disable();
        found = true;
      } else {
        this.form.get(this.control.key).enable();
      }
      this.subx.push(this.form.get(fieldName).valueChanges.subscribe(value => {
        if (shouldBeDisableWhenValueIsEqualToExpectedValue(value)) {
          this.form.get(this.control.key).disable();
          found = true;
        } else {
          this.form.get(this.control.key).enable();
        }
      }));
    }
  }

  private subscribeToVisibilityDependencies(init: boolean) {
    const deps = this.control.visibleWhen;
    const hasDeps = deps && deps.length > 0;
    if (!hasDeps) {
      return;
    }

    let found = false;
    for (let i in deps) {
      const dep = deps[i];
      if (found) {
        break;
      }

      const isString = typeof dep == 'string';
      const fieldName = isString ? dep : dep['field'];
      const expectedValue = isString ? '' : dep['value'];
      const operator :OPERATOR =  isString ? 'EQUALS' :
        dep['op'] ? dep["op"] : 'EQUALS';



      const shouldBeVisibleWhenValueIsEqualToExpectedValue = value => {
        if(operator == 'EQUALS') {
         return  !isString && value == expectedValue;
        }
        return !isString && value != expectedValue;
      }

      const shouldBeVisibleWhenValueIsNotEmpty = (value: string) => isString && value;

      if (shouldBeVisibleWhenValueIsNotEmpty(this.form.get(fieldName).value) ||
        shouldBeVisibleWhenValueIsEqualToExpectedValue(this.form.get(fieldName).value)) {
        this.control.visible = true;
        found = true;
      } else {
        this.control.visible = false;
      }
      this.control.export =this.control.visible;

      if (!!init) {
        this.subx.push(this.form.get(fieldName).valueChanges.subscribe(value => {
          this.subscribeToVisibilityDependencies(false);
        }));
      }
    }
  }

  private subscribeToOptionsPromises() {
    const options$ = this.control.options$;
    if (!options$ || this.control.controlType != "dropdown" ||
      typeof options$.callback != "function") return;

    const fieldName = options$['triggerField'];

    if (!fieldName) {
      this.logPromiseFetch(null)
      options$.callback(null).then((options: DropdownOption[]) => {
        this.control.options = options;
        this.form.controls[this.control.key].setValue(this.getFieldValue(options));
        this.form.controls[this.control.key].updateValueAndValidity();
      })

      return;
    }

    const value = this.form.get(fieldName).value;

    const promise: Promise<DropdownOption[]> = options$.callback(value);

    this.logPromiseFetch(value)
    promise.then((options: DropdownOption[]) => {
      this.control.options = options;
      this.form.controls[this.control.key].setValue(this.getFieldValue(options));
      this.form.controls[this.control.key].updateValueAndValidity();
    })

    this.subx.push(this.form.get(fieldName).valueChanges.subscribe(value => {

      const promise: Promise<DropdownOption[]> = options$.callback(value);

      this.logPromiseFetch(value)
      promise.then((options: DropdownOption[]) => {
        this.control.options = options;
        this.form.controls[this.control.key].setValue(this.getFieldValue(options));
        this.form.controls[this.control.key].updateValueAndValidity();
      })

    }));
  }

  private getFieldValue(options: DropdownOption[]) {
    const selectedOption = options.find(it => it.value == this.control.value)?.value;
    return selectedOption ? selectedOption : options.length ? options[0].value : "";
  }

  private initCustomFormControlOutputs() {
    this.customControlOutputs = {
      output: (obj: { value: any, options?: { emitEvent: boolean } }) =>
        this.updateCustomFormControl(obj.value, obj.options),
    };
  }

  logPromiseFetch(value) {
    console.info(`Requesting data for field ${this.control.key} with value ${value}`)
  }

  get readOnly() {
    return this.formReadOnly ? !this.control.notReadOnly : this.control.readOnly;
  }

  get generateDynamicComponentInputs() {
    return {...this.control.inputs, formReadOnly: this.formReadOnly,
      formValue: this.form}
  }

  private subscribeToFormChanges() {
    if(!this.control.onChanged || this.control.controlType == "dynamic") return;
    this.subx.push(this.form.get(this.control.key).valueChanges.subscribe(value => {
      this.control.onChanged(value, this.patchValue.bind(this));
    }));
  }

  private patchValue(field: string, value) {
    if(!field || !this.form.controls[field]) {
      throw new Error('ValuePatchException: field ' + field + ' not found');
    }

    this.form.controls[field].setValue(value);
    this.form.controls[field].markAsTouched();
    this.form.controls[field].updateValueAndValidity();
  }
}

