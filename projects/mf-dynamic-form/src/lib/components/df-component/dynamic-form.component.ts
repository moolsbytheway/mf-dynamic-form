import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FormControlBase, MfForm, MfFormStep} from '../../model/form-control-base';
import {FormControlService} from '../../service/form-control.service';

@Component({
  selector: 'mf-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService],
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent {
  debugMode: boolean;
  stepper: boolean;
  hasSections: boolean;
  formGroup: FormGroup;
  formControls: FormControlBase[] = [];
  activeStep = 0;
  steps: MfFormStep[] = [];

  @Input() controlsClass: string;
  @Input() previousButtonClass: string;
  @Input() saveButtonClass: string;
  @Input() nextButtonClass: string;

  @Input() suppressStepLabel: boolean;
  @Input() suppressControls: boolean;
  @Input()
  i18n = {
    next: 'Next',
    previous: 'Previous',
    save: 'Save',
    errors: {
      isRequired: 'Ce champs est obligatoire ',
      minLength: 'La longueur minimal est de',
      maxLength: 'La longueur maximal est de',
      emailInvalid: 'Email invalid',
      alphanumeric: 'Ce champs doit être Alphanumeric',
      passwordMismatch: 'Les mots de passe ne sont pas identiques'
    }
  };
  @Output() formSubmitted = new EventEmitter();
  @Output() onChange = new EventEmitter();

  constructor(private qcs: FormControlService) {
  }

  @Input() set form(f: MfForm) {
    if (!f) {
      return;
    }
    this.init(f);
  }

  get isFirstStep() {
    return this.activeStep === 0;
  }

  get isLastStep() {
    return this.activeStep === this.steps.length - 1;
  }

  submit() {
    if (!this.isFormValid()) {
      this.formGroup.markAllAsTouched();
    }
    const form = {};
    this.formControls.forEach(it => {
      if (it.exportOnly || (
        it.export && it.visible && !this.formGroup.controls[it.key].disabled)) {
        form[it.key] = this.formGroup.controls[it.key].value;
      }
    });
    this.formSubmitted.emit(form);
  }

  goToPreviousStep() {
    this.activeStep--;
  }

  goToNextStep() {
    this.activeStep++;
  }

  isFormValid() {
    return !!this.formGroup && this.formGroup.valid;
  }

  isActiveStep(index: number) {
    return index === this.activeStep;
  }

  debug() {
    console.log(this.formGroup.controls);
  }

  isStepValidated(index: number) {
    const formFields = flattenDeep(this.steps[index].sections.map(it => it.controls)).map(it => it.key);
    for (let field of formFields) {
      if (this.formGroup.controls[field].invalid) {
        return false;
      }
    }
    return true;
  }

  private init(f: MfForm) {
    this.initCustomFormControls(f);
    this.stepper = f.steps.filter(it => !!it.label).length > 0;
    this.hasSections = f.steps.map(it => it.sections.filter(s => !!s.label).length).reduce((a, b) => a + b) > 0;
    this.debugMode = f.debugMode;
    this.steps = f.steps;
    this.formControls = flattenDeep(f.steps.map(step => step.sections.map(it => it.controls)));
    this.checkFormControlsDuplication();
    this.formGroup = this.qcs.toFormGroup(this.formControls, f.readOnly);
    this.formGroup.valueChanges.subscribe(value => {
      this.onChange.emit(value);
    })
  }

  private initCustomFormControls(f: MfForm) {
    f.steps.forEach(step => {
      step.sections.forEach(section => {
        section.controls.forEach(control => {
          if (f.readOnly) {
            control.readOnly = !control.notReadOnly;
          }
          if (control.controlType == 'dynamic') {
            control.component = f.customControls[control.component];
          }
        });
      });
    });
  }

  private checkFormControlsDuplication() {
    if (this.debugMode) {
      console.warn('MfDynamicForm debug mode enabled');
    }
    this.formControls.forEach(control => {
      const items = this.formControls.filter(it => control.key == it.key);
      if (items && items.length > 1) {
        throw new Error('FormFieldDuplicationError: field ' + control.key + ' is duplicated');
      }
    });
  }
}

const flattenDeep = (arr) => Array.isArray(arr)
  ? arr.reduce((a, b) => a.concat(flattenDeep(b)), [])
  : [arr];
