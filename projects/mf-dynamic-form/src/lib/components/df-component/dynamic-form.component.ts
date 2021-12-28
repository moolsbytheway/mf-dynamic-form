import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FormControlBase, MfForm, MfFormStep} from '../../model/form-control-base';
import {FormControlService} from '../../service/form-control.service';
import {Subscription} from 'rxjs';
import {FormApi} from '../../service/form-api.service';

@Component({
  selector: 'mf-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService, FormApi],
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent implements OnChanges, OnDestroy {
  private formGroupSubscription: Subscription;
  private subscriptions: Subscription[] = [];

  debugMode: boolean;
  stepper: boolean;
  hasSections: boolean;
  formGroup: FormGroup;
  formControls: FormControlBase[] = [];
  activeStep = 0;
  steps: MfFormStep[] = [];

  isFormReady: boolean;

  get isFirstStep() {
    return this.activeStep === 0;
  }

  get isLastStep() {
    return this.activeStep === this.steps.length - 1;
  }

  @Input() form: MfForm;

  @Input() showEmptyReadOnlyFields: boolean;
  @Input() controlsClass: string;
  @Input() previousButtonClass: string;
  @Input() saveButtonClass: string;
  @Input() nextButtonClass: string;

  @Input() suppressStepLabel: boolean;
  @Input() suppressControls: boolean;
  @Input() i18n = defaultI18n;
  @Output() formSubmitted = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() formReady = new EventEmitter();

  @Input() alwaysShowAllSteps: boolean = false;

  isActiveStep(index: number) {
    return index === this.activeStep;
  }

  constructor(private qcs: FormControlService, private api: FormApi) {
    this.subscribeToFormApiEvents();
  }

  /**
   * External API
   * @param field to be updated
   * @param value field new value
   */
  public patchValue(field: string, value) {
    if (!field || !this.formGroup.controls[field]) {
      throw new Error('ValuePatchException: field ' + field + ' not found');
    }

    this.formGroup.controls[field].setValue(value);
    this.formGroup.controls[field].markAsTouched();
    this.formGroup.controls[field].updateValueAndValidity();
  }

  /**
   * External API
   * @deprecated to be changed to private in v2
   */
  public submit() {
    if (!this.isFormValid()) {
      this.formGroup.markAllAsTouched();
    }
    const form = {};
    this.formControls.forEach(it => {
      if (it.exportOnly || (
        it.export && it.visible && (!!this.form.exportDisabledFields || !this.formGroup.controls[it.key].disabled))) {
          let value = this.formGroup.controls[it.key].value;
          if(it.controlType =="date" && it.timeZone){
            value += it.timeZone;
          }
          form[it.key] = value;
      }
    });
    if (this.debugMode) {
      this.printDebugDataToConsole();
    }
    this.formSubmitted.emit(form);
  }

  /**
   * External API
   * @deprecated to be changed to private in v2
   */
  public goToPreviousStep() {
    this.activeStep--;
  }

  /**
   * External API
   * @deprecated to be changed to private in v2
   */
  public goToNextStep() {
    this.activeStep++;
  }

  /**
   * External API
   */
  public isFormValid(): boolean {
    return !!this.formGroup && this.formGroup.valid;
  }

  /**
   * External API
   * @param index Step index starting from 0
   */
  public isStepValidated(index: number): boolean {
    const formFields = flattenDeep(this.steps[index].sections.map(it => it.controls)).map(it => it.key);
    for (let field of formFields) {
      if (this.formGroup.controls[field].invalid) {
        return false;
      }
    }
    return true;
  }

  /**
   * External API
   * @deprecated to be changed to private in v2
   */
  public printDebugDataToConsole() {
    console.log(this.formGroup.controls);
  }

  private init(f: MfForm) {
    this.form = f;
    this.initCustomFormControls(f);
    this.stepper = f.steps.filter(it => !!it.label).length > 0;
    this.hasSections = f.steps.map(it => it.sections.filter(s => !!s.label).length)
      .reduce((a, b) => +a + +b) > 0;
    this.debugMode = f.debugMode;
    this.formControls = flattenDeep(f.steps.map(step => step.sections
      .map(it => it.controls)));
    this.checkFormControlsDuplication();
    this.initializeFormGroup(f);
    this.isFormReady = true;
    this.formReady.emit(this.api);
  }

  private initializeFormGroup(f: MfForm) {
    this.formGroup = this.qcs.toFormGroup(this.formControls, f.readOnly);
    if (this.formGroupSubscription) {
      this.formGroupSubscription.unsubscribe();
    }
    this.formGroupSubscription = this.formGroup.valueChanges.subscribe(value => {
      this.formControls.forEach(control=>{
        if(control.controlType== "date" && control.timeZone && value[control.key]){
          value[control.key] += control.timeZone;
        }
      })

      this.onChange.emit(value);
    });
    this.steps = f.steps.map(it => ({...it}));
  }

  private initCustomFormControls(f: MfForm) {
    f.steps.forEach(step => {
      step.sections.forEach(section => {
        section.controls.forEach(control => {

          if (control.controlType == 'dynamic') {
            if (!f.customControls) {
              throw new Error('MissingCustomControlException: provided custom controls list is empty');
            }
            if (!f.customControls[control.component]) {
              throw new Error('MissingCustomControlException: control component ' + control.component + ' is missing from provided customControls list');
            }
            control.componentElement = f.customControls[control.component];
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

  private subscribeToFormApiEvents() {

    this.subscriptions.push(this.api.editMode.subscribe((editMode: boolean) => {
      const form = {...this.form};
      form.readOnly = !editMode;
      this.init(form);
    }));

    this.subscriptions.push(this.api.triggerPrintDebug.subscribe((debugMode: boolean) => {
      this.printDebugDataToConsole();
    }));

    this.subscriptions.push(this.api.debugMode.subscribe((debugMode: boolean) => {
      const form = {...this.form};
      form.debugMode = !!debugMode;
      this.init(form);
    }));

    this.subscriptions.push(this.api.triggerSubmit.subscribe((submit: boolean) => {
      this.submit();
    }));

    this.subscriptions.push(this.api.patchFormSubject.subscribe((form: MfForm) => {
      this.init(form);
    }));

    this.subscriptions.push(this.api.goToStepSubject.subscribe((goTo) => {
      if (goTo) {
        this.goToNextStep();
      } else {
        this.goToPreviousStep();
      }
    }));

    this.subscriptions.push(this.api.patchValueSubject.subscribe((obj) => {
      this.patchValue(obj.field, obj.value);
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && changes['form'].currentValue) {
      this.init(this.form);
    }
  }

  ngOnDestroy(): void {
    if (!this.subscriptions) {
      return;
    }
    this.subscriptions.forEach(it => it.unsubscribe());
    if (this.formGroupSubscription) {
      this.formGroupSubscription.unsubscribe();
    }
  }
}

const flattenDeep = (arr) => Array.isArray(arr)
  ? arr.reduce((a, b) => a.concat(flattenDeep(b)), [])
  : [arr];

const defaultI18n = {
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
